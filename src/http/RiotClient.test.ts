import {vi, it, expect, describe, beforeEach} from 'vitest'
import { RiotClient } from './RiotClient'

describe("RiotClient", () => {
    beforeEach(() => { vi.unstubAllGlobals() })
    it("account requests go to the regional host", async()=>{
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({})))
        vi.stubGlobal("fetch", fetchMock)
        const client = new RiotClient({apiKey: "TEST", region: 'JP1'})
        await client.account.getAccountByNameAndTag("test", "test")
        const [url,] = fetchMock.mock.calls[0]
        expect(url).toContain('asia')
    })
    it("summoner requests go to the platform host", async()=>{
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({})))
        vi.stubGlobal("fetch", fetchMock)
        const client = new RiotClient({apiKey: "TEST", region: 'JP1'})
        await client.lol.summoner.getByPuuid("test")
        const [url,] = fetchMock.mock.calls[0]
        expect(url).toContain('jp1')
    })
    it("user requests go to the unknown region", ()=>{
        expect(()=>{new RiotClient({apiKey: "TEST", region: 'JP2' as any})}).toThrow()
    })
})