import { HttpClient } from "../http/HttpClient";
import { Division, LeagueEntry, LeagueList, Queue, TierReq } from "../types/league";

export class LeagueApi {
    constructor(private http: HttpClient) { }

    async getByPuuid(puuid: string): Promise<LeagueEntry[]> {
        return this.http.get<LeagueEntry[]>(`/lol/league/v4/entries/by-puuid/${puuid}`);
    }
    async getChallengerLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/challengerleagues/by-queue/${queue}`);
    }
    async getAllEntries(queue: Queue, tier: TierReq, division: Division, page: number = 1): Promise<LeagueEntry[]> {
        return this.http.get<LeagueEntry[]>(`/lol/league/v4/entries/${queue}/${tier}/${division}?page=${page}`);
    }
    async getGrandmasterLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/grandmasterleagues/by-queue/${queue}`);
    }
    async getMasterLeagueByQueue(queue: Queue): Promise<LeagueList> {
        return this.http.get<LeagueList>(`/lol/league/v4/masterleagues/by-queue/${queue}`);
    }
}