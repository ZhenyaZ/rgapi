

export interface Match {
    matchInfo: MatchInfo;
    players: Player[];
    coaches: Coach[];
    teams: Team[];
    roundResults: RoundResult[];
}
export interface MatchInfo {
    matchId: string;
    mapId: string;
    gameVersion: string;
    gameLengthMillis: number;
    region: string;
    gameStartMillis: number;
    provisioningFlowId: string;
    isCompleted: boolean;
    customGameName: string;
    queueId: string;
    gameMode: string;
    isRanked: boolean;
    seasonId: string;
    premierMatchInfo: Record<string, unknown>;
}
export interface Player {
    puuid: string;
    gameName: string;
    tagLine: string;
    teamId: string;
    partyId: string;
    characterId: string;
    stats: PlayerStats;
    competitiveTier: number;
    isObserver: boolean;
    playerCard: string;
    playerTitle: string;
    accountLevel: number;
}
export interface PlayerStats {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts: AbilityCasts;
}
export interface AbilityCasts {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;

}
export interface Coach {
    puuid: string;
    teamId: string;
}
export interface Team {
    teamId: string;
    won: boolean;
    roundPlayed: number;
    roundsWon: number;
    numPoints: number;
}
export interface RoundResult {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    winningTeamRole: string;
    bombPlanter: string;
    bombDefuser: string;
    plantRoundTime: number;
    plantPlayerLocations: PlayerLocations[];
    plantLocation: Location;
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: PlayerLocations[];
    defuseLocation: Location;
    playerStats: PlayerRoundStats[];
    roundResultCode: string;
}
export interface PlayerLocations {
    puuid: string;
    viewRadians: number;
    location: Location;
}
export interface Location {
    x: number;
    y: number;
}
export interface PlayerRoundStats {
    puuid: string;
    kills: Kill[];
    damage: Damage[];
    score: number;
    economy: Economy;
    ability: Ability;
}
export interface Kill {
    timeSinceGameStartMillis: number;
    timeSinceRoundStartMillis: number;
    killer: string;
    victim: string;
    victimLocation: Location;
    assistants: string[];
    playerLocations: PlayerLocations[];
    finishingDamage: FinishingDamage;
}
export interface FinishingDamage {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}
export interface Damage {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}
export interface Economy {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}
export interface Ability {
    grenadeEffects: string;
    ability1Effects: string;
    ability2Effects: string;
    ultimateEffects: string;
}

export interface Matchlist {
    puuid: string;
    history: MatchlistEntry[];
}
export interface MatchlistEntry {
    matchId: string;
    gameStartTimeMillis: number;
    queueId: string;
}

export interface RecentMatches {
    currentTime: number;
    matchIds: string[];
}