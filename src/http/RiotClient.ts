import { AccountApi } from "../account/AccountApi";
import { MatchApi } from "../lol/MatchApi";
import { SummonerApi } from "../lol/SummonerApi";
import { HttpClient } from "./HttpClient";
import { RateLimiter } from "./RateLimiter";
import { Platform, PLATFORM_TO_REGION, PLATFORMS, REGIONS } from "./routing";


export interface RiotClientConfig {
    apiKey: string;
    region?: Platform;
}
export class RiotClient {
    readonly lol: {
        summoner: SummonerApi;
        match: MatchApi;
    }
    readonly account: AccountApi;
    constructor(config: RiotClientConfig) {
        
        const region = (config.region ?? "EUW1").toUpperCase() as Platform;
        const platformUrl = PLATFORMS[region];
        if (!platformUrl) {
            throw new Error(`Unknown region: "${region}". Valid regions: ${Object.keys(PLATFORMS).join(", ")}`)
        }
        const regionalUrl = REGIONS[PLATFORM_TO_REGION[region]]

        const platformHttp = new HttpClient({baseUrl: platformUrl, apiKey: config.apiKey, rateLimiter: new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}, {limit: 100, windowMs:120_000, timestamps: []}])});
        const regionalHttp = new HttpClient({baseUrl: regionalUrl, apiKey: config.apiKey, rateLimiter: new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}, {limit: 100, windowMs:120_000, timestamps: []}])});

        this.lol = {summoner: new SummonerApi(platformHttp), match: new MatchApi(regionalHttp)};
        this.account = new AccountApi(regionalHttp);
    }
}