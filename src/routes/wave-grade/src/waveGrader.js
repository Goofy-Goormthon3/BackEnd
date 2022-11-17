
export async function waveGrader(rawData) {  
    let waveScore = 0;
    let waveHeight = rawData.WaveHeight;
    let waveDec = rawData.WaveDec;
    let wavePeriod = rawData.WavePeriod;
    let windDec = rawData.WindDec;
    let windSpeed = rawData.WindSpeed;

    let waveHeightScore = 0.0;
    let wavePeriodScore = 0.0;
    let windSpeedScore = 0.0;
    let decScore = 0.0;

    //WaveHeight Score
    if (waveHeight <= 0.2) 
        waveHeightScore=0;
    else if (waveHeight <= 0.5)
        waveHeightScore=5;
    else if (waveHeight <= 0.7)
        waveHeightScore=waveHeight*100-40;
    else if (waveHeight <= 1.2)
        waveHeightScore=waveHeight*150-50;
    else if (waveHeight <= 1.8)
        waveHeightScore=waveHeight*25-45;
    else
        waveScore=100;

    //WavePeriod Score
    if (wavePeriod >= 8 && wavePeriod <= 12)
        wavePeriodScore=100;
    else if (wavePeriod >= 6)
        wavePeriodScore=50;

    //WindSpeed Score
    if (windSpeed <= 9.3)
        windSpeedScore=100;
    else if (windSpeed <= 16)
        windSpeedScore=60;
    else if (windSpeed <= 28)
        windSpeedScore=30;

    //Onshore&Offshore Score
    let ceta = Math.abs(waveDec - windDec);
    if (ceta>180)
        ceta-=360;
    if (ceta>80)
        decScore = ceta;    
    
    console.log(waveHeightScore, wavePeriodScore, windSpeedScore, decScore);

    waveScore = waveHeightScore*0.5 + wavePeriodScore*0.1 + windSpeedScore*0.3 + decScore*0.1;

    return waveScore;
};
