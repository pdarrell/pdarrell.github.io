/**
 * JavaScript file for Home Portal
 */

function contactCopyright()
{
    document.getElementById("contact").innerHTML += "email: dar17006@byui.edu";
    document.getElementById("copyright").innerHTML += getCurrentYear() + " - Purnell Darrell - " + getCurrentDate();
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
    return (month + " " + day + ", " + year);
}

function findMonth(monthNumber)
{
    switch (monthNumber)
    {
        case 0:
            return "Jan";
        case 1:
            return "Feb"; 
        case 2:
            return "Mar"; 
        case 3:
            return "Apr";  
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "";
    }



}