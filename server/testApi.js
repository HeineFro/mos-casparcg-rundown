const interCom = require('./interCom');
const fetch = require('node-fetch');
const get = require("./getConfig");
const wsExtern01 = require('../server/ws_client02') // tager  ws server & port som arg. wsClient.wsConnect('ws://127.0.0.1:8089/wsIntern');
wsExtern01.wsConnect();
let api01Status = false;
let api02Status = false;


tjekApi = () => {

    fetch(get.config.api01.ip + ':' + get.config.api01.port + '/mosactive').then((response) => {
        if (response.ok) {
            api01Status = true;
        } else {
            api01Status = false;
          throw new Error('Something went wrong');
          
        }
      })
        .catch((error) => {
          __logger.error(error)
      });

      fetch(get.config.api02.ip + ':' + get.config.api02.port + '/mosactive').then((response) => {
        if (response.ok) {
            api02Status = true;
        } else {
            api02Status = false;
          throw new Error('Something went wrong');
        }
      })
        .catch((error) => {
          __logger.error(error)
      });

      if(api01Status === true && api02Status === true){
      //interCom.emit('octoStatus', 'api01');
      wsExtern01.wsSend({
        "octoStatus": "api01"
    })           
      }

      if(api01Status !== true && api02Status === true){
        //interCom.emit('octoStatus', 'api02');
        wsExtern01.wsSend({
          "octoStatus": "api02"
      })           
        }
      
        if(api01Status !== true && api02Status !== true){
          //interCom.emit('octoStatus', 'false');
          wsExtern01.wsSend({
            "octoStatus": "false"
        })  
          }
};

setInterval(tjekApi, 5000);