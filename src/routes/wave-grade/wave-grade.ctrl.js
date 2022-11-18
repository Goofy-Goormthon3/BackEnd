const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const moment = require("moment-timezone");
import { rawDataLoader } from "./src/rawDataLoader";
import { waveGrader } from "./src/waveGrader";
import spotCodeData from "./data/spotCode";

exports.get_wave_info_total_data = async (req,res) => {
    try { 
        console.log("=================");
        let spotCodeNum = req.query.SpotCode;
        
        const rawData = await rawDataLoader(spotCodeData.lat[spotCodeNum], spotCodeData.lat[spotCodeNum], spotCodeData.observationCode[spotCodeNum]);
        const waveGradeScore = await waveGrader(rawData);
        console.log(waveGradeScore);
        let waveGrade = 0;

        if (waveGradeScore<20)
            waveGrade=1;
        else if (waveGradeScore<40)
            waveGrade=2;
        else if (waveGradeScore<60)
            waveGrade=3;
        else if (waveGradeScore<80)
            waveGrade=4;
        else
            waveGrade=5;

        //Need to be changed
        let totalData = {
            WaveGrade: waveGrade.toString(),
            WaveHeight: rawData.WaveHeight.toString(),
            WindSpeed: rawData.WindSpeed.toString(),
            AirTemp: rawData.AirTemp.toString(),
            WaterTemp: rawData.WaterTemp.toString(), 
        }
        res.send(totalData);
    } catch (error) {
        console.log(error);
        res.send("error");
    }
} 

// get raw data from stormglass API
exports.get_raw_data = async (req, res) => {
    try{
        const lat = req.query.lat;
        const lng = req.query.lng;

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
            
            res.send(resultData);
        });    
    } catch (err) {
        console.log(err);
        res.send("error");
    }
}


// get raw data from stormglass API
exports.get_root = async (req,res) => {
    try {
        let start= moment().utc().valueOf();
        let end = start;
        // res.status(200).send("Helloe World");

        await fetch(`https://www.nifs.go.kr/OpenAPI_json?id=risaCode&key=qPwOeIrU-2211-hyhsumin01-0515`, {
        }).then((response) => response.json()).then((jsonData) => {
            console.log(jsonData);
            res.send(jsonData);
            // resultData.waterTemp = jsonData.hourly.apparent_temperature[];      
        });        
    } catch (err) {curHourNum
        console.log(err);
        res.send("error");
    }
};

