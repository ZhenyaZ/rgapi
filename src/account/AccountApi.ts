import { HttpClient } from "../http/HttpClient";
import { Account } from "../types/summoner";

export class AccountApi {
    constructor(private http: HttpClient) {}

    async getAccountByNameAndTag(name: string, tag: string): Promise<Account> {
            return this.http.get<Account>(`/riot/account/v1/accounts/by-riot-id/${name}/${tag}`);
        };
}