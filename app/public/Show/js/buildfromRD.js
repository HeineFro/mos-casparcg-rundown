sendCommand({
    "pgm": "pgm1"
});
let page;
var run = [];
var go;

text2time = (time) => {
    let framesText = time.slice(-2);
    let secText = time.slice(-5, -3);
    let finalTime = Number(secText * 1000) + Number(framesText * 40);
    //console.log(finalTime)
    return finalTime
}


findAllByKey = (obj, keyToFind, err) => {
    try {
        return Object.entries(obj)
            .reduce((acc, [key, value]) => (key === keyToFind) ?
                acc.concat(value) :
                (typeof value === 'object') ?
                acc.concat(findAllByKey(value, keyToFind)) :
                acc, [])
    } catch {
        console.log(err)

    }
}
var worldCount = 0;
let parsedRawData;
let rawData;
createHead = (con, page) => {
    //worldCount++
    //console.log(worldCount)
    var div = document.createElement('div');
    var story = document.createElement('div');
    var btnBox = document.createElement('div');
    var ord = document.createElement('div');
    var span = document.createElement('span');
    var btnLoad = document.createElement('Button');

    ord.className = 'info-top';
    div.className = `panel-wrapper1 datainfo2`;
    btnBox.className = 'btnBox'
    story.className = 'panel-head'
    story.innerHTML = `RUNDOWN: ${con} Tryk for at opdatere`;
    //btn.setAttribute("onClick", `amcp('${casparcg}')`);
    div.setAttribute("onClick", `getAktivePage('${page}')`);

    document.body.appendChild(div);

    div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);
    document.getElementById(page).appendChild(div);
};
createAveco = (fields, inTime, temp, page, pageClass, dur) => {
    worldCount++
    let fCounter = 0;
   // console.log(worldCount)
    let time = text2time(dur);
    var div = document.createElement('div');
    var btnBox = document.createElement('div');
    var ord = document.createElement('div');
    var span = document.createElement('span');
    let tempContent = `'temp' : '${temp}'`
    span.innerHTML = `IN: ${inTime} `;
    span.innerHTML += `DUR: ${dur} `;
    
    fillContent = (con) => {
        tempContent += `,'f${fCounter}' : '${con}'`;
        fCounter++;

    }
   Object.entries(fields.fieldDescr).forEach(([key, val]) => {
       if(val.fieldName.name !== 'astra_category'){
            span.innerHTML += val.fieldName.name + ' : ';
           if(val.fieldvalue !== '0'){
            
            span.innerHTML += val.fieldValue + ' ';
           } else {
            span.innerHTML += ' ';
           }
    
    
            fillContent(val.fieldValue);

       }
       
   })
 
    ord.className = 'info-top';
    div.className = `panel-wrapper datainfo1 ${pageClass}`;
    div.setAttribute("id", `box${worldCount}`)

    btnBox.className = 'btnBox'

    //div.setAttribute("onClick", `sendCommand({"temp": '${temp}', 'f0': '${fields.fieldDescr[0].fieldValue}', 'f1': '${fields.fieldDescr[1].fieldValue}' }), sendCommand({"preview": '${temp}', 'f0': '${fields.fieldDescr[0].fieldValue}', 'f1': '${fields.fieldDescr[1].fieldValue}' }), showLoad('box${worldCount}', ${worldCount}, ${time})`);
    div.setAttribute("onClick", `sendCommand({${tempContent}}), showLoad('box${worldCount}', ${worldCount}, ${time})`);
     document.body.appendChild(div);

    //div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);

    document.getElementById(page).appendChild(div);
};

