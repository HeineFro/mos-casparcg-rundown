// i top main const ws01C = require('./wscore01Client')
const WebSocket = require('ws');
//var WEBSOCKET_URI = WEBSOCKET_URI || "ws://127.0.0.1:8080/";const
const interCom = require('./interCom')

var socketIsOpen = 0;
var intervalID = 0;
var closedByUser = 0;
const get = require('./getConfig')
let mails = ["electron", "updateConfig"];
console.log(`ws://${get.config.webSockets.ip}:${get.config.webSockets.wsPort2}/`)


function getInput(id) {
    return document.getElementById(id).value;
}

module.exports.wsSend = function sendCommand(obj) {
    if (socketIsOpen) {
        websocket.send(JSON.stringify(obj));
    } else {
        
        __logger.warn("not connected ws02")
    }
}


module.exports.wsConnect = function doConnect() {

    websocket = new WebSocket(`ws://${get.config.webSockets.ip}:${get.config.webSockets.wsPort2}/`);
    websocket.onopen = function(evt) {
        socketIsOpen = 1;

        clearInterval(intervalID);
        intervalID = 0;
    };
    websocket.onclose = function(evt) {
        socketIsOpen = 0;
        if (!intervalID && !closedByUser) {
            intervalID = setInterval(doConnect, 5000);
        } else if (closedByUser) {
            closedByUser = 0;
        }

    };

    websocket.onmessage = function(evt) {
        var jsonOBJ = JSON.parse(evt.data);

        onMessage(jsonOBJ);
    };


    websocket.onerror = function(evt) {
        __logger.error("fejllog - websocket")
        socketIsOpen = 0;

        if (!intervalID) {
            intervalID = setInterval(doConnect, 5000);
        }
    };
}

onIncoming = (data, key) => {
    if (data.hasOwnProperty(key)) {
        let dataString = JSON.stringify(data[`${key}`])
        interCom.emit(key, data);

    }
    //console.log(data)
};

onIncomingParse = (data, key) => {
    if (data.hasOwnProperty(key)) {
        let dataString = JSON.stringify(data[`${key}`])
        interCom.emit(key, data[`${key}`]);

    }
    //console.log(data)
};

onMessage = (data) => {

    mails.forEach((item, index) => {
        onIncoming(data, item);
    });
   // __logger.info('ws2 ' + data)

};