export interface Leaderboard {
    shard: string;
    actId: string;
    totalPlayers: number;
    players: Player[];
}
export interface Player {
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
}