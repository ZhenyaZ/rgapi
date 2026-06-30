import { HttpClient } from "../http/HttpClient";
import { Platform } from "../types/valorant/status";

export class ValStatusApi {
    constructor(private http: HttpClient) {}

    /**
     * Get VALORANT status for the configured shard,
     * including any active maintenances and incidents.
     * @returns Platform data with locales and current maintenance/incident entries.
     */
    async get(): Promise<Platform> {
        return await this.http.get<Platform>('/val/status/v1/platform-data')
    }
}