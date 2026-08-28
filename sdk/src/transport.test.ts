import { describe, expect, it, vi } from "vitest";

import { createPolicyFetch } from "./transport.js";

describe("transport policies", () => {
  it("retries safe requests after transient responses", async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));
    const policyFetch = createPolicyFetch(fetch, {
      retry: { attempts: 2, baseDelayMs: 0 },
    });

    const response = await policyFetch("https://example.test/data");

    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("does not retry unsafe methods", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      Promise.resolve(new Response(null, { status: 503 })),
    );
    const policyFetch = createPolicyFetch(fetch, {
      retry: { attempts: 3, baseDelayMs: 0 },
    });

    await policyFetch("https://example.test/data", { method: "POST" });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("caches successful GET responses within the configured TTL", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      Promise.resolve(new Response(JSON.stringify({ value: 1 }), { status: 200 })),
    );
    const policyFetch = createPolicyFetch(fetch, { cache: { ttlMs: 1_000 } });

    const first = await policyFetch("https://example.test/data");
    const second = await policyFetch("https://example.test/data");

    expect(await first.json()).toEqual({ value: 1 });
    expect(await second.json()).toEqual({ value: 1 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("does not cache unsuccessful or no-store responses", async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(
        new Response("fresh", {
          headers: { "cache-control": "no-store" },
          status: 200,
        }),
      )
      .mockResolvedValueOnce(new Response("new", { status: 200 }));
    const policyFetch = createPolicyFetch(fetch, { cache: { ttlMs: 1_000 } });

    await policyFetch("https://example.test/data");
    await policyFetch("https://example.test/data");
    const third = await policyFetch("https://example.test/data");

    expect(await third.text()).toBe("new");
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("paces concurrent requests", async () => {
    vi.useFakeTimers();
    const starts: number[] = [];
    const fetch = vi.fn<typeof globalThis.fetch>(async () => {
      starts.push(Date.now());
      return new Response("ok");
    });
    const policyFetch = createPolicyFetch(fetch, {
      rateLimit: { requestsPerSecond: 2 },
    });

    const requests = [
      policyFetch("https://example.test/one"),
      policyFetch("https://example.test/two"),
      policyFetch("https://example.test/three"),
    ];
    await vi.runAllTimersAsync();
    await Promise.all(requests);

    expect(starts[1]! - starts[0]!).toBe(500);
    expect(starts[2]! - starts[1]!).toBe(500);
    vi.useRealTimers();
  });
});
