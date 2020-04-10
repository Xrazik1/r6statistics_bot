require('dotenv').config({ path: 'config.env' });

const Discord    = require('discord.js');
const client     = new Discord.Client();
const R6API      = require('r6api.js');
const r6api      = new R6API(process.env.UPLAY_LOGIN, process.env.UPLAY_PASSWORD);
const msgTemplates = require('./messageTemplates');

const botSecretToken = process.env.DISCORD_TOKEN;
const possiblePlatforms = ['uplay', 'xbl', 'psn'];

let getStats = async (username, platform) => {
    const id            = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats_data    = await r6api.getStats(platform, id).then(el => el[0].pvp);
    const level_data    = await r6api.getLevel(platform, id).then(el => el[0]);
    const playtime_data = await r6api.getPlaytime(platform, id).then(el => el[0]);

    let rank_data       = await r6api.getRank(platform, id).then(el => el[0]);
    rank_data           = rank_data['seasons'][Object.keys(rank_data['seasons'])[0]]['regions']['emea'];

    generalStats = {
        level: level_data['level'],
        playtime: ((playtime_data['general'] / 60) / 60).toFixed(2),
        headshotsPercent: (stats_data['general']['kills'] / stats_data['general']['headshots']).toFixed(2),
        casual: {
            kd: (stats_data['queue']['casual']['kills'] / stats_data['queue']['casual']['deaths']).toFixed(2),
            wl: (stats_data['queue']['casual']['wins'] / stats_data['queue']['casual']['losses']).toFixed(2),
            kills_per_match: (stats_data['queue']['casual']['kills'] / stats_data['queue']['casual']['matches']).toFixed(2),
            matches: stats_data['queue']['casual']['matches'],
            wins: stats_data['queue']['casual']['wins'],
            losses: stats_data['queue']['casual']['losses'],
            kills: stats_data['queue']['casual']['kills'],
            deaths: stats_data['queue']['casual']['deaths'],
        },
        ranked: {
            kd: (stats_data['queue']['ranked']['kills'] / stats_data['queue']['ranked']['deaths']).toFixed(2),
            wl: (stats_data['queue']['ranked']['wins'] / stats_data['queue']['ranked']['losses']).toFixed(2),
            kills_per_match: (stats_data['queue']['ranked']['kills'] / stats_data['queue']['ranked']['matches']).toFixed(2),
            matches: stats_data['queue']['ranked']['matches'],
            wins: stats_data['queue']['ranked']['wins'],
            losses: stats_data['queue']['ranked']['losses'],
            kills: stats_data['queue']['ranked']['kills'],
            deaths: stats_data['queue']['ranked']['deaths'],
        },
        general: {
            kd: (stats_data['general']['kills'] / stats_data['general']['deaths']).toFixed(2),
            wl: (stats_data['general']['wins'] / stats_data['general']['losses']).toFixed(2),
            kills_per_match: (stats_data['general']['kills'] / stats_data['general']['matches']).toFixed(2),
            matches: stats_data['general']['matches'],
            wins: stats_data['general']['wins'],
            losses: stats_data['general']['losses'],
            kills: stats_data['general']['kills'],
            deaths: stats_data['general']['deaths'],
        },
        nextRankMatchesNeeded: rank_data['nextRankMatchesNeeded'],
        rankImage: rank_data['current']['image'],
        currentRank: rank_data['current']['name'],
        maxRank: rank_data['max']['name'],
        currentMmr: rank_data['current']['mmr'],
        maxMmr: rank_data['max']['mmr']
    };

    return new Promise((resolve, reject) => {
        if(generalStats){
            resolve(generalStats)
        }else{
            reject(new Error('Username is undefined'));
        }
    });
};

let processCommand = (msg) => {
    let fullCommand    = msg.content.substr(4); // Remove the leading exclamation mark
    let splitCommand   = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
    let args           = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + args);

    switch(primaryCommand) {
        case 'help':
            helpCommand(msg);
            break;
        case 'stats':
            statsCommand(args, msg);
            break;
        default:
            unknownCommand(msg, fullCommand);
    }
};

let helpCommand = (msg) => {
    let platformsString = possiblePlatforms.join(' ');

    msg.channel.send(msgTemplates.help(platformsString));
};

let statsCommand = (args, msg) => {
    if (!possiblePlatforms.includes(args[0])) {
        badPlatformCommand(msg, args[0]);
        return;
    }

    let platform = args[0];
    let username = args[1];

    getStats(username, platform).then((stats) => {
        msg.channel.send(msgTemplates.stats(stats, username));
    }, () => {
        badUsernameCommand(msg, username);
    });
};

let unknownCommand = (msg, command) => {
    msg.channel.send(msgTemplates.unknownCommand(command))
};

let badPlatformCommand = (msg, platform) => {
    let platformsString = possiblePlatforms.join(' ');

    msg.channel.send(msgTemplates.badPlatform(platform, platformsString));
};

let badUsernameCommand = (msg, username) => {
    msg.channel.send(msgTemplates.badUsername(username));
};

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
});

client.on('message', (msg) => {
    // Prevent bot from responding to its own messages
    if (msg.author === client.user) return;

    if (msg.content.startsWith("/r6")) {
        processCommand(msg)
    }
});

client.login(botSecretToken);
