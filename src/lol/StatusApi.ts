import { HttpClient } from "../http/HttpClient";
import { PlatformData } from "../types/lol-status";

export class StatusApi {
    constructor(private http: HttpClient) {}
    
        async get(): Promise<PlatformData> {
            return this.http.get<PlatformData>(`/lol/status/v4/platform-data`);
        }
}