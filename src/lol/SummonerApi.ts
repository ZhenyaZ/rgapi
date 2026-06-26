import { HttpClient } from "../http/HttpClient";
import { Account, Summoner } from "../types/summoner";

export class SummonerApi {
    constructor(private http: HttpClient) {}

    /**
     * Get a summoner by PUUID.
     * @param puuid Encrypted PUUID of the summoner.
     * @returns The summoner profile (level, icon, revision date, PUUID).
     */
    async getByPuuid(puuid: string): Promise<Summoner> {
        return this.http.get<Summoner>(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
    }
}