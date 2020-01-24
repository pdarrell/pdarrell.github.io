/**
 * JavaScript file for Home Portal
 */

function lastModifiedCopyright()
{
    document.getElementById("lastModified").innerText += getLastModifiedDateTime() + " EST";
    document.getElementById("copyright").innerHTML += getCurrentYear() + " | Purnell Darell | Pennsylvania | <a target='_blank' href='https://www.byui.edu/online'>BYUI Online Learning</a>";
}

function getLastModifiedDateTime()
{
    return document.lastModified;
}

function getCurrentYear()
{
    var date = new Date();
    var year = date.getFullYear();
    return year;
}

