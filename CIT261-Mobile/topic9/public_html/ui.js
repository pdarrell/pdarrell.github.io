
/**
 * Display div and add or remove the classes for it and the display and hide elements
 * @param {type} divId
 * @param {type} idDisplay
 * @param {type} idHide
 * @returns {undefined}
 */
function displayDiv(divId, idDisplay, idHide)
{
    var element = document.getElementById(divId);
    element.classList.remove("hide");
    element.classList.remove("removeBorder");
    element.classList.add("addBorder");
    element.classList.remove("shrink");
    element.classList.add("display");
    element.classList.add("grow");
    var hideElement = document.getElementById(idHide);
    hideElement.classList.remove("hide");
    hideElement.classList.add("display");
    var displayElement = document.getElementById(idDisplay);
    displayElement.classList.remove("display");
    displayElement.classList.add("hide");
}

/**
 * Hide div and add or remove the classes for it and the display and hide elements
 * @param {type} divId
 * @param {type} idHide
 * @param {type} idDisplay
 * @returns {undefined}
 */
function hideDiv(divId, idHide, idDisplay)
{
    var element = document.getElementById(divId);
    element.classList.remove("display");
    element.classList.remove("addBorder");
    element.classList.add("removeBorder");
    element.classList.remove("grow");
    element.classList.add("shrink");
    window.setTimeout(function() {element.classList.add("hide")},1000);
    var displayElement = document.getElementById(idHide);
    displayElement.classList.remove("display");
    displayElement.classList.add("hide");
    var hideElement = document.getElementById(idDisplay);
    hideElement.classList.remove("hide");
    hideElement.classList.add("display");
}


function changeColor(element, color){
    element.style.color = color;
}


