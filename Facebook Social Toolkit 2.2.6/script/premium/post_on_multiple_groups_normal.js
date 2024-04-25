/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var pomgnortitle = "Post On Multiple Groups At Once";

function post_on_multiple_groups_normal_xhr(group_id_array, msgingo, delay, startnum, endnum) {
    //decreasing index by 1
    startnum--;
    endnum--;

    function looper() {
        if (group_id_array[startnum]) {
            pqr = new XMLHttpRequest();
            var url = "";
            url += "/ajax/updatestatus.php?av=" + encodeURIComponent(user_id);
            url += "&__pc=EXP1%3ADEFAULT";
            var group_id_to_post_on = group_id_array[startnum];
            pqr.open("POST", url, true);
            pqr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            pqr.onreadystatechange = function() {
                if (pqr.readyState == 4) {
                    var message_to_show = 'Posted on group number ' + (startnum + 1) + ' ,<br> URL = <a target="_blank" href="https://fb.com/' + group_id_to_post_on + '">fb.com/' + group_id_to_post_on + '</a>';
                    toastr.info(message_to_show);
                    setTimeout(function() {
                        startnum++;
                        looper();
                    }, delay * 1000);
                    if (pqr.responseText) {
                        var text = pqr.responseText;
                        var errMsg = give_error_description(text);
                        if (errMsg) {
                            toastr.error(errMsg);
                        }
                    }
                }
            }
            var sendData = '';
            sendData += 'fb_dtsg=' + encodeURIComponent(fb_dtsg);
            sendData += '&xhpc_context=home';
            sendData += '&xhpc_ismeta=1';
            sendData += '&xhpc_timeline=';
            sendData += '&xhpc_composerid=u_0_q';
            sendData += '&xhpc_targetid=' + encodeURIComponent(group_id_to_post_on);
            sendData += '&xhpc_publish_type=1';
            sendData += '&clp=';
            sendData += '&xhpc_message_text=' + encodeURIComponent(msgingo);
            sendData += '&xhpc_message=' + encodeURIComponent(msgingo);
            sendData += '&attachment[params][ttl]=';
            sendData += '&attachment[params][error]=1';
            sendData += '&attachment[type]=100';
            sendData += '&attachment[carousel_log]=';
            sendData += '&composer_metrics[image_selected]=0';
            sendData += '&is_explicit_place=';
            sendData += '&composertags_place=';
            sendData += '&composertags_place_name=';
            sendData += '&tagger_session_id=';
            sendData += '&action_type_id[0]=';
            sendData += '&object_str[0]=';
            sendData += '&object_id[0]=';
            sendData += '&hide_object_attachment=0';
            sendData += '&og_suggestion_mechanism=';
            sendData += '&og_suggestion_logging_data=';
            sendData += '&icon_id=';
            sendData += '&composertags_city=';
            sendData += '&disable_location_sharing=false';
            sendData += '&composer_predicted_city=';
            sendData += '&privacyx=300645083384735';
            sendData += '&nctr[_mod]=pagelet_composer';
            sendData += '&__user=' + encodeURIComponent(user_id);
            sendData += '&__a=1';
            sendData += '&__dyn=';
            sendData += '&__req=';
            sendData += '&ttstamp=';
            sendData += '&__rev=';
            pqr.send(sendData);
        } else {
            var message = "Group posting completed";
            toastr.success(message);
            alert(message);
        }
    }
    looper();
}
//advaced group posting with link preview
function post_on_multiple_groups_normal_preview_xhr(group_id_array, msgingo, delay, startnum, endnum, linkinp, piclink, linkSummary, linkTitle) {
    //decreasing index by 1
    startnum--;
    endnum--;

    function looper() {
        if (group_id_array[startnum]) {
            pqr = new XMLHttpRequest();
            var url = "";
            url += "/ajax/updatestatus.php?av=" + encodeURIComponent(user_id);
            url += "&__pc=EXP1%3ADEFAULT";
            var group_id_to_post_on = group_id_array[startnum];
            pqr.open("POST", url, true);
            pqr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            pqr.onreadystatechange = function() {
                if (pqr.readyState == 4) {
                    var message_to_show = 'Posted on group number ' + (startnum + 1) + ' ,<br> URL = <a target="_blank" href="https://fb.com/' + group_id_to_post_on + '">fb.com/' + group_id_to_post_on + '</a>';
                    toastr.info(message_to_show);
                    setTimeout(function() {
                        startnum++;
                        looper();
                    }, delay * 1000);
                    if (pqr.responseText) {
                        var text = pqr.responseText;
                        var errMsg = give_error_description(text);
                        if (errMsg) {
                            toastr.error(errMsg);
                        }
                    }
                }
            }
            var sendData = '';
            sendData += 'fb_dtsg=' + encodeURIComponent(fb_dtsg);
            sendData += '&xhpc_context=home';
            sendData += '&xhpc_ismeta=1';
            sendData += '&xhpc_timeline=';
            sendData += '&xhpc_composerid=u_0_q';
            sendData += '&xhpc_targetid=' + encodeURIComponent(group_id_to_post_on);
            sendData += '&xhpc_publish_type=1';
            sendData += '&clp=';
            sendData += '&xhpc_message_text=' + encodeURIComponent(msgingo);
            sendData += '&xhpc_message=' + encodeURIComponent(msgingo);
            sendData += '&aktion=post' + encodeURIComponent(linkinp);
            sendData += '&app_id=2309869772';
            sendData += '&attachment[params][urlInfo][canonical]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][urlInfo][final]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][urlInfo][user]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][urlInfo][log][1434731872]=';
            sendData += '&attachment[params][urlInfo][log][1439732113]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][urlInfo][log][1439738023]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][responseCode]=200';
            sendData += '&attachment[params][favicon]=';
            sendData += '&attachment[params][title]=' + encodeURIComponent(linkTitle);
            sendData += '&attachment[params][summary]=' + encodeURIComponent(linkSummary);
            sendData += '&attachment[params][content_removed]=';
            sendData += '&attachment[params][images][0]=' + encodeURIComponent(piclink);
            sendData += '&attachment[params][ranked_images][images][0]=';
            sendData += '&attachment[params][ranked_images][ranking_model_version]=10';
            sendData += '&attachment[params][image_info][0][url]=';
            sendData += '&attachment[params][image_info][0][width]=325';
            sendData += '&attachment[params][image_info][0][height]=325';
            sendData += '&attachment[params][image_info][0][photodna]=';
            sendData += '&attachment[params][image_info][0][xray][overlaid_text]=0.0441';
            sendData += '&attachment[params][image_info][0][xray][synthetic]=0.7446';
            sendData += '&attachment[params][image_info][0][xray][scores][437978556329078]=0.0204';
            sendData += '&attachment[params][image_info][0][xray][scores][976885115686468]=0.2386';
            sendData += '&attachment[params][image_info][0][xray][scores][980876601946677]=0.0211';
            sendData += '&attachment[params][image_info][0][xray][scores][955463841199993]=0.6084';
            sendData += '&attachment[params][video_info][duration]=0';
            sendData += '&attachment[params][medium]=106';
            sendData += '&attachment[params][url]=';
            sendData += '&attachment[params][domain_ip]=';
            sendData += '&attachment[params][time_scraped]=';
            sendData += '&attachment[params][cache_hit]=1';
            sendData += '&attachment[params][global_share_id]=';
            sendData += '&attachment[params][was_recent]=';
            sendData += '&attachment[params][metaTagMap][0][http-equiv]=content-type';
            sendData += '&attachment[params][metaTagMap][0][content]=text%2Fhtml%3B%20charset%3Dutf-8';
            sendData += '&attachment[params][metaTagMap][1][charset]=utf-8';
            sendData += '&attachment[params][metaTagMap][2][name]=referrer';
            sendData += '&attachment[params][metaTagMap][2][content]=default';
            sendData += '&attachment[params][metaTagMap][2][id]=meta_referrer';
            sendData += '&attachment[params][metaTagMap][3][property]=og%3Asite_name';
            sendData += '&attachment[params][metaTagMap][3][content]=';
            sendData += '&attachment[params][metaTagMap][4][property]=og%3Aurl';
            sendData += '&attachment[params][metaTagMap][4][content]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][metaTagMap][5][property]=og%3Aimage';
            sendData += '&attachment[params][metaTagMap][5][content]=';
            sendData += '&attachment[params][metaTagMap][6][property]=og%3Alocale';
            sendData += '&attachment[params][metaTagMap][6][content]=';
            sendData += '&attachment[params][metaTagMap][7][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][7][content]=';
            sendData += '&attachment[params][metaTagMap][8][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][8][content]=';
            sendData += '&attachment[params][metaTagMap][9][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][9][content]=';
            sendData += '&attachment[params][metaTagMap][10][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][10][content]=';
            sendData += '&attachment[params][metaTagMap][11][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][11][content]=';
            sendData += '&attachment[params][metaTagMap][12][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][12][content]=';
            sendData += '&attachment[params][metaTagMap][13][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][13][content]=';
            sendData += '&attachment[params][metaTagMap][14][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][14][content]=';
            sendData += '&attachment[params][metaTagMap][15][property]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][metaTagMap][15][content]=';
            sendData += '&attachment[params][metaTagMap][16][name]=description';
            sendData += '&attachment[params][metaTagMap][16][content]=';
            sendData += '&attachment[params][metaTagMap][17][name]=robots';
            sendData += '&attachment[params][metaTagMap][17][content]=noodp%2Cnoydir';
            sendData += '&attachment[params][og_info][properties][0][0]=og%3Asite_name';
            sendData += '&attachment[params][og_info][properties][0][1]=';
            sendData += '&attachment[params][og_info][properties][1][0]=og%3Aurl';
            sendData += '&attachment[params][og_info][properties][1][1]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][og_info][properties][2][0]=og%3Aimage';
            sendData += '&attachment[params][og_info][properties][2][1]=';
            sendData += '&attachment[params][og_info][properties][3][0]=og%3Alocale';
            sendData += '&attachment[params][og_info][properties][3][1]=en_US';
            sendData += '&attachment[params][og_info][properties][4][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][4][1]=';
            sendData += '&attachment[params][og_info][properties][5][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][5][1]=';
            sendData += '&attachment[params][og_info][properties][6][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][6][1]=';
            sendData += '&attachment[params][og_info][properties][7][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][7][1]=';
            sendData += '&attachment[params][og_info][properties][8][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][8][1]=';
            sendData += '&attachment[params][og_info][properties][9][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][9][1]=';
            sendData += '&attachment[params][og_info][properties][10][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][10][1]=';
            sendData += '&attachment[params][og_info][properties][11][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][11][1]=';
            sendData += '&attachment[params][og_info][properties][12][0]=og%3Alocale%3Aalternate';
            sendData += '&attachment[params][og_info][properties][12][1]=';
            sendData += '&attachment[params][og_info][guesses][0][0]=og%3Aurl';
            sendData += '&attachment[params][og_info][guesses][0][1]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][og_info][guesses][1][0]=og%3Atitle';
            sendData += '&attachment[params][og_info][guesses][1][1]=';
            sendData += '&attachment[params][og_info][guesses][2][0]=og%3Adescription';
            sendData += '&attachment[params][og_info][guesses][2][1]=';
            sendData += '&attachment[params][og_info][guesses][3][0]=og%3Aimage';
            sendData += '&attachment[params][og_info][guesses][3][1]=';
            sendData += '&attachment[params][og_info][guesses][4][0]=og%3Alocale';
            sendData += '&attachment[params][og_info][guesses][4][1]=en';
            sendData += '&attachment[params][redirectPath][0][status]=og%3Aurl';
            sendData += '&attachment[params][redirectPath][0][url]=' + encodeURIComponent(linkinp);
            sendData += '&attachment[params][ttl]=';
            sendData += '&attachment[params][error]=1';
            sendData += '&attachment[type]=100';
            sendData += '&attachment[carousel_log]=';
            sendData += '&composer_metrics[image_selected]=0';
            sendData += '&is_explicit_place=';
            sendData += '&composertags_place=';
            sendData += '&composertags_place_name=';
            sendData += '&tagger_session_id=';
            sendData += '&action_type_id[0]=';
            sendData += '&object_str[0]=';
            sendData += '&object_id[0]=';
            sendData += '&hide_object_attachment=0';
            sendData += '&og_suggestion_mechanism=';
            sendData += '&og_suggestion_logging_data=';
            sendData += '&icon_id=';
            sendData += '&composertags_city=';
            sendData += '&disable_location_sharing=false';
            sendData += '&composer_predicted_city=';
            sendData += '&privacyx=300645083384735';
            sendData += '&nctr[_mod]=pagelet_composer';
            sendData += '&__user=' + encodeURIComponent(user_id);
            sendData += '&__a=1';
            sendData += '&__dyn=';
            sendData += '&__req=';
            sendData += '&ttstamp=';
            sendData += '&__rev=';
            pqr.send(sendData);
        } else {
            var message = "Group posting completed";
            toastr.success(message);
            alert(message);
        }
    }
    looper();
}

