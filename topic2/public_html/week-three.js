/**
 * JavaScript Fluency and JSONParse, Stringify, and JavaScript Objects
 */
/**
* Parse out the filename from a path based on a Windows or Unix delimiter
* Moving backwards and going to the first delimiter
* return the filename
*/
function parseFilenameFromPath(fullPath){
    var filename = "";
    if (fullPath !== ""){
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
	if (fullPath !== "")
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

/** FileSystePath object
 * 
 * @returns {fileSystemPath.filename|String}
 */
function FileSystemPath()
{
    var filename;
    this.filename = function()
    {
        return this.filename;
    };
    this.filename = function(filename)
    {
        this.filename = filename;
    };
    var drive;
    this.drive = fucntion()
    {
        return this.drive;
    };
    this.drive = function(drive)
    {
        this.drive = drive;
    };
    var directory;
    this.directory = fucntion()
    {
        return this.directory;
    };
    this.directory = function(directory)
    {
        this.directory = directory;
    };
    var uncShare;
    this.uncShare = function() 
    { 
        return this.uncShare;
    };
    this.uncShare = fucntion(share)
    {
        this.uncShare = share;
    };
    var uncPath;
    this.uncPath = fucntion()
    {
        return this.uncPath;
    };
    this.uncPath = function(uncPath)
    {
        this.uncPath = uncPath;
    };
    var extension;
    this.extension = fucntion()
    {
        return this.extension;
    };
    this.extension = fucntion(extension)
    {
        this.extension = extension;
    };
}

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
    filename.outputText = packageObj.filename;
    var extension = Object.create(pathEntity);
    extension.delimiter = ".";
    extension.inputText = filename.outputText;
    extension.outputText = findExtension(extension);
    var pathEntities = parsePathEntities(getPathOnly(path, filename.outputText.length), Object.create(pathEntity));
    
    //loop through pathEntities array to find valued elements
    var systemPath = new FileSystemPath();
    for (i=0; i <= pathEntities.length; i++) {
        if (pathEntities["drive"] !== "undefined")
        {
            systemPath.drive = pathEntities["drive"].outputText;
        } else if (pathEntities["uncPath"] !== "undefined")
        {
            systemPath.uncPath = pathEntities["uncPath"].outputText;
        } else if (pathEntities["share"] !== "undefined")
        {
             systemPath.uncShare = pathEntities["share"].outputText;
        } else if (pathEntities["directory"] !== "undefined")
        {
             systemPath.directory = pathEntities["directory"].outputText;
        }
    
    }
    systemPath.filename = filename.outputText;
    systemPath.extension = extension.outputText;
    
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
                result = uncPath.delimiter;
            } else if (path[i] == ":") 
            { //drive
                drive = Object.create(pathEntity);
                drive.delimiter = ":";
                drive.output = result;
                result = "";
            } else if (path[i] == "\\") 
            { //windows directory or unc path or share
                //unc path
                if (uncPath !== null)
                {
                    uncPath.outputText = result;
                    result = "";
                } else if (uncPath !== null && uncPath.outputText !== "")
                { //unc share
                    share = Object.create(pathEntity);
                    share.delimiter = "\\";
                    share.outputText = result;
                    result = "";
                } else
                {
                    directory = Object.create(pathEntity);
                    directory.delimiter = "\\";
                    if (result != "")
                    {
                        directory.outputText = result;
                        result = "";
                    }else {
                        result += path[i];
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
                }else {
                    result += path[i];
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
        for (i=inputText.length; i >= 0; i--)
        {
            if (inputText[i] == extensionEntity.delimiter)
            {
                break;
            } else 
            {
                if (extension == "") {
                    extension = inputText[i];
                } else {
                    extension = inputText[i] + extension;
                }
            }
        }
    }
    return extension;
}