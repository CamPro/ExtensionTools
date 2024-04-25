/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
//if friendlist toast num divided by 10==0 .
function friendlist_generator_2() {
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            var friendidcollect = "";
            for (a = 0; a != "stop"; a++) {
                if (xmlhttp.responseText.match(/profile.php\?id=\d+/g)[a] == null) {
                    a = "stop";
                    break;
                };
                if (xmlhttp.responseText.match(/profile.php\?id=\d+/g)[a].replace("profile.php\?id=", "") != null || xmlhttp.responseText.match(/profile.php\?id=\d+/g)[a + 1].replace("profile.php\?id=", "") != null || xmlhttp.responseText.match(/profile.php\?id=\d+/g)[a + 2].replace("profile.php\?id=", "") != null) {
                    var newId=xmlhttp.responseText.match(/profile.php\?id=\d+/g)[a].replace("profile.php\?id=", "") + "|";
                    if(!newId.match(user_id)){
                        friendidcollect += newId;
                    }
                } else {
                    a = "stop";
                };
            };
            console.log("friendidcollect=" + friendidcollect);
            console.log("friendidcollectlength=" + friendidcollect.split("|").length)
            var friendidarray = friendidcollect.split("|");
            var totalfriendnum = friendidcollect.split("|").length;
            console.log(friendidarray);
            chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids + "\":\"" + friendidarray.toString() + "\"}"), function() {
                console.log(friend_id_extractor_name + ":localname_friend_ids is set");
                //reset localname_friend_ids temp
                chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + "\"}"), function() {
                    //console.log(friend_id_extractor_name+":localname_friend_ids_temp is reset");
                });
            });
            //alert("Friend list extraction completed");
            dineshstoastr("success", "Friend list extraction completed", "FST");
        };
    }
    xmlhttp.send();
}

function friendlist_generate2_start() {
    chrome.storage.local.get(localname_friend_ids, function(e) {
        if (e) {
            if (e[localname_friend_ids] != "" && e[localname_friend_ids]) {
                console.log(friend_id_extractor_name + ":localname_friend_ids is already set");
            } else {
                friendlist_generator_2();
            }
        } else {
            friendlist_generator_2();
        }
    });
}
