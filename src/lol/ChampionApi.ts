import { HttpClient } from "../http/HttpClient";
import { ChampionInfo, ChampionMastery } from "../types/lol/champion";

export class ChampionApi {
    constructor(private http: HttpClient) {}
    /**
     * Returns champion rotations, including free-to-play and low-level free-to-play rotations.
     * @returns The current free champion IDs, the low-level free champion IDs and the max level for the latter.
     */
    async rotations(): Promise<ChampionInfo> {
        return this.http.get<ChampionInfo>('/lol/platform/v3/champion-rotations');
    }
    /**
     * Get all champion mastery entries sorted by number of champion points descending.
     * @param puuid Encrypted PUUID of the player.
     * @returns Every champion the player has mastery on, highest points first.
     */
    async allChampionMastery(puuid: string): Promise<ChampionMastery[]> {
        return this.http.get<ChampionMastery[]>(`/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`);
    }
    /**
     * Get a champion mastery by puuid and champion ID.
     * @param puuid Encrypted PUUID of the player.
     * @param championId Champion ID to look up.
     * @returns The player's mastery entry for that champion.
     */
    async championMastery(puuid: string, championId: number): Promise<ChampionMastery> {
        return this.http.get<ChampionMastery>(`/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/by-champion/${championId}`);
    }
    /**
     * Get specified number of top champion mastery entries sorted by number of champion points descending.
     * @param puuid Encrypted PUUID of the player.
     * @param count Number of top entries to return. Defaults to 3.
     * @returns The player's top mastery entries, highest points first.
     */
    async topChampionMastery(puuid: string, count: number = 3): Promise<ChampionMastery[]> {
        return this.http.get<ChampionMastery[]>(`/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}`);
    }
    /**
     * Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
     * @param puuid Encrypted PUUID of the player.
     * @returns The total mastery score.
     */
    async totalChampionMastery(puuid: string): Promise<number> {
        return this.http.get<number>(`/lol/champion-mastery/v4/scores/by-puuid/${puuid}`);
    }
}