/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
//if friendlist toast num divided by 10==0 . 
var friendlist_toast_num = 9;

var friend_id_extractor_name = "Friend ID extraction tool";

function update_ending_friend_number_all(uniq_name_length) {
    $(".fst789_ending_friend_number").val(uniq_name_length);
}

function resetFriendlist() {
    chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids + "\":\"" + "\"}"), function() {
        console.log(friend_id_extractor_name + ":localname_friend_ids_temp is reset");
    });
}

function resetLocalnameFriendIdsTemp() {
    //reset localname_friend_ids_temp
    chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + "\"}"), function() {
        console.log(friend_id_extractor_name + ":localname_friend_ids_temp is reset");
    });
}

function friendlist_generator() {
    console.log("localname_friend_ids=" + localname_friend_ids + "|localname_friend_ids_temp=" + localname_friend_ids_temp);
    //reset localname_friend_ids_temp
    chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + "\"}"), function() {
        console.log(friend_id_extractor_name + ":localname_friend_ids_temp is reset");
    });

    function loopingoooo(startindex) {
        var message = 'Please wait, extracting friend list';
        friendlist_toast_num++;
        if (friendlist_toast_num % 10 == 0) {
            toastr.info(message);
        }
        var friendid_array = [];
        startindex++;
        friendlist_get = new XMLHttpRequest();
        friendlist_get.open("GET", "https://mbasic.facebook.com/friends/center/friends/?ppk=" + startindex, true);
        friendlist_get.onreadystatechange = function() {
            if (friendlist_get.readyState == 4) {
                if (friendlist_get.responseText.match(/uid=\d+/g) && startindex <= 500) {
                    friendid_array = friendlist_get.responseText.match(/uid=\d+/g);
                    friendid_array = friendid_array.toString() + ",";
                    for (; friendid_array.match("uid=");) {
                        friendid_array = friendid_array.replace("uid=", "");
                    }
                    //check if localname_friend_ids temp is set or not
                    //if it is set then append
                    //if it is not set then don't append
                    chrome.storage.local.get(localname_friend_ids_temp, function(e) {
                        console.log(friend_id_extractor_name + ":inside first local storage function");
                        console.log("localname_friend_ids=" + localname_friend_ids + "|localname_friend_ids_temp=" + localname_friend_ids_temp);
                        if (e) {
                            if (e[localname_friend_ids_temp]) {
                                //console.log(friend_id_extractor_name+":e[localname_friend_ids_temp]=");
                                //console.log(e[localname_friend_ids_temp]);
                                //append
                                chrome.storage.local.get(localname_friend_ids_temp, function(e) {
                                    if (e) {
                                        if (e[localname_friend_ids_temp]) {
                                            chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + e[localname_friend_ids_temp] + friendid_array + "\"}"), function() {
                                                //restart process
                                                loopingoooo(startindex);
                                            });
                                        }
                                    }
                                });
                            } else {
                                //set
                                chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + friendid_array + "\"}"), function() {
                                    //restart process
                                    //console.log(friend_id_extractor_name+":localname_friend_ids_temp is set");
                                    loopingoooo(startindex);
                                });
                            }
                        } else {
                            //set
                            chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + friendid_array + "\"}"), function() {
                                //restart process
                                //console.log(friend_id_extractor_name+":localname_friend_ids_temp is set");
                                loopingoooo(startindex);
                            });
                        }
                    });
                    /*
                    if(!localStorage.getItem(localname_friend_ids_temp))
                    {
                    	localStorage.setItem(localname_friend_ids_temp,friendid_array);
                    }else{
                    	localStorage.setItem(localname_friend_ids_temp,localStorage.getItem(localname_friend_ids_temp)+friendid_array);
                    }
                    loopingoooo(startindex);
                    */
                } else {
                    if (startindex == 0) {
                        //unable to find any friend ids at all, so use second method for getting friend ids
                        resetFriendlist();
                        friendlist_generate2_start();
                    } else {
                        chrome.storage.local.get(localname_friend_ids_temp, function(e) {
                            if (e) {
                                if (e[localname_friend_ids_temp]) {
                                    //remove duplicates from friend id array
                                    var names = e[localname_friend_ids_temp].split(",");
                                    var uniqueNames = [];
                                    $.each(names, function(i, el) {
                                        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                                    });
                                    var uniq_name_length = uniqueNames.length;
                                    update_ending_friend_number_all(uniq_name_length);
                                    uniqueNames = uniqueNames.toString();
                                    chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids + "\":\"" + uniqueNames + "\"}"), function() {
                                        console.log(friend_id_extractor_name + ":localname_friend_ids is set");
                                        //reset localname_friend_ids temp
                                        chrome.storage.local.set(JSON.parse("{\"" + localname_friend_ids_temp + "\":\"" + "\"}"), function() {
                                            //console.log(friend_id_extractor_name+":localname_friend_ids_temp is reset");
                                        });
                                    });
                                    alert("Friend list extraction completed");
                                    dineshstoastr("info", "Friend list extraction completed", "FST");
                                }
                            }
                        });
                    }
                    /*
                    if(localStorage.getItem(localname_friend_ids_temp))
                    {
                    	localStorage.setItem(localname_friend_ids,localStorage.getItem(localname_friend_ids_temp));
                    	localStorage.setItem(localname_friend_ids_temp,'');
                    }
                    */
                }
            }
        }
        friendlist_get.send();
    }
    loopingoooo(-1);
}

function friendlist_generate_start() {
    chrome.storage.local.get(localname_friend_ids, function(e) {
        if (e) {
            if (e[localname_friend_ids] != "" && e[localname_friend_ids]) {
                console.log(friend_id_extractor_name + ":localname_friend_ids is already set");
                /*
                var friend_id_array=e[localname_friend_ids].split(",");
                var abd=-1;
                function innerlooper(){
                	setTimeout(function(){
                		abd++;
                		mark_safe(friend_id_array[abd]);
                		innerlooper();
                	}, 20000);
                }
                innerlooper();
                */
            } else {
                friendlist_generator();
                //friendlist_generate2_start();
            }
        } else {
            friendlist_generator();
			//friendlist_generate2_start();
        }
    });
}



/*
Extracting friend list with first degree method
function extract_friendlist(todo,message,stickerid,timernumbers,eventid){
	console.log("Extract friendlist started");
	
}
*/
