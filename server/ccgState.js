const interCom = require('./interCom')
const processWindows = require("node-process-windows");
const get = require("./getConfig");
const {
    networkInterfaces
} = require('os');
const child = require('child_process').execFile;
const exec = require('child_process').exec;
let CCstate = false;

'use strict';

//tjek Ip

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

interCom.on('ccStatus', (message) => {
    switch (message) {
        case 'true':
            CCstate = true;
            break;
        case 'false':
            CCstate = false;
    }
})


const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32':
            cmd = `tasklist`;
            break;
        case 'darwin':
            cmd = `ps -ax | grep ${query}`;
            break;
        case 'linux':
            cmd = `ps -A`;
            break;
        default:
            break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

module.exports.state = state = () => {

    let clStatus;
    __logger.info("tjekker CCG" + CCstate)
    isRunning('CasparLauncher.exe', (status) => {

        clStatus = status;
        __logger.info('Cl running ' + status); // true|false  
    })
    setTimeout(() => {
        if (!CCstate) {


            if (get.config.CasparCG.ip === "127.0.0.1" || get.config.CasparCG.ip === results) {
                __logger.info('CCG Local' + clStatus);
                if (!clStatus) {
                    interCom.emit('ccStatus', 'starting')
                    var executablePath = "E:\\Installation filer\\CasparLauncher\\CasparLauncher.exe";

                    child(executablePath, function (err, data) {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        __logger.info(data.toString());
                    });

                } else {
                    interCom.emit('ccStatus', 'running')
                }

            } else {
                __logger.info('remote caspar')

            }

        } else {
            interCom.emit('ccStatus', 'restart')
        }
    }, 1000);


};
