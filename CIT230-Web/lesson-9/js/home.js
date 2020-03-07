/**
 * JavaScript file for Home Portal
 */


const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    const towns = jsonObject['towns'];
    for (let i = 0; i < towns.length; i++ ) {
        let townName = towns[i].name;
        if (townName == "Fish Haven" ||
            townName == "Preston" ||
            townName == "Soda Springs")
        {
            let townSection = document.createElement('section');
            let textdiv = document.createElement('div');
            
            let h2 = document.createElement('h2');
            h2.textContent = towns[i].name;
            textdiv.appendChild(h2);
            
            let h3 = document.createElement('h3');
            h3.textContent = towns[i].motto;
            textdiv.appendChild(h3);

            let founded = document.createElement('p');
            founded.textContent = 'Year Founded: ' + towns[i].yearFounded;
            textdiv.appendChild(founded);

            let population = document.createElement('p');
            population.textContent = 'Population: '+ towns[i].currentPopulation;
            textdiv.appendChild(population);

            let rainfall = document.createElement('p');
            rainfall.textContent = 'Annual Rainfall: '+ towns[i].averageRainfall;
            textdiv.appendChild(rainfall);

            townSection.appendChild(textdiv);

            let image = document.createElement('img');
            image.setAttribute('src', './images/' + towns[i].photo);
            image.setAttribute('alt', towns[i].name + ' - ' + towns[i].currentPopulation);
            townSection.appendChild(image);

            document.querySelector('div.towns').appendChild(townSection);
        }
    }
});



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

function updateStormSeverityLabel()
{
   document.getElementById("rangevalue").innerHTML = "value: " + document.getElementById("stormseverity").value;
}

