

function displayDiv(divId, idDisplay, idHide)
{
    var element = document.getElementById(divId);
    element.classList.remove("hide");
    element.classList.remove("removeBorder");
    element.classList.add("addBorder");
    element.classList.remove("shrink");
    element.addEventListener("click", function() {element.style.transform = "grow"});
    element.classList.add("grow");
    element.classList.add("display");
    var hideElement = document.getElementById(idHide);
    hideElement.classList.remove("hide");
    hideElement.classList.add("display");
    var displayElement = document.getElementById(idDisplay);
    displayElement.classList.remove("display");
    displayElement.classList.add("hide");
}

function hideDiv(divId, idHide, idDisplay)
{
    var element = document.getElementById(divId);
    element.classList.remove("display");
    element.classList.remove("addBorder");
    element.classList.add("removeBorder");
    element.classList.remove("grow");
    element.addEventListener("click", function() {element.style.transform = "shrink"});
    element.classList.add("shrink");
    element.classList.add("hide");
    var displayElement = document.getElementById(idHide);
    displayElement.classList.remove("display");
    displayElement.classList.add("hide");
    var hideElement = document.getElementById(idDisplay);
    hideElement.classList.remove("hide");
    hideElement.classList.add("display");
}

/*function stripAction(text)
{
    if (text !== "")
    {
        if (text.length > 0)
        {
            var returnString = "";
            for (i=(text.length-1); i>0; i--)
            {
                if (text[i] !== " ")
                {
                    if (returnString === "") {
                        returnString = text[i];
                    }else {
                        returnString = text[i] + returnString;
                    }
                } else
                {
                    return returnString;
                }
            }
        }
     
    }
}*/