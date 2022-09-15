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
    if (isNaN(finalTime)) {
        return 0;
    } else { //console.log(finalTime)
        return finalTime;
    }
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
var worldCountIdent = 0;
let parsedRawData;
let rawData;
let lockTemp = false;
let lockIdent = false;


createHead = (con, page) => {

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

    div.setAttribute("onClick", `getAktivePage('${page}')`);

    document.body.appendChild(div);

    div.appendChild(story);
    div.appendChild(ord);
    ord.appendChild(span);
    document.getElementById(page).appendChild(div);
};
createAveco = (fields, inTime, temp, page, pageClass, dur) => {
    if (fields.fieldDescr[0].fieldName.name !== 'Kontrol') {
        if (temp.includes("_IDENT")) {
            worldCountIdent++
        } else {
            worldCount++
        }

        let fCounter = 0;
        let time = text2time(dur);
        var div = document.createElement('div');



        let btnBox = document.createElement('div');
        var ord = document.createElement('div');
        var span = document.createElement('span');
        let tempContent = `'temp' : '${temp}'`;

        span.innerHTML = `IN: ${inTime} `;
        span.innerHTML += `DUR: ${dur} `;

        function decodeHtml(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        fillContent = (con, tempis) => {

            if (typeof con !== 'object') {
                if (tempis.includes("Credit") || tempis.includes("CREDIT")) {
                    console.log('virker credit')
                    let newText = decodeHtml(con)
                    tempContent += `,'f${fCounter}' : '${newText.replace(/\"/gi, '&quot;')}'`;
                } else {

                    tempContent += `,'f${fCounter}' : '${con.replace(/\"/gi, '&quot;')}'`;

                }

            } else {
                tempContent += `,'f${fCounter}' : ' '`;
            }
            fCounter++;
            console.log(`${con}`)

        }
        Object.entries(fields.fieldDescr).forEach(([key, val]) => {

            if (val.fieldName.name !== 'astra_category') {
                span.innerHTML += val.fieldName.name + ' : ';
                if (typeof val.fieldValue !== 'object') {
                    console.log(typeof val.fieldValue !== 'object')

                    span.innerHTML += val.fieldValue + ' ';
                } else {
                    span.innerHTML += ' ';
                }


                fillContent(val.fieldValue, temp);

            }

        })

        ord.className = 'info-top';


        if (temp.includes("IDENT")) {
            div.className = `panel-wrapper datainfo1 ident ${pageClass}`;
            div.setAttribute("id", `boxIdent${worldCountIdent}`)
        } else {
            div.className = `panel-wrapper datainfo1 temp ${pageClass}`;
            div.setAttribute("id", `box${worldCount}`)
        }


        btnBox.className = 'btnBox'


        if (temp.includes("_IDENT")) {
            div.setAttribute("onClick", `sendCommand({${tempContent}}), showLoadIdent('boxIdent${worldCountIdent}', ${worldCountIdent}, ${time})`);
        } else {
            div.setAttribute("onClick", `sendCommand({${tempContent}}), showLoad('box${worldCount}', ${worldCount}, ${time})`);
        }

        document.body.appendChild(div);

        div.appendChild(ord);
        ord.appendChild(span);

        document.getElementById(page).appendChild(div);
    }
};



createHist = (historie, page, pageClass) => {
    let idCreater = historie.replace(/[^a-zA-Z0-9]/g, '_');;

    if ($(`#${idCreater}`).length) {
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


let lastShow;
let backShow;
let lastIdentShow = "boxIdent1";

let backIdentShow;

let current;
let currentNumber;
let currentIdentNumber;
let currentIdent;
let currentDur;
let currentIdentDur;
let stopPreviewPlay = false;
let stopPreviewIdentPlay = false;



showLoad = (bundtID, counter, dur) => {
    stopPreviewPlay = true;
    setTimeout(() => {
        stopPreviewPlay = false
    }, 300)
    current = bundtID
    currentNumber = counter
    currentDur = dur;
    console.log(dur)
    if (lastShow != null) {
        document.getElementById(`${lastShow}`).style.background = "#EDEDED";
    }
    let element = document.getElementById(`${bundtID}`)
    element.classList.add("selected");
    document.getElementById(`${bundtID}`).style.background = "yellow";
    lastShow = bundtID

};

let tempOn = false;

showLoadIdent = (identID, counter, dur) => {
    console.log(identID + ' ' + counter + ' ' + lastIdentShow)
    document.getElementById(`${lastIdentShow}`).style.background = "#EDEDED";

    stopPreviewIdentPlay = true;
    setTimeout(() => {
        stopPreviewIdentPlay = false
    }, 300)
    currentIdent = identID
    currentIdentNumber = counter
    currentIdentDur = dur;
    console.log(dur)
    if (lastIdentShow != null) {
        document.getElementById(`${lastIdentShow}`).style.background = "#EDEDED";
    }
    let element = document.getElementById(`${identID}`)
    element.classList.add("selected");
    document.getElementById(`${identID}`).style.background = "orange";



    lastIdentShow = identID

};


showIdent = (bundtID) => {
    document.getElementById(`${bundtID}`).style.background = "blue";

    lastShow = bundtID
};

unLoad = () => {
    document.getElementById(`${lastShow}`).style.background = "#EDEDED";


};

stopTempAuto = () => {
    if (currentDur > 0) {
        sendCommand({
            "temp": 'stop'
        })

    }

}

stopIdentAuto = () => {
    if (currentIdentDur > 0) {
        sendCommand({
            "ident": 'stop'
        })

    }

}


play = () => {

    $(".temp").css("pointer-events", "none");

    if (!stopPreviewPlay) {
        document.getElementById(`${current}`).style.background = "red";

        setTimeout(stopTempAuto, currentDur);
        console.log(currentDur);


    }

}

playIdent = () => {

    if (!stopPreviewIdentPlay) {
        document.getElementById(`${currentIdent}`).style.background = "red";

        setTimeout(stopIdentAuto, currentIdentDur);
        console.log(currentIdentDur);


    }

}
stop = () => {
    document.getElementById(`${current}`).style.background = "#EDEDED";

    tempOn = false;

};
stopIdent = () => {

    document.getElementById(`${currentIdent}`).style.background = "#EDEDED";
}

let alreadyStopped = false;
let identAlreadyStopped = false;

let auto = document.getElementById('checkbox').checked
nextElement = () => {

    let auto = document.getElementById('checkbox').checked
    if (auto) {

        if (currentNumber === worldCount) {
            document.getElementById("box1").click();
        } else {
            let element = currentNumber + 1;
            let nextElement = "box" + element;
            console.log(nextElement);
            document.getElementById(nextElement).click();
        }
    } else {

        let element = currentNumber;
        let nextElement = "box" + element;
        console.log(nextElement);
        document.getElementById(nextElement).style.background = "#EDEDED";


    }
}

nextIdentElement = () => {

    let auto = document.getElementById('checkbox').checked
    if (auto) {


        if (currentIdentNumber === worldCountIdent) {
            document.getElementById("boxIdent1").click();
        } else {
            let element = currentIdentNumber + 1;
            let nextIdentElement = "boxIdent" + element;
            console.log(nextIdentElement);
            document.getElementById(nextIdentElement).click();
        }
    } else {

        let element = currentIdentNumber;
        let nextIdentElement = "boxIdent" + element;
        console.log(nextIdentElement);
        document.getElementById(nextIdentElement).style.background = "#EDEDED";

    }
}


reloadCurrent = () => {

    if (currentNumber > worldCount) {
        document.getElementById("box1").click();
    } else {
        document.getElementById(current).click();
    }

    if (currentIdentNumber > worldCountIdent) {
        document.getElementById("boxIdent1").click();
    } else {
        document.getElementById(currentIdent).click();

    }

}


lastElement = () => {

}

makeRundown = (data, page, pageClass) => {

    console.log(data);
    worldCount = 0;
    worldCountIdent = 0;
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
                let inTimeValue = 'No time set';
                let durTimeValue = 'No Time set';
                if (typeof mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr !== 'undefined') {

                    if (Array.isArray(mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr)) {
                        durTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr[1]['$t'];
                        inTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr[0]['$t'];

                    } else if (typeof mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr === 'object') {



                        if (mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr.name === "Duration") {
                            durTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr['$t'];
                        } else {
                            inTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr['$t'];

                        }


                    }



                }
                // if (typeof mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr !== 'undefined') {
                //   durTimeValue = mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG.tcDescr[1]['$t'];
                // } else {
                // durTimeValue = "no time/ Octopus"
                // }


                createHist(navn, page, pageClass)
                createAveco(mosIDtjek[i].mosExternalMetadata.mosPayload.astra_payloadObjectCG, inTimeValue, mosIDtjek[i].itemSlug, page, pageClass, durTimeValue)


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





stopPreviewCh = (layer) => {
    sendCommand({
        "preview": `${layer}`
    });
    console.log('clear preview')
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
        //showLoad(current, currentNumber);
        //showLoadIdent(currentIdent, currentIdentNumber);
        reloadCurrent();
    }

    if (data.hasOwnProperty('tempRun')) {

        let state = data['tempRun'];
        console.log(state)
        switch (state) {
            case "On":
                $(".temp").css("pointer-events", "none");
                play();
                break;
            case "Off":
                stopPreviewCh(10)
                $(".temp").css("pointer-events", "auto");
                console.log('offffffffffffffff')
                nextElement();


        }

    }

    if (data.hasOwnProperty('identRun')) {
        let state = data['identRun'];
        console.log(state)
        switch (state) {
            case "On":
                $(".ident").css("pointer-events", "none");
                playIdent();
                break;
            case "Off":
                stopPreviewCh(11)
                $(".ident").css("pointer-events", "auto");
                console.log('offffffffffffffff')
                nextIdentElement();

        }

    }
    //console.log(data['update'])
}