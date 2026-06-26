import { HttpClient } from "../http/HttpClient";
import { Division, LeagueEntry, LeagueList, Queue, TierReq } from "../types/lol/league";

export class LeagueApi {
    constructor(private http: HttpClient) { }

    /**
     * Get league entries in all queues for a given PUUID.
     * @param puuid Encrypted PUUID of the summoner.
     * @returns The summoner's ranked entries (one per ranked queue they're placed in).
     */
    async getByPuuid(puuid: string): Promise<LeagueEntry[]> {
        return this.http.get<LeagueEntry[]>(`/lol/league/v4/entries/by-puuid/${puuid}`);
    }
    /**
     * Get the challenger league for a given queue.
     * @param queue Ranked queue (e.g. RANKED_SOLO_5x5).
     * @returns The challenger league list with all its entries.
     */
    async getChallengerLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/challengerleagues/by-queue/${queue}`);
    }
    /**
     * Get all the league entries for a given queue, tier and division.
     * @param queue Ranked queue (e.g. RANKED_SOLO_5x5).
     * @param tier Tier (DIAMOND down to IRON; apex tiers use their dedicated endpoints).
     * @param division Division within the tier (I–IV).
     * @param page Page of results to fetch, starting at 1. Defaults to 1.
     * @returns A page of ranked entries matching the queue/tier/division.
     */
    async getAllEntries(queue: Queue, tier: TierReq, division: Division, page: number = 1): Promise<LeagueEntry[]> {
        return this.http.get<LeagueEntry[]>(`/lol/league/v4/entries/${queue}/${tier}/${division}?page=${page}`);
    }
    /**
     * Get the grandmaster league for a given queue.
     * @param queue Ranked queue (e.g. RANKED_SOLO_5x5).
     * @returns The grandmaster league list with all its entries.
     */
    async getGrandmasterLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/grandmasterleagues/by-queue/${queue}`);
    }
    /**
     * Get the master league for a given queue.
     * @param queue Ranked queue (e.g. RANKED_SOLO_5x5).
     * @returns The master league list with all its entries.
     */
    async getMasterLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/masterleagues/by-queue/${queue}`);
    }
}