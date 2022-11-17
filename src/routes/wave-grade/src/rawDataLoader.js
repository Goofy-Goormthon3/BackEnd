const fetch = require("node-fetch");
const moment = require("moment-timezone");


function rawDataLoader(lat, lng){
    let curTime = moment().tz("Asia/Seoul");
    let curHourNum = parseInt(curTime.format("HH"));

    let resultData = {};

    fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,wave_direction,wave_period&timezone=Asia/Seoul`, {
    }).then((response) => response.json()).then((jsonData) => {
        resultData = {
            'WaveHeight': jsonData.hourly.wave_height[curHourNum],
            'WaveDec': jsonData.hourly.wave_direction[curHourNum],
            'WavePeriod': jsonData.hourly.wave_period[curHourNum],
        }
    });    
    
    fetch(`https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${lng}&hourly=apparent_temperature,windspeed_10m,winddirection_10m&timezone=Asia/Seoul`, {
    }).then((response) => response.json()).then((jsonData) => {
        resultData.WindSpeed = jsonData.hourly.windspeed_10m[curHourNum];
        resultData.WindDec = jsonData.hourly.winddirection_10m[curHourNum];        
    });    

    return resultData;
}

module.exports({rawDataLoader});
