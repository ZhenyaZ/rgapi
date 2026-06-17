import { RateLimiter } from "./RateLimiter";

export class RiotApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string,
        message: string
    ) {
        super(message);
        this.message = `RiotApiError: ${message}`
    }
}
interface HttpClientConfig {
    baseUrl: string;
    apiKey: string;
    rateLimiter?: RateLimiter;
}

export class HttpClient {
    private baseUrl: string;
    private apiKey: string;
    private rl: RateLimiter | undefined;

    constructor(config: HttpClientConfig) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey;
        this.rl = config.rateLimiter
    }

    async get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
        const url = new URL(this.baseUrl + path);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.set(key, String(value));
            }
        }
        await this.rl?.acquire()
        const response = await fetch(url.toString(), {
            headers: {"X-Riot-Token": this.apiKey}
        });
        if (!response.ok) {
            const msg = this.getErrorMessage(response.status);
            throw new RiotApiError(response.status, response.statusText, msg);
        }

        return response.json() as Promise<T>
    }

    private getErrorMessage(status: number): string {
    switch (status) {
      case 400: return 'Bad request — Check query params'
      case 401: return 'Unauthorized — API key not provided'
      case 403: return 'Forbidden — API key not valid or expired'
      case 404: return 'Not found'
      case 429: return 'Rate limit exceeded'
      case 500: return 'Internal server error'
      case 503: return 'Service unavailable — Riot API unavailable'
      default:  return `HTTP error ${status}`
    }
  }

}

