const R6API = require("r6api.js");
const config = require("../config/config");
const r6api = new R6API(config.UPLAY_LOGIN, config.UPLAY_PASSWORD);
const counters = require("../helpers/counters");

let get = async (username, platform) => {
    const id = await r6api.getId(platform, username).then((el) => el[0].userId);
    const stats_data = await r6api
        .getStats(platform, id)
        .then((el) => el[0].pvp);
    const level_data = await r6api.getLevel(platform, id).then((el) => el[0]);
    const playtime_data = await r6api
        .getPlaytime(platform, id)
        .then((el) => el[0]);

    let rank_data = await r6api.getRank(platform, id).then((el) => el[0]);
    rank_data =
        rank_data["seasons"][Object.keys(rank_data["seasons"])[0]]["regions"][
            "emea"
            ];

    generalStats = {
        level: level_data["level"],
        playtime: counters.playtime(playtime_data["general"]),
        headshotsPercent: counters.headshotsPercent(
            stats_data["general"]["kills"],
            stats_data["general"]["headshots"]
        ),
        casual: {
            kd: counters.kd(
                stats_data["queue"]["casual"]["kills"],
                stats_data["queue"]["casual"]["deaths"]
            ),
            wl: counters.wl(
                stats_data["queue"]["casual"]["wins"],
                stats_data["queue"]["casual"]["losses"]
            ),
            kills_per_match: counters.killsPerMatch(
                stats_data["queue"]["casual"]["kills"],
                stats_data["queue"]["casual"]["matches"]
            ),
            matches: stats_data["queue"]["casual"]["matches"],
            wins: stats_data["queue"]["casual"]["wins"],
            losses: stats_data["queue"]["casual"]["losses"],
            kills: stats_data["queue"]["casual"]["kills"],
            deaths: stats_data["queue"]["casual"]["deaths"],
        },
        ranked: {
            kd: counters.kd(
                stats_data["queue"]["ranked"]["kills"],
                stats_data["queue"]["ranked"]["deaths"]
            ),
            wl: counters.wl(
                stats_data["queue"]["ranked"]["wins"],
                stats_data["queue"]["ranked"]["losses"]
            ),
            kills_per_match: counters.killsPerMatch(
                stats_data["queue"]["ranked"]["kills"],
                stats_data["queue"]["ranked"]["matches"]
            ),
            matches: stats_data["queue"]["ranked"]["matches"],
            wins: stats_data["queue"]["ranked"]["wins"],
            losses: stats_data["queue"]["ranked"]["losses"],
            kills: stats_data["queue"]["ranked"]["kills"],
            deaths: stats_data["queue"]["ranked"]["deaths"],
        },
        general: {
            kd: counters.kd(
                stats_data["general"]["kills"],
                stats_data["general"]["deaths"]
            ),
            wl: counters.wl(
                stats_data["general"]["wins"],
                stats_data["general"]["losses"]
            ),
            kills_per_match: counters.killsPerMatch(
                stats_data["general"]["kills"],
                stats_data["general"]["matches"]
            ),
            matches: stats_data["general"]["matches"],
            wins: stats_data["general"]["wins"],
            losses: stats_data["general"]["losses"],
            kills: stats_data["general"]["kills"],
            deaths: stats_data["general"]["deaths"],
        },
        nextRankMatchesNeeded: rank_data["nextRankMatchesNeeded"],
        rankImage: rank_data["current"]["image"],
        currentRank: rank_data["current"]["name"],
        maxRank: rank_data["max"]["name"],
        currentMmr: rank_data["current"]["mmr"],
        maxMmr: rank_data["max"]["mmr"],
    };

    return new Promise((resolve, reject) => {
        if (generalStats) {
            resolve(generalStats);
        } else {
            reject(new Error('Username is undefined'));
        }
    });
};

module.exports.get = get;