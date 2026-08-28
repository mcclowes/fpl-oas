import createClient, { type Client, type ClientOptions } from "openapi-fetch";

import type { paths } from "./schema.gen.js";
import { createPolicyFetch, type TransportPolicies } from "./transport.js";
import { createValidationFetch } from "./validation.js";

export const FPL_API_BASE_URL = "https://fantasy.premierleague.com/api";

export type FplClient = Client<paths>;
export type FplClientOptions = Omit<ClientOptions, "baseUrl"> & {
  /** Override the FPL API URL, for example when using a proxy or test server. */
  baseUrl?: string;
  /** Opt-in retry, request pacing, and response caching. */
  policies?: TransportPolicies;
  /** Validate documented JSON responses against the OAS at runtime. */
  validateResponses?: boolean;
};

export interface FixtureFilters {
  event?: number;
  future?: number;
}

export interface ClassicLeaguePages {
  newEntries?: number;
  standings?: number;
}

export interface H2HLeagueFilters {
  event?: number;
  page?: number;
}

/** Create an isolated, fully typed FPL API client. */
export function createFplClient(options: FplClientOptions = {}): FplClient {
  const {
    baseUrl = FPL_API_BASE_URL,
    fetch = globalThis.fetch,
    policies,
    validateResponses = false,
    ...fetchOptions
  } = options;

  const transportFetch = policies
    ? createPolicyFetch(fetch as typeof globalThis.fetch, policies)
    : fetch;

  return createClient<paths>({
    credentials: "include",
    ...fetchOptions,
    baseUrl,
    fetch: validateResponses
      ? createValidationFetch(transportFetch as typeof globalThis.fetch)
      : transportFetch,
  });
}

/** Named helpers for every operation in the FPL OpenAPI document. */
export class FplSdk {
  constructor(readonly client: FplClient) {}

  getBootstrapData() {
    return this.client.GET("/bootstrap-static/");
  }

  getSeasonDreamTeam() {
    return this.client.GET("/dream-team/");
  }

  getDreamTeam(eventId: number) {
    return this.client.GET("/dream-team/{event_id}/", {
      params: { path: { event_id: eventId } },
    });
  }

  getPlayerSummary(elementId: number) {
    return this.client.GET("/element-summary/{element_id}/", {
      params: { path: { element_id: elementId } },
    });
  }

  getManager(managerId: number) {
    return this.client.GET("/entry/{manager_id}/", {
      params: { path: { manager_id: managerId } },
    });
  }

  getManagerPicks(managerId: number, eventId: number) {
    return this.client.GET("/entry/{manager_id}/event/{event_id}/picks/", {
      params: { path: { event_id: eventId, manager_id: managerId } },
    });
  }

  getManagerHistory(managerId: number) {
    return this.client.GET("/entry/{manager_id}/history/", {
      params: { path: { manager_id: managerId } },
    });
  }

  getLatestManagerTransfers(managerId: number) {
    return this.client.GET("/entry/{manager_id}/transfers-latest/", {
      params: { path: { manager_id: managerId } },
    });
  }

  getManagerTransfers(managerId: number) {
    return this.client.GET("/entry/{manager_id}/transfers/", {
      params: { path: { manager_id: managerId } },
    });
  }

  getEventStatus() {
    return this.client.GET("/event-status/");
  }

  getLiveEvent(eventId: number) {
    return this.client.GET("/event/{event_id}/live/", {
      params: { path: { event_id: eventId } },
    });
  }

  getFixtures(filters: FixtureFilters = {}) {
    return this.client.GET("/fixtures/", {
      params: { query: filters },
    });
  }

  getCupStatus(leagueId: number) {
    return this.client.GET("/league/{league_id}/cup-status/", {
      params: { path: { league_id: leagueId } },
    });
  }

  getClassicLeagueStandings(leagueId: number, pages: ClassicLeaguePages = {}) {
    return this.client.GET("/leagues-classic/{league_id}/standings/", {
      params: {
        path: { league_id: leagueId },
        query: {
          ...(pages.newEntries === undefined
            ? {}
            : { page_new_entries: pages.newEntries }),
          ...(pages.standings === undefined
            ? {}
            : { page_standings: pages.standings }),
        },
      },
    });
  }

  getH2HLeagueMatches(leagueId: number, filters: H2HLeagueFilters = {}) {
    return this.client.GET("/leagues-h2h-matches/league/{league_id}/", {
      params: {
        path: { league_id: leagueId },
        query: filters,
      },
    });
  }

  getCurrentUser() {
    return this.client.GET("/me/");
  }

  getMyTeam(managerId: number) {
    return this.client.GET("/my-team/{manager_id}/", {
      params: { path: { manager_id: managerId } },
    });
  }

  getRegions() {
    return this.client.GET("/regions/");
  }

  getBestClassicPrivateLeagues() {
    return this.client.GET("/stats/best-classic-private-leagues/");
  }

  getMostValuableTeams() {
    return this.client.GET("/stats/most-valuable-teams/");
  }

  getSetPieceNotes() {
    return this.client.GET("/team/set-piece-notes/");
  }
}

export function createFplSdk(options: FplClientOptions = {}): FplSdk {
  return new FplSdk(createFplClient(options));
}
