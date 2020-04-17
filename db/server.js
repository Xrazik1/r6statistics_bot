const connection = require("./connection");
const models = require("./models/index");

const Server = models["server"];
const User = models["user"];

let proceedMessage = async (msg) => {
    if(msg.author.bot) { return }

    let server = await Server.findOne({ discordId: msg.guild.id });
    let user = await User.findOne({ discordId: msg.author.id });

    if (!server) {
        server = await createServer({
            discordId: msg.guild.id
        });
    }

    if (!user) {
        user = await createUser({
            discordId: msg.author.id,
            username: msg.author.username,
            server: server._id
        });

        server.users.push(user);
        server.save();
    }
};

let saveMessageParameters = async (id, username, lang, platform) => {
    let user = await User.findOne({discordId: id});

    user.r6Username = username;
    user.lang = lang;
    user.platform = platform;


    await user.save();
};

let getUserParameters = async (id) => {
    let user = await User.findOne({discordId: id});

    return {
        get username() { return user.r6Username },
        get lang() { return user.lang },
        get platform() { return user.platform }
    };
};

let createServer = async (params) => {
    let server = new Server(params);

    return server.save().then((() => {
        return new Promise((resolve, reject) => {
            if (server) {
                resolve(server);
            } else {
                reject(new Error('Server was not created'));
            }
        });
    }));
};

let createUser = async (params) => {
    let user = new User(params);

    return user.save().then((() => {
        return new Promise((resolve, reject) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('User was not created'));
            }
        });
    }));
};

module.exports = {
    proceedMessage: proceedMessage,
    saveMessageParameters: saveMessageParameters,
    getUserParameters: getUserParameters
};