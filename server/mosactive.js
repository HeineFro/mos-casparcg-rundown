const log = require('./log'); //loader log der har alt til 
const interCom = require('./interCom');
const get = require("./getConfig");
const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');
const wsIntern01 = require('./ws_client01')
const qs = require('qs')

saveToDisk01 = (data) => {
    fs.writeFile('./active/active.json', data, function (err, data) {
        if (err) {
            __logger.error(err);


        }

    })
}



function status(res) {
    if (!res.ok) {
        __logger.error(res.status)
        throw new Error(res.statusText);
    }

    return res;
}


aktiveRundowns = () => {

    try {
        fetch(get.config.api01.ip + ':' + get.config.api01.port + '/mosactive')
            .then(status)
            .then(res => res.json())
            .then(json => {
                module.exports.data = json;
                convert = JSON.stringify(json)
                saveToDisk01(convert)
                jesooon = json
            })
            .catch(error => {
                __logger.error('api01:' + error)
                fetch(get.config.api02.ip + ':' + get.config.api02.port + '/mosactive')
                    .then(status)
                    .then(res => res.json())
                    .then(json => {
                        module.exports.data = json;
                        let convert = JSON.stringify(json)
                        __logger.info('change to api02')

                        saveToDisk01(convert)

                    })
                    .catch(error => {
                        __logger.error('api02:' + error)
                    })



            })


    } catch (err) {
        __logger.error("api01 fejlet" + err)



    }

}

setInterval(aktiveRundowns, 5000);