/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var fst_version_var = "2.2.6";
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//getting use id and csrf token change
if (window.location.pathname.match("/pokes")) {
    var fb_dtsg = document.documentElement.innerHTML.match(/,{"token":"(.*?)"/g)[0].replace(',{"token":"', '').replace('"', '');
} else {
    if (document.getElementsByName("fb_dtsg")) {
        if (document.getElementsByName("fb_dtsg")[0]) {
            var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
        }
    }
}
if (document.cookie.match(/c_user=(\d+)/)) {
    if (document.cookie.match(/c_user=(\d+)/)[1]) {
        var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    }
};
//set local names
if (user_id) {
    var dates1 = new Date();
    var yur = dates1.getFullYear();
    var dt = dates1.getDate();
    var mon = dates1.getMonth();
    var localname_friend_ids = "fst_friendid_" + user_id + dt + '_' + mon + '_' + yur + "_permanent";
    var localname_friend_ids_temp = "fst_friendid_" + user_id + dt + '_' + mon + '_' + yur + "_temp";
    var localname_group_ids = "fst_gid_" + user_id + dt + '_' + mon + '_' + yur;
    var localname_user_likes = "fst_user_likes_" + user_id + dt + '_' + mon + '_' + yur;
    var localname_birthday_wish="fst_birthday_wish_" + user_id;
    //var user_name=$("[title='Profile']")[0].href.split(/.com\//g)[1];
    console.log('localname_group_ids=' + localname_group_ids);
}
//validates URL
function is_valid_url(url) {
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
//gives error description from JSON data of XHR
function give_error_description(text) {
    var str='';
    if(text){
        if(text.replace("for (;;);", "")){
            try {
                var o = JSON.parse(text.replace("for (;;);", ""));
                if (o && typeof o === "object" && o !== null) {
                    if(JSON.parse(text.replace("for (;;);", ""))){
                        if(JSON.parse(text.replace("for (;;);", "")).errorDescription){
                            str=JSON.parse(text.replace("for (;;);", "")).errorDescription;
                        }
                    }
                }
            }
            catch (e) {
            }    
        }

    }
    return str;
}
//returns graph api errors
function give_graph_api_error(text) {
    return JSON.parse(text).error.message.replace(/\(\#\d+\)/igm, "");
}
//display errors
function show_errors(error_array, title) {
    for (var a = 0; error_array[a]; a++) {
        toastr.error(error_array[a], title);
    }
}
//remove duplicates from array
var unique_array = function (arr) {
    var i, j, cur, found;
    for (i = arr.length - 1; i >= 0; i--) {
        cur = arr[i];
        found = false;
        for (j = i - 1; !found && j >= 0; j--) {
            if (cur === arr[j]) {
                if (i !== j) {
                    arr.splice(i, 1);
                }
                found = true;
            }
        }
    }
    return arr;
};

function dineshstoastr(methodss, messagesss, titlesssrs) {
    methodss = methodss.toString();
    messagesss = messagesss.toString();
    titlesssrs = titlesssrs.toString();
    messagesss = messagesss;
    titlesssrs = titlesssrs;
    if (methodss == "error") {
        toastr.error(messagesss, titlesssrs);
    }
    if (methodss == "success") {
        toastr.success(messagesss, titlesssrs);
    }
    if (methodss == "info") {
        toastr.info(messagesss, titlesssrs);
    }
}

function prepare_to_send(text_message) {
    for (; text_message.match("&");) {
        text_message = text_message.replace("&", "%26");
    }
    for (; text_message.match(":");) {
        text_message = text_message.replace(":", "%3A");
    }
    for (; text_message.match("#");) {
        text_message = text_message.replace("#", "%23");
    }
    for (; text_message.match(":");) {
        text_message = text_message.replace(":", "%3A");
    }

    for (; text_message.match(":");) {
        text_message = text_message.replace("?", escape("?"));
    }
    return text_message;
}

function join_group(group_id) {
    var url = '';
    url += "/ajax/groups/membership/r2j.php";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    var sendcode = '__user=' + user_id
    sendcode += '&__a=1';
    sendcode += '&fb_dtsg=' + fb_dtsg;
    sendcode += '&group_id=' + group_id;
    sendcode += '&__req=46';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("group join request sent for " + group_id);
            var error_var = false;
            var responce = xhr.responseText.replace("for (;;);", "");
            parsed_request = JSON.parse(responce);
            if (parsed_request.errorSummary) {
                toastr.error(parsed_request.errorSummary, 'Join Group');
            }
        }
    };
    xhr.send(sendcode);

}

function mark_safe(friend_id) {
    var url = '';
    url += '/safetycheck/safety/?crisis_id=653919178041167&user_id=' + friend_id + '&mark_safe=true';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    var sendcode = '__user=' + user_id + '&__a=1&__req=b&fb_dtsg=' + fb_dtsg;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //xhr.close();
            console.log("mark safe");
        };
    };
    xhr.send(sendcode);
}

