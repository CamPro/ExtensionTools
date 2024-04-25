"use strict";

/**
 * @author DevION
 * @class PopupActions
 */
class PopupActions {
    constructor() {
        this.pageFacebook = "https://www.facebook.com/messages/?locale=en_US";
    }

    isMessagePage(url) {
        if(url.indexOf("https://www.facebook.com/messages/") != -1){
            return true;
        } else {
            return false;
        }
    }

    /**
     * @name removeFriends
     * @description Execute file script in page facebook
     */
    removeMessages() {
        chrome.windows.getCurrent(function (currentWindow) {
            chrome.tabs.query({active: true, windowId: currentWindow.id}, function (activeTabs) {
                activeTabs.map(function (tab) {
                    chrome.tabs.insertCSS(tab.id, {file: 'assets/css/confirm.css', allFrames: false})
                    chrome.tabs.executeScript(tab.id, {file: 'libs/jquery.js', allFrames: false});
                    chrome.tabs.executeScript(tab.id, {file: 'libs/jquery-confirm.min.js', allFrames: false});
                    chrome.tabs.executeScript(tab.id, {file: 'content/script.js', allFrames: false});
                });
            });
        });
    }

    /**
     * @name openPage
     * @description Open page facebook messages
     */
    openPage() {
        chrome.tabs.create({url: this.pageFacebook});
    }

    /**
     * @name initAction
     * @description Init all action in popup.html
     */
    initAction() {


        chrome.tabs.getSelected(null, function (tab) {
            this.currentUrl = tab.url;
            if (this.isMessagePage(this.currentUrl) == true) {
                $("#removeMessages").on("click", this.removeMessages.bind(this));
                $("#openMessenger").addClass('disabled');
                $("#openMessenger").attr('disabled', 'disabled');
                $("#openMessenger").on("click", function (e) {
                    e.preventDefault();
                })
            } else {
                $("#openMessenger").on("click", this.openPage.bind(this))
                $("#removeMessages").addClass('disabled');
                $("#removeMessages").attr('disabled', 'disabled');
                $("#removeMessages").on("click", function (e) {
                    e.preventDefault();
                    return
                })
            }
        }.bind(this));
        $("#link").attr('href', `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);

    }

    /**
     * @name translate
     * @description translate popup
     */
    translate() {
        const m = chrome.i18n.getMessage;
        $('[data-i18n]').each(function () {
            var data = $.map($(this).data('i18n').split(','), function (value) {
                value = value.trim();
                if (value.startsWith('__MSG_')) {
                    return value.replace(/__MSG_(\w+)__/g, function (match, key) {
                        return key ? m(key) : "";
                    });
                }
                return value;
            });
            if (data.length) {
                if ($(this).data('i18n-html')) {
                    $(this).html(m(data[0], data.slice(1)));
                } else {
                    $(this).text(m(data[0], data.slice(1)));
                }
            }
        });
    }
}

/**
 * @name init all
 */
$(function () {
    let actions = new PopupActions();
    actions.initAction();
    actions.translate();
});
