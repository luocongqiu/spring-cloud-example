const path = require('path');
const fs = require('fs');
const process = require('child_process');

if (!fs.existsSync(path.resolve('node_modules'))) {
    install();
    return;
}


if (!fs.existsSync(path.resolve('dist'))) {
    return;
}

let distTime = fs.statSync(path.resolve('dist')).mtime.getTime();
let packageTime = fs.statSync(path.resolve('package.json')).mtime.getTime();

if (packageTime > distTime) {
    install();
}

function install() {
    process.execSync('yarn install', { stdio: [0, 1, 2], cwd: path.resolve(__dirname, '../') });
}
