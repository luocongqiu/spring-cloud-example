const del = require('del');
const path = require('path');
const argv = require('yargs').argv;

del.sync([path.resolve('.tmp/**')]);
del.sync([path.resolve('.awcache/**')]);

if (argv.p) {
    del.sync([path.resolve('dist/**')]);
    del.sync([path.resolve('aot/**')]);
}
