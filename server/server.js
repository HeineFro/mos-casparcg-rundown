const get = require("./getConfig");
const express = require('express');
const ws01 = require('./ws01');
//const ws02 = require('./ws02');
const open = require('open');
const wsIntern01 = require('./ws_client01'); // tager  ws server & port som arg. wsClient.wsConnect('ws://127.0.0.1:8089/wsIntern');
//const wsExtern01 = require('./ws_client02') // tager  ws server & port som arg. wsClient.wsConnect('ws://127.0.0.1:8089/wsIntern');
const rundownNamesTogui = require('./rundownToGui');
const rundownTogui = require('./rundownNamesToGui');
const rootPath = require('electron-root-path').rootPath;
const path = require('path')



module.exports.app = app = require('express')();
const cors = require('cors');
//const log = require('./log');
const mosaktive = require('./mosactive');
const mosdownloader = require('./mosdownloader');
const interCom = require('./interCom');
const fs = require('fs');

const startWS01 = ws01.serverWS01
   
wsIntern01.wsConnect();

app.use(cors()); 


var server = app.listen(get.config.server.port, get.config.server.ip, function() {
    var host = server.address().address
    var port = server.address().port
    __logger.info("CG_COM OB Device running", host, port);
    __logger.info(`Interface on ${get.config.server.ip}:${get.config.server.port}/Show/`);

})

const publicLocation = path.join(rootPath, '/public/' )
let wsMaster = `const ws1Master = '${get.config.server.ip}:${get.config.webSockets.wsPort1}'
const ws2Master = '${get.config.server.ip}:${get.config.webSockets.wsPort2}'
const wsGuiMaster = '${get.config.server.ip}:${get.config.server.port}'`
fs.writeFile(`${publicLocation}wsmaster.js`, wsMaster, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("global ws saved");
      
      
    }
  });
app.use(express.static(publicLocation, {
  etag: false,
  maxAge: 0
})); 


var active = './active';
var rundowns = './rundowns';

makeDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

}

makeDir(active);
makeDir(rundowns);

