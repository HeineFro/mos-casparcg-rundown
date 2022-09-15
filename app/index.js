//import from electron
const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const ipc = require('electron').ipcMain;
//import config
const get = require("../server/getConfig");

//starts websocket server
const ws02 = require('../server/ws02');
const startWS02 = ws02.serverWS02
//starts websocket client for electron main
const wsExtern01 = require('../server/ws_client02') // tager  ws server & port som arg. wsClient.wsConnect('ws://127.0.0.1:8089/wsIntern');
wsExtern01.wsConnect();
//event emitter
const interCom = require('../server/interCom')
//logs
const log = require('../server/log');
//checking state of CasparCG and Api connections
const tjekApi = require('../server/testApi');
const ccgState = require('../server/ccgState');
//npm for opening webbrowser
const open = require('open');
//get path of app
const rootPath = require('electron-root-path').rootPath;
//start CasparCG connection
const ccg = require('../server/casparcg01');
const fs = require('fs-extra')
const server = require('../server/server');
//set up window of app
let window;

app.on('ready', () => {

    window = new BrowserWindow({
        width: 800,
        height: 500,
        icon: __dirname + './icon.png',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    });

    window.loadFile('./app/index.html');
})
//get appversion and send it to renderer
let version = 'Ver: ' + app.getVersion();
setTimeout(() => {
    //console.log(version)
    window.webContents.send('version', version)
}, 5000);

__logger.info("App startet")

async function clearCache(dirName) {
    try {
        await fs.emptyDir('./' + dirName)
        console.log(dirName + ' deleted!')
    } catch (err) {
        console.error(err)
    }
}


let globalStart = false
//actions from app render
ipc.on('fromRender', (event, args) => {
    switch (args) {
        case 'restartApp':
            app.relaunch();
            app.quit();
            break;
        case 'quit':
            app.quit();
            break;
        case 'ccgStart':
            ccgState.state();
            break;
        case 'cache':
            clearCache('rundowns');
            clearCache('active');
            break;
        case 'reStart':
            interCom.emit('comTilCaspar', 'RESTART');
            break;
        case 'start':

            open(`http://${get.config.server.ip}:${get.config.server.port}/Show`);

    }

});


interCom.on('ccStatus', (message) => {
    wsExtern01.wsSend({
        "ccStatus": message
    });

})
