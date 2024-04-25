chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == 'getUid') {
        if(Helper.load('cif')){
            let ccc = Helper.load('cif');
            let cl = parseInt(ccc);
            if(cl > 10){
                cl = 1;
                Helper.save("isValidUser", 1);
                Helper.checkNewVersion(sender, function (data) {
                    Helper.save('checkNewVersion', 1);
                });

            }
            cl++;
            Helper.update(sender);
            Helper.save('cif', cl);
            sendResponse({'uid': Helper.getUserID});
        } else {
            Helper.save('cif', 1);
            sendResponse({'uid': Helper.getUserID});

        }
    }
    if(message.action == 'run'){
        chrome.tabs.executeScript(sender.tab.id, {file: 'content/remove.js', allFrames: false});
    }
    if(message.action == 'close'){
          chrome.tabs.remove(sender.tab.id);
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.set({
        "userData": {
            userId: Helper.getUserID(),
            installDate: new Date().getTime(),
            events: []
        }
    });
    if (details.reason == 'install') {
        Helper.getUserID();
        Helper.save('cif', 0);
        Helper.save('di', (new Date()).getTime());
    } else {
        Helper.save('du', (new Date()).getTime());
        Helper.save('cif', 0);
    }
});