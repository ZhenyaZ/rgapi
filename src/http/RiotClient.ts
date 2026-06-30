import { AccountApi } from "../account/AccountApi";
import { ChampionApi } from "../lol/ChampionApi";
import { ClashApi } from "../lol/ClashApi";
import { LeagueApi } from "../lol/LeagueApi";
import { MatchApi } from "../lol/MatchApi";
import { StatusApi } from "../lol/StatusApi";
import { SummonerApi } from "../lol/SummonerApi";
import { ValContentApi } from "../valorant/ContentApi";
import { ValMatchApi } from "../valorant/MatchApi";
import { ValRankedApi } from "../valorant/RankedApi";
import { ValStatusApi } from "../valorant/statusApi";
import { HttpClient } from "./HttpClient";
import { RateLimiter } from "./RateLimiter";
import { Platform, PLATFORM_TO_REGION, PLATFORM_TO_VAL, PLATFORMS, REGIONS, VAL_PLATFORMS } from "./routing";


export interface RiotClientConfig {
    apiKey: string;
    region?: Platform;
}
export class RiotClient {
    readonly lol: {
        summoner: SummonerApi;
        match: MatchApi;
        status: StatusApi;
        league: LeagueApi;
        champion: ChampionApi;
        clash: ClashApi;
    }
    readonly val: {
        status: ValStatusApi;
        ranked: ValRankedApi;
        match: ValMatchApi;
        content: ValContentApi;
    }
    readonly account: AccountApi;
    /**
     * Create a Riot API client. Sets up platform- and regional-routed HTTP clients
     * (each with its own rate limiter) and wires up every LoL and account API.
     * @param config Client config: API key and optional default platform (region), defaulting to EUW1.
     * @throws {Error} If the configured region is not a known platform.
     */
    constructor(config: RiotClientConfig) {
        
        const region = (config.region ?? "EUW1").toUpperCase() as Platform;
        const platformUrl = PLATFORMS[region];
        if (!platformUrl) {
            throw new Error(`Unknown region: "${region}". Valid regions: ${Object.keys(PLATFORMS).join(", ")}`)
        }
        const regionalUrl = REGIONS[PLATFORM_TO_REGION[region]]
        const valUrl = VAL_PLATFORMS[PLATFORM_TO_VAL[region]]

        const platformHttp = new HttpClient({baseUrl: platformUrl, apiKey: config.apiKey, rateLimiter: new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}, {limit: 100, windowMs:120_000, timestamps: []}])});
        const regionalHttp = new HttpClient({baseUrl: regionalUrl, apiKey: config.apiKey, rateLimiter: new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}, {limit: 100, windowMs:120_000, timestamps: []}])});
        const valHttp = new HttpClient({baseUrl: valUrl, apiKey: config.apiKey, rateLimiter: new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}, {limit: 100, windowMs:120_000, timestamps: []}])});

        this.lol = {
            summoner: new SummonerApi(platformHttp), 
            match: new MatchApi(regionalHttp), 
            status: new StatusApi(platformHttp),
            league: new LeagueApi(platformHttp),
            champion: new ChampionApi(platformHttp),
            clash: new ClashApi(platformHttp),
        };
        this.val = {
            status: new ValStatusApi(valHttp),
            ranked: new ValRankedApi(valHttp),
            match: new ValMatchApi(valHttp),
            content: new ValContentApi(valHttp),
        };
        this.account = new AccountApi(regionalHttp);
    }
}