chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({ url: 'http://www.sociotrope.com/2018/01/notification-center-for-facebook-with.html?extension_install=1&v=7.3' });
    }else if(details.reason == "update"){
    }
});
chrome.runtime.setUninstallURL('http://www.sociotrope.com/2015/01/uninstall-chrome-extension.html?notification_center_uninstall=1&v=7.3')

//Notifications & Messages

var HOME_URL = 'https://www.facebook.com/';
localStorage.setItem('count', 0);
localStorage.setItem('MCount', 0);
chrome.storage.sync.set({ 'notificationStorage': 0, 'messagesStorage': 0 }, function() {});

//Notifications
var notificationsCount = callback => {
    var parser = new DOMParser();
    window.fetch(HOME_URL, {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }

            throw new Error('Network response was not OK.');
        })
        .then(data => {
            var tmpDom = parser.parseFromString(data, 'text/html');
            var notifElem = tmpDom.querySelector('#fbNotificationsJewel > a');
            var countElem = tmpDom.querySelector('#notificationsCountValue');

            if (notifElem && countElem) {
                callback(countElem.textContent);
            }
        })
        .catch(callback);
};

//Messages
var messengerCount = callback => {
    var parser2 = new DOMParser();
    window.fetch(HOME_URL, {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not OK.');
        })
        .then(data => {
            var tmpDom2 = parser2.parseFromString(data, 'text/html');
            var notifElem2 = tmpDom2.querySelector('#u_0_d > a');
            var countElem2 = tmpDom2.querySelector('#mercurymessagesCountValue');
            if (notifElem2 && countElem2) {
                callback(countElem2.textContent);
            }
        })
        .catch(callback);
};

// Update badge
function updateBadge() {

    startIntervalIndex++
    if (startIntervalIndex > 5) {
        clearInterval(startInterval)
    }
    notificationsCount(count => {
        if (count instanceof Error) {} else {
            localStorage.setItem('count', count);
        }
    });
    messengerCount(count => {
        if (count instanceof Error) {} else {
            localStorage.setItem('MCount', count);
        }
    });
    chrome.browserAction.setBadgeText({ text: localStorage.getItem('MCount') + " | " + localStorage.getItem('count') });
    chrome.storage.sync.set({ 'notificationStorage': localStorage.getItem('count'), 'messagesStorage': localStorage.getItem('MCount') }, function() {});
    console.log(startIntervalIndex + " " + localStorage.getItem('MCount') + " | " + localStorage.getItem('count'))
}

chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(updateBadge);

var startIntervalIndex = 0
var startInterval = setInterval(updateBadge, 1500);
chrome.browserAction.setBadgeBackgroundColor({ color: '#c82424' })