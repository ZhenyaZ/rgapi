import 'dotenv/config'
import { describe, it, expect, beforeAll } from 'vitest'
import { RiotClient } from '../http/RiotClient';

const KEY = process.env.RIOT_API_KEY;

describe.skipIf(!KEY)("MatchApi (live)", () => {
    let matchId: string
    let puuid: string
    const client = new RiotClient({ apiKey: KEY!, region: "RU" })
    beforeAll(async () => {
        const acc = await client.account.getAccountByNameAndTag("sai1acto", "RU1")
        puuid = acc.puuid;
        const matchIds = await client.lol.match.getMatchIds(acc.puuid)
        expect(matchIds.length).toBeGreaterThan(0)
        matchId = matchIds[0]
    })
    it("return match ids", async () => {
        const ids = await client.lol.match.getMatchIds(puuid)
        expect(ids[0]).toBeTypeOf('string')
    })
    it("return match data by match id", async () => {
        const match = await client.lol.match.getMatchById(matchId);
        expect(match.metadata.participants).toContain(puuid)
        expect(match.metadata.matchId).toBe(matchId)
        expect(match.info).toBeDefined()
        expect(Array.isArray(match.info.participants)).toBe(true)
        expect(match.info.participants.length).toBeGreaterThan(0)

    })
})