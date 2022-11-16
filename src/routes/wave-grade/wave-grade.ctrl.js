const { Router } = require("express");
const router = Router();
// import fetch from "node-fetch";
const fetch = require("node-fetch");

// get raw data from stormglass API
exports.get_raw_data = async (req, res) => {
    try{
        const lat = 58.7984;
        const lng = 17.8081;
        const params = 'waveHeight,wavePeriod, windSpeed, waveDirection, windDirection';
        
        fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
          headers: {
            'Authorization': '8f0d79b4-65db-11ed-a654-0242ac130002-8f0d7a18-65db-11ed-a654-0242ac130002'
          }
        }).then((response) => response.json()).then((jsonData) => {
            console.log(jsonData);
            res.send(jsonData);
        });        
    } catch (err) {
        console.log(err);
        res.send("error");
    }
}

exports.get_root = async (req,res) => {
    try {
        res.status(200).send("Helloe World");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
};

