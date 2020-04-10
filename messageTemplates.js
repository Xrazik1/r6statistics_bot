let help           = (platforms)           => { return `Введите \`/r6 платформа имя\` для получения статистики \nСуществующие платформы \`${platforms}\`` };
let badPlatform    = (platform, platforms) => { return `Такой платформы '${platform}' не существует, существующие платформы \`${platforms}\`` };
let unknownCommand = (command)             => { return `Я не знаю такую команду '${command}'` };
let badUsername    = (username)            => { return `Такого пользователя '${username}' не существует` };

let stats = (statsData, username) => {
    return {
        embed:
        {
            color: 1935436,
            thumbnail:
            {
                url: statsData['rankImage']
            },
            author:
            {
                name: username,
                icon_url: statsData['rankImage']
            },
            fields:
            [
                {
                    name: "Уровень",
                    value: statsData['level'],
                    inline: true
                },
                {
                    name: "Время в игре",
                    value: `${statsData['playtime']} часов`,
                    inline: true
                },
                {
                    name: "Процент хедшотов",
                    value: statsData['headshotsPercent'],
                    inline: true
                },
                {
                    name: "Матчей до след. ранга",
                    value: statsData['nextRankMatchesNeeded'],
                    inline: true
                },
                {
                    name: "Текущий ранг",
                    value: statsData['currentRank'],
                    inline: true
                },
                {
                    name: "Макс. ранг",
                    value: statsData['maxRank'],
                    inline: true
                },
                {
                    name: "Текущий ммр",
                    value: statsData['currentMmr'],
                    inline: true
                },
                {
                    name: "# Ранговая статистика",
                    value: "-----------------"
                },
                {
                    name: "К/D",
                    value: statsData['ranked']['kd'],
                },
                {
                    name: "W/L",
                    value: statsData['ranked']['wl'],
                    inline: true
                },
                {
                    name: "Ср. убийств в матч",
                    value: statsData['ranked']['kills_per_match'],
                    inline: true
                },
                {
                    name: "Матчи",
                    value: statsData['ranked']['matches'],
                    inline: true
                },
                {
                    name: "Победы",
                    value: statsData['ranked']['wins'],
                    inline: true
                },
                {
                    name: "Поражения",
                    value: statsData['ranked']['losses'],
                    inline: true
                },
                {
                    name: "Убийства",
                    value: statsData['ranked']['kills'],
                    inline: true
                },
                {
                    name: "Смерти",
                    value: statsData['ranked']['deaths'],
                    inline: true
                },
                {
                    name: "# Общая статистика",
                    value: "-----------------"
                },
                {
                    name: "К/D",
                    value: statsData['general']['kd'],
                },
                {
                    name: "W/L",
                    value: statsData['general']['wl'],
                    inline: true
                },
                {
                    name: "Ср. убийств в матч",
                    value: statsData['general']['kills_per_match'],
                    inline: true
                },
                {
                    name: "Матчи",
                    value: statsData['general']['matches'],
                    inline: true
                },
                {
                    name: "Победы",
                    value: statsData['general']['wins'],
                    inline: true
                },
                {
                    name: "Поражения",
                    value: statsData['general']['losses'],
                    inline: true
                },
                {
                    name: "Убийства",
                    value: statsData['general']['kills'],
                    inline: true
                },
                {
                    name: "Смерти",
                    value: statsData['general']['deaths'],
                    inline: true
                }
            ]
        }
    }
};

module.exports = {
    help: help,
    badPlatform: badPlatform,
    unknownCommand: unknownCommand,
    badUsername: badUsername,
    stats: stats
};