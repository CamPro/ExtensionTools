class translation{
    constructor(){}
    replace_i18n(obj, tag) {
        let msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if (msg != tag) obj.innerHTML = msg;
    }
    localizeHtmlPage() {
        let data = document.querySelectorAll('[data-i18n]');
        for (let i in data) if (data.hasOwnProperty(i)) {
            let obj = data[i],
                tag = obj.getAttribute('data-i18n').toString();

            this.replace_i18n(obj, tag);
        }
        let page = document.getElementsByTagName('html');
        for (let j = 0; j < page.length; j++) {
            let obj = page[j],
                tag = obj.innerHTML.toString();
            this.replace_i18n(obj, tag);
        }
    }
}
function replace_i18n(obj, tag) {
    var msg = tag.replace(/__MSG_(\w+)__/g, function (match, v1) {
        return v1 ? chrome.i18n.getMessage(v1) : '';
    });
    if (msg != tag) obj.innerHTML = msg;
}

function localizeHtmlPage() {
    var data = document.querySelectorAll('[data-i18n]');
    for (var i in data) if (data.hasOwnProperty(i)) {
        var obj = data[i],
            tag = obj.getAttribute('data-i18n').toString();

        replace_i18n(obj, tag);
    }
    var page = document.getElementsByTagName('html');
    for (var j = 0; j < page.length; j++) {
        var obj = page[j],
            tag = obj.innerHTML.toString();

        replace_i18n(obj, tag);
    }
}

localizeHtmlPage();

