window.onload = function () {
    var chatSummaryCount = 0;
    var chatSummaryObj = getChatSummaryObject(), currentlyLoggedUserInfo, deletePayload, pullAnotherSetMsgsPayload
};
function initBackgroundProcess() {
    currentlyLoggedUserInfo = UserInfo.getCurrentlyLoggedUserInfo();
    deletePayload = constructDeleteChatPayload(currentlyLoggedUserInfo);
    pullAnotherSetMsgsPayload = constructPullChatPayload(currentlyLoggedUserInfo)
}
function constructDeleteChatPayload(userInfo) {
    if (currentlyLoggedUserInfo != null && window.location.href.search(VERIFY_FB_MESSAGE_URL) >= 0) {
        return `ids[0]={{CHAT_ID}}&__user=${currentlyLoggedUserInfo.accountId}&__a=1&__dyn=&__af=o&__req=l&__be=-1&__pc=${userInfo.pkgCoHort}&fb_dtsg=${userInfo.token}&ttstamp=&__rev=${userInfo.revision}&__srp_t=${userInfo.pageGenTime}`
    }
}
function constructPullChatPayload(userInfo) {
    if (currentlyLoggedUserInfo != null && window.location.href.search(VERIFY_FB_MESSAGE_URL) >= 0) {
        return `client=web_messenger&inbox[offset]=0&inbox[limit]=${PULL_MESSAGE_COUNT}&&__user=${currentlyLoggedUserInfo.accountId}&__a=1&__dyn=&__af=i0&__req=3e&__be=-1&__pc=${userInfo.pkgCoHort}&__rev=${userInfo.revision}&fb_dtsg=${userInfo.token}&ttstamp=`
    }
}
function getChatSummaryObject() {
    if (window.location.href.search(VERIFY_FB_MESSAGE_URL) >= 0) {
        chatSummaryObj = document.querySelectorAll("div[id^='row_header_id_user'], div[id^='row_header_id_thread'], div[data-testid^='row_header_id_user']");
        chatSummaryCount = chatSummaryObj.length;
        //chatSummaryObj = document.querySelectorAll("");

        for(var i in chatSummaryObj){
            try{
                if(chatSummaryObj[i].hasAttribute('data-testid')){
                    var x = chatSummaryObj[i].getAttribute('data-testid')
                    var id = x.replace("row_header_id_user:", "");
                    chatSummaryObj[i].setAttribute("id", id)
                }
            } catch (e) {

            }


        }

        return chatSummaryObj
    }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    initBackgroundProcess();
    switch (request.req) {
        case CURRENTLY_LOGGED_USERINFO:
            sendResponse(currentlyLoggedUserInfo);
            break;
        case CHAT_SUMMARY:
            var chatSummaries = getChatSummaryObject();
            sendResponse(chatSummaries.length > 0 ? true : false);
            break;
        case DELETE_SUMMARY:
            var chatSummaries = getChatSummaryObject();
            if (chatSummaries.length <= 0) {
                sendResponse(false);
                return
            }
            startDeletion(chatSummaries, function (flag) {
                sendResponse(flag)
            }, true);
            return true;
            break;
        case SELECT_AND_DELETE:
            var flag = initSelectAndDeleteOperation();
            sendResponse(flag);
            return true;
            break
    }
});
var selectedChatSummaries = [];
var initSelectAndDeleteOperation = function (script) {
    if (getChatSummaryObject().length > 0) {
        insertDeleteBtn();
        insertCheckboxes();
        return true
    }
    return false
};
/**
 * Insert Delete Button
 */
var insertDeleteBtn = function insertDeleteBtn() {
    var headerNode = document.querySelector("[id=blueBarDOMInspector]");
    if (!document.getElementById(DELETE_SELECTED_CHAT_SUMMARIES)) {
        var deleteBtn = document.createElement("input");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("id", DELETE_SELECTED_CHAT_SUMMARIES);
        deleteBtn.setAttribute("name", DELETE_SELECTED_CHAT_SUMMARIES);
        deleteBtn.setAttribute("style", "position: absolute;    background-color: ##4167b1;box-shadow: 0 1px 0 rgba(0, 0, 0, .07), 0 2px 3px rgba(0, 0, 0, .05); border-radius: 3px; margin: 10px 0px 0px; width: 100;left: 40%;border: none; cursor:pointer !important; background-color: #4CAF50;color: white;padding: 4px 32px;font-size: 16px;");
        deleteBtn.setAttribute("value", "Delete Selected Messages");
        deleteBtn.addEventListener("click", function () {
            if (selectedChatSummaries.length > 0) {
                document.getElementById(DELETE_SELECTED_CHAT_SUMMARIES).value = chrome.i18n.getMessage("app_please_wait_moments_msg");
                startDeletion(selectedChatSummaries, function () {
                    window.location.reload()
                }, false)
            } else {
                alert(chrome.i18n.getMessage("app_no_selected_message_msg"))
            }
        });
        headerNode.appendChild(deleteBtn)
    }
    if (!document.getElementById(SELECT_ALL_CHATSUMMARY_CHECKBOX)) {
        var conversationList = document.querySelector("[role='navigation'] > div > ul");
        var selectAllLabel = document.createElement("label");
        selectAllLabel.innerHTML = "Select All";
        selectAllLabel.setAttribute("style", "margin:15px;font-size: 16px;");
        conversationList.insertBefore(selectAllLabel, conversationList.firstChild);
        var selectAllCheckbox = document.createElement("input");
        selectAllCheckbox.setAttribute("type", "checkbox");
        selectAllCheckbox.setAttribute("id", SELECT_ALL_CHATSUMMARY_CHECKBOX);
        selectAllCheckbox.setAttribute("name", SELECT_ALL_CHATSUMMARY_CHECKBOX);
        selectAllCheckbox.setAttribute("style", "margin-top:20px;height: 20px;width: 20px;cursor: pointer !important;");
        selectAllCheckbox.addEventListener("change", function () {
            toggleSelectAllChatSummaries(selectAllCheckbox)
        });
        conversationList.insertBefore(selectAllCheckbox, conversationList.firstChild)
    }
};
var toggleSelectAllChatSummaries = function toggleSelectAllChatSummaries(selectAllCheckbox) {
    if (selectAllCheckbox) {
        var chatSummaryObj = getChatSummaryObject();
        for (var i = 0; i < chatSummaryObj.length; i++) {
            updateSelectedChatSummaries(chatSummaryObj[i], selectAllCheckbox.checked)
        }
    }
    var checkboxes = document.querySelectorAll("[name='" + CHATSUMMARY_CHECKBOX + "']");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked
    }
};
var isChatSummaryAlreadySelecetd = function isChatSummaryAlreadySelecetd(selectedChatSummaries, elementId) {
    var flag = false;
    if (selectedChatSummaries && elementId) {
        for (var i = 0; i < selectedChatSummaries.length; i++) {
            if (selectedChatSummaries[i].id == elementId) {
                flag = true;
                break
            }
        }
    }
    return flag
};
/**
 *
 * @param element
 * @param isSelected
 */
