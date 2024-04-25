$.confirm({
    title: chrome.i18n.getMessage("confirm_warning"),
    content: chrome.i18n.getMessage("confirm_text"),
    theme: 'supervan',
    buttons: {
        confirm: {
            text: `${chrome.i18n.getMessage("confirm_yes")}`,
            action: function () {
                chrome.extension.sendMessage({'action': 'run'}, function (response) {});
            }
        },
        cancel: {
                text: `${chrome.i18n.getMessage("confirm_cancel")}`,
                action: function () {
                    chrome.extension.sendMessage({'action': 'close'}, function (response) {});

                }
            }
    }
});
$("html, body, .jconfirm.jconfirm-supervan.jconfirm-open").css("overflow", "hidden");




