const mosaktive = require('./mosactive');
const fs = require('fs');
const get = require("./getConfig");
const fetch = require('node-fetch');


function status(res) {
    if (!res.ok) {
        __logger.error(res.status)
        throw new Error(res.statusText);
    }
    
    return res;
}   

fetchRundown = (api01, api02, name) => {
    try {
        fetch(api01)
        .then(status)
        .then(res => res.json())
        .then(json => {
            let convert = JSON.stringify(json)
            saveToDisk(convert, name)
        })
       .catch(error =>{
        fetch(api02)
                .then(res => res.json())
                .then(json => {
                    let convert = JSON.stringify(json)
                    saveToDisk(convert, name)              
                }
                )
        
       })
       .catch(error => {
        __logger.error('api02 error')
      })
        
        }

        
    
        catch(err){
            __logger.error("api01 error, connecting api02")
           
        } 
}


saveToDisk = (data, path) => {
    fs.writeFile('./rundowns/'+ path, data, function (err, data) {
        if (err) {
            __logger.error(err);
            
        }

    })
}

findRundowns = (liste) => {
    if(liste != undefined){
    var countKey = Object.keys(liste).length;
    for(var key in liste) {
        let rundown1 = get.config.api01.pathrundowns + liste[key]
        let rundown2 = get.config.api02.pathrundowns + liste[key]
        fetchRundown(rundown1, rundown2, liste[key])
    
   
    }
}
};

setInterval(function () { findRundowns(mosaktive.data);}, 3000);