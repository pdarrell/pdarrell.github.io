/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
* Called from HTML to retrieve json file and parse to object
* @param {type} jsonFile
* @returns {undefined}
*/
function retrieveBooksFromWebservice(webservice, timeframe)
{
    var releaseDate = null;
    if(timeframe == "") {
        document.getElementById("displayMsgDiv").innerHTML = "Must select a timeframe from the list.";
        return;
    } else{
        document.getElementById("displayMsgDiv").innerHTML = "";
        releaseDate = processTimeframeToReleaseDate(timeframe);
    }
    
     var localStorage = window.localStorage;
     if (localStorage.length > 0){
         localStorage.clear();
         // clear child divs of board div
        var board = document.getElementById("board");
        var child = board.lastElementChild;  
        while (child) { 
            board.removeChild(child); 
            child = board.lastElementChild; 
        } 
     }
    
    //setup webservice to call
    webservice += releaseDate + "/hardcover-fiction.json";
    webservice += "?api-key=RBgG8Wx9awVNFKTXVVAKYeKTw7ouJJBp"

    //Call the ajax parse json process               
    ajax_json(webservice, function(data){
        if (data !== undefined) {
            var books = processJSONObjToBooks(data);
            if (books !== undefined && books.length !== 0){
               // var i = 0;
               // do {
               //     window.localStorage.setItem("Book" + (i+1), books[i]);
               //     i++;
               // } while (books.length > i);
               window.localStorage.setItem("Books", JSON.stringify(books));
            }
            //window.localStorage.setItem("ReleaseDate", releaseDate);
            displayBooks();
            data=null;
        }
    });
}

/**
 * Book object
 * @param {type} title
 * @param {type} author
 * @param {type} ISDN
 * @param {type} review
 * @returns {Book}
 */
function Book(title, author, ISDN, review)
{
    this.title = title;
    getTitle = function(){
        return this.title;
    }
    this.author= author;
    getAuthor = function(){
        return this.author;
    }
    this.ISDN = ISDN;
    getISDN = function(){
        return this.ISDN;
    }
    this.review = review;
    getReview = function(){
        return this.review;
    }
    this.toString = function() {
        return "Title: " + this.title + ", Author: " + this.author + ", ISDN: " + this.ISDN + ", Review link: " + this.review;
    }
    
    this.description = "";
}

/**
 * Display on screen books' book objects
 * @returns {undefined}
 */
function displayBooks()
{
    var localStorage = window.localStorage;
    if(localStorage.length > 0)
    {
        //var releaseDate = formatDateReadable(localStorage.getItem("ReleaseDate"));
        var books = JSON.parse(localStorage.getItem(localStorage.key(0)));
        var i = 0;
        while (i < books.length)
        {
           //var key = localStorage.key(i);
           //var item = localStorage.getItem(key);
           var book = books[i];
           var key = "Book" + (i+1);
           addDivElements(key, document.getElementById("endDiv"));
           //addTextToDiv(key + "CardFront", key);
           createFrontText(key + "CardFront", book);
           i++;
        }
        /*if (releaseDate != undefined || releaseDate != null)
        {
            displayReviewDateMessage(releaseDate);
        }*/
    }
}

/*
 * Formats the date from webservice format to readable format
 * @param {type} date
 * @returns {undefined}
 */
function formatDateReadable(dateString)
{
    if (dateString == "current")
    {
        returnDate = new Date();
    }else{
        var returnDate = new Date(dateString);
    }
    var year = returnDate.getFullYear();
    var month = findMonthName(returnDate.getMonth());
    var day = returnDate.getDate();
    returnDate = month + " " + day + ", " + year;
    return returnDate;
}

/*
 * Get the month name from number value
 * @param {type} month
 * @returns {String}
 */
function findMonthName(month)
{
    if (month != undefined || month != null)
    {
        switch (month)
        {
            case 0:
               return "January";
            case 1:
               return "Febuary";
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
               return month;
        };
               
               
    }
}

/*
 * Create the div elements for the front
 * @param {type} divId
 * @param {type} book
 * @returns {undefined}
 */
function createFrontText(divId, book)
{
    var cssClasses = [];
    //book
    cssClasses = ["centerText"];
    createTextDiv(divId, "<h3>" + divId.substring(0, (divId.length -9)) + "</h3>", "BookDiv", cssClasses);
    
    //title
    cssClasses = ["centerText"];
    createTextDiv(divId, "<h3>" + book.title + "</h3>", "TitleDiv", cssClasses);
    
    //author
    //cssClasses = ["halfWidth", "floatLeft"];
    cssClasses = ["centerText"];
    createTextDiv(divId, "Author: " + book.author, "AuthorDiv", cssClasses);
    
    //ISDN
    //cssClasses = ["halfWidth", "floatRight"];
    cssClasses = ["centerText"];
    createTextDiv(divId, "ISDN: " + book.ISDN, "ISDNDiv", cssClasses);
    
    //review
    cssClasses = ["link"];
    createTextDiv(divId, "Review link: " + addAnchorForReviewLink(book.review), "ReviewDiv", cssClasses);
    
    //description
    createTextDiv(divId, "Description: " + book.description, "DescDiv", ["centerDiv", "centerText"]);
    
}

