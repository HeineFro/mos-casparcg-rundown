const fs = require('fs');
const wsIntern01 = require('./ws_client01')
const interCom = require('./interCom');

let parsedData;
fs.readFile('./active/active.json', 'utf8', (err, data) => {
    if (err) {
        __logger.error(err)
        return
    }
    parsedData = JSON.parse(data);
    interCom.emit("rdList", parsedData);
});


runner = () => {
    fs.readFile('./active/active.json', 'utf8', (err, data) => {
       try {
        parsedData = JSON.parse(data);
        interCom.emit("rdList", parsedData);
       }
       catch (err) {
        __logger.error(err)
       }
    });


}

interCom.on('getRDoctopus', (message) => {
    runner();
    
    __logger.info('henter rundowns')
  
  
  })


let update;


const htmlEntities = {
    
    "<": "&lt",
    ">": "&gt",
    '"': "&quot",
    "'": "&apos;",
    "$":  "&#36"
  };

fixEntities = (str) => {
    return str.replace(/['<>]/g, match => htmlEntities[match]);

}


readSpecifik = (rundownSti) => {
    if(rundownSti != undefined) {
    fs.readFile(`./rundowns/${rundownSti}`, 'utf8', (err, data) => {
        if (err) {
            __logger.error(err)
            return
        }

        //let newData = data.replace(/[$]/g,'&#36;')
        let newData = fixEntities(data);
        update = JSON.parse(newData);
        wsIntern01.wsSend({ update })
    })
    };

}


interCom.on('pgm', (message) => {
    runner();
    __logger.info("call for RD " + message);
    switch (message) {
        case "pgm1":
            readSpecifik(parsedData.active0);

            break;
        case "pgm2":
            readSpecifik(parsedData.active1)
            break;
        case "pgm3":
            readSpecifik(parsedData.active2)
            break;
        case "pgm4":
            readSpecifik(parsedData.active3)
            break;
        case "pgm5":
            readSpecifik(parsedData.active4)
            break;
        case "pgm6":
            readSpecifik(parsedData.active5)
            break;
        case "pgm7":
            readSpecifik(parsedData.active6)

    }
});