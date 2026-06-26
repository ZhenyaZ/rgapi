export interface ChampionInfo {
    /**
     * A list of champion IDs available to players under summoner level 11 
     */
    newplayer: number[];
    /**
     * A list of champion IDs available to all players on Summoner's Rift 
     */
    sr: number[];
}

export interface ChampionMastery {
    puuid: string;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    championId: number;
    lastPlayTime: number;
    championLevel: number;
    championPoints: number;
    championPointsSinceLastLevel: number;
    markRequiredForNextLevel: number;
    championSeasonMilestone: number;
    nextSeasonMilestone: NextSeasonMilestones;
    tokensEarned: number;
    milestoneGrades: string[];
}
export interface NextSeasonMilestones {
    requireGradeCounts: Record<string, number>;
    rewardMarks: number;
    bonus: boolean;
    rewardConfig: RewardConfig;
}
export interface RewardConfig {
    rewardValue: string;
    rewardType: string;
    maximumReward: number;
}