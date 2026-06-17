export const PLATFORMS = {
  BR1:  "https://br1.api.riotgames.com",
  EUN1: "https://eun1.api.riotgames.com",
  EUW1: "https://euw1.api.riotgames.com",
  JP1:  "https://jp1.api.riotgames.com",
  KR:   "https://kr.api.riotgames.com",
  LA1:  "https://la1.api.riotgames.com",
  LA2:  "https://la2.api.riotgames.com",
  NA1:  "https://na1.api.riotgames.com",
  OC1:  "https://oc1.api.riotgames.com",
  RU:   "https://ru.api.riotgames.com",
  TR1:  "https://tr1.api.riotgames.com",
} as const;

export const REGIONS = {
  AMERICAS: "https://americas.api.riotgames.com",
  ASIA:     "https://asia.api.riotgames.com",
  EUROPE:   "https://europe.api.riotgames.com",
  SEA:      "https://sea.api.riotgames.com",
} as const;

export type Platform = keyof typeof PLATFORMS;
export type Region   = keyof typeof REGIONS;
export const PLATFORM_TO_REGION: Record<Platform, Region> = {
  BR1: "AMERICAS", LA1: "AMERICAS", LA2: "AMERICAS", NA1: "AMERICAS",
  KR: "ASIA", JP1: "ASIA",
  OC1: "SEA",
  EUW1: "EUROPE", EUN1: "EUROPE", TR1: "EUROPE", RU: "EUROPE",
};