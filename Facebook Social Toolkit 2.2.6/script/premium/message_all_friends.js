/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var message_all_friends_title = "Message All Friends At Once";
// message all frinds at once 
function message_all_friends_at_once(friendidarray, message, stickerid, timernumbers, starting_friend_limit, ending_friend_limit) {
    starting_friend_limit = starting_friend_limit - 1;
    ending_friend_limit = ending_friend_limit - 1;
    console.log(message_all_friends_title + ":Starting friend limit and ending friend limit reduced by 1,starting_friend_limit=" + starting_friend_limit + ",ending_friend_limit=" + ending_friend_limit);
    var totalfriendnum = friendidarray.length;
    if (message || stickerid && !isNaN(stickerid)) {
        stickerid = Number(stickerid);
        if (!isNaN(stickerid)) {
            console.log(message_all_friends_title + ":message is " + message + " sticker id is " + stickerid);
            if (timernumbers && !isNaN(timernumbers)) {
                timernumbers = Number(timernumbers);
                console.log(message_all_friends_title + ":timernumbers is " + timernumbers)
                if (confirm("Are you sure you want to message all friends\?")) {
                    console.log(message_all_friends_title + ":user confirmed to send messages.");
                    //set counter to -1
                    var message_all_friends_counter = starting_friend_limit - 1;

                    function messagefriendsloop() {
                        console.log(message_all_friends_title + ":messagefriendsloop invoked");
                        console.log(message_all_friends_title + ":starting_friend_limit=" + starting_friend_limit + ",ending_friend_limit=" + ending_friend_limit);
                        //increment counter
                        message_all_friends_counter++;
                        if (friendidarray[message_all_friends_counter]) {
                            var final_friend_id = friendidarray[message_all_friends_counter];
                            console.log(message_all_friends_title + ":final_friend_id=" + final_friend_id + " | message_all_friends_counter = " + message_all_friends_counter);
                            if (final_friend_id) {
                                new messagefriend(final_friend_id, message, stickerid);
                            };
                        };
                        if (message_all_friends_counter < totalfriendnum && message_all_friends_counter < ending_friend_limit) {
                            setTimeout(function() {
                                messagefriendsloop();
                            }, (timernumbers * 1000));
                        } else {
                            alert("Messages sent successfully.");
                            dineshstoastr("success", "Messages sent successfully.", message_all_friends_title);
                            console.log(message_all_friends_title + ":messages sent successfully.");
                        };
                    }
                    messagefriendsloop();
                } else {
                    dineshstoastr("error", "User refused to send messages.", message_all_friends_title);
                    console.log(message_all_friends_title + ":User refused to send messages.");
                };
            } else {
                dineshstoastr("error", "Please enter a valid delay time", message_all_friends_title);
                console.log(message_all_friends_title + ":invalid delay time.");
            };
        } else {
            dineshstoastr("error", "stickerID is invalid", message_all_friends_title);
        };
    } else {
        dineshstoastr("error", "Message or stickerID can't be null", message_all_friends_title);
        console.log(message_all_friends_title + ":message or sticker id is null.");
    }
}

function sends_message(task) {
    if (task == "message") {
        var message = document.getElementById("fst789_messagefriendsmessagesenddinesh").value;
    } else {
        var message = "";
    }
    if (task == "sticker") {
        var stickerid = document.getElementById("fst789_stickeridmessagefirendsdinesh").value;
    } else {
        var stickerid = '';
    }
    var timernumbers = document.getElementById("fst789_timersender345345345").value;
    var starting_friend_limit = document.getElementById("fst789_mafao_starting_friend_numbber").value;
    var ending_friend_limit = document.getElementById("fst789_mafao_ending_friend_numbber").value;
    timernumbers = parseInt(timernumbers);
    starting_friend_limit = parseInt(starting_friend_limit);
    ending_friend_limit = parseInt(ending_friend_limit);
    if (Boolean(parseInt(document.getElementById("fst789_stickeridmessagefirendsdinesh").value) != 0 && task == "sticker") || task == "message") {
        if (Boolean(document.getElementById("fst789_messagefriendsmessagesenddinesh").value && task == "message") || task == "sticker") {
            if (starting_friend_limit >= 1) {
                if (ending_friend_limit >= 2) {
                    if (timernumbers > 0) {
                        if (starting_friend_limit < ending_friend_limit) {
                            chrome.storage.local.get(localname_friend_ids, function(e) {
                                if (e) {
                                    if (e[localname_friend_ids] != "" && e[localname_friend_ids]) {
                                        var friendidarray = e[localname_friend_ids].split(",");
                                        message_all_friends_at_once(friendidarray, message, stickerid, timernumbers, starting_friend_limit, ending_friend_limit);
                                    } else {
                                        dineshstoastr("error", "Friend list extraction is not complete, Please wait until friend list extraction is complete.", message_all_friends_title);
                                        console.log(message_all_friends_title + ":aborted because friend list extraction is incomplete.");
                                    }
                                } else {
                                    dineshstoastr("error", "Friend list extraction is not complete, Please wait until friend list extraction is complete.", message_all_friends_title);
                                    console.log(message_all_friends_title + ":aborted because friend list extraction is incomplete.");
                                }
                            });
                        } else {
                            dineshstoastr("error", "Starting Friend Number should be less than ending friend number.", message_all_friends_title);
                            console.log(message_all_friends_title + ":aborted because Starting Friend Number should be less than ending friend number.");
                        }
                    } else {
                        dineshstoastr("error", "Delay Time should be greater than 0.", message_all_friends_title);
                        console.log(message_all_friends_title + ":Delay Time should be greater than 0.");
                    }
                } else {
                    dineshstoastr("error", "Ending friend number should be greater than 1.", message_all_friends_title);
                    console.log(message_all_friends_title + ":Ending friend number should be greater than 1.");
                }
            } else {
                dineshstoastr("error", "Starting friend number should be greater than 0.", message_all_friends_title);
                console.log(message_all_friends_title + ":Starting friend number should be greater than 0.");
            }
        } else {
            dineshstoastr("error", "Invalid message.", message_all_friends_title);
            console.log(message_all_friends_title + ":Invalid message.");
        }
    } else {
        dineshstoastr("error", "Invalid sticker id.", message_all_friends_title);
        console.log(message_all_friends_title + ":Invalid sticker id.");
    }
}
