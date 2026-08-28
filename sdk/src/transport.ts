export interface RetryPolicy {
  /** Total attempts, including the first request. */
  attempts?: number;
  /** Initial exponential-backoff delay. */
  baseDelayMs?: number;
  /** Maximum exponential-backoff delay. */
  maxDelayMs?: number;
  /** HTTP statuses that are safe to retry. */
  statuses?: readonly number[];
}

export interface RateLimitPolicy {
  /** Maximum request starts per second for this client instance. */
  requestsPerSecond: number;
}

export interface CachePolicy {
  /** How long successful GET responses remain fresh. */
  ttlMs: number;
  /** Maximum responses retained by this client instance. */
  maxEntries?: number;
}

export interface TransportPolicies {
  cache?: CachePolicy;
  rateLimit?: RateLimitPolicy;
  retry?: RetryPolicy;
}

const DEFAULT_RETRY_STATUSES = [429, 500, 502, 503, 504] as const;

function wait(milliseconds: number, signal: AbortSignal | null): Promise<void> {
  if (milliseconds <= 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, milliseconds);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

function retryAfterMs(response: Response): number | undefined {
  const value = response.headers.get("retry-after");
  if (!value) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1_000);

  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

function withRetry(fetch: typeof globalThis.fetch, policy: RetryPolicy) {
  const attempts = Math.max(1, policy.attempts ?? 3);
  const baseDelayMs = Math.max(0, policy.baseDelayMs ?? 200);
  const maxDelayMs = Math.max(baseDelayMs, policy.maxDelayMs ?? 2_000);
  const statuses = new Set(policy.statuses ?? DEFAULT_RETRY_STATUSES);

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const retryableMethod = request.method === "GET" || request.method === "HEAD";

    for (let attempt = 1; ; attempt += 1) {
      try {
        const response = await fetch(request.clone());
        if (!retryableMethod || attempt >= attempts || !statuses.has(response.status)) {
          return response;
        }

        await response.body?.cancel();
        const delay =
          retryAfterMs(response) ??
          Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
        await wait(delay, request.signal);
      } catch (error) {
        if (!retryableMethod || attempt >= attempts || request.signal.aborted) {
          throw error;
        }

        await wait(
          Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1)),
          request.signal,
        );
      }
    }
  };
}

function withRateLimit(fetch: typeof globalThis.fetch, policy: RateLimitPolicy) {
  if (!(policy.requestsPerSecond > 0)) {
    throw new RangeError("requestsPerSecond must be greater than zero");
  }

  const intervalMs = 1_000 / policy.requestsPerSecond;
  let nextStart = 0;

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const now = Date.now();
    const start = Math.max(now, nextStart);
    nextStart = start + intervalMs;
    await wait(start - now, request.signal);
    return fetch(request);
  };
}

interface CacheEntry {
  expiresAt: number;
  response: Response;
}

function withCache(fetch: typeof globalThis.fetch, policy: CachePolicy) {
  if (!(policy.ttlMs > 0)) throw new RangeError("cache ttlMs must be greater than zero");

  const maxEntries = Math.max(1, policy.maxEntries ?? 100);
  const entries = new Map<string, CacheEntry>();

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    if (request.method !== "GET") return fetch(request);

    const key = [
      request.url,
      request.headers.get("accept") ?? "",
      request.headers.get("authorization") ?? "",
      request.headers.get("cookie") ?? "",
    ].join("\n");
    const cached = entries.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      entries.delete(key);
      entries.set(key, cached);
      return cached.response.clone();
    }
    entries.delete(key);

    const response = await fetch(request);
    if (
      response.ok &&
      !response.headers.get("cache-control")?.toLowerCase().includes("no-store")
    ) {
      entries.set(key, {
        expiresAt: Date.now() + policy.ttlMs,
        response: response.clone(),
      });
      while (entries.size > maxEntries) {
        const oldest = entries.keys().next().value as string | undefined;
        if (oldest === undefined) break;
        entries.delete(oldest);
      }
    }

    return response;
  };
}

export function createPolicyFetch(
  fetch: typeof globalThis.fetch,
  policies: TransportPolicies,
): typeof globalThis.fetch {
  let policyFetch = fetch;
  if (policies.rateLimit) policyFetch = withRateLimit(policyFetch, policies.rateLimit);
  if (policies.retry) policyFetch = withRetry(policyFetch, policies.retry);
  if (policies.cache) policyFetch = withCache(policyFetch, policies.cache);
  return policyFetch as typeof globalThis.fetch;
}
