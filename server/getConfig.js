const settings = require('electron-app-settings');
const defaults = require('./writeDefaultConfig')
let configExits = settings.has('server.ip');
console.log("config findes: " + configExits)

if (configExits) {


    module.exports.config =

        {
            "setup": {
                "intervalAktive": settings.get('setup.intervalAktive'),
                "saveaktive": settings.get('setup.saveaktive')
            },
            "server": {
                "ip": settings.get('server.ip'),
                "port": settings.get('server.port')
            },
            "webSockets": {
                "ip": settings.get('webSockets.ip'),
                "wsPort1": settings.get('webSockets.wsPort1'),
                "wsPort2": settings.get('webSockets.wsPort2')
            },
            "CasparCG": {
                "ip": settings.get('CasparCG.ip'),
                "MainCh": settings.get('CasparCG.MainCh'),
                "MainLayer": settings.get('CasparCG.MainLayer'),
                "PreviewCh": settings.get('CasparCG.PreviewCh'),
                "pathTemplates": settings.get('CasparCG.pathTemplates'),
            },
            "api01": {
                "ip": settings.get('api01.ip'),
                "port": settings.get('api01.port'),
                "active": settings.get('api01.active'),
                "pathrundowns": settings.get('api01.pathrundowns')
            },
            "api02": {
                "ip": settings.get('api02.ip'),
                "port": settings.get('api02.port'),
                "active": settings.get('api02.active'),
                "pathrundowns": settings.get('api02.pathrundowns')
            }
        }
} else if (!configExits) {
    console.log("ohNo")

    defaults.writeConfig();
    module.exports.config = config = {
        "setup": {
            "intervalAktive": 10000,
            "saveaktive": "./public/active"
        },
        "server": {
            "ip": "127.0.0.1",
            "port": "9000"
        },
        "webSockets": {
            "ip": "127.0.0.1",
            "wsPort1": "1000",
            "wsPort2": "8020"
        },
        "CasparCG": {
            "ip": "127.0.0.1",
            "MainCh": "1",
            "MainLayer": "20",
            "PreviewCh": "3",
           
        },
        "api01": {
            "ip": "http://127.0.0.1",
            "port": "8081",
            "active": "http://127.0.0.1:8081/mosactive",
            "pathrundowns": "http://127.0.0.1:8081/rundowns/"
        },
        "api02": {
            "ip": "http://127.0.0.1",
            "port": "8081",
            "active": "http://127.0.0.1:8081/mosactive",
            "pathrundowns": "http://127.0.0.1:8081/rundowns/"
        }
    }



}
