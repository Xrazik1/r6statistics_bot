const Discord = require("discord.js");
const client = new Discord.Client();
const commandHandlers = require("./helpers/commandHandlers");
const config = require("./config/config");
const logger = require("./logs/log");

client.on("ready", () => {
    logger.info("Connected as " + client.user.tag);
});

client.on("message", (msg) => {
    // Prevent bot from responding to its own messages
    if (msg.author === client.user) return;

    if (msg.content.startsWith("/r6")) {
        commandHandlers.processCommand(msg);
    }
});

client.login(config.DISCORD_TOKEN);
