const settings = require('electron-app-settings');
const {
    ipcRenderer
} = require('electron');
const ipc = require('electron').ipcRenderer;

var modal = document.getElementById("myModal");
var modal1 = document.getElementById("confirm");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var abortRestart = document.getElementById('abortRestart');
var confirmRestart = document.getElementById('confirmRestart');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
    console.log(settings.get('CasparCG.pathTemplates'));
    document.getElementById('apiport').value = settings.get('api01.port');
    document.getElementById('mainapi').value = settings.get('api01.ip');
    document.getElementById('backupapi').value = settings.get('api02.ip');
    document.getElementById('mainserver').value = settings.get('server.ip');
    document.getElementById('controlport').value = settings.get('server.port');
    document.getElementById('wsp1').value = settings.get('webSockets.wsPort1');
    document.getElementById('wsp2').value = settings.get('webSockets.wsPort2');
    document.getElementById('ccgip').value = settings.get('CasparCG.ip');
    document.getElementById('mainch').value = settings.get('CasparCG.MainCh');
    document.getElementById('mainlayer').value = settings.get('CasparCG.MainLayer');
    document.getElementById('previewch').value = settings.get('CasparCG.PreviewCh');
    document.getElementById('temp').value = settings.get('CasparCG.pathTemplates');

}
abortRestart.onclick = function () {
    modal1.style.display = "none";

}

confirmRestart.onclick = function () {
    ipc.send('fromRender', 'reStart')
    modal1.style.display = "none";
    document.getElementById('box1').innerHTML = "Restarting CasparCG...";


}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    document.getElementById('gemt').innerHTML = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//document.write(process.versions.node)

start.addEventListener('click', () => {
    ipc.send('fromRender', 'start')
});

start3.addEventListener('click', () => {
    ipc.send('fromRender', 'cache')
});

quit.addEventListener('click', () => {
    ipc.send('fromRender', 'quit')
});



ccg.addEventListener('click', () => {
    ipc.send('fromRender', 'ccgStart')
    document.getElementById('box1').innerHTML = "Analyzing CasparCG...";
});

gemconfig.addEventListener('click', () => {

    settings.set('setup', {
        intervalAktive: 10000,
        saveaktive: "./public/active"
    });

    settings.set('server', {
        ip: document.getElementById('mainserver').value,
        port: document.getElementById('controlport').value
    });

    settings.set('webSockets', {
        ip: document.getElementById('mainserver').value,
        wsPort1: document.getElementById('wsp1').value,
        wsPort2: document.getElementById('wsp2').value
    });

    settings.set('CasparCG', {
        ip: document.getElementById('ccgip').value,
        MainCh: document.getElementById('mainch').value,
        MainLayer: document.getElementById('mainlayer').value,
        PreviewCh: document.getElementById('previewch').value,
        pathTemplates: document.getElementById('temp').value
    });

    settings.set('api01', {
        ip: document.getElementById('mainapi').value,
        port: document.getElementById('apiport').value,
        active: "http://cg-api01.tv2b.local:8081/mosactive",
        pathrundowns: "http://cg-api01.tv2b.local:8081/rundowns/"
    });

    settings.set('api02', {
        ip: document.getElementById('backupapi').value,
        port: document.getElementById('apiport').value,
        active: "http://cg-api02.tv2b.local:8081/mosactive",
        pathrundowns: "http://cg-api02.tv2b.local:8081/rundowns/"
    });
    console.log(settings.get('CasparCG.pathTemplates'));
    document.getElementById('gemt').innerHTML = "Config saved, Restarting CG-COM"
    setTimeout(() => {
        ipc.send('fromRender', 'restartApp')
    }, 2000)
});


let ccgState = 0;

state = (nr) => {
    console.log('works')
    ccgState = nr;
    setTimeout(() => {
        ccgState = 0
    }, 10000)
}

onMessage = (data) => {

    if (data.hasOwnProperty('ccStatus')) {
        switch (data.ccStatus) {
            case "true":
                document.getElementById('ccg').style.border = "3px solid #53f56e";
                document.getElementById('ccg').style.color = "#53f56e";
                document.getElementById('start').style.color = "white";
                document.getElementById('start3').style.color = "white";
                if (ccgState === 0) {
                    document.getElementById('box1').innerHTML = "CasparCG status OK";
                }

                break;
            case "false":
                document.getElementById('ccg').style.border = "3px solid rgb(255, 0, 43)";
                document.getElementById('ccg').style.color = "rgb(255, 0, 43)";
                if (ccgState === 0) {
                    document.getElementById('box1').innerHTML = "I'm Sorry, I can't connect to CasparCG.";
                }
                break;
            case "running":
                document.getElementById('box1').innerHTML = "Please start CasparCG from launcher";
                state(1);
                break;
            case "starting":
                document.getElementById('box1').innerHTML = "Starting CasparCG launcher";
                state(1);
                break;
            case "restart":
                modal1.style.display = "block";
                document.getElementById('box1').innerHTML = "Critical action!";
        }

    }

    if (data.hasOwnProperty('octoStatus')) {
        switch (data.octoStatus) {
            case "api01":

                document.getElementById('octopusId').style.border = "3px solid #53f56e";
                document.getElementById('octopusId').style.color = "#53f56e";
                document.getElementById('box2').innerHTML = "Octopus status OK - Data from main api";
                break;
            case "api02":

                document.getElementById('octopusId').style.border = "3px solid #53f56e";
                document.getElementById('octopusId').style.color = "#53f56e";
                document.getElementById('box2').innerHTML = "Octopus status OK - Data from backup api";
                break;
            case "false":
                document.getElementById('octopusId').style.border = "3px solid rgb(255, 0, 43)";
                document.getElementById('octopusId').style.color = "rgb(255, 0, 43)";
                document.getElementById('box2').innerHTML = "Sorry, I can not connect to Octopus";
        }
    }
};

ipcRenderer.on('version', (event, data) => {
    document.getElementById('version').innerHTML = data;
    document.getElementById('version').style.opacity = "1";


})
