import 'dotenv/config'
import { describe, it, expect, beforeAll } from 'vitest'
import { RiotClient } from '../http/RiotClient';
import { Account } from '../types/summoner';

const KEY = process.env.RIOT_API_KEY;

describe.skipIf(!KEY)("AccountApi (live)", () => {
    let acc: Account
    beforeAll(async () => {
  const client = new RiotClient({ apiKey: KEY!, region: "RU" })
  acc = await client.account.getAccountByNameAndTag("sai1acto", "RU1")
    })
    it("return real account by riotId", async()=>{
        const client = new RiotClient({apiKey: KEY!, region: "RU"});
        const acc = await client.account.getAccountByNameAndTag("sai1acto", "RU1");
        expect(acc.puuid).toBeTypeOf("string");
        expect(acc.gameName).toBeTypeOf("string");
        expect(acc.tagLine).toBeTypeOf("string");
    })
    it("return real summoner by Puuid", async()=>{
        const client = new RiotClient({apiKey: KEY!, region: "RU"});
        const summoner = await client.lol.summoner.getByPuuid(acc.puuid);
        expect(summoner.puuid).toBe(acc.puuid)
        expect(summoner.puuid).toBeTypeOf('string');
        expect(summoner.profileIconId).toBeTypeOf('number');
        expect(summoner.revisionDate).toBeTypeOf('number');
        expect(summoner.summonerLevel).toBeTypeOf('number');
    })
})