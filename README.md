# RGAPI
[![npm version](https://img.shields.io/npm/v/%40zhenyaz%2Frgapi.svg)](https://www.npmjs.com/package/@zhenyaz/rgapi)
[![npm downloads](https://img.shields.io/npm/dm/%40zhenyaz%2Frgapi.svg)](https://www.npmjs.com/package/@zhenyaz/rgapi)
[![license](https://img.shields.io/npm/l/%40zhenyaz%2Frgapi.svg)](./LICENSE)

TypeScript SDK for the Riot Games API. Wraps platform and regional HTTP endpoints into a clean, typed interface.
## Note

This is my first published npm package - built to learn and to have something reusable for my own projects. If you spot something off, have feedback, or just want to suggest a better approach, feel free to open an issue or reach out. Any input is appreciated.
## Roadmap
- [X] AccountAPI
- [X] SummonerAPI (get summoner by Puuid)
- [X] MatchAPI (get match ids, get match by matchId)
- [X] Rate limiting
- [X] Ranked stats (League of Legends)
- [X] Status (League of Legends)
- [X] Champion rotations & mastery (League of Legends)
- [X] Clash (League of Legends)
- [ ] Cover all Riot API
- [ ] Valorant support

## Installation
```bash 
npm i @zhenyaz/rgapi
```

## Quick Start
```ts
import { RiotClient } from "@zhenyaz/rgapi";
// Create client
const client = new RiotClient({apiKey: 'API KEY', region: 'EUW1'}); 
// Get account to get puuid
const account = await client.account.getAccountByNameAndTag("username", "tagLine");

const summoner = await client.lol.summoner.getByPuuid(account.puuid);
const matchIds = await client.lol.match.getMatchIds(account.puuid);
const match = await client.lol.match.getMatchById(matchIds[0]);
const league = await client.lol.league.getByPuuid(account.puuid);
const status = await client.lol.status.get();
const rotations = await client.lol.champion.rotations();
const mastery = await client.lol.champion.allChampionMastery(account.puuid);
const tournaments = await client.lol.clash.getTournaments();
```

## API Reference

### `client.account`
| Method | Description |
| --- | --- |
| `getAccountByNameAndTag(name, tag)` | Get an account by Riot ID (e.g. `"username"`, `"tagLine"`). Returns `Account` with `puuid`. |

### `client.lol.summoner`
| Method | Description |
| --- | --- |
| `getByPuuid(puuid)` | Get a summoner by puuid. Returns `Summoner`. |

### `client.lol.match`
| Method | Description |
| --- | --- |
| `getMatchIds(puuid, options?)` | Get a list of match ids. `options`: `{ count?, start?, queue? }` (defaults to `count: 20`). Returns `string[]`. |
| `getMatchById(matchId)` | Get full match data by match id. Returns `Match`. |

### `client.lol.league`
| Method | Description |
| --- | --- |
| `getByPuuid(puuid)` | Get all ranked entries for a player. Returns `LeagueEntry[]`. |
| `getAllEntries(queue, tier, division, page?)` | Get all entries for a queue/tier/division (paginated, `page` defaults to `1`). Returns `LeagueEntry[]`. |
| `getChallengerLeagueByQueue(queue)` | Get the Challenger league for a queue. Returns `LeagueList`. |
| `getGrandmasterLeagueByQueue(queue)` | Get the Grandmaster league for a queue. Returns `LeagueList`. |
| `getMasterLeagueByQueue(queue)` | Get the Master league for a queue. Returns `LeagueList`. |

`queue`: `"RANKED_SOLO_5X5" | "RANKED_FLEX_SR" | "RANKED_FLEX_TT"` · `tier` (for `getAllEntries`): `IRON`–`DIAMOND` · `division`: `"I" | "II" | "III" | "IV"`

### `client.lol.status`
| Method | Description |
| --- | --- |
| `get()` | Get LoL platform status (maintenances & incidents). Returns `PlatformData`. |

### `client.lol.champion`
| Method | Description |
| --- | --- |
| `rotations()` | Get free-to-play champion rotations (including the low-level rotation). Returns `ChampionInfo`. |
| `allChampionMastery(puuid)` | Get all champion mastery entries, highest points first. Returns `ChampionMastery[]`. |
| `championMastery(puuid, championId)` | Get a single champion's mastery for a player. Returns `ChampionMastery`. |
| `topChampionMastery(puuid, count?)` | Get the top mastery entries (`count` defaults to `3`). Returns `ChampionMastery[]`. |
| `totalChampionMastery(puuid)` | Get a player's total mastery score. Returns `number`. |

### `client.lol.clash`
| Method | Description |
| --- | --- |
| `getPlayers(puuid)` | Get a player's active Clash registrations. Returns `Player[]`. |
| `getTeam(teamId)` | Get a Clash team by id. Returns `Team`. |
| `getTournaments()` | Get all active and upcoming tournaments. Returns `Tournament[]`. |
| `getTournamentByTeamId(teamId)` | Get the tournament a team is registered for. Returns `Tournament`. |
| `getTournamentById(tournamentId)` | Get a tournament by id. Returns `Tournament`. |

## Features
- Summoner / Account / Match / League / Status / Champion / Clash APIs
- Rate limiting (20/1s, 100/2min)
- Fully typed
- Platform/regional routing

## License
MIT
