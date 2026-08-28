import { describe, expect, it, vi } from "vitest";

import { createFplSdk } from "./client.js";
import { FplResponseValidationError } from "./validation.js";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { "content-type": "application/json" },
    status,
  });
}

describe("response validation", () => {
  it("accepts a response that matches its operation schema", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      jsonResponse({ fixtures: [], history: [], history_past: [] }),
    );
    const sdk = createFplSdk({
      baseUrl: "https://example.test/api",
      fetch,
      validateResponses: true,
    });

    const { data } = await sdk.getPlayerSummary(351);
    expect(data?.fixtures).toEqual([]);
  });

  it("rejects a response that violates its operation schema", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      jsonResponse({ fixtures: "not-an-array", history: [], history_past: [] }),
    );
    const sdk = createFplSdk({
      baseUrl: "https://example.test/api",
      fetch,
      validateResponses: true,
    });

    const request = sdk.getPlayerSummary(351);

    await expect(request).rejects.toMatchObject({
      method: "GET",
      name: "FplResponseValidationError",
      path: "/element-summary/{element_id}/",
      status: 200,
    });
    await expect(request).rejects.toBeInstanceOf(FplResponseValidationError);
  });

  it("leaves validation disabled by default", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () =>
      jsonResponse({ fixtures: "not-an-array", history: [], history_past: [] }),
    );
    const sdk = createFplSdk({ baseUrl: "https://example.test/api", fetch });

    const { data } = await sdk.getPlayerSummary(351);
    expect(data?.fixtures).toBe("not-an-array");
  });
});