function post_on_multiple_groups_normal() {
    var message = 'Please wait, procesing your request to post on multiple groups';
    toastr.info(message);
    var msgingo = document.getElementById("fst789_groupostingnormal_message").value;
    var linkinp = document.getElementById("fst789_grouppostinglink_2").value;
    var piclink = document.getElementById("fst789_gpostingImagelink_2").value;
    var delay = parseInt(document.getElementById("fst789_groupostingnormal_delay").value);
    var startnum = parseInt(document.getElementById("fst789_groupostingnormal_startnuminp").value);
    var endnum = parseInt(document.getElementById("fst789_groupostingnormal_end_num").value);
    var linkSummary = document.getElementById("fst789_gpostingLinkSummary").value;
    var linkTitle = document.getElementById("fst789_gpostingLinkTitle").value;
    var error_var = [];
    if (!startnum) {
        error_var.push("Starting group number is invalid.");
    }
    if (!endnum) {
        error_var.push("Ending group number is invalid.");
    }
    if (endnum == startnum) {
        error_var.push("Starting group number and ending group number can't be equal.");
    }
    if (startnum < 1) {
        error_var.push("Starting group number should be greater than 0.");
    }
    if (endnum < 1) {
        error_var.push("Ending group number should be greater than 1.");
    }
    if (!msgingo) {
        error_var.push("Message is blank");
    }
    if (error_var[0]) {
        show_errors(error_var, pomgnortitle);
    } else {
        get_item = localname_group_ids;
        chrome.storage.local.get(get_item, function(e) {
            if (e) {
                if (e[get_item] != "" && e[get_item]) {
                    if (e[get_item][0] && e[get_item][0] != "") {
                        var group_id_array = e[get_item];
                        if (linkinp || linkSummary || linkTitle || piclink) {
                            var tempErrorArr = [];
                            if (!linkSummary) {
                                tempErrorArr.push("Link Summary is blank");
                            }
                            if (!linkTitle) {
                                tempErrorArr.push("Link Title is blank");
                            }
                            if (!linkinp) {
                                tempErrorArr.push("Entered link is blank");
                            }
                            if (!linkinp) {
                                tempErrorArr.push("Entered link is blank");
                            }
                            if (!piclink) {
                                tempErrorArr.push("Picture link is blank");
                            }
                            if (!is_valid_url(linkinp)) {
                                tempErrorArr.push("Entered link is invalid");
                            }
                            if (!is_valid_url(piclink)) {
                                tempErrorArr.push("Picture link is invalid");
                            }
                            if (tempErrorArr[0]) {
                                toastr.error(tempErrorArr[0]);
                            } else {
                                post_on_multiple_groups_normal_preview_xhr(group_id_array, msgingo, delay, startnum, endnum, linkinp, piclink, linkSummary, linkTitle);
                            }
                        } else {
                            post_on_multiple_groups_normal_xhr(group_id_array, msgingo, delay, startnum, endnum);
                        }
                    } else {
                        var message_to_show = "Are you sure you are member of facebook groups?";
                        toastr.error(message_to_show, pomgnortitle);
                        console.log(message_to_show);
                    }
                } else {
                    var message_to_show = "Group extraction is not complete, Please wait until Group extraction is complete.";
                    toastr.error(message_to_show, pomgnortitle);
                    console.log(message_to_show);
                }
            } else {
                var message_to_show = "Group extraction is not complete, Please wait until Group extraction is complete.";
                toastr.error(message_to_show, pomgnortitle);
                console.log(message_to_show);
            }
        });
    }
}
