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
        
        const rawData = await rawDataLoader(spotCodeData.lat[spotCodeNum], spotCodeData.lat[spotCodeNum]);
        const waveGradeScore = await waveGrader(rawData);
        
        //Need to be changed
        let waterTemp = 20;
        let totalData = {
            WaveGrade: waveGradeScore,
            WaveHieght: rawData.WaveHeight,
            WindSpeed: rawData.WindSpeed,
            AirTemp: rawData.AirTemp,
            WaterTemp: waterTemp, 
        }
        // let totalData = {...rawData};
        // totalData.WaveGrade=waveGradeScore;
        // totalData.WaterTemp=waterTemp;

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
        
        const lat = req.query.lat;
        const lng = req.query.lng;

        const params = 'waveHeight,wavePeriod,windSpeed,waveDirection,windDirection';
        let start= moment().utc().valueOf();
        let end = start;

        fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
          headers: {
            'Authorization': '8f0d79b4-65db-11ed-a654-0242ac130002-8f0d7a18-65db-11ed-a654-0242ac130002'
          }
        }).then((response) => response.json()).then((jsonData) => {
            console.log("===============");
            console.log(jsonData);
            res.status(200).send(jsonData);
        });        
        // res.status(200).send("Helloe World");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};

