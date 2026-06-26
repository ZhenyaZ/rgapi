import { HttpClient } from "../http/HttpClient";
import { Match, MatchListOption } from "../types/lol/match";

export class MatchApi {
    constructor(private http: HttpClient) {}

    /**
     * Get a list of match IDs for a given PUUID, most recent first.
     * @param puuid Encrypted PUUID of the player.
     * @param options Optional filters (start, count, queue, type, startTime, endTime). Count defaults to 20.
     * @returns An array of match IDs.
     */
    async getMatchIds(puuid: string, options?: MatchListOption): Promise<string[]> {
        return await this.http.get<string[]>(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {count: 20, ...options})
    }
    /**
     * Get a match by its match ID.
     * @param matchId Match ID (e.g. EUW1_1234567890).
     * @returns The full match, including metadata and participant info.
     */
    async getMatchById(matchId: string): Promise<Match> {
        return await this.http.get<Match>(`/lol/match/v5/matches/${matchId}`)
    }
}