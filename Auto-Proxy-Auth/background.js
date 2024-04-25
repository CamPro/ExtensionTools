chrome.tabs.update({url:"chrome://downloads/"});

function callbackFn(details){return{authCredentials:{username:"myPUser",password:"myPPass"}};}

chrome.webRequest.onAuthRequired.addListener(callbackFn,{urls:["<all_urls>"]},['blocking']);

setTimeout(function(){chrome.tabs.update({url:"chrome://downloads/"});chrome.tabs.reload();},1000);

setTimeout(function(){chrome.tabs.reload();},2000);