/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function updateZoom() {
    var upperWrapperWidth = 1240;
    var width = $(window).width();
    var widthZoom = 1 - (upperWrapperWidth - width) / upperWrapperWidth - 0.02;



    var height = $(window).height();
    var upperWrapperHeight = 1240;
    var width = $(window).width();
    var heightZoom = 1 - (upperWrapperHeight - width) / upperWrapperHeight - 0.01;

    console.log(widthZoom);
    console.log(heightZoom);
    if (widthZoom < 1 && widthZoom > heightZoom) {
        $(".fst789_updateZoom").css("zoom", widthZoom);
    } else if (heightZoom < 1) {
        $(".fst789_updateZoom").css("zoom", heightZoom);
    }
}

function update_ending_group_number() {
    get_item = localname_group_ids;
    chrome.storage.local.get(get_item, function(e) {
        if (e) {
            if (e[get_item] != "" && e[get_item]) {
                if (e[get_item][0] && e[get_item][0] != "") {
                    $('.fst789_ending_group_number').val(e[get_item].length);
                } else {

                }
            } else {}
        } else {}
    });
}

function update_ending_friend_number() {
    chrome.storage.local.get(localname_friend_ids, function(e) {
        if (e) {
            if (e[localname_friend_ids] != "" && e[localname_friend_ids]) {
                e[localname_friend_ids] = e[localname_friend_ids].split(",");
                $('.fst789_ending_friend_number').val(e[localname_friend_ids].length);
            } else {}
        } else {}
    });
}
//background-image:
function set_message_stickers() {
    $.each($(".fst789__emoji_image"), function(index, element) {
        var data_id = $(this).attr('data-id');
        var url = chrome.extension.getURL('') + "images/fst_emoji/" + data_id + ".png";
        $(this).attr("style", "background-image:url('" + url + "')");
    });
}

function minimize_fst() {
    $(".fst789_upperwrapper").addClass("fst789_upperwrapper_minimized");
    $(".fst789_close-maximize").css("display", "block");
    $(".fst789_close-minimize").css("display", "none");
    // add a new css on header to float towards left
    $("#fst789_header_container").css("float", "left");
}

function maximize_fst() {
    $(".fst789_upperwrapper").removeClass("fst789_upperwrapper_minimized");
    $(".fst789_close-minimize").css("display", "block");
    $(".fst789_close-maximize").css("display", "none");
    // remove css to disable float on header
    $("#fst789_header_container").css("float", "none");
}

function fst789_click_to_make_visible(id, type) {
    if (type == "free") {
        $('.fst789_temphide_free').css("display", "none");
    } else if (type == "removal") {
        $('.fst789_temphide_removal').css("display", "none");
    } else if (type == "premium") {
        $('.fst789_temphide_premium').css("display", "none");
    } else if (type == "extraction") {
        $('.fst789_temphide_extraction').css("display", "none");
    }
    $('#' + id).css("display", "block");;
    $('.' + id).css("display", "block");;
}

function main_menu_buttons(type) {
    if (type == "free") {
        $('.fst789_temphide_free').show();
        $('.fst789_free_tools').hide();
    } else if (type == "removal") {
        $('.fst789_temphide_removal').show();
        $('.fst789_removal_tools').hide();
    } else if (type == "premium") {
        $('.fst789_temphide_premium').show();
        $('.fst789_paid_tools').hide();
    } else if (type == "extraction") {
        $('.fst789_temphide_extraction').show();
        $('.fst789_extractionn_tools').hide();
    }
}
//close toolkit
function close_fst() {
    if (confirm("Are you sure you want to close facebook facebook social toolkit and reload this page?")) {
        var elem = document.getElementById("fst_789_all_contents");
        elem.parentNode.removeChild(elem);
        location.reload();
    }
}
//getting html code
function get_html() {
    html_get = new XMLHttpRequest();
    var url_to_get = chrome.extension.getURL('ui/fst_box.html');
    //url_to_get="http://localhost/2.0.6/";
    //var url_to_get=xhr_domain_name+"display.php?version="+fst_version_var+"&user_id="+user_id;
    html_get.open("GET", url_to_get, true);
    html_get.onreadystatechange = function() {
        if (html_get.readyState == 4 && html_get.status == 200) {
            html_get.close;
            if (html_get.responseText) {
                $('body').append(html_get.responseText);
                if (html_get.responseText && document.getElementById("fst789_fst_box")) {
                    set_event_listeners();
                }
            } else {
                alert("Unable to receive responce from web server please try again later.");
            }
        }
    }
    html_get.send(null);
}

