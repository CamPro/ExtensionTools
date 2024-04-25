
chrome.bookmarks.getTree(findOrCreateDestinationFolder);

function findOrCreateDestinationFolder(rootNodes)
{
    var rootNode;
    if(rootNodes.length>0)
    {
        rootNode = rootNodes[0];
    }
    var bookmarkBar = findBookmarksFolder(rootNode,'Bookmarks bar');
}

function findBookmarksFolder(rootNode, searchString)
{
    if(rootNode.url)
    {
        return null;
    }
    else if(rootNode.title.indexOf(searchString)>=0)
    {
        return rootNode;
    }
    for(var i=0; i<rootNode.children.length; i++)
    {
        var dest = findBookmarksFolder(rootNode.children[i], searchString);
        if(dest)
        {
            return dest;
        }
    }
    return null;
}

//click email
chrome.bookmarks.create({title:'Radio',parentId:'1',url:"javascript:void(function(){ document.querySelector('#id-signup-radio-email').click(); })();"});
//focus email
chrome.bookmarks.create({title:'Focus',parentId:'1',url:"javascript:void(function(){ document.querySelector('#emailVerification').focus(); })();"});
//send email
chrome.bookmarks.create({title:'Send',parentId:'1',url:"javascript:void(function(){ document.querySelector('.codeVerificator-btn-send').click(); })();"});
//delete email
chrome.bookmarks.create({title:'Delete',parentId:'1',url:"javascript:void(function(){ document.querySelector('#emailVerification').value=''; })();"});

//focus code
chrome.bookmarks.create({title:'Focus',parentId:'1',url:"javascript:void(function(){ document.querySelector('#codeValue').focus(); })();"});
//submit code
chrome.bookmarks.create({title:'Submit',parentId:'1',url:"javascript:void(function(){ document.querySelector(\"button[type='submit']\").click(); })();"});


