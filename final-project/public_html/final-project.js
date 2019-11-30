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
     }
    
    //setup webservice to call
    webservice += releaseDate + "/hardcover-fiction.json";
    webservice += "?api-key=RBgG8Wx9awVNFKTXVVAKYeKTw7ouJJBp"

    //Call the ajax parse json process               
    ajax_json(webservice, function(data){
        if (data !== undefined) {
            var books = processJSONObjToBooks(data);
            if (books !== undefined && books.length !== 0){
                var i = 0;
                do {
                    window.localStorage.setItem("Book" + (i+1), books[i].toString());
                    i++;
                } while (books.length > i);
            }
            displayBooks();
            nytBooks = books;
            data=null;
        }
    });
}


function displayBooks()
{
    var localStorage = window.localStorage;
    if(localStorage.length > 0)
    {
        var i = 0;
        while (i < localStorage.length)
        {
           var key = localStorage.key(i);
           var item = localStorage.getItem(key);
           addDivElement(key, document.getElementById("endDiv"));
           addTextToDiv(key, key + ":<br>" + item);
           i++;
        }
    }
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
    if (timeframe == "Current week")
    {
        releaseDate = "current";
    }else if (timeframe = "Last week")
    {
        releaseDate = "2019-11-23"
    }else if (timeframe = "Last month")
    {
        releaseDate = "2019-10-30"
    }
    return releaseDate;
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
    this.author= author;
    this.ISDN = ISDN;
    this.review = review;
    this.toString = function() {
        return "Title: " + this.title + ", Author: " + this.author + ", ISDN: " + this.ISDN + ", Review link: " + this.review;
    }
    this.description = "";
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
            var book = new Book(jsonBooks[i].title, jsonBooks[i].author, jsonBooks[i].primary_isbn13, addAnchorForReviewLink(jsonBooks[i].book_review_link));
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
        return reviewLink;
    }
    var anchor = "<a target=\"_blank\" href='" + reviewLink + "'>" + reviewLink + "</a>";
    
    return anchor;
}

/**
 * Create div
 * @returns {findParentElement.element|HTMLCollection.elements}
 */
function addDivElement(id, beforeElement)
{
    var element = document.createElement("div");
    element.id = id;
    
    var formElement = document.getElementById("mainForm");
    formElement.insertBefore(element, formElement.beforeElement);
}
 
/**
 * StoreNYTBooks use localStorage to store the NYT books
 */
function storeNYTBooks()
{
    if (nytBooks == undefined)
    {
        document.getElementById("nytBooksOutput").innerHTML = "You must run the New York Times webservice first."
    }

    //process nytBooks and store in LocalStorage
    var localStorage = window.localStorage;
    //store an array of Book objects
    localStorage.setItem("NYTBooks", nytBooks);
    processNYTBooks(nytBooks);

    document.getElementById("nytBooksOutput").innerHTML = "LocalStorage count start as: " + localStorage.length + "<br>";

    //display NYTBooks localStorage
    document.getElementById("nytBooksOutput").innerHTML += "NYTBooks:<br>" + localStorage.getItem("NYTBooks") + "<BR><HR><BR>";

    // process individual book object in lcoalStoage
    if (localStorage.length > 0)
    {
        for(i=0;i <= (localStorage.length - 2); i++){
            document.getElementById("nytBooksOutput").innerHTML += "Book"+(i+1) + ": " + localStorage.getItem("Book"+i) + "<br>";
        }
        //document that localStorage is not empty
        document.getElementById("nytBooksOutput").innerHTML += "LocalStorage count ends as: " + localStorage.length + "<br>";
    }
}

