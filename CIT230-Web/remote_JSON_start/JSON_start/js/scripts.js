//ADD the key and change units to imperial
const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=5c27898ab10ffcaa281096e13e364005"

//Go fetch it and then wait for a response.
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    //Once it comes back, display it to the console.
    console.log(weatherInfo);
    
    document.getElementById('place').innerHTML = weatherInfo.name;
    document.getElementById('currentTemp').innerHTML = weatherInfo.main.temp;
    document.getElementById('windSpeed').innerHTML = weatherInfo.wind.speed;

    const iconCode = weatherInfo.weather[0].icon;
    const imagesrc = 'https://openweathermap.org/img/w/' + iconCode + '.png';
    document.getElementById('weather_icon').textContent = imagesrc;
    document.getElementById('weather_icon').setAttribute('src', imagesrc);
    document.getElementById('weather_icon').setAttribute('alt', imagesrc);

 }); //end of "then" fat arrow function