/*
 * Create text within div
 * @param {type} divId
 * @param {type} text
 * @param {type} childDivId
 * @param {type} cssClasses
 * @returns {undefined}
 */
function createTextDiv(divId, text, childDivId, cssClasses)
{
    var frontDiv = document.getElementById(divId);
    var textDiv = document.createElement("div");
    textDiv.id = divId + childDivId;
    for (i=0; i < cssClasses.length; i++)
    {
        textDiv.classList.add(cssClasses[i]);
    }
    addChildDiv(frontDiv, textDiv, null);
    addTextToDiv(textDiv.id, text);
}

/**
 * Add text to the specified div
 * @param {type} id
 * @param {type} text
 * @returns {undefined}
 */
function addTextToDiv(id, text)
{
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).refresh;
}



/**
  * Retrieves json file and parses to object
  * @param {type} jsonfile
  * @param {type} callback
  * @returns {undefined}
  */
function ajax_json(jsonfile, callback)
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
                var group = JSON.parse(httpRequest.responseText);
                callback(group);
        }
    };
    httpRequest.open("GET", jsonfile, true);
    httpRequest.send();
}

/**
 * Process the selection string to date string
 * @param {type} timeframe
 * @returns {c|String}
 */
function processTimeframeToReleaseDate(timeframe) 
{
    var releaseDate = null;
    var newDate = null;
    if (timeframe == "Current week")
    {
        releaseDate = "current";
    }else if (timeframe == "Last week")
    {
        newDate = determineDateBasedOnToday(-7);
        releaseDate = formatDate(newDate);
    }else if (timeframe == "Last month")
    {
        newDate = determineDateBasedOnToday(-30);
        releaseDate = formatDate(newDate);
    }else if (timeframe == "Last year")
    {
        newDate = determineDateBasedOnToday(-365);
        releaseDate = formatDate(newDate);
    }
        
    return releaseDate;
}

/*
 * Add/substract days from today's date
 * @param {type} numDays
 * @returns {determineDateBasedOnToday.newDate|Date}
 */
function determineDateBasedOnToday(numDays)
{
    var today = new Date();
    var newDate = new Date();
    if (numDays != undefined || numDays != null)
    {
        newDate.setDate((today.getDate() + numDays));
    }
    return newDate;
}

/*
 * Format the date to the string required by webservice
 * @param {type} date
 * @returns {String}
 */
function formatDate(date)
{
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) + "";
    var day = date.getDate() + "";
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    return year + "-" + month + "-" + day;
}

/**
 * Process JSON object to Books array of Book object
 * @param {type} jsonObj
 * @returns {Array}
 */
function processJSONObjToBooks(jsonObj)
{
    var books = [];
    var i = 0;
    var jsonBooks = jsonObj.results.books;
    if (jsonBooks !== undefined)
    {
        do {
            var book = new Book(jsonBooks[i].title, jsonBooks[i].author, jsonBooks[i].primary_isbn13, jsonBooks[i].book_review_link);
            book.description = jsonBooks[i].description;
            books[i] = book;
            i++;
        } while (jsonBooks.length > i)
    }
    return books;
}

/**
 * Put reviewLink into an anchor element
 * @param {type} elementName
 * @param {type} reviewLink
 * @returns {Node|String}
 */
function addAnchorForReviewLink(reviewLink)
{
    if (reviewLink == ""){
        return "No review";
    }
    var anchor = "<a target=\"_blank\" href='" + reviewLink + "'>" + reviewLink + "</a>";
    
    return anchor;
}

/**
 * Create div
 * @returns {findParentElement.element|HTMLCollection.elements}
 */
function addDivElements(id, beforeElement)
{
    var element = document.createElement("div");
    element.id = id;
    element.classList.add("container");
    var card = document.createElement("div");
    card.id = id + "Card";
    card.classList.add("card");
    card.classList.add("lightblue");
    /*if (even(id)){
        element.classList.add("rightDiv");
    }else
    {
        element.classList.add("leftDiv");
    }*/
    element.classList.add("centerDiv");
    createFrontDiv(card);
    createBackDiv(card);
    addChildDiv(element, card, element.childNodes[0]);
    var formElement = document.getElementById("board");
    formElement.insertBefore(element, formElement.beforeElement);
}

/**
 * Creates the front div
 * 
 */
function createFrontDiv(card)
{
    var front = document.createElement("div");
    front.id = card.id + "Front";
    front.classList.add("front");
    front.classList.add("centerText");
    addChildDiv(card, front, card.childNodes[0]);
}

/*
 * Creates the back div
 * 
 */
function createBackDiv(card)
{
    var back = document.createElement("div");
    back.id = card.id + "Back";
    back.classList.add("back");
    back.classList.add("centerText");
    addChildDiv(card, back, card.childNodes[1]);
}

/**
 * Add child div to parent div
 * @param {type} parentDiv
 * @param {type} childDiv
 * @param {type} beforeDiv
 * @returns {undefined}
 */
function addChildDiv(parentDiv, childDiv, beforeDiv)
{
   parentDiv.insertBefore(childDiv, beforeDiv);
}

/**
 * Check if id number is even
 * @type Boolean
 */
function even(id)
{
    var even = false;
    var number = id.substring(id.length -1, id.length);
    var value = (number % 2);
    if (value === 0)
    {
        even = true;
    }
    return even;
}
 


