/**
 * JavaScript Fluency
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