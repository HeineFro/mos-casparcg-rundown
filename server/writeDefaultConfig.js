const settings = require('electron-app-settings');
const log = require('./log');


module.exports.writeConfig = writeDefaultConfig = () => {
settings.set('setup', {
    intervalAktive: 10000,
    saveaktive: "./public/active"
})

settings.set('server', {
    ip: "127.0.0.1",
    port: 9000
})

settings.set('webSockets', {
    ip: "127.0.0.1",
    wsPort1: 1000,
    wsPort2: 8020
})

settings.set('CasparCG', {
    ip: "127.0.0.1",
    MainCh: 1,
    MainLayer: 20,
    PreviewCh: 3,
    pathTemplates: "TV2default"
})

settings.set('api01', {
    ip: "http://0.0.0.0",
    port: 8081,
    active: "http://127.0.0.1:8081/mosactive",
    pathrundowns: "http://127.0.0.1:8081/rundowns/"
})

settings.set('api02', {
    ip: "http://0.0.0.0",
    port: 8081,
    active: "http://127.0.0.1:8081/mosactive",
    pathrundowns: "http://127.0.0.1:8081/rundowns/"
})

__logger.info('default config saved')

};
