export type Platforms = 'windows' | 'macos' | 'android' | 'ios' | 'ps4' | 'xbone' | 'switch';
export interface Platform {
    id: string;
    name: string;
    locales: string[];
    maintenances: [];
    incidents: [];
}

export interface Status {
    id: number;
    maintenance_status: string;
    incident_severity: string;
    titles: Content[];
    updates: Update[];
    created_at: string;
    archive_at: string;
    updated_at: string;
    platforms: Platforms[];

}
export interface Content {
    locale: string;
    content: string;
}
export interface Update {
    id: number;
    author: string;
    publish: boolean;
    publish_locations: string[];
    translations: Content[];
    created_at: string;
    updated_at: string;
}