const locale = {
    help: (platforms, languages) => `
  Send \`/r6 platform username\` to see player stats
  \nSend \`/r6 platform username lang\` to see stats in your language\ 
  \nPossible platforms \`${platforms}\` 
  \nPossible languages \`${languages}\``,

    badPlatform: (platform, platforms) => `Platform '${platform}' does't exist, possible platforms \`${platforms}\``,
    unknownCommand: (command) => `I don't understand that command '${command}', help \`/r6 help\``,
    badUsername: (username) => `Username '${username}' doesn't exist`,
    emptyPlatform: () => "Player's platform is required",
    emptyUsername: () => "Player's username is required",
    emptyCommand: () => "You didn't pass the command, help `/r6 help`",

    header: "The language and the username were linked to your Discord account, " +
        "just send `/r6 stats` next time to see your statistics",

    general: "General",
    ranked: "Ranked",
    casual: "Casual",
    level: "Level",
    timeInGame: "Time in game",
    headshotsPercent: "Headshot percentage",
    matchesToNextRank: "Matches to next rank",
    currentRank: "Current rank",
    maxRank: "Max rank",
    currentMmr: "Current mmr",
    maxMmr: "Max mmr",
    kd: "K/D",
    wl: "W/L",
    killsPerMatch: "Kills per match",
    matches: "Matches",
    wins: "Wins",
    losses: "Losses",
    kills: "Kills",
    deaths: "Deaths"
};

module.exports.locale = locale;