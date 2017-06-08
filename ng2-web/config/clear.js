const del = require('del');
const path = require('path');
const argv = require('yargs').argv;

if(argv.p) {
    del.sync([path.resolve('dist/**')]);
    del.sync([path.resolve('dll/**')]);
} else {
    del.sync([path.resolve('.tmp/**')]);
}

