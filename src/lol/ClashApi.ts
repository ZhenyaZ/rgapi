import { HttpClient } from "../http/HttpClient";
import { Player, Team, Tournament } from "../types/lol/clash";

export class ClashApi {
    constructor(private http: HttpClient) {}

    /**
     * Get players by puuid
     * @description 
     * This endpoint returns a list of active Clash players for a given PUUID.
     * If a summoner registers for multiple tournaments at the same time (e.g., Saturday and Sunday) then both registrations would appear in this list.
     * @param puuid Encrypted PUUID of the player.
     * @returns The player's active Clash registrations (one per tournament).
     */
    async getPlayers(puuid: string): Promise<Player[]> {
        return this.http.get<Player[]>(`/lol/clash/v1/players/by-puuid/${puuid}`);
    }
    /**
     * Get team by ID.
     * @param teamId Clash team ID.
     * @returns The Clash team, including its roster.
     */
    async getTeam(teamId: string): Promise<Team> {
        return this.http.get<Team>(`/lol/clash/v1/teams/${teamId}`);
    }
    /**
     * Get all active or upcoming tournaments.
     * @returns The list of active and upcoming Clash tournaments.
     */
    async getTournaments(): Promise<Tournament[]> {
        return this.http.get<Tournament[]>(`/lol/clash/v1/tournaments`);
    }
    /**
     * Get tournament by team ID.
     * @param teamId Clash team ID.
     * @returns The tournament the team is registered for.
     */
    async getTournamentByTeamId(teamId: string): Promise<Tournament> {
        return this.http.get<Tournament>(`/lol/clash/v1/tournaments/by-team/${teamId}`);
    }
    /**
     * Get tournament by ID.
     * @param tournamentId Clash tournament ID.
     * @returns The matching tournament.
     */
    async getTournamentById(tournamentId: number): Promise<Tournament> {
        return this.http.get<Tournament>(`/lol/clash/v1/tournaments/${tournamentId}`);
    }
}