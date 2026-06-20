export type Queue = "RANKED_SOLO_5x5" | "RANKED_FLEX_SR" | "RANKED_FLEX_TT";
export type Tier = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
export type TierReq = "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND";
export type Division = "I" | "II" | "III" | "IV";
export interface MiniSeries {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}
export interface LeagueEntry {
    leagueId: string;
    puuid: string;
    queueType: Queue;
    tier: Tier;
    rank: Division;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    miniSeries?: MiniSeries;
}

export interface LeagueItem {
    freshBlood: boolean;
    wins: number;
    miniSeries?: MiniSeries;
    inactive: boolean;
    veteran: boolean;
    hotStreak: boolean;
    rank: Division;
    leaguePoints: number;
    losses: number;
    puuid: string;
}
export interface LeagueList {
    leagueId: string;
    entries: LeagueItem[];
    tier: Tier;
    name: string;
    queue: Queue;
}