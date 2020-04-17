const Discord = require("discord.js");
const client = new Discord.Client();

const commandHandlers = require("./helpers/commandHandlers");
const config = require("./config/config");
const logger = require("./logs/log");

const server = require("./db/server");

client.on("ready", () => {
    logger.info("Connected as " + client.user.tag);
});

client.on("message", async (msg) => {
    // Prevent bot from responding to its own messages
    if (msg.author === client.user) return;

    await server.proceedMessage(msg);

    if (msg.content.toLowerCase().startsWith("/r6")) {
        await commandHandlers.processCommand(msg, msg.author.id);
    }
});

client.login(config.DISCORD_TOKEN);
