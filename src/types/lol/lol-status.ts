export interface PlatformData {
    id: string;
    name: string;
    locales: string[];
    maintenances: Status[];
    incidents: Status[];
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
    platforms: string[];
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