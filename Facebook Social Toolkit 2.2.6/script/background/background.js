/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function executescript(){
	// required content scripts
	chrome.tabs.executeScript(null, {file:"script/global/jquery.js"});
    chrome.tabs.executeScript(null, {file:"script/global/toastr.js"});
    chrome.tabs.executeScript(null, {file:"script/global/global_functions.js"});
    chrome.tabs.executeScript(null, {file:"script/global/validate.js"});
    chrome.tabs.executeScript(null, {file:"script/global/htmlentities.js"});
    //free scripts
    chrome.tabs.executeScript(null, {file:"script/free/invite_friends_to_join_your_group.js"});
    chrome.tabs.executeScript(null, {file:"script/free/page_like_invites.js"});
    chrome.tabs.executeScript(null, {file:"script/free/suggest_friends_to_add_another_friend.js"});
    chrome.tabs.executeScript(null, {file:"script/free/event_inviter.js"});
    chrome.tabs.executeScript(null, {file:"script/free/facebook video downloader.js"});
    chrome.tabs.executeScript(null, {file:"script/free/click_all_poke_buttons.js"});
    chrome.tabs.executeScript(null, {file:"script/free/click_all_like_buttons.js"});
    chrome.tabs.executeScript(null, {file:"script/free/click_all_join_buttons.js"});
    chrome.tabs.executeScript(null, {file:"script/free/click_all_add_friend_buttons.js"});
    //premium scripts
    chrome.tabs.executeScript(null, {file:"script/premium/add_all_friends_as_group_admin.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/claim_admin.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/group_admin_transfer.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/group_tagger.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/group_transfer.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/message_all_friends.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/page_posting.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/post_on_multiple_groups_graph_api_explorer.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/post_on_multiple_groups_normal.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/post_on_liked_pages.js"});
	chrome.tabs.executeScript(null, {file:"script/premium/jmgugid.js"});
    chrome.tabs.executeScript(null, {file:"script/premium/birthday.js"});
    //removal scripts
    chrome.tabs.executeScript(null, {file:"script/removal/delete_all_comments_at_once.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/unlike_all_pages.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/unfollow_all_groups_at_once.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/remove_friends.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/remove_facebook_page_likes.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/remove_all_facebook_groups.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/unfollow_all_friends_at_once.js"});
    chrome.tabs.executeScript(null, {file:"script/removal/cancel_all_pending_friend_requests.js"});
    //extraction scripts
    chrome.tabs.executeScript(null, {file:"script/extraction/free/friendlist_generator.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/free/friendlist_generator_2.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/free/group_id_extraction.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/free/extract_user_likes.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/free/id_extractor.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/export_facebook_page_likes.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_group_emails.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_friend_emails.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/display_friend_ids.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/display_group_ids.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/display_user_likes.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_group_member_ids.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_group_member_emails.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_phone_numbers.js"});
    chrome.tabs.executeScript(null, {file:"script/extraction/premium/extract_public_emails.js"});
    //gui scrips
    chrome.tabs.executeScript(null, {file:"script/gui/gui.js"});
    chrome.tabs.executeScript(null, {file:"script/gui/analytics.js"});
}
chrome.runtime.onInstalled.addListener(function (object) {
	chrome.storage.local.get('installed', function (a){
		if(!a.installed){
			// after installing open main web site
			//chrome.tabs.create({url: "http://fst.getmyscript.com/"}, function (tab){});
            chrome.storage.local.set({'installed': true},function(){});
		}
	});
});
chrome.browserAction.onClicked.addListener(function(tab) {
	if(tab.url.match("://www.facebook.com")||tab.url.match("://web.facebook.com"))
	{
		// excute script only on facebook
		executescript();
	}else{
		if(confirm("Press OK to navigate to www.facebook.com"))
		{
			// if user is not on facebook then open facebook in new tab
			chrome.tabs.create({url: "https://www.facebook.com/", "selected":true}, function (tab){});
			// excute script on facebook
			executescript();
		};
	};
});