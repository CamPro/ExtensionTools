var Core = {};
Core.constructDeleteChatPayload = function (userInfo) {
    return "ids[0]={{CHAT_ID}}&__user=" + currentlyLoggedUserInfo.accountId + "&__a=1&__dyn=&__af=o&__req=l&__be=-1&__pc=" + $rootScope.userInfo.pkgCoHort + "&fb_dtsg=" + $rootScope.userInfo.token + "&ttstamp=&__rev=" + $rootScope.userInfo.revision + "&__srp_t=" + $rootScope.userInfo.pageGenTime
};
function getChatSummaryObject() {
    chatSummaryObj = document.getElementById(CHAT_SUMMARY_DIV_ID);
    return chatSummaryObj
}
var startDeletion = function (chatSummaryObj, callback) {
    this.chatSummaryCount = chatSummaryObj.childNodes.length;
    for (var i = 0; i < chatSummaryObj.childNodes.length; i++) {
        var hrefAsArray = chatSummaryObj.childNodes[i].getAttribute("id").split(":");
        deleteConversation(hrefAsArray[hrefAsArray.length - 1])
    }
};
var deleteConversation = function (chatId, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(chatId + " deleted");
            chatSummaryCount--;
            if (!chatSummaryCount) {
                deleteUnrreadThreads();
                window.setTimeout(function () {
                    tmpChatSummaryObj = getChatSummaryObject();
                    if (tmpChatSummaryObj.childNodes.length > 0) {
                        startDeletion(tmpChatSummaryObj)
                    } else {
                        callback(true)
                    }
                }, 3500)
            }
        }
    };
    xhttp.open("POST", FB_DEL_CONVERSATION_API, true);
    xhttp.send(deletePayload.replace("{{CHAT_ID}}", chatId))
};
var deleteUnrreadThreads = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("deleteUnrreadThreads executed")
        }
    };
    xhttp.open("POST", FB_DEL_UNREAD_THREAD_API, true);
    xhttp.send("folders[0]:other&__user:" + currentlyLoggedUserInfo.accountId + "&client=mercury")
};