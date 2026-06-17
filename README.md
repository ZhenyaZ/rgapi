# RGAPI
TypeScript SDK for the Riot Games API. Wraps platform and regional HTTP endpoints into a clean, typed interface

## Note

This is my first published npm package - built to learn and to have something reusable for my own projects. If you spot something off, have feedback, or just want to suggest a better approach, feel free to open an issue or reach out. Any input is appreciated.
## Roadmap
- [X] AccountAPI
- [X] SummonerAPI (get summoner by Puuid)
- [X] MatchAPI (get match ids, get match by matchId)
- [X] Rate limiting
- [ ] Ranked stats (League of Legends)
- [ ] Cover all Riot API
- [ ] Valorant support

## Installation
```bash 
npm i @zhenyaz/rgapi
```

## Quick Start
```ts
import { RiotClient } from "rgapi";
// Create client
const client = new RiotClient({apiKey: 'API KEY', region: 'EUW1'}); 
// Get account to get puuid
const account = await client.account.getAccountByNameAndTag("username", "tagLine");

const summoner = await client.lol.summoner.getByPuuid(account.puuid);
const matchIds = await client.lol.match.getMatchIds(account.puuid);
const match = await client.lol.match.getMatchById(matchIds[0]);

```

## Features
- Summoner / Account / Match API
- Rate limiting (20/1s, 100/2min)
- Fully typed
- Platform/regional routing

## License
MIT
