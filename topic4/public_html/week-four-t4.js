/**
 * JavaScript Fluency and JSONParse, Stringify, and JavaScript Objects, CSS Class Properies Manipulation
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

/**
 * Parse the parts of path (called from HTML)
 * @param {type} path
 * @returns {FileSystemPath|parsePathParts.FileSystemPath}
 */
function parsePathParts(path)
{
    var pathEntity = {
        delimiter : "",
        inputText : "",
        outputText : ""
    };
    
    var packageObj;
   
    packageObj =  createPathAndFilenameObject(path);
    
    var filename = Object.create(pathEntity);
    filename.outputText = stripExtensionFromFilename(packageObj.filename);
    var extension = Object.create(pathEntity);
    extension.delimiter = ".";
    extension.inputText = packageObj.filename;
    extension.outputText = findExtension(extension);
    var pathEntities = parsePathEntities(getPathOnly(path, filename.outputText.length), Object.create(pathEntity));
    
    // Define FileSystemPath object to store and be returned to caller
    var FileSystemPath = function(filename, drive, dir, path, share, extension)
    {
        this.filename = filename,
        this.drive = drive,
        this.directory = dir,
        this.uncShare = share,
        this.uncPath = path,
        this.extension = extension

        //Method printOutput
        this.printOutput = function(){
            if (this.drive !== ""){
                return "Drive: " + this.drive + ", Directory: " + this.directory + ", Filename: " + this.filename + ", Extension: " + this.extension;
            } else if (this.uncPath !== "") {
                return "UNC Path: " + this.uncPath + ", UNC Share: " + this.uncShare + ", Filename: " + this.filename + ", Extension: " + this.extension;
            } else if (this.directory !== "") {
                return "Directory: " + this.directory + ", Filename: " + this.filename + ", Extension: " + this.extension;
            }
        };
    };
    
    // define variable to hold fileSystePath object
    var systemPath = null;
    //Create FileSystemPath object and its values
    if (pathEntities.drive !== undefined)
    {
        systemPath = new FileSystemPath(filename.outputText,pathEntities["drive"].outputText, pathEntities["directory"].outputText,"","",extension.outputText);
    } else if (pathEntities.uncPath !== undefined)
    {
        systemPath = new FileSystemPath(filename.outputText,"", "",pathEntities["uncPath"].outputText,pathEntities["share"].outputText,extension.outputText);
    } else if (pathEntities.directory !== undefined)
    {
        systemPath = new FileSystemPath(filename.outputText,"", pathEntities["directory"].outputText,"","",extension.outputText);
    }
    
    return systemPath;
}

/**
 * Parses path given and returns the entities that make it up
 * @param {type} path
 * @returns {unresolved}
 */
function parsePathEntities(path, pathEntity)
{
    var pathEntities = [];
    var drive = null;
    var uncPath = null;
    var directory = null;
    var share = null;
    if (path !== "")
    {
        var result = "";
        // loop through path string to find path entities
        for (i = 0; i <= path.length; i++)
        {
            //check for unc
            if (path[i] == "\\" && path[i+1] == "\\")
            {
                uncPath = Object.create(pathEntity);
                uncPath.delimiter = "\\\\";
                i = 1;
            } else if (path[i] == ":") 
            { //drive
                drive = Object.create(pathEntity);
                drive.delimiter = ":";
                drive.outputText = result;
                result = "";
            } else if (path[i] == "\\") 
            { //windows directory or unc path or share
                if (uncPath !== null && uncPath.outputText !== "")
                { //unc share
                    share = Object.create(pathEntity);
                    share.delimiter = "\\";
                    share.outputText = result;
                    result = "";
                } else if (uncPath !== null)
                {//unc path
                    uncPath.outputText = result;
                    result = "";
                } else 
                {
                    directory = Object.create(pathEntity);
                    directory.delimiter = "\\";
                    if (result != "")
                    {
                        directory.outputText = result;
                        result = "";
                    }
                }
            } else if (path[i] == "/")
            {//unix delimiter
                directory = Object.create(pathEntity);
                directory.delimiter = "/";
                if (result !== "")
                {
                    directory.outputText = result;
                    result = "";
                }
            }
            else
            {
                result += path[i];
            }
        }
    }
    
    if (drive !== null)
    {
        pathEntities["drive"] = drive;
    } 
    if (uncPath !== null)
    {
        pathEntities["uncPath"] = uncPath;
    } 
    if (share !== null)
    {
        pathEntities["share"] = share;
    } 
    if (directory !== null)
    {
        pathEntities["directory"] = directory;
    }
    return pathEntities;
}

/**
 * find the extesion from a filename
 * @param {type} extnesionEntity
 * @returns {undefined}
 */
function findExtension(extensionEntity)
{
    var extension = "";
    if (extensionEntity !== "undefined"){
        var inputText = extensionEntity.inputText;
        for (i=(inputText.length - 1); i >= 0; i--)
        {
            if (inputText[i] == extensionEntity.delimiter)
            {
                break;
            } else 
            {
                if (extension === "") {
                    extension = inputText[i];
                } else {
                    extension = inputText[i] + extension;
                }
            }
        }
    }
    return extension;
}

function stripExtensionFromFilename(filename)
{
    var result = "";
    if (filename !== "")
    {
        for (i=0;i <= filename.length; i++)
        {
            if (filename[i] == ".")
            {
                break;
            } else {
                result += filename[i];
            }
        }
    }
    return result;
}

/**
 * a single item of label and value
 * @param {type} label
 * @param {type} value
 * @returns {Item}
 */
function Item(label, value)
{
    this.label = label;
    this.value = value;
}

/**
 * Return array of Lables and Values
 * @param {type} labelArray
 * @param {type} valueArray
 * @returns {LabelsAndValues}
 */
function LabelsAndValues(labelArray, valueArray)
{
    this.labels = labelArray;
    
    this.values = valueArray;
}

/**
 * Parse the Label and values from input string
 * @param {type} input
 * @returns {undefined}
 */
function parseLabelsAndValues(input){
    var inputArray = input.split(",");
    var items = [];
    //check it items array is defined
    if (inputArray !== undefined)
    {
        //for each item string in array
        for (i=0; i<inputArray.length; i++)
        {
            //split each input array item into its parts 
            //(label and value and create an Item object
            //set to items array
            var labelValue = inputArray[i].split(":");
            var item = new Item(labelValue[0], labelValue[1]);
            items[i] = item;
        }
    }
    var labelsAndValues = null;
    if (items.length > 0)
    {
        var labels = [];
        var values = [];
        for (i=0; i < items.length; i++)
        {
            var item = items[i];
            labels[i] = item.label;
            values[i] = item.value;
        }
        labelsAndValues = new LabelsAndValues(labels, values);
    }
    return labelsAndValues;
}