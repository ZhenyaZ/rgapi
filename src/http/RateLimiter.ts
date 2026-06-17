interface RateLimiterConfig {
        limit: number;
        windowMs: number;
        timestamps: number[];
}

export class RateLimiter {
    private rules: RateLimiterConfig[];
    constructor(private config: RateLimiterConfig[]) {
        this.rules = this.config.map((r)=>({...r, timestamps: [] as number[]}))
    }

    async acquire(): Promise<void> {
        const now = Date.now();
       for (const rule of this.rules) {
        rule.timestamps = rule.timestamps!.filter(t=> t> now - rule.windowMs)
       }
       const allFree = this.rules.every(r=>r.timestamps!.length < r.limit)
       if (allFree) {
        for (const rule of this.rules) rule.timestamps.push(now);
        return;
       }
       const waits = this.rules.filter(r=>r.timestamps.length >= r.limit).map(r=>Math.min(...r.timestamps) + r.windowMs - now)
       const wait = Math.max(...waits);
       await new Promise(resolve=>setTimeout(resolve, wait));
       return this.acquire();
    }
}





