// i top main const ws01C = require('./wscore01Client')
const WebSocket = require('ws');

const interCom = require('./interCom')
const get = require("./getConfig");
//skal komme fra config
let mails = ["resultat","scale","scaleLock","pos","gui","temp","tempRun","tempAuto",'getRDoctopus','ident','preview'];

console.log("ws01 connect")
var socketIsOpen = 0;
var intervalID = 0;
var closedByUser = 0;





module.exports.wsSend = function sendCommand(obj) {
    if (socketIsOpen) {
        
        websocket01.send(JSON.stringify(obj));
    } else {
        __logger.error('not connected ws01');
    }
}


module.exports.wsConnect = function doConnect() {

    websocket01 = new WebSocket(`ws://${get.config.webSockets.ip}:${get.config.webSockets.wsPort1}/`);
    websocket01.onopen = function(evt) {
        socketIsOpen = 1;

        clearInterval(intervalID);
        intervalID = 0;
    };
    websocket01.onclose = function(evt) {
        socketIsOpen = 0;
        if (!intervalID && !closedByUser) {
            intervalID = setInterval(doConnect, 5000);
        } else if (closedByUser) {
            closedByUser = 0;
        }

    };
    websocket01.onmessage = function(evt) {
        var jsonOBJ = JSON.parse(evt.data);
      
        onMessage(jsonOBJ);
    };

    websocket01.onerror = function(evt) {

        __logger.error("no websocket")
        socketIsOpen = 0;
        
        if (!intervalID) {
            intervalID = setInterval(doConnect, 5000);
        }
    };
}

///emitter input fra GUI til interCom events - skal ligges over i eget modul, så ws modulet er rent for specifikke function onMessage(data) {

  onIncoming = (data,key) => {
    if (data.hasOwnProperty(key)) {
        let dataString = JSON.stringify(data[`${key}`])
        interCom.emit(key, data);   
        
     }
     //console.log(data)
    };

    onIncomingParse = (data,key) => {
        if (data.hasOwnProperty(key)) {
            let dataString = JSON.stringify(data[`${key}`])
            interCom.emit(key, data[`${key}`]);   
            
         }
         //console.log(data)
        };

onMessage = (data) => { 
    onIncomingParse(data,"pgm")
    onIncomingParse(data,"temRun")
    mails.forEach((item,index) => {
        onIncoming(data,item);
    });
   // __logger.info('ws1 ' + data)

};