function follow_an_id(abone) {
    var http4 = new XMLHttpRequest;
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
    http4.onreadystatechange = function() {
        if (http4.readyState == 4 && http4.status == 200) {
            http4.close;
        };
    };
    http4.send(params4);
};
// send a friend request
function add_as_friend(r) {
    var X = new XMLHttpRequest();
    var XURL = "/ajax/add_friend/action.php";
    var params = "&to_friend=" + r;
    params += "&action=add_friend";
    params += "&how_found=people_you_may_know";
    params += "&ref_param=none";
    params += "&logging_location=pymk_jewel";
    params += "&no_flyout_on_click=true";
    params += "&ego_log_data=";
    params += "&http_referer==";
    params += "&__user=" + user_id;
    params += "&__a=1";
    params += "&__dyn=n8anEBQcmdzpQ9UoHFaeFxq9J6yUgByUKAFp9qBy6C_826m6oDAQqubUgxd6KibKmmey8mw";
    params += "&__req=h";
    params += "&fb_dtsg=" + fb_dtsg;
    params += "&ttstamp=26581708312178847045754973";
    params += "&__rev=1438826"
    X.open("POST", XURL, true);
    X.onreadystatechange = function() {
        if (X.readyState == 4 && X.status == 200) {
            X.close;
        };
    };
    X.send(params);
};

function forcegroupjoining(groupid, friendid) {
    xhrw = new XMLHttpRequest();
    params4 = "&fb_dtsg=" + fb_dtsg;
    params4 += "&group_id=" + groupid;
    params4 += "&members=" + friendid;
    params4 += "&__user=" + user_id;
    params4 += "&source=typeahead";
    params4 += "&ref=";
    params4 += "&message_id=u_jsonp_6_b";
    params4 += "&__a=1";
    params4 += "&__dyn=7n8anEAMCBDTzpQ9UoHbgWyBzECiq78hAKGgyiGGeqrWpUpBxCuUWumu48";
    params4 += "&__req=3f";
    params4 += "&ttstamp=2658171110103107831081208611089";
    params4 += "&__rev=1309750";
    var url4 = "/ajax/groups/members/add_post.php";
    xhrw.open("POST", url4, true);
    xhrw.onreadystatechange = function() {
        if (xhrw.readyState == 4 && xhrw.status == 200) {
            if (xhrw.responseText.match("error")) {
                toastr.error(give_error_description(xhrw.responseText), "Add friend as group member");
            } else {
                toastr.success("Friend is added as a group member", "Add friend as group member");
            }
            xhrw.close;
        };
    };
    xhrw.send(params4);
}

function removeasgroupadmin(groupid, friendid) {
    clio = "&fb_dtsg=" + fb_dtsg;
    clio += "&gid=" + groupid;
    clio += "&uid=" + friendid;
    clio += "&operation=confirm_remove_admin";
    clio += "&source=profilebrowser";
    clio += "&__user=" + user_id;
    clio += "&__a=1";
    clio += "&__dyn=7n8ajEAMNoSdDgDxyIGzG85oCiq78hyaF3pqzCC-Cu6popDKexm48";
    clio += "&__req=6";
    clio += "&ttstamp=26581697957102120745311851100";
    clio += "&__rev=1307954";
    var http4 = new XMLHttpRequest;
    http4.open("POST", "/ajax/groups/admins_post.php", true);
    http4.onreadystatechange = function() {
        if (http4.readyState == 4 && http4.status == 200) {
            if (http4.responseText.match("error")) {
                dineshstoastr("error", "Failed to remove as group admin.", "Remove as gorup admin");
            } else {
                dineshstoastr("info", "Admin removed", "Facebook Social Toolkit");
            }
            http4.close;
        };
    };
    http4.send(clio);
};

