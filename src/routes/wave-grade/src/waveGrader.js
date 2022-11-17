// const rawData = {
//     "WaveHeight": 0.68,
//     "WaveDec": 87,
//     "WavePeriod": 4.05,
//     "WindSpeed": 23.7,
//     "WindDec": 46
// };

export async function waveGrader(rawData) {  
    let waveScore = 0;
    let waveHeight = rawData.WaveHeight;
    let waveDec = rawData.WaveDec;
    let wavePeriod = rawData.WavePeriod;
    let windDec = rawData.WindDec;
    let windSpeed = rawData.WindSpeed;

    //WaveHeight Score
    if (waveHeight <= 0.2) 
        waveScore+=0;
    else if (waveHeight <= 0.5)
        waveScore+=5;
    else if (waveHeight <= 0.7)
        waveScore+=15;
    else if (waveHeight <= 1.2)
        waveScore+=20;
    else if (waveHeight <= 1.8)
        waveScore+=30;
    else
        waveScore+=40;

    //WavePeriod Score
    if (wavePeriod >= 6)
        waveScore+=5;
    else if (wavePeriod >= 8 && wavePeriod <= 12)
        waveScore+=10;

    //WindSpeed Score
    if (windSpeed <= 5)
        waveScore+=30;
    else if (windSpeed <= 10)
        waveScore+=15;
    else if (windSpeed <= 15)
        waveScore+=5;

    //Onshore&Offshore Score
    let ceta = Math.abs(waveDec - windDec)
    if (ceta >= 60 )
        waveScore+=5;
    else if (ceta >= 90)
        waveScore+=10;
    else if (ceta >= 120)
        waveScore+=15;
    else if (ceta >= 160)
        waveScore+=20;
    
    console.log(rawData);
    console.log(waveScore);
    console.log("=================");

    return waveScore;
};
