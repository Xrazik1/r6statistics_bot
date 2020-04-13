const msgTemplates = require("../helpers/messageTemplates");
const logger = require("../logs/log");
const r6stats = require("../modules/stats");
const config = require("../config/config");

let processCommand = (msg) => {
    let fullCommand = msg.content.substr(4); // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let args = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    logger.info("Command received: " + primaryCommand);
    logger.info("Arguments: " + args);

    switch (primaryCommand) {
        case "help":
            helpCommand(msg);
            break;
        case "stats":
            statsCommand(args, msg);
            break;
        default:
            unknownCommand(msg, fullCommand);
    }
};

let helpCommand = (msg) => {
    let platformsString = config.POSSIBLE_PLATFORMS.join(" ");

    msg.channel.send(msgTemplates.help(platformsString));
};

let statsCommand = (args, msg) => {
    if (!config.POSSIBLE_PLATFORMS.includes(args[0])) {
        badPlatformCommand(msg, args[0]);
        return;
    }

    let platform = args[0];
    let username = args[1];

    r6stats.get(username, platform).then(
        (stats) => {
            let embeds = msgTemplates.stats(stats, username);

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

module.exports = {
    processCommand: processCommand
};