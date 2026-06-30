import { HttpClient } from "../http/HttpClient";
import { Match, Matchlist, RecentMatches } from "../types/valorant/match";

export class ValMatchApi {
    constructor(private http: HttpClient) {}

    /**
     * Get a match by its match ID.
     * @param matchId VALORANT match ID.
     * @returns The full match, including match info, players, teams and round results.
     */
    async getMatchById(matchId: string): Promise<Match> {
        return this.http.get<Match>(`/val/match/v1/matches/${matchId}`);
    }
    /**
     * Get the recent match list for a player, most recent first.
     * @param puuid Encrypted PUUID of the player.
     * @returns The player's match history (match IDs with start time and queue).
     */
    async getMatchlist(puuid: string): Promise<Matchlist> {
        return this.http.get<Matchlist>(`/val/match/v1/matchlists/by-puuid/${puuid}`);
    }
    /**
     * Get recent match IDs for a queue. Only a subset of queues is supported
     * (e.g. `competitive`, `unrated`, `spikerush`, `deathmatch`).
     * @param queue Queue name to fetch recent matches for.
     * @returns The current server time and a list of recent match IDs.
     */
    async getRecentMatches(queue: string): Promise<RecentMatches> {
        return this.http.get<RecentMatches>(`/val/match/v1/recent-matches/by-queue/${queue}`);
    }
}
