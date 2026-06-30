export interface Content {
    version: string;
    characters: ContentItem[];
    maps: ContentItem[];
    chromas: ContentItem[];
    skins: ContentItem[];
    skinLevels: ContentItem[];
    equips: ContentItem[];
    gameModes: ContentItem[];
    sprays: ContentItem[];
    sprayLevels: ContentItem[];
    charms: ContentItem[];
    charmLevels: ContentItem[];
    playerCards: ContentItem[];
    playerTitles: ContentItem[];
    acts: Act[];
    ceremonies: ContentItem[];
}
export interface ContentItem {
    name: string;
    /** Present only when a `locale` query param is NOT supplied. */
    localizedNames?: LocalizedNames;
    id: string;
    assetName: string;
    /** Present on some asset types (e.g. maps, game modes). */
    assetPath?: string;
}
export interface Act extends ContentItem {
    isActive: boolean;
    type?: string;
    parentId?: string;
}
/** Per-locale display names, keyed by Riot locale code (e.g. `en-US`). */
export interface LocalizedNames {
    'ar-AE': string;
    'de-DE': string;
    'en-US': string;
    'es-ES': string;
    'es-MX': string;
    'fr-FR': string;
    'id-ID': string;
    'it-IT': string;
    'ja-JP': string;
    'ko-KR': string;
    'pl-PL': string;
    'pt-BR': string;
    'ru-RU': string;
    'th-TH': string;
    'tr-TR': string;
    'vi-VN': string;
    'zh-CN': string;
    'zh-TW': string;
}
