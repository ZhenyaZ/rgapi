import {vi, it, expect, describe, beforeEach} from 'vitest'
import { HttpClient, RiotApiError } from './HttpClient';
describe('HttpClient', ()=> {
    beforeEach(() => { vi.unstubAllGlobals() })
    it("return parsed json on success", async()=>{
        const http = new HttpClient({baseUrl: "https://test", apiKey: "EXAMPLE_KEY"});
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({puuid: "xxx111ccc"})));
        vi.stubGlobal("fetch",  fetchMock)
        const result = await http.get('/test')
        expect(result).toEqual({puuid: "xxx111ccc"})
    })
    it("should be 403 error when ok === false", async()=>{
        const http = new HttpClient({baseUrl: "https://test", apiKey: ''})
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({puuid: "xxx111ccc"}), {status: 403}));
        vi.stubGlobal("fetch", fetchMock)
        await expect(http.get('/test')).rejects.toMatchObject({status: 403});
    })
    it("X-Riot-Token correctly set to header", async() => {
        const http = new HttpClient({baseUrl: "https://test", apiKey: '1234'})
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({puuid: "xxx111ccc"})));
        vi.stubGlobal("fetch", fetchMock)
        await http.get('/test');
        const [, init] = fetchMock.mock.calls[0];
        expect(init.headers).toEqual({'X-Riot-Token': '1234'})
    })
    it("query params correctly passed", async()=> {
        const http = new HttpClient({baseUrl: "https://test", apiKey: '1234'})
        const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({puuid: "xxx111ccc"})));
        vi.stubGlobal("fetch", fetchMock)
        await http.get('/test', {count: 10, start: 0});
        const [url,] = fetchMock.mock.calls[0];
        const params = new URL(url).searchParams;
        expect(params.get('count')).toBe('10');
        expect(params.get('start')).toBe('0');
    })
})