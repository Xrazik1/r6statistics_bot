const msgTemplates = require("../helpers/messageTemplates");
const logger = require("../logs/log");
const r6stats = require("../modules/stats");
const config = require("../config/config");
const localization = require("../locales/locale");
const server = require("../db/server");

let processCommand = async (msg) => {
    let fullCommand = msg.content.substr(4); // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0].toLowerCase(); // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    // Do not lowercase username
    args.forEach((arg, i) => {
        if(arg && i === 1) { return }
        args[i] = arg.toLowerCase();
    });

    logger.info("Command received: " + primaryCommand);
    logger.info("Arguments: " + args);

    if(!primaryCommand) {
        emptyCommand(msg);
        return;
    }

    switch (primaryCommand) {
        case "help":
            helpCommand(msg);
            break;
        case "stats":
            await statsCommand(args, msg);
            break;
        default:
            unknownCommand(msg, fullCommand);
    }
};

let helpCommand = (msg) => {
    let platformsString = config.POSSIBLE_PLATFORMS.join(" ");
    let languagesString = localization.locales.join(" ");

    msg.channel.send(msgTemplates.help(platformsString, languagesString));
};

let statsCommand = async (args, msg) => {
    let userParameters = await server.getUserParameters(msg.author.id);

    let username = userParameters.username;
    let platform = userParameters.platform;
    let lang = userParameters.lang;

    platform = args[0] || platform;
    username = args[1] || username;
    lang     = args[2] || lang || localization.defaultLocale;

    if(!platform) {
        emptyPlatform(msg);
        return;
    }

    if(!username) {
        emptyUsername(msg);
        return;
    }

    if (!config.POSSIBLE_PLATFORMS.includes(platform)) {
        badPlatformCommand(msg, platform);
        return;
    }

    r6stats.get(username, platform).then(
        async (stats) => {
            let embeds = msgTemplates.stats(stats, username, lang);

            await server.saveMessageParameters(msg.author.id, username, lang, platform);

            embeds.forEach((embed) => {
                msg.channel.send(embed);
            });
        },
        () => {
            badUsernameCommand(msg, username);
        }
    );
};

let unknownCommand = (msg, command) => {
    logger.error(`Unknown command '${command}'`);
    msg.channel.send(msgTemplates.unknownCommand(command));
};

let badPlatformCommand = (msg, platform) => {
    let platformsString = config.POSSIBLE_PLATFORMS.join(" ");

    logger.error(`Platform '${platform}' is undefined`);
    msg.channel.send(msgTemplates.badPlatform(platform, platformsString));
};

let badUsernameCommand = (msg, username) => {
    logger.error(`Username '${username}' is undefined`);
    msg.channel.send(msgTemplates.badUsername(username));
};

let emptyCommand = (msg) => {
    logger.error("Command wasn't passed");
    msg.channel.send(msgTemplates.emptyCommand());
};

let emptyPlatform = (msg) => {
    logger.error("Platform wasn't passed");
    msg.channel.send(msgTemplates.emptyPlatform());
};

let emptyUsername = (msg) => {
    logger.error("Username wasn't passed");
    msg.channel.send(msgTemplates.emptyUsername());
};

module.exports = {
    processCommand: processCommand
};