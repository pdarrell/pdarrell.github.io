/**
 * JavaScript file for Home Portal
 */

function toggleMenu()
{
    document.getElementById("primaryNav").classList.toggle("hide");

}

function contactCopyright()
{
    document.getElementById("copyright").innerHTML += "Purnell Darrell &bull; " + getCurrentDate();
    displayBanner();
}

function getCurrentYear()
{
    var date = new Date();
    var year = date.getFullYear();
    return year;
}

function getCurrentDate()
{
    var date = new Date();
    var month = findMonth(date.getMonth());
    var day = date.getDate();
    var year = date.getFullYear();
    var dayString = findDay(date.getDay());
    return (dayString + ", " + day + " " + month + " " + year);
}

function findMonth(monthNumber)
{
    switch (monthNumber)
    {
        case 0:
            return "January";
        case 1:
            return "February"; 
        case 2:
            return "March"; 
        case 3:
            return "April";  
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "";
    }  
}

function findDay(dayNumber)
{
    switch (dayNumber)
    {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return dayNumber;
    }
}

function displayBanner()
{
    var date = new Date();
    //check if Friday
    if (date.getDay() == 5)
    {
        document.getElementById("banner").classList.add("showBanner");
        document.getElementById("banner").classList.remove("hideBanner");
    } else 
    {
        document.getElementById("banner").classList.add("hideBanner");
        document.getElementById("banner").classList.remove("showBanner");
    }

}

const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5607916&units=imperial&APPID=5c27898ab10ffcaa281096e13e364005";


fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    //console.log(jsObject);
    document.getElementById('currentDescription').innerHTML = jsObject.weather[0].main;
    document.getElementById('highTemp').innerHTML = jsObject.main.temp_max;
    document.getElementById('windspeed').innerHTML = jsObject.wind.speed;
    document.getElementById('humidity').innerHTML = jsObject.main.humidity;

    calculateWindchill(jsObject.main.temp, jsObject.wind.speed);

    forecast();

  });

function forecast()
{
    const apiForecastURL = "//api.openweathermap.org/data/2.5/forecast?id=5607916&units=imperial&APPID=5c27898ab10ffcaa281096e13e364005";
    
    fetch(apiForecastURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        
        const today = new Date();
        const forecastDiv= document.getElementById('fivedayforecast');
        let currentDay = today.getDay();
        let savedDay = currentDay;
        for (let i=5; i <= 40; i = (i + 8))
        {
            
            let dayDiv = document.createElement('div');
            let day =  calculateDay(savedDay);
            savedDay = day;
            const dayString = findDay(day);
            dayDiv.setAttribute('id', dayString);

            let h5 = document.createElement('h5');
            h5.innerText = dayString;
            dayDiv.appendChild(h5);

            const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[i].weather[0].icon + '.png';
            const desc = jsObject.list[i].weather[0].description;
            let image = document.createElement('img');
            image.setAttribute('src', imagesrc);
            image.setAttribute('alt', desc);
            dayDiv.appendChild(image);
            
            let dayTemp = document.createElement('p');
            dayTemp.innerText = Math.round(jsObject.list[i].main.temp) + '°';
            dayDiv.appendChild(dayTemp);

            forecastDiv.appendChild(dayDiv);
        }

    });

}

function calculateDay(dayNumber)
{
    let day = dayNumber;

    if (day >= 6)
    {
        day = 0;
    } else{
        day++;
    }

    return day;
}