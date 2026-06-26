import { HttpClient } from "../http/HttpClient";
import { PlatformData } from "../types/lol/lol-status";

export class StatusApi {
    constructor(private http: HttpClient) {}
    
        /**
         * Get League of Legends status for the configured platform,
         * including any active maintenances and incidents.
         * @returns Platform data with locales and current maintenance/incident entries.
         */
        async get(): Promise<PlatformData> {
            return this.http.get<PlatformData>(`/lol/status/v4/platform-data`);
        }
}