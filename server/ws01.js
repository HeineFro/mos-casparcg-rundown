const WebSocket = require('ws');
const url = require('url');
const get = require("./getConfig");

module.exports = serverWS01 = new WebSocket.Server({
    // host: process.argv[1] || '0.0.0.0',
    port: process.argv[2] || `${get.config.webSockets.wsPort1}`,
    perMessageDeflate: {
        zlibDeflateOptions: {
           
            chunkSize: 1024,
            memLevel: 7,
            level: 3
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024
        },
      
        clientNoContextTakeover: true,
        serverNoContextTakeover: true, 
        
        concurrencyLimit: 10, 
        threshold: 1024 
          
    }
});


let STATE = {};
let socketServer = "WS1: "
serverWS01.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const pathname = url.parse(req.url).pathname;
    //console.log(ip, port, pathname, 'connected on ws01');
    __logger.info(`${pathname}, connected on ws01`);
    if (!STATE[pathname]) {
        STATE[pathname] = {};
    }
    ws.send(JSON.stringify(STATE[pathname]));



    ws.on('message', function incoming(message) {
        __logger.info(socketServer + ip + ' ' + port + ' ' + message)
        const data = JSON.parse(message);
        Object.assign(STATE[pathname], data);
        // Broadcast to everyone else.
        serverWS01.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
                //client.send(file);
            }
        });
    });
});