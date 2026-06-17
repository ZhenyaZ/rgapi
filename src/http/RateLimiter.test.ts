import {vi, it, expect, describe, beforeEach, afterEach} from 'vitest'
import { RateLimiter } from './RateLimiter';

describe("RateLimiter", ()=>{
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("Hold next request until the window passes (20req/1s)", async()=>{
        const rl = new RateLimiter([{limit: 20, windowMs:1000, timestamps: []}]);
        for (let i = 0; i < 20; i++) await rl.acquire();
        let released = false;
        rl.acquire().then(()=>{released = true});
        await Promise.resolve();
        expect(released).toBe(false);
        await vi.advanceTimersByTimeAsync(1000);
        expect(released).toBe(true)
    })
    it("Hold next request until the window passes (100req/2min)", async()=>{
        const rl = new RateLimiter([{limit: 100, windowMs:120_000, timestamps: []}]);
        for (let i = 0; i < 100; i++) await rl.acquire();
        let released = false;
        rl.acquire().then(()=>{released = true});
        await Promise.resolve();
        expect(released).toBe(false);
        await vi.advanceTimersByTimeAsync(120_000);
        expect(released).toBe(true)
    })
})
