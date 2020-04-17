let path = require("path").join(__dirname);

let locales = {};
const defaultLocale = 'en';

// Put all locales into locales hash
require("fs").readdirSync(path).forEach((file) => {
    if (file === __filename.slice(__dirname.length + 1)) return; // Skip current file
    locales[file.substring(0, file.length - 3)] = require("./" + file);
});

let get = (locale = defaultLocale) => {
    if (!Object.keys(locales).includes(locale)) locale = defaultLocale;

    return locales[locale];
};

module.exports = {
    get: get,
    defaultLocale: defaultLocale,
    locales: Object.keys(locales)
};