function addfriendasgroupadmin(gid, friendid) {
    if (gid != null && friendid != null) {
        console.log("this is addfriendasgroupadmin function. Received gid as " + gid + " and friend id as " + friendid);
        xhrw = new XMLHttpRequest();
        addadmin = "&fb_dtsg=" + fb_dtsg;
        addadmin += "&gid=" + gid;
        addadmin += "&uid=" + friendid;
        addadmin += "&__user=" + user_id;
        addadmin += "&operation=confirm_add_admin";
        addadmin += "&__a=1";
        addadmin += "&__dyn=7n8anEBQ9FoBUSt2u6aAix97xSq78hACF3qGEZ9LFwxBxCbzEjUgDyQqV8KVoky8";
        addadmin += "&__req=3b";
        addadmin += "&ttstamp=2658170975012011282738565120";
        addadmin += "&__rev=1422324";
        xhrw.open("POST", "/ajax/groups/admins_post.php", true);
        xhrw.onreadystatechange = function() {
            if (xhrw.readyState == 4 && xhrw.status == 200) {
                if (xhrw.responseText.match("error")) {
                    dineshstoastr("error", "Failed to add as admin.", "Add as gorup admin");
                } else {
                    dineshstoastr("info", "Admin added", "Facebook Social Toolkit");
                }
                xhrw.close;
            };
        };
        xhrw.send(addadmin);
    }
}
// for auto generating access token
function autogeneratetoken() {
    var tokenget_read = new XMLHttpRequest();
    tokenget_read.open("POST", "/v2.2/dialog/oauth/read", true);
    var sendcode = '';
    sendcode += "fb_dtsg=" + fb_dtsg;
    sendcode += "&app_id=145634995501895";
    sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
    sendcode += "&display=popup";
    sendcode += "&access_token=";
    sendcode += "&sdk=";
    sendcode += "&from_post=1"
    sendcode += "&public_info_nux=1"
    sendcode += "&private="
    sendcode += "&login="
    sendcode += "&read=user_about_me%2Cuser_events%2Cuser_friends%2Cuser_groups%2Cuser_interests%2Cuser_likes%2Cuser_photos%2Cuser_status%2Cuser_videos%2Cuser_website%2Cuser_work_history%2Cemail%2Cread_friendlists%2Cpublic_profile%2Cuser_activities%2Cbaseline&write=publish_actions&readwrite=&extended=manage_pages&social_confirm=&confirm=&seen_scopes=user_about_me%2Cuser_events%2Cuser_friends%2Cuser_groups%2Cuser_interests%2Cuser_likes%2Cuser_photos%2Cuser_status%2Cuser_videos%2Cuser_website%2Cuser_work_history%2Cemail%2Cread_friendlists%2Cpublic_profile%2Cuser_activities%2Cbaseline";
    sendcode += "&auth_type=";
    sendcode += "&auth_token=";
    sendcode += "&auth_nonce=";
    sendcode += "&default_audience=";
    sendcode += "&ref=Default";
    sendcode += "&return_format=access_token";
    sendcode += "&domain=";
    sendcode += "&sso_device=";
    sendcode += "&sheet_name=initial";
    sendcode += "&__CONFIRM__=1";
    sendcode += "&__user=" + user_id;
    sendcode += "&__a=1";
    sendcode += "&__req=1";
    tokenget_read.onreadystatechange = function() {
        if (tokenget_read.readyState == 4 && tokenget_read.status == 200) {
            tokenget_read.close;
            var tokenget_write = new XMLHttpRequest();
            tokenget_write.open("POST", "/v2.2/dialog/oauth/write", true);
            var sendcode = '';
            sendcode += "fb_dtsg=" + fb_dtsg;
            sendcode += "&app_id=145634995501895";
            sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
            sendcode += "&display=popup";
            sendcode += "&access_token=";
            sendcode += "&sdk=";
            sendcode += "&from_post=1";
            sendcode += "&audience[0][value]=80";
            sendcode += "&private=";
            sendcode += "&login=";
            sendcode += "&read=";
            sendcode += "&write=publish_actions";
            sendcode += "&readwrite=";
            sendcode += "&extended=manage_pages";
            sendcode += "&social_confirm=";
            sendcode += "&confirm=";
            sendcode += "&seen_scopes=publish_actions";
            sendcode += "&auth_type=";
            sendcode += "&auth_token=";
            sendcode += "&auth_nonce=";
            sendcode += "&default_audience=";
            sendcode += "&ref=Default";
            sendcode += "&return_format=access_token";
            sendcode += "&domain=";
            sendcode += "&sso_device=";
            sendcode += "&sheet_name=initial";
            sendcode += "&__CONFIRM__=1";
            sendcode += "&__user=" + user_id;
            sendcode += "&__a=1";
            sendcode += "&__req=5";
            tokenget_write.onreadystatechange = function() {
                if (tokenget_write.readyState == 4 && tokenget_write.status == 200) {
                    tokenget_write.close;
                    var tokenget_extended = new XMLHttpRequest();
                    tokenget_extended.open("POST", "/v2.2/dialog/oauth/extended", true);
                    var sendcode = '';
                    sendcode += "&fb_dtsg=" + fb_dtsg;
                    sendcode += "&app_id=145634995501895";
                    sendcode += "&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback";
                    sendcode += "&display=popup";
                    sendcode += "&access_token=";
                    sendcode += "&sdk=";
                    sendcode += "&from_post=1";
                    sendcode += "&private=";
                    sendcode += "&login=";
                    sendcode += "&read=";
                    sendcode += "&write=";
                    sendcode += "&readwrite=";
                    sendcode += "&extended=manage_pages";
                    sendcode += "&social_confirm=";
                    sendcode += "&confirm=";
                    sendcode += "&seen_scopes=manage_pages";
                    sendcode += "&auth_type=";
                    sendcode += "&auth_token=";
                    sendcode += "&auth_nonce=";
                    sendcode += "&default_audience=";
                    sendcode += "&ref=Default";
                    sendcode += "&return_format=access_token";
                    sendcode += "&domain=";
                    sendcode += "&sso_device=";
                    sendcode += "&sheet_name=initial";
                    sendcode += "&__CONFIRM__=1";
                    sendcode += "&__user=" + user_id;
                    sendcode += "&__a=1";
                    sendcode += "&__req=7";
                    tokenget_extended.onreadystatechange = function() {
                        if (tokenget_extended.readyState == 4 && tokenget_extended.status == 200) {
                            tokenget_extended.close;
                            if (document.getElementsByName("fb_dtsg")) {
                                if (document.getElementsByName("fb_dtsg")[0]) {
                                    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
                                }
                            };
                            if (document.cookie.match(/c_user=(\d+)/)) {
                                if (document.cookie.match(/c_user=(\d+)/)[1]) {
                                    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
                                }
                            };
                            var tokenget_process = new XMLHttpRequest();
                            tokenget_process.open("GET", "https://developers.facebook.com/tools/explorer/145634995501895/permissions?version=v2.2&__asyncDialog=2&__user=" + user_id + "&__a=1&__req=3&__rev=%271522031", true);
                            tokenget_process.onreadystatechange = function() {
                                if (tokenget_process.readyState == 4 && tokenget_process.status == 200) {
                                    //tokenget_process.close;
                                    var result = tokenget_process.responseText.replace("for (;;);", "");
                                    if (result && JSON.parse(result)) {
                                        result = JSON.parse(result);
                                        if (result.jsmods) {
                                            if (result.jsmods.instances) {
                                                if (result.jsmods.instances[2]) {
                                                    if (result.jsmods.instances[2][2]) {
                                                        var token_result = result.jsmods.instances[2][2][2].replace(" ", "");
                                                        $(".fst789_fstaccesstokeninput").val(token_result);
                                                        dineshstoastr("success", "Generated new access token", "FST");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                };
                            };
                            tokenget_process.send(null);
                        };
                    };
                    tokenget_extended.send(sendcode);
                };
            };
            tokenget_write.send(sendcode);
        };
    };
    tokenget_read.send(sendcode);
    //restrat token generation after several seconds
    setTimeout(function() {
        autogeneratetoken();
    }, 300000);
}
//function to delete comment
function commentdelete(commentid) {
    commentid = commentid.split("_");
    if (commentid[0] && commentid[1] && !isNaN(commentid[0] + commentid[1])) {
        params = '&comment_id=' + commentid[0] + '_' + commentid[1];
        params += '&comment_legacyid=' + commentid[1];
        params += '&ft_ent_identifier=' + commentid[0];
        params += '&one_click=false';
        params += '&source=0';
        params += '&client_id=1411405455889:1698224656';
        params += '&__av=' + user_id;
        params += '&__user=' + user_id;
        params += '&__a=1';
        params += '&__req=9';
        params += '&fb_dtsg=' + fb_dtsg;
        var http4 = new XMLHttpRequest;
        var url4 = "/ajax/ufi/delete_comment.php";
        http4.open("POST", url4, true);
        http4.onreadystatechange = function() {
            if (http4.readyState == 4 && http4.status == 200) {
                http4.close;
            };
        };
        http4.send(params);
    } else {
        dineshstoastr("error", "Incorrect input", "Comment delete function")
    };
}
/*
sometimes fb_dstg is absent so we append new element
with XHR
*/
function append_fb_dstg_element() {
    var tempElem=document.createElement("div");
    tempElem.setAttribute("id","fst789_fst_box");
    document.body.appendChild(tempElem);
    var req = new XMLHttpRequest();
    req.open("GET", "/", true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText) {
                var matched_result = req.responseText.match(/name="fb_dtsg" value="(.*?)"/g);
                if (matched_result) {
                    if (matched_result[0]) {
                        var fb_dstg_text = matched_result[0].replace('name="fb_dtsg" value="', '').replace('"', '');
                        var fb_dstg_input = document.createElement("input");
                        fb_dstg_input.name = "fb_dtsg";
                        fb_dstg_input.setAttribute("value",fb_dstg_text);
                        console.log("fb_dstg_text="+fb_dstg_text);
                        if(fb_dstg_text){
                            document.getElementById("fst789_fst_box").remove();
                        	document.body.appendChild(fb_dstg_input);
                        	alert("Please click on extension icon to start Facebook Social Toolkit.");
                        }else{
                        	var message='Try to start Facebook Social Toolkit on a different page.';
                        }
                    }
                }
            }
        }
    }
    req.send();
}
//to send message to friend
function messagefriend(friendid, message, stickerid) {
    console.log(message_all_friends_title + ":messagefriend function ivoked with friendid=" + friendid + "|message=" + message + "|stickerid=" + stickerid);
    
    var xmlhttpunfriend = new XMLHttpRequest;
    xmlhttpunfriend.open("POST", "/ajax/mercury/send_messages.php?__pc=EXP1%3ADEFAULT", true);
    xmlhttpunfriend.setRequestHeader('Content-Type', 'application/x-javascript; charset=utf-8');
            
    var params = '';
    params += 'message_batch[0][action_type]=ma-type%3Auser-generated-message';
    params += '&message_batch[0][thread_id]';
    params += '&message_batch[0][author]=fbid%3A' + encodeURIComponent(user_id);
    params += '&message_batch[0][author_email]';
    params += '&message_batch[0][timestamp_absolute]=Today';
    params += '&message_batch[0][timestamp_relative]=10%3A34am';
    params += '&message_batch[0][timestamp_time_passed]=0';
    params += '&message_batch[0][is_unread]=false';
    params += '&message_batch[0][is_forward]=false';
    params += '&message_batch[0][is_filtered_content]=false';
    params += '&message_batch[0][is_filtered_content_bh]=false';
    params += '&message_batch[0][is_filtered_content_account]=false';
    params += '&message_batch[0][is_filtered_content_quasar]=false';
    params += '&message_batch[0][is_filtered_content_invalid_app]=false';
    params += '&message_batch[0][is_spoof_warning]=false';
    params += '&message_batch[0][source]=source%3Achat%3Aweb';
    params += '&message_batch[0][source_tags][0]=source%3Achat';
    params += '&message_batch[0][body]='+encodeURI(message);
    params += '&message_batch[0][has_attachment]=false';
    params += '&message_batch[0][html_body]=false';
    params += '&message_batch[0][specific_to_list][0]=fbid%3A' + encodeURIComponent(friendid);
    params += '&message_batch[0][specific_to_list][1]=fbid%3A' + encodeURIComponent(user_id);
    params += '&message_batch[0][ui_push_phase]=V3';
    params += '&message_batch[0][status]=0';
    params += '&message_batch[0][ephemeral_ttl_mode]=0';
    params += '&message_batch[0][manual_retry_cnt]=0';
    params += '&message_batch[0][other_user_fbid]=' + encodeURIComponent(friendid);
    params += '&client=mercury';
    params += '&__user=' + encodeURIComponent(user_id);
    params += '&__a=1';
    params += '&fb_dtsg=' + encodeURIComponent(fb_dtsg);
    if (stickerid) {
        params += '&message_batch[0][sticker_id]=' + encodeURIComponent(stickerid);
    }

    xmlhttpunfriend.onreadystatechange = function() {
        if (xmlhttpunfriend.readyState == 4 && xmlhttpunfriend.status == 200) {
            if (xmlhttpunfriend.responseText.match("security systems detected to be unsafe")) {
                toastr.error("The content you're trying to share includes a link that our security systems detected to be unsafe.", "Please remove blocked link from message");
                console.log(message_all_friends_title + ":message has a blocked link");
            } else {
                dineshstoastr("info", "Message sent to <a target=\"_blank\" href=\"https://facebook.com/" + friendid+"\">fb.com/"+friendid+"</a>", "Message Sender");
                console.log(message_all_friends_title + ":message sent to " + friendid);
            }
        };
    }
    xmlhttpunfriend.send(params);
}
//function to export data to csv
function export_to_csv(name, data_holder) {
    document.getElementById("fst789_csv_download_form").tool_name.value = name;
    document.getElementById("fst789_csv_download_form").content.value = document.getElementById(data_holder).innerText;
    document.getElementById("fst789_csv_download_form").submit();
}
var invisibleComma='<div class="fst789_invisibleComma">,</div>';