createBundt = (con, svar, historie, inTime, temp, page, pageClass, dur) => {
    worldCount++
   //console.log(worldCount)
    let time = text2time(dur);
    var div = document.createElement('div');
    var story = document.createElement('div');
    var btnBox = document.createElement('div');
    var ord = document.createElement('div');
    var span = document.createElement('span');
    var btnLoad = document.createElement('Button');
    var btnPlay = document.createElement('Button');
    var btnSvar = document.createElement('Button');
    var btnStop = document.createElement('Button');

    span.innerHTML = `IN: ${inTime}  `;
    span.innerHTML += `DUR: ${dur}  `;
    span.innerHTML += `Navn: ${con}  `;
    span.innerHTML += `Titel: ${svar}`;

    ord.className = 'info-top';
    div.className = `panel-wrapper datainfo1 ${pageClass}`;
    div.setAttribute("id", `box${worldCount}`)
    btnBox.className = 'btnBox'
    story.className = 'panel-head'
    story.innerHTML = historie + ' ' + temp + '  In: ' + inTime;
    //btn.setAttribute("onClick", `amcp('${casparcg}')`);
    //div.setAttribute("onClick", `amcp('${casparcg}'), amcp('${preview}'), showLoad('box${worldCount}')`);
    div.setAttribute("onClick", `sendCommand({"temp": '${temp}', 'f0': '${con}', 'f1': '${svar}' }), sendCommand({"preview": '${temp}', 'f0': '${con}', 'f1': '${svar}' }), showLoad('box${worldCount}', ${worldCount}, ${time})`);

    document.body.appendChild(div);

    //div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);

    document.getElementById(page).appendChild(div);
};

createBundtIdent = (con, svar, ident, historie, inTime, temp, page, pageClass, dur) => {
    worldCount++
    //console.log(worldCount)
    var div = document.createElement('div');
    let time = text2time(dur);
    var btnBox = document.createElement('div');
    var ord = document.createElement('div');
    var span = document.createElement('span');

    span.innerHTML = `IN: ${inTime}  `;
    span.innerHTML += `DUR: ${dur}  `;
    span.innerHTML += `NAVN: ${con}  `;
    span.innerHTML += `TITEL: ${svar} `;
    span.innerHTML += `IDENT: ${ident}`;


    ord.className = 'info-top';
    div.className = `panel-wrapper datainfo1 ${pageClass}`;
    div.setAttribute("id", `box${worldCount}`)


    btnBox.className = 'btnBox'
    
    div.setAttribute("onClick", `sendCommand({"temp": '${temp}', 'f0': '${con}', 'f1': '${svar}', 'f2': '${ident}'}), sendCommand({"preview": '${temp}', 'f0': '${con}', 'f1': '${svar}', 'f2': '${ident}' }), showLoad('box${worldCount}', ${worldCount}, ${time})`);


    document.body.appendChild(div);

    //div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);
    //div.appendChild(btnBox);       
    //btnBox.appendChild(btnLoad);
    //btnBox.appendChild(btnPlay);



    document.getElementById(page).appendChild(div);
};

createHist = (historie, page, pageClass) => {
    let idCreater = historie.replace(/[^a-zA-Z0-9]/g, '_');;
    //console.log(idCreater)
    if ($(`#${idCreater}`).length) // use this if you are using id to check
    {
        console.log("id findes")
    } else {

        var div = document.createElement('div');
        var story = document.createElement('div');


        div.className = `panel-wrapper datainfo1 ${pageClass}`;
        div.setAttribute("id", `${idCreater}`)


        story.className = 'panel-head'
        story.innerHTML = historie;

        document.body.appendChild(div);

        div.appendChild(story);

        document.getElementById(page).appendChild(div);
    }


};

createIdent = (con, historie, inTime, temp, page, pageClass, dur) => {
    worldCount++
    //console.log(worldCount)
    var div = document.createElement('div');
    var story = document.createElement('div');
    var btnBox = document.createElement('div');
    var ord = document.createElement('div');
    var span = document.createElement('span');
    var btnLoad = document.createElement('Button');
    var btnPlay = document.createElement('Button');
    var btnSvar = document.createElement('Button');
    var btnStop = document.createElement('Button');
    let time = text2time(dur);
    span.innerHTML = `IN: ${inTime} DUR: ${dur} Ident: ${con}  `;


    ord.className = 'info-top';
    div.className = `panel-wrapper datainfo1 ${pageClass}`;
    div.setAttribute("id", `box${worldCount}`)

    div.setAttribute("onClick", `sendCommand({"temp": '${temp}', 'f0': '${con}'}), sendCommand({"preview": '${temp}', 'f0': '${con}'}), showLoad('box${worldCount}', ${worldCount}, ${time})`);



    document.body.appendChild(div);

    // div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);
  

    document.getElementById(page).appendChild(div);
};
var lastShow;
var backShow;
let current;
let currentNumber;
let currentIdent;
let currentDur;
showLoad = (bundtID, counter, dur) => {

    current = bundtID
    currentNumber = counter
    currentDur = dur;
    //console.log(dur)
    if (lastShow != null) {
        document.getElementById(`${lastShow}`).style.background = "#EDEDED";
    }
    let element = document.getElementById(`${bundtID}`)
    element.classList.add("selected");
    //console.log(bundtID)
    //console.log(counter)

    document.getElementById(`${bundtID}`).style.background = "yellow";



    lastShow = bundtID

};

