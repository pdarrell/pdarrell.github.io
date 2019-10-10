/**
 * JavaScript Fluency and JSONParse, Stringify
 */
/**
* Parse out the filename from a path based on a Windows or Unix delimiter
* Moving backwards and going to the first delimiter
* return the filename
*/
function parseFilenameFromPath(fullPath){
    var filename = "";
    if (fullPath != ""){
        var i=(fullPath.length -1);
        for (i; i>=0; i--){
            var charValue = fullPath[i];
            if (charValue == "\\" || charValue == "/"){
                return filename;
            }else {
               filename = charValue + filename;
            }
        }
    }
}

/**
* Get path only from full path, 
* by using the filename length as end index
* return Path
*/
function getPathOnly(fullPath, index){
	
	var path = fullPath.substring(0, (fullPath.length - index));
	return path;
}

/**
* Create object with filename and path elements
*
*/
function createPathAndFilenameObject(fullPath) {
	var filename = "";
	var path = "";
	if (fullPath != "")
	{
		/* get filename from path */
		filename = parseFilenameFromPath(fullPath);
                var index = filename.length;
                path = getPathOnly(fullPath, index);
	}
	/*create JSON package */
        var packageObj = {filename : filename, path : path};
        return packageObj;
}

/*
 * Create JSON string from JSON object
 * @param {JSON} jsonObj
 * @returns {String}
 */
function filenameAndPathString(jsonObj)
{
	return JSON.stringify(jsonObj);
	
}

/*
 * Parse JSON String to JSON object
 */
function parseJSONObject(jsonString)
{
	return JSON.parse(jsonString);
	
}

