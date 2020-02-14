function calculateWindchill(temp, windspeed)
{
    var windchill = "N/A";
    if (temp < 50 && windspeed > 3.0)
    {
        windchill = ((35.74 + (0.6215 * temp)) - (35.75 * Math.pow(windspeed, 0.16)) + (0.4275 * temp *  Math.pow(windspeed, 0.16)));
        windchill = Math.round(windchill);
    }
    document.getElementById("windchill").textContent = windchill;
}