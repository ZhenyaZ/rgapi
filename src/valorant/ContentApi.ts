import { HttpClient } from "../http/HttpClient";
import { Content } from "../types/valorant/content";

export class ValContentApi {
    constructor(private http: HttpClient) {}

    /**
     * Get VALORANT content data (characters, maps, skins, acts, etc.).
     * @param locale Optional Riot locale (e.g. `en-US`). When supplied, items are
     * returned with a single localized `name` and no `localizedNames` map.
     * @returns The content catalogue for the current game version.
     */
    async get(locale?: string): Promise<Content> {
        return this.http.get<Content>(`/val/content/v1/contents`, locale ? { locale } : undefined);
    }
}
