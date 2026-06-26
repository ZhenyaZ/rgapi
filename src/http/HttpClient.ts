import { RateLimiter } from "./RateLimiter";

/**
 * Error thrown when the Riot API responds with a non-2xx status.
 * Carries the HTTP status and status text alongside a human-readable message.
 */
export class RiotApiError extends Error {
    /**
     * @param status HTTP status code returned by the Riot API.
     * @param statusText HTTP status text returned by the Riot API.
     * @param message Human-readable description of the error.
     */
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

    /**
     * Perform an authenticated GET request against the Riot API.
     * Waits on the rate limiter (if configured), sends the API key header,
     * and parses the JSON response.
     * @param path Path appended to the base URL (e.g. `/lol/summoner/v4/...`).
     * @param params Optional query parameters appended to the URL.
     * @returns The parsed JSON response, typed as `T`.
     * @throws {RiotApiError} If the response status is not ok.
     */
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

