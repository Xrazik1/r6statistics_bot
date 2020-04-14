const locale = {
  name: 'ru',

  help: (platforms, languages) => `
  Введите \`/r6 платформа имя\` для получения статистики
  \nВведите \`/r6 платформа имя язык\` для вывода статистики в нужном вам языке\ 
  \nСуществующие платформы \`${platforms}\` 
  \nСуществующие языки \`${languages}\``,

  badPlatform: (platform, platforms) => `Такой платформы '${platform}' не существует, существующие платформы \`${platforms}\``,
  unknownCommand: (command) => `Я не знаю такую команду '${command}', помощь \`/r6 help\``,
  badUsername: (username) => `Такого пользователя '${username}' не существует`,

  general: "Общая статистика",
  ranked: "Рейтинговая статистика",
  casual: "Статистика обычной игры",
  level: "Уровень",
  timeInGame: "Время в игре",
  headshotsPercent: "Процент хедшотов",
  matchesToNextRank: "Матчей до след. ранга",
  currentRank: "Текущий ранг",
  maxRank: "Макс. ранг",
  currentMmr: "Текущий ммр",
  maxMmr: "Макс. ммр",
  kd: "K/D",
  wl: "W/L",
  killsPerMatch: "Ср. убийств в матч",
  matches: "Матчи",
  wins: "Победы",
  losses: "Поражения",
  kills: "Убийства",
  deaths: "Смерти"
};

module.exports.locale = locale;