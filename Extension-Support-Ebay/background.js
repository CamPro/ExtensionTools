console.log("backgournd script");

chrome.runtime.onInstalled.addListener(function()
{
  chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id + '/options.html' });
});


chrome.runtime.onMessage.addListener 
(
    function(message, sender, sendResponse)
    {
        console.log(message);
    }
);