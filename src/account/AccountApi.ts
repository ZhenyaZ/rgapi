import { HttpClient } from "../http/HttpClient";
import { Account } from "../types/summoner";

export class AccountApi {
    constructor(private http: HttpClient) {}

    /**
     * Get an account by its Riot ID (game name + tagline).
     * @param name Riot ID game name (the part before the `#`).
     * @param tag Riot ID tagline (the part after the `#`, without the `#`).
     * @returns The matching account, including its encrypted PUUID.
     */
    async getAccountByNameAndTag(name: string, tag: string): Promise<Account> {
            return this.http.get<Account>(`/riot/account/v1/accounts/by-riot-id/${name}/${tag}`);
        };
}