import { HttpClient } from "../http/HttpClient";
import { Match, MatchListOption } from "../types/match";

export class MatchApi {
    constructor(private http: HttpClient) {}

    async getMatchIds(puuid: string, options?: MatchListOption): Promise<string[]> {
        return await this.http.get<string[]>(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {count: 20, ...options})
    }
    async getMatchById(matchId: string): Promise<Match> {
        return await this.http.get<Match>(`/lol/match/v5/matches/${matchId}`)
    }
}