import { describe, expect, it, vi } from "vitest";

import { createFplClient, createFplSdk, FPL_API_BASE_URL } from "./client.js";

function jsonResponse(body: unknown = {}) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

describe("createFplClient", () => {
  it("uses the FPL API and includes credentials by default", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => jsonResponse([]));
    const client = createFplClient({ fetch });

    await client.GET("/fixtures/");

    const request = fetch.mock.calls[0]?.[0] as Request;
    expect(request.url).toBe(`${FPL_API_BASE_URL}/fixtures/`);
    expect(request.credentials).toBe("include");
  });

  it("allows callers to override defaults", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => jsonResponse([]));
    const client = createFplClient({
      baseUrl: "https://proxy.example/fpl",
      credentials: "omit",
      fetch,
      headers: { "x-client": "test" },
    });

    await client.GET("/fixtures/");

    const request = fetch.mock.calls[0]?.[0] as Request;
    expect(request.url).toBe("https://proxy.example/fpl/fixtures/");
    expect(request.credentials).toBe("omit");
    expect(request.headers.get("x-client")).toBe("test");
  });
});

describe("FplSdk", () => {
  it("provides named helpers with typed path parameters", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      jsonResponse({ fixtures: [], history: [], history_past: [] }),
    );
    const sdk = createFplSdk({ baseUrl: "https://proxy.example", fetch });

    const { data, error } = await sdk.getPlayerSummary(351);

    const request = fetch.mock.calls[0]?.[0] as Request;
    expect(request.url).toBe("https://proxy.example/element-summary/351/");
    expect(error).toBeUndefined();
    expect(data?.fixtures).toEqual([]);
  });

  it("maps friendly pagination names to the API query parameters", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => jsonResponse({}));
    const sdk = createFplSdk({ baseUrl: "https://proxy.example", fetch });

    await sdk.getClassicLeagueStandings(42, { newEntries: 2, standings: 3 });

    const request = fetch.mock.calls[0]?.[0] as Request;
    expect(request.url).toBe(
      "https://proxy.example/leagues-classic/42/standings/?page_new_entries=2&page_standings=3",
    );
  });

  it("keeps the raw client available for advanced requests", () => {
    const sdk = createFplSdk();
    expect(sdk.client.GET).toBeTypeOf("function");
  });
});
