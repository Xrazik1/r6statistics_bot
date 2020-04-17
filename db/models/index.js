let path = require("path").join(__dirname);

models = {};

require("fs").readdirSync(path).forEach((file) => {
    if (file === __filename.slice(__dirname.length + 1)) return; // Skip current file
    models[file.substring(0, file.length - 3)] = require("./" + file);
});

module.exports = models;