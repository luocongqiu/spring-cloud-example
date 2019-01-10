const argv = require('yargs').argv;

module.exports = {
    dllPath: 'dll',
    dist: argv.p ? 'dist' : '.tmp',
    VERSION: JSON.stringify(require("../package.json").version),
    DEBUG_INFO_ENABLED: !argv.p
};