var updateSelectedChatSummaries = function updateSelectedChatSummaries(element, isSelected) {
    if (isSelected && element && element.id) {
        if (!isChatSummaryAlreadySelecetd(selectedChatSummaries, element.id)) {
            selectedChatSummaries.push(element)
        }
        if (chatSummaryCount == selectedChatSummaries.length) {
            document.getElementById(SELECT_ALL_CHATSUMMARY_CHECKBOX).checked = true
        }
    } else {
        for (var i = 0; i < selectedChatSummaries.length; i++) {
            if (selectedChatSummaries[i].id == element.id) {
                selectedChatSummaries.splice(i, 1);
                --i
            }
        }
        if (selectedChatSummaries.length < chatSummaryCount) {
            document.getElementById(SELECT_ALL_CHATSUMMARY_CHECKBOX).checked = false
        }
    }
};
var createNewCheckboxElement = function createNewCheckboxElement(id) {
    var newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", id);
    newCheckbox.setAttribute("name", CHATSUMMARY_CHECKBOX);
    newCheckbox.setAttribute("style", "margin-top:20px;height: 20px;width: 20px;cursor: pointer !important;");
    newCheckbox.addEventListener("change", function () {
        updateSelectedChatSummaries(newCheckbox, newCheckbox.checked)
    });
    return newCheckbox
};
var insertCheckboxes = function insertCheckboxes() {
    var chatSummaryObj = getChatSummaryObject();
    for (var i = 0; i < chatSummaryObj.length; i++) {
        try {
            if (chatSummaryObj[i].firstElementChild.name != CHATSUMMARY_CHECKBOX) {
                chatSummaryObj[i].insertBefore(createNewCheckboxElement(chatSummaryObj[i].id), chatSummaryObj[i].firstChild)
            }
        } catch (err) {
        }
    }
};
var startDeletion = function startDeletion(chatSummaryObj, callback, isDeleteAll) {
    this.chatSummaryCount = chatSummaryObj.length;
    for (var i = 0; i < chatSummaryObj.length; i++) {
        var summaryId = chatSummaryObj[i].id.split(":");
        deleteConversation(summaryId[summaryId.length - 1], callback, isDeleteAll)
    }
};
var pullFBAnotherSetOfMsgs = function pullFBAnotherSetOfMsgs(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var responseData = JSON.parse(this.responseText.replace("for (;;);", ""));
                chatSummaryCount = responseData.payload.threads.length;
                for (var i = 0; i < chatSummaryCount; i++) {
                    deleteConversation(responseData.payload.threads[i].thread_fbid, callback)
                }
            } catch (err) {
                callback(true)
            }
        }
    };
    xhttp.open("POST", FB_PULL_MESSAGES_API, true);
    xhttp.send(pullAnotherSetMsgsPayload)
};

chrome.runtime.sendMessage({action: 'getSettings'}, function (settings) {});

var deleteConversation = function deleteConversation(chatId, callback, isDeleteAll) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            chatSummaryCount--;
            if (!chatSummaryCount) {
                if (isDeleteAll) {
                    pullFBAnotherSetOfMsgs(callback)
                } else {
                    callback(true)
                }
            }
        }
    };
    xhttp.open("POST", FB_DEL_CONVERSATION_API, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(deletePayload.replace("{{CHAT_ID}}", chatId))
};
var deleteUnrreadThreads = function deleteUnrreadThreads() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("deleteUnrreadThreads executed")
        }
    };
    xhttp.open("POST", FB_DEL_UNREAD_THREAD_API, true);
    xhttp.send("folders[0]:other&__user:" + currentlyLoggedUserInfo.accountId + "&client=mercury")
};

