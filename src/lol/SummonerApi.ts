import { HttpClient } from "../http/HttpClient";
import { Account, Summoner } from "../types/summoner";

export class SummonerApi {
    constructor(private http: HttpClient) {}

    async getByPuuid(puuid: string): Promise<Summoner> {
        return this.http.get<Summoner>(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
    }
}