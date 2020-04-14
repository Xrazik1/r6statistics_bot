let localization = require("../locales/locale");

let helpersLocale = localization.get()["locale"];

let help = (platforms, languages) => {
    return helpersLocale.help(platforms, languages);
};
let badPlatform = (platform, platforms) => {
    return helpersLocale.badPlatform(platform, platforms);
};
let unknownCommand = (command) => {
    return helpersLocale.unknownCommand(command);
};
let badUsername = (username) => {
    return helpersLocale.badUsername(username);
};

let emptyUsername = () => {
    return helpersLocale.emptyUsername();
};

let emptyPlatform = () => {
    return helpersLocale.emptyPlatform();
};

let emptyCommand = () => {
    return helpersLocale.emptyCommand();
};

let stats = (statsData, username, lang) => {
    locale = localization.get(lang)["locale"];

    return [
        {
            embed: {
                color: 1935436,
                title: locale["general"],
                thumbnail: {
                    url: statsData["rankImage"],
                },
                author: {
                    name: username,
                    icon_url: statsData["rankImage"],
                },
                fields: [
                    {
                        name: locale["level"],
                        value: statsData["level"],
                        inline: true,
                    },
                    {
                        name: locale["timeInGame"],
                        value: `${statsData["playtime"]} часов`,
                        inline: true,
                    },
                    {
                        name: locale["headshotsPercent"],
                        value: `${statsData["headshotsPercent"]}%`,
                        inline: true,
                    },
                    {
                        name: locale["matchesToNextRank"],
                        value: statsData["nextRankMatchesNeeded"],
                        inline: true,
                    },
                    {
                        name: locale["currentRank"],
                        value: statsData["currentRank"],
                        inline: true,
                    },
                    {
                        name: locale["maxRank"],
                        value: statsData["maxRank"],
                        inline: true,
                    },
                    {
                        name: locale["currentMmr"],
                        value: statsData["currentMmr"],
                        inline: true,
                    },
                    {
                        name: locale["maxMmr"],
                        value: statsData["maxMmr"],
                        inline: true,
                    },
                    {
                        name: locale["kd"],
                        value: statsData["general"]["kd"],
                        inline: true,
                    },
                    {
                        name: locale["wl"],
                        value: statsData["general"]["wl"],
                        inline: true,
                    },
                    {
                        name: locale["killsPerMatch"],
                        value: statsData["general"]["kills_per_match"],
                        inline: true,
                    },
                    {
                        name: locale["matches"],
                        value: statsData["general"]["matches"],
                        inline: true,
                    },
                    {
                        name: locale["wins"],
                        value: statsData["general"]["wins"],
                        inline: true,
                    },
                    {
                        name: locale["losses"],
                        value: statsData["general"]["losses"],
                        inline: true,
                    },
                    {
                        name: locale["kills"],
                        value: statsData["general"]["kills"],
                        inline: true,
                    },
                    {
                        name: locale["deaths"],
                        value: statsData["general"]["deaths"],
                        inline: true,
                    },
                ],
            },
        },
        {
            embed: {
                color: 1127128,
                title: locale["ranked"],
                fields: [
                    {
                        name: locale["kd"],
                        value: statsData["ranked"]["kd"],
                        inline: true,
                    },
                    {
                        name: locale["wl"],
                        value: statsData["ranked"]["wl"],
                        inline: true,
                    },
                    {
                        name: locale["killsPerMatch"],
                        value: statsData["ranked"]["kills_per_match"],
                        inline: true,
                    },
                    {
                        name: locale["matches"],
                        value: statsData["ranked"]["matches"],
                        inline: true,
                    },
                    {
                        name: locale["wins"],
                        value: statsData["ranked"]["wins"],
                        inline: true,
                    },
                    {
                        name: locale["losses"],
                        value: statsData["ranked"]["losses"],
                        inline: true,
                    },
                    {
                        name: locale["kills"],
                        value: statsData["ranked"]["kills"],
                        inline: true,
                    },
                    {
                        name: locale["deaths"],
                        value: statsData["ranked"]["deaths"],
                        inline: true,
                    },
                    {
                        name: "-----------",
                        value: "-----------",
                        inline: true,
                    },
                ],
            },
        },
        {
            embed: {
                color: 14177041,
                title: locale["casual"],
                fields: [
                    {
                        name: locale["kd"],
                        value: statsData["casual"]["kd"],
                        inline: true,
                    },
                    {
                        name: locale["wl"],
                        value: statsData["casual"]["wl"],
                        inline: true,
                    },
                    {
                        name: locale["killsPerMatch"],
                        value: statsData["casual"]["kills_per_match"],
                        inline: true,
                    },
                    {
                        name: locale["matches"],
                        value: statsData["casual"]["matches"],
                        inline: true,
                    },
                    {
                        name: locale["wins"],
                        value: statsData["casual"]["wins"],
                        inline: true,
                    },
                    {
                        name: locale["losses"],
                        value: statsData["casual"]["losses"],
                        inline: true,
                    },
                    {
                        name: locale["kills"],
                        value: statsData["casual"]["kills"],
                        inline: true,
                    },
                    {
                        name: locale["deaths"],
                        value: statsData["casual"]["deaths"],
                        inline: true,
                    },
                    {
                        name: "-----------",
                        value: "-----------",
                        inline: true,
                    },
                ],
            },
        },
    ];
};

module.exports = {
    help: help,
    badPlatform: badPlatform,
    unknownCommand: unknownCommand,
    badUsername: badUsername,
    emptyCommand: emptyCommand,
    emptyPlatform: emptyPlatform,
    emptyUsername: emptyUsername,
    stats: stats,
};
