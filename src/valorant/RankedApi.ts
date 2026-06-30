import { HttpClient } from "../http/HttpClient";
import { Leaderboard } from "../types/valorant/ranked";

export class ValRankedApi {
    constructor(private http: HttpClient) {}

    /**
     * Get the competitive leaderboard for a given act, ordered by rank.
     * @param actId Act ID to fetch the leaderboard for (from `VAL-CONTENT-V1`).
     * @param size Number of players to return. Defaults to 200 (max 200).
     * @param startIndex Zero-based index of the first player to return. Defaults to 0.
     * @returns The leaderboard for the act, including total players and the requested page.
     */
    async leaderboard(actId: string, size = 200, startIndex = 0): Promise<Leaderboard> {
        return await this.http.get<Leaderboard>(`/val/ranked/v1/leaderboards/by-act/${actId}?size=${size}&startIndex=${startIndex}`);
    }
}