const CasparCG = require("caspar-cg");
const interCom = require('./interCom');
const get = require("./getConfig");
const dgram = require('dgram');
var client = dgram.createSocket('udp4');

const ccg = new CasparCG({
    host: get.config.CasparCG.ip,
    port: 5250,
    reconnect: false
});


let casparOn = false;
ccg.connect(function () {
    ccg.info(function (err, serverInfo) {
        __logger.info(serverInfo);
        if (err) {
            __logger.error('no caspar' + serverInfo)


        }
    });



});

ccg.on("connected", function () {
    __logger.info("Connected to CasparCG");
});
tjekCCGstatus = () => {
    ccg.info(function (err, serverInfo) {

        interCom.emit("ccStatus", "true");
        if (err) {
            __logger.error('no caspar' + err)
            interCom.emit("ccStatus", "false");
            reConnect();
        }
    });

}

setInterval(tjekCCGstatus, 4500);
reConnect = () => {


    ccg.connect(function () {

        ccg.info(function (err, serverInfo) {

            casparOn = true;

            if (err) {
                __logger.warn('no caspar on reconnect' + err)

                casparOn = false;
            }
        });
    })
};

interCom.on('comTilCaspar', (message) => {
    ccg.sendCommand(message)
    __logger.info(message)
})

interCom.on('comTilCasparOnStart', (message) => {
    ccg.sendCommand(message)
})

let dubOnCh2 = false;


interCom.on('temp', (message) => {
    console.log(message)
    let second = false;
    if (message.temp !== 'stop') {
        makeAmcpCall = (input) => {
            let contentTemp = `CG ${get.config.CasparCG.MainCh}-${get.config.CasparCG.MainLayer} ADD 1 `
            let contentpreview = `CG ${get.config.CasparCG.PreviewCh}-${get.config.CasparCG.MainLayer} ADD 1 `
            let contentTemp2 = `CG ${get.config.CasparCG.MainCh}-11 ADD 1 `
            let contentpreview2 = `CG ${get.config.CasparCG.PreviewCh}-11 ADD 1 `
            let contentTempCh2 = `CG 2-${get.config.CasparCG.MainLayer} ADD 1 `
            let contentText = '';

            // SPROGBLOMSTER_SEP21 is specific template for a show
            Object.entries(input).forEach(([key, val]) => {
                if (val !== 'stop') {
                    if (key === 'temp') {
                        if (`${val}` === "SPROGBLOMSTER_SEP21") {
                            dubOnCh2 = true;
                        }

                        if (`${val}`.includes("IDENT")) {
                            second = true;
                        }
                        contentTemp += `${val}/${val} "0" `;
                        contentTemp2 += `${val}/${val} "0" `;
                        contentpreview += `${val}/${val} "1" `;
                        contentpreview2 += `${val}/${val} "1" `;
                        contentTempCh2 += `${val}/${val} "0" `;
                    } else {
                        contentText += `\\"${key}\\":\\"${val}\\",`;
                    }
                }
            });


            if (second) {
                ccg.sendCommand(contentTemp2 + '"{' + contentText.slice(0, -1) + ',\\"noWebsocket\\":\\"false\\"}"')
                ccg.sendCommand(contentpreview2 + '"{' + contentText.slice(0, -1) + ',\\"noWebsocket\\":\\"true\\"}"')

            } else {
                ccg.sendCommand(contentTemp + '"{' + contentText.slice(0, -1) + ',\\"noWebsocket\\":\\"false\\"}"')
                ccg.sendCommand(contentpreview + '"{' + contentText.slice(0, -1) + ',\\"noWebsocket\\":\\"true\\"}"')

            }


            if (dubOnCh2) {
                ccg.sendCommand(contentTempCh2 + '"{' + contentText.slice(0, -1) + ',\\"noWebsocket\\":\\"true\\"}"')
            }


        }
        makeAmcpCall(message);
    } else {
        client.send('BANK-PRESS 1 3', 51235, '127.0.0.1', function (err, bytes) {          
        });
        ccg.sendCommand(`CG ${get.config.CasparCG.MainCh}-${get.config.CasparCG.MainLayer} STOP 0`)
    }
})


interCom.on('ident', (message) => {

    if (message.ident === 'stop') {
        client.send('BANK-PRESS 1 2', 51235, '127.0.0.1', function (err, bytes) {          
        });
        ccg.sendCommand(`CG ${get.config.CasparCG.MainCh}-11 STOP 0`)
    }
}
)

interCom.on('preview', (message) => {
    ccg.sendCommand(`CLEAR ${get.config.CasparCG.PreviewCh}-${message.preview}`)

})
