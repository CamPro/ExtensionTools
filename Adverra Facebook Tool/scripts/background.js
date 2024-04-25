

chrome.runtime.onInstalled.addListener(function (object) {
	chrome.storage.local.get('installed', function (a){
		if(!a.installed){
			// after installing open main web site
			//chrome.tabs.create({url: "http://fst.getmyscript.com/"}, function (tab){});
            chrome.storage.local.set({'installed': true},function(){});
		}
	});
});




function getOriginFromUrl(inp) {

    try {
        var url = new URL(inp);
        var full = url.protocol + '//' + url.hostname + (url.port ? ':' + url.port : '');
        return full;
    } catch (e) {
        return "";
    }

}




///////////
/*
ar filter = { urls: ['<all_urls>'] }
var extraInfoSpec = ['responseHeaders']

browser.webRequest.onCompleted.addListener(function(details){
    console.log('test', details)
}, filter, extraInfoSpec) 
*/

//////////////

chrome.webRequest.onHeadersReceived.addListener(
function(info){

	 if (info.url == 'https://www.facebook.com/v2.0/dialog/oauth/read?dpr=1') {
		    //console.log('details is');
					//  console.log(info);
		   for (var index = 0; index < info.responseHeaders.length; index++) {
                if (info.responseHeaders[index].name.toLowerCase() === 'location') {
                 
				locationx = 	info.responseHeaders[index].value;
					 tokenx = locationx.match(/access_token=(.*?)&/)[1];
      
                }
		  //if (info.requestHeaders[index].name.toLowerCase() === '"location"') {
		
		  //}
		   }
	}
    },
       {urls: ['*://*.facebook.com/*']},
    ['responseHeaders']
);


										  
												  



//////


chrome.webRequest.onBeforeSendHeaders.addListener(
										  
    function (info) {
		
		// console.log('info is');
         //   console.log(info);
        if (info.initiator == 'chrome-extension://' + chrome.runtime.id) {
           
            var originSet = null;
            var refererSet = null;
            var cookieSet = null;
            var originSet = null;
            var refererSet = null;
            for (var index = 0; index < info.requestHeaders.length; index++) {
                if (info.requestHeaders[index].name.toLowerCase() === 'origin') {
                    info.requestHeaders[index].value = getOriginFromUrl(info.url);
                    originSet = true;
                }
                if (info.requestHeaders[index].name.toLowerCase() === 'referer') {
                    info.requestHeaders[index].value = getOriginFromUrl(info.url);
                    refererSet = true;
                }
            }
            if (!originSet) {
                info.requestHeaders.push({
                    'name': 'Origin',
                    'value': getOriginFromUrl(info.url),
                });
            }
            if (!refererSet) {
                info.requestHeaders.push({
                    'name': 'Referer',
                    'value': getOriginFromUrl(info.url),
                });
            }
            return {requestHeaders: info.requestHeaders};
        }
    },
       {urls: ['*://*.facebook.com/*']},
    ['blocking', 'requestHeaders']
);






chrome.browserAction.onClicked.addListener(function(e){

	   
	   chrome.tabs.create({ url: chrome.extension.getURL("index.html#dashboard") });
	
			
	  /*
	if(e.url.match("facebook.com"))
	{
		// excute script only on facebook
		//executescript();
	
		 chrome.tabs.create({ url: chrome.extension.getURL("index.html#dashboard") });
		
	}else{
		if(confirm("Go To  www.facebook.com "))
		{
			// if user is not on facebook then open facebook in new tab
			chrome.tabs.create({url: "https://www.facebook.com/", "selected":true}, function (e){});
			// excute script on facebook
			//executescript();
		};
	};
	*/
});











