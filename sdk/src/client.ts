import createClient, { type Client, type ClientOptions } from "openapi-fetch";

import type { paths } from "./schema.gen.js";

export const FPL_API_BASE_URL = "https://fantasy.premierleague.com/api";

export type FplClient = Client<paths>;
export type FplClientOptions = Omit<ClientOptions, "baseUrl"> & {
  /** Override the FPL API URL, for example when using a proxy or test server. */
  baseUrl?: string;
};

/** Create an isolated, fully typed FPL API client. */
export function createFplClient(options: FplClientOptions = {}): FplClient {
  const { baseUrl = FPL_API_BASE_URL, ...fetchOptions } = options;

  return createClient<paths>({
    credentials: "include",
    ...fetchOptions,
    baseUrl,
  });
}