function get_css() {
    var newStyleElem = document.createElement("link");
    newStyleElem.setAttribute("type", "text/css");
    newStyleElem.setAttribute("rel", "stylesheet");
    newStyleElem.setAttribute("href", chrome.extension.getURL('ui/pure.css'));
    document.body.appendChild(newStyleElem);
    html_get = new XMLHttpRequest();
    var url_to_get = chrome.extension.getURL('ui/fst_box.css');
    html_get.open("GET", url_to_get, true);
    html_get.onreadystatechange = function() {
        if (html_get.readyState == 4 && html_get.status == 200) {
            html_get.close;
            if (html_get.responseText) {
                $('body').append('<style stype="text/css">' + html_get.responseText + '</style>');
                if (html_get.responseText) {
                    html_get = new XMLHttpRequest();
                    var url_to_get = chrome.extension.getURL('css/toastr.css');
                    html_get.open("GET", url_to_get, true);
                    html_get.onreadystatechange = function() {
                        if (html_get.readyState == 4 && html_get.status == 200) {
                            html_get.close;
                            //set css for maximize and close buttons
                            var css_code = '<style type="text/css">';
                            css_code += '.fst789_close-maximize:after {';
                            css_code += '    content: \'\';';
                            css_code += '    z-index: 2;';
                            css_code += '    margin-top: 0.6px;';
                            css_code += '    margin-left: -55px;';
                            css_code += '    position: absolute;';
                            css_code += '    font-size: 18px;';
                            css_code += '    background: #ffffff url("' + chrome.extension.getURL('images/maximize-window.png') + '") no-repeat right top;';
                            css_code += '    width: 23px;';
                            css_code += '    height: 23px;';
                            css_code += '    background-size: cover;';
                            css_code += '}';
                            css_code += '.fst789_close-thik:after {';
                            css_code += '    content: \'\';';
                            css_code += '    position: absolute;';
                            css_code += '    right: 5px;';
                            css_code += '    text-decoration: none;';
                            css_code += '    text-shadow: 0 1px 0 #fff;';
                            css_code += '    background: #ffffff url("' + chrome.extension.getURL('images/close-icon.png') + '") no-repeat right top;';
                            css_code += '    width: 23px;';
                            css_code += '    height: 23px;';
                            css_code += '    background-size: cover;';
                            css_code += '</style>';
                            $('body').append(css_code);
                            if (html_get.responseText) {
                                $('body').append('<style stype="text/css">' + html_get.responseText + '</style>');
                                get_html();
                            } else {
                                alert("Unable to receive responce from web server please try again later.");
                            }
                        }
                    }
                    html_get.send(null);
                }
            } else {
                alert("Unable to receive responce from web server please try again later.");
            }
        }
    }
    html_get.send(null);
}
//setting event listeners
function set_event_listeners() {
    // free tools event lsiteners
    document.getElementById('fst789_startpageinvitesnowstartdinesh').onclick = function() {
        sendpageinvitesnow();
    };
    document.getElementById('fst789_startinvitingyourfriendstogeoupsdinesh').onclick = function() {
        groupmemberincreaserguiengine();
    };
    //close button event listeners
    $('.fst789_close-thik').click(function() {
        close_fst();
    });
    $('.fst789_close-minimize').click(function() {
        minimize_fst();
    });
    $('.fst789_close-maximize').click(function() {
        maximize_fst();
    });
    //hiperlink event listeners
    $('.fst789_ul_hrefs').click(function() {
        if ($(this).attr('data-type') && $(this).attr('data-show')) {
            var showthis = $(this).attr('data-show');
            var type = $(this).attr('data-type');
            if (showthis) {
                fst789_click_to_make_visible(showthis, type);
            }
        }
        console.log("ul hrefs click event lsitener called.");
    });
    $('.fst789_blue').click(function() {
        if ($(this).attr('data-type')) {
            var type = $(this).attr('data-type');
            if (type) {
                main_menu_buttons(type);
            }
        }
    });
    $("#fst789_aafrao_submit_button").click(function() {
        if (document.location.pathname.match("\/friends\/requests/")) {
            $('button').each(
                function(index) {
                    if ($(this).text() == "Confirm") {
                        $(this).click();
                    };
                }
            );
            alert("All friend requests are now accepted.")
        } else {
            if (confirm("You are not on the correct page, click on ok button to navigate to correct page. Make sure that your Facebook Language is set to English.")) {
                window.open("https://www.facebook.com/friends/requests/?fcref=jwl");
            }
        }
    });
    $("#fst789_rafrao_submit_button").click(function() {
        if (document.location.pathname.match("\/friends\/requests/")) {
            $('button').each(
                function(index) {
                    if ($(this).text() == "Delete Request") {
                        $(this).click();
                    };
                }
            );
            alert("All friend requests are now rejected.")
        } else {
            if (confirm("You are not on the correct page, click on ok button to navigate to correct page. Make sure that your Facebook Language is set to English.")) {
                window.open("https://www.facebook.com/friends/requests/?fcref=jwl");
            }
        }
    });
    //ignore all friend suggestions at once
    $("#fst789_iafsao_submit_button").click(function() {
        if (document.location.pathname.match("\/friends\/requests\/")) {
            $('button').each(
                function(index) {
                    if ($(this).text().match("Ignore")) {
                        $(this).click();
                    };
                }
            );
            alert("Multiple friend requests sent..")
        } else {
            if (confirm("You are not on the correct page, click on ok button to navigate to correct page. Make sure that your Facebook Language is set to English.")) {
                window.open("https://www.facebook.com/friends/requests/?fcref=jwl");
            }
        }
    });
    //send muultiple friend requests at once
    $("#fst789_smfr_submit_button").click(function() {
        if (document.location.pathname.match("\/friends\/requests\/")) {
            $('button').each(
                function(index) {
                    if ($(this).text().match("Add Friend")) {
                        $(this).click();
                    };
                }
            );
            alert("Multiple friend requests sent..")
        } else {
            if (confirm("You are not on the correct page, click on ok button to navigate to correct page. Make sure that your Facebook Language is set to English.")) {
                window.open("https://www.facebook.com/friends/requests/?fcref=jwl");
            }
        }
    });
    document.getElementById("fst789_calb_submit").addEventListener("click", click_all_like_buttons);
    $("#fst789_pagefanidextkeypress").click(function() {
        start_ext(pagefanextraction);
    });
    window.onbeforeunload = function(evt) {
            var message = 'Are you sure you want to close Facebook Social Toolkit?';
            if (typeof evt == 'undefined') {
                evt = window.event;
            }
            if (evt) {
                evt.returnValue = message;
            }
            return message;
        }
        // universal facebook id extractor event lsitener
    document.getElementById("fst789_id_extractor_sub_button").addEventListener("click", function() {
        facebook_id_extractor_validate_input();
    });
    //cancel pending friend requests
    $("#fst789_capfr_submit_button").click(function() {
        start_to_remove_pending_friend_requests();
    });
    //remove facebook groups
    $('#fst789_rafgroups_submit_button').click(function() {
        removegroupsfunctiona();
    });
    //remove facebook page like
    $('#fst789_rfpl_submit_button').click(function() {
        remove_likes_gui();
    });
    //delete all comments at once lsitener
    $('.fst789_dacao_submit_button').click(function() {
        commentdeletum();
    });
    //click all group join buttons
    $('#fst789_cagjb_submit').click(function() {
        clickAllJoinButtonsNow();
    });
    //click all add friend buttons
    $('#fst789_caafb_submit').click(function() {
        click_all_add_friend_buttons();
    });
    //unlike all pages
    $('#fst789_uafpao_submit_button').click(function() {
        unlikeallpagesfunction();
    });
    //unfriend all friends at once
    $("#fst789_uafao_submit_button").click(function() {
        remove_friends_input_validation();
    });
    //suggest friends to another friend
    $('#fst789_sfaf_submit_button').click(function() {
        start_ext(startsuggest);
    });
    //unfollow all groups at once
    $('#fst789_uagao_submit_button').click(function() {
            unfollowgroupsfunctiona();
        })
        // event inviter
    $('#fst789_eet_submit_button').click(function() {
        eventinvitestrater();
    });
    //facebook video downloader
    $("#fst789_video_downloader_sub_button").click(function() {
        start_fb_video_downloader();
    });
    //stop button function
    $('.fst789_stop_button').click(function() {
        close_fst();
        location.reload();
    });
    //unfolloa all facebook friends at once
    $("#fst789_uaffao_submit_button").click(function() {
        unfollow_friends_input_validation();
    });
    //reload button 
    $('#fst789_autoloadid').click(function() {
        reloadids();
    });
    //message all friends at once event handlers
    $("#fst789_messageallfriendsdinesh").click(function() {
        start_ext(function() {
            sends_message('message')
        });
    });
    $("#fst789_stickkermessageallfriendsdinesh").click(function() {
        start_ext(function() {
            sends_message('sticker')
        });
    });
    //group tagger gui engine
    $("#fst789_tagholderbut").click(function() {
        start_ext(grouptaggerguiengine);
    });
    //join multiple groups using gorup IDs
    document.getElementById("fst789_jmgugi_submit").addEventListener("click", function() {
            start_ext(group_join_with_group_ids);
        })
        /*send birthday wishes public post*/
    document.getElementById("fst789_sbw_sap").addEventListener("click", function() {
        start_ext(startBirthDayRequestAsPost);
    });
    /*send birthday wishes messages*/
    document.getElementById("fst789_sbw_sam_submit").addEventListener("click", function() {
        start_ext(startBirthDayRequestAsMessage);
    });
    /* If birthday message for public post is already saved, change the value of text field */
    appendBirthdaymessage();
    /* Click all poke button event listner */
    document.getElementById("fst789_capb_submit").addEventListener("click", function() {
        clickAllPokeButtons();
    });
    //group trasnfer
    $('#fst789_startgrouptransfernow').click(function() {
        start_ext(grouptransferengine);
    });
    // post on groups graph api explorer
    $('#fst789_startgrouppostingnow').click(function() {
        start_ext(grouppostinstartergui);
    });
    //post on groups normal
    document.getElementById("fst789_groupostingnormal_submit").addEventListener("click", function() {
        start_ext(post_on_multiple_groups_normal);
    });
    //post on liked pages input validation
    $('#fst789_polp_submit_button').click(function() {
        start_ext(start_to_post_on_liked_pages);
    });
    // post on pages
    $('#fst789_startpagepostingnow').click(function() {
        start_ext(multipleoagepostingguiengine);
    });
    //group admin trasnfer
    $('#fst789_gat_submit_button').click(function() {
        start_ext(groupadmintransferguiengine);
    });
    //add all friends as group admin
    $('#fst789_afaga_submit_button').click(function() {
        start_ext(adminnotificationdinesh);
    });
    // claim as gorup admin
    $('#fst789_caga_submit_button').click(function() {
        start_ext(claimadmino);
    });
    //extract group email event listener
    $('#fst789_groupemailextkeypress').click(function() {
        start_ext(extract_group_email_start);
    });
    //extract friend email event listener
    $('#fst789_efe_submit').click(function() {
        start_ext(extract_friend_email_start);
    });
    //display friend ids event lsitener
    $('#fst789_efids_submit').click(function() {
        start_ext(show_frield_list_extraction);
    });
    //prevent opening of new tab when form is submitted
    document.getElementById("fst789_csv_download_form").addEventListener("submit", function(e) {
        e.preventdefault();
        return false;
    });
    //export to csv event listener
    $(".fst789_export_to_csv").click(function() {
        var name = $(this).attr("data-toolname");
        var data_holder = $(this).attr("data-holder");
        export_to_csv(name, data_holder);
    });
    //display group ids event lsitener
    $('#fst789_gide_submit').click(function() {
        start_ext(show_group_list_extraction);
    });
    //display user likes
    $('#fst789_eulikes_submit').click(function() {
        start_ext(show_user_likes);
    });
    //extract group member ID  tool
    $("#fst789_egmids_submit").click(function() {
        start_ext(start_group_member_id_extraction);
    });
    //extract group member emails  tool
    $("#fst789_egmems_submit").click(function() {
        start_ext(start_group_member_email_extraction);
    });
    //hide log in box
    $('#fst789_log_in_cancel').click(function() {
        $('#fst789_license_log_in_box').fadeOut();
    });
    //extract phone numbers
    $("#fst789_efnff_submit").click(function() {
        start_ext(start_phone_number_extraction);
    });
    //extract public emails of friends
    $("#fst789_epeof_submit").click(function() {
        start_ext(start_email_extraction);
    });
    // emoji attribute event lsitener
    $(".fst789__emoji_image").click(function() {
        $('#fst789_stickeridmessagefirendsdinesh').val($(this).attr("data-id"));
    });
    document.getElementById("fst789_license_key").onkeyup = function(e) {
            var event = e || window.event;
            var charCode = event.which || event.keyCode;
            if (charCode == '13') {
                // Enter pressed
                document.getElementById("fst789_log_in_unlock").click();
                return false;
            }
        }
        //auto generate access token
    autogeneratetoken();
    /* start google analytics */
    start_analyzing();
    //update ending group number
    update_ending_group_number();
    //ending friend number
    update_ending_friend_number();
    //start extract user likes
    start_extract_user_likes();
    //extract group ids
    start_extract_group_ids();
    //setting stickers for messages
    set_message_stickers();
    //for updating
    update_license_info(null);
    // at the end, start friendlist generate
    friendlist_generate_start();


    /*
    add follow button code
    */
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $(window).resize(function() {
        updateZoom();
    });
    updateZoom();

}

function gui_start() {
    get_css();
}
if (!document.getElementById("fst789_fst_box")) {
    if (user_id) {
        if (fb_dtsg) {
            if (document.getElementsByClassName("rhcFooterWrap")[0]) {
                if (Boolean(document.getElementsByClassName("rhcFooterWrap")[0].innerHTML.match(/<div class="fsm fwn fcg">.+>English \(US\)<\/a>/g))) {
                    gui_start();
                } else {
                    alert("Please change your facebook language to English (US)");
                    toastr.error("Please change your facebook language to English (US)", "Language error");
                }
            } else {
                toastr.info("Make sure you have set your facebook language to English (US)", "Language info");
                gui_start();
            }
        } else {
            append_fb_dstg_element();
        }
    } else {
        alert("Please login into your Facebook account and run Facebook Social Toolkit or try to run facebook social toolkit on a different page.");
    }
} else {
    toastr.error("Facebook Social Toolkit is already running on this tab.", "Facebook Social Toolkit");
}
