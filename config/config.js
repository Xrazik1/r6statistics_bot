require("dotenv").config({ path: "config.env" });

const POSSIBLE_PLATFORMS = ["uplay", "xbl", "psn"];

const UPLAY_LOGIN = process.env.UPLAY_LOGIN;
const UPLAY_PASSWORD = process.env.UPLAY_PASSWORD;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const DB_URI = 'mongodb://127.0.0.1/discordBotDB';

module.exports = {
  POSSIBLE_PLATFORMS: POSSIBLE_PLATFORMS,
  UPLAY_LOGIN: UPLAY_LOGIN,
  UPLAY_PASSWORD: UPLAY_PASSWORD,
  DISCORD_TOKEN: DISCORD_TOKEN,
  DB_URI: DB_URI
};

