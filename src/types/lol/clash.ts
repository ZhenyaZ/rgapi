export type PlayerPos =  "UNSELECTED" | "FILL" | "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";
export type PlayerRole = "CAPTAIN" | "MEMBER";

export interface Team {
    id: string;
    tournamentId: number;
    name: string;
    iconId: number;
    tier: number;
    captain: string;
    abbreviation: string;
    players: Player[];
}
export interface Player {
    puuid: string;
    position: PlayerPos;
    role: PlayerRole;
}

export interface Tournament {
    id: number;
    themeId: number;
    nameKey: string;
    nameKeySecondary: string;
    schedule: TournamentPhase[];
}
export interface TournamentPhase {
    id: number;
    registrationTime: number;
    startTime: number;
    cancelled: boolean;
}