let tempOn = false;

showLoadIdent = (bundtID, counter) => {

    currentIdent = bundtID
    current = bundtID
    currentNumber = counter
    if (lastShow != null) {
        document.getElementById(`${lastShow}`).style.background = "#EDEDED";
    }
    let element = document.getElementById(`${bundtID}`)
    //element.classList.add("selected");
   // console.log(bundtID)
    //console.log(counter)
    document.getElementById(`${bundtID}`).style.background = "yellow";

    lastShow = bundtID

};

showIdent = (bundtID) => {
    //unload();
    document.getElementById(`${bundtID}`).style.background = "blue";

    lastShow = bundtID
};

unLoad = () => {
    document.getElementById(`${lastShow}`).style.background = "#EDEDED";


};

stopTempAuto = () => {
    sendCommand({
        "temp": 'stop'
    })
}
play = () => {

    document.getElementById(`${current}`).style.background = "red";
    if (currentDur !== 0) {
        setTimeout(stopTempAuto, currentDur);

    }

}
stop = () => {
    document.getElementById(`${current}`).style.background = "#EDEDED";
    tempOn = false;

};
stopIdent = () => {
    document.getElementById(`${currentIdent}`).style.background = "#EDEDED";
}

nextElement = () => {
    if (currentNumber === worldCount) {
        document.getElementById("box1").click();
    } else {
        let element = currentNumber + 1;
        let nextElement = "box" + element;
        document.getElementById(nextElement).click();
    }
}

reloadCurrent = () => {
    if (currentNumber > worldCount) {
        document.getElementById("box1").click();
    } else {
        document.getElementById(current).click();
    }

}


lastElement = () => {

}

