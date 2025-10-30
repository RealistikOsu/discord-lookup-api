export const USER_FLAGS = [
  {
    flag: "DISCORD_EMPLOYEE",
    bitwise: 1 << 0,
  },
  {
    flag: "PARTNERED_SERVER_OWNER",
    bitwise: 1 << 1,
  },
  {
    flag: "HYPESQUAD_EVENTS",
    bitwise: 1 << 2,
  },
  {
    flag: "BUGHUNTER_LEVEL_1",
    bitwise: 1 << 3,
  },
  {
    flag: "HOUSE_BRAVERY",
    bitwise: 1 << 6,
  },
  {
    flag: "HOUSE_BRILLIANCE",
    bitwise: 1 << 7,
  },
  {
    flag: "HOUSE_BALANCE",
    bitwise: 1 << 8,
  },
  {
    flag: "EARLY_SUPPORTER",
    bitwise: 1 << 9,
  },
  {
    flag: "TEAM_USER",
    bitwise: 1 << 10,
  },
  {
    flag: "BUGHUNTER_LEVEL_2",
    bitwise: 1 << 14,
  },
  {
    flag: "VERIFIED_BOT",
    bitwise: 1 << 16,
  },
  {
    flag: "EARLY_VERIFIED_BOT_DEVELOPER",
    bitwise: 1 << 17,
  },
  {
    flag: "DISCORD_CERTIFIED_MODERATOR",
    bitwise: 1 << 18,
  },
  {
    flag: "BOT_HTTP_INTERACTIONS",
    bitwise: 1 << 19,
  },
  {
    flag: "SPAMMER",
    bitwise: 1 << 20,
  },
  {
    flag: "ACTIVE_DEVELOPER",
    bitwise: 1 << 22,
  },
  {
    flag: "QUARANTINED",
    bitwise: 17592186044416,
  },
];

// 2 hours
export const USER_CACHE_TIME = 60 * 60 * 2;