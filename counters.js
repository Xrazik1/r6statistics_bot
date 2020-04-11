let wl = (wins, losses) => {
   if (losses === 0) return wins;
   return (wins / losses).toFixed(2);
};

let kd = (kills, deaths) => {
    if (deaths === 0) return kills;
    return (kills / deaths).toFixed(2);
};

let playtime = (seconds) => {
    return ((seconds / 60) / 60).toFixed(2)
};

let headshotsPercent = (kills, headshots) => {
    if (kills === 0) return kills;
    return ((headshots / kills) * 100).toFixed(2);
};

let killsPerMatch = (kills, matches) => {
    if (matches === 0) return matches;
    return (kills / matches).toFixed(2);
};

module.exports = {
    wl: wl,
    kd: kd,
    playtime: playtime,
    headshotsPercent: headshotsPercent,
    killsPerMatch: killsPerMatch
};