makeRundown = (data, page, pageClass) => {

    console.log(data);
    worldCount = 0;
    console.log("her er siden " + page)
    //fetch('http://10.17.2.18:9000/rundowns/131578611.json')
    // .then(response => response.json())
    // .then(data => rawData = data);
    let mosIDtjek;
    let gotIt = findAllByKey(data, 'story');
    let gotRd = findAllByKey(data, 'roSlug');
    createHead(gotRd, page);

    let ccg = gotIt.map(function (item, index) {

        return {
            item: item,
            index
        }

    });

    for (let i = 0; i < ccg.length; i++) {

        var navn = ccg[i].item.storySlug;

        if (ccg[i].item.hasOwnProperty('item') === true) {
            mosIDtjek = ccg[i].item.item;

        }
    

        for (let i = 0; i < mosIDtjek.length; i++) {

            if (mosIDtjek[i].mosID === "CCG") {
                let inTimeValue;
                let durTimeValue;
                if (typeof mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr !== 'undefined') {
                    inTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr[0]['$t'];
                } else {
                    inTimeValue = "no time/ Octopus"
                }

                if (typeof mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr !== 'undefined') {
                    durTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr[1]['$t'];
                } else {
                    durTimeValue = "no time/ Octopus"
                }
                createHist(navn, page, pageClass)
                createAveco(mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG, inTimeValue, mosIDtjek[i].itemSlug, page, pageClass, durTimeValue)
               

            }

            if (mosIDtjek[i].mosID === "CasparCG") {
               

                createHist(navn, page, pageClass)

                if (mosIDtjek[i].mosExternalMetadata.mosPayload.templateID === 'BUNDT') {

                    createBundt(mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[0].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[1].value, navn, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVsom, mosIDtjek[i].mosExternalMetadata.mosPayload.templateID, page, pageClass, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVeom)



                }

                if (mosIDtjek[i].mosExternalMetadata.mosPayload.templateID === 'TOPT') {

                    createBundt(mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[0].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[1].value, navn, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVsom, mosIDtjek[i].mosExternalMetadata.mosPayload.templateID, page, pageClass, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVeom)

                   
                }
                if (mosIDtjek[i].mosExternalMetadata.mosPayload.templateID === 'BUNDTIDENT') {

                    createBundtIdent(mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[0].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[1].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[2].value, navn, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVsom, mosIDtjek[i].mosExternalMetadata.mosPayload.templateID, page, pageClass, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVeom)



                }

                if (mosIDtjek[i].mosExternalMetadata.mosPayload.templateID === 'TOPTIDENT') {

                    createBundtIdent(mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[0].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[1].value, mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field[2].value, navn, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVsom, mosIDtjek[i].mosExternalMetadata.mosPayload.templateID, page, pageClass, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVeom)



                }



                if (mosIDtjek[i].mosExternalMetadata.mosPayload.templateID === 'IDENT') {

                    createIdent(mosIDtjek[i].mosExternalMetadata.mosPayload.ObjectDetails.message.fields
                        .field.value, navn, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVsom, mosIDtjek[i].mosExternalMetadata.mosPayload.templateID, page, pageClass, mosIDtjek[i].mosExternalMetadata.mosPayload.sAVeom)

                }

            }

        }

    }





};

getAktive = (nr) => {

    page = nr;
    console.log(page)
    sendCommand({
        "pgm": "pgm" + nr
    });


}

getAktivePage = (nr) => {

    console.log(page)
    sendCommand({
        "pgm": `${nr}`
    });

}











function onMessage(data) {
    if (data.hasOwnProperty('rdNames')) {
        if (data.rdNames.active0 != undefined) {
            document.getElementById("namepgm1").innerHTML = data.rdNames.active0[0];
        } else {
            document.getElementById("namepgm1").innerHTML = "-";
        }
        if (data.rdNames.active1 != undefined) {
            document.getElementById("namepgm2").innerHTML = data.rdNames.active1[0];
        } else {
            document.getElementById("namepgm2").innerHTML = "-";
        }
        if (data.rdNames.active2 != undefined) {
            document.getElementById("namepgm3").innerHTML = data.rdNames.active2[0];
        } else {
            document.getElementById("namepgm3").innerHTML = "-";
        }
        if (data.rdNames.active3 != undefined) {
            document.getElementById("namepgm4").innerHTML = data.rdNames.active3[0];
        } else {
            document.getElementById("namepgm4").innerHTML = "-";
        }
        if (data.rdNames.active4 != undefined) {
            document.getElementById("namepgm5").innerHTML = data.rdNames.active4[0];
        } else {
            document.getElementById("namepgm5").innerHTML = "-";
        }
        if (data.rdNames.active5 != undefined) {
            document.getElementById("namepgm6").innerHTML = data.rdNames.active5[0];
        } else {
            document.getElementById("namepgm6").innerHTML = "-";
        }
        if (data.rdNames.active6 != undefined) {
            document.getElementById("namepgm7").innerHTML = data.rdNames.active6[0];
        } else {
            document.getElementById("namepgm7").innerHTML = "-";
        }


    }

    ///vægt data
    if (data.hasOwnProperty('update')) {
        lastShow = "box1";
        $('.panel-wrapper').remove();
        $('.panel-wrapper1').remove();
        rawData = data['update'];
        makeRundown(rawData, "pgm" + page, "page" + page)
        showLoad(current, currentNumber);
        reloadCurrent();
    }

    if (data.hasOwnProperty('tempRun')) {
        let state = data['tempRun'];
        switch (state) {
            case "On":
                play();
                break;
            case "Off":
                nextElement();
                console.log('offfffffffffffff')

        }

    }
    //console.log(data['update'])
}