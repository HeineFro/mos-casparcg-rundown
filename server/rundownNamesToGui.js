const fs = require('fs');
const wsIntern01 = require('./ws_client01')
const interCom = require('./interCom');
const namesRun = require('./rundownToGui')

let store = {};
'use strict';


findAllByKey = (obj, keyToFind, err) => {
    try {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => (key === keyToFind) ?
                acc.concat(value) :
                (typeof value === 'object') ?
                    acc.concat(findAllByKey(value, keyToFind)) :
                    acc, [])
    } catch {
        __logger.error(err)

    }
}
let counter = 1;
readSpecificName = (key, rundownSti) => {
    fs.readFile(`./rundowns/${rundownSti}`, 'utf8', (err, data) => {

        if (err) {
            __logger.error(err)
            return
        }
        try {
            let rdData = JSON.parse(data);
            store[key] = findAllByKey(rdData, "roSlug");

            counter++
        }
        catch (e) {
            __logger.error(e);
        }


    })
}


interCom.on("rdList", (message) => {
    store = {};
    for (const [key, value] of Object.entries(message)) {
        readSpecificName(key, value)
    }


    setTimeout(() => {
        wsIntern01.wsSend({ "rdNames": store });
    }, 250)


})