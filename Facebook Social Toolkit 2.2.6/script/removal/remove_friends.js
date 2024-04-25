/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var remove_all_friends_at_once_title="Remove All Friends At Once";
function removefriendsend(friendid){
	console.log("removefriendsend started");
	var xmlhttpunfriend = new XMLHttpRequest;
	xmlhttpunfriend.open("POST","/ajax/profile/removefriendconfirm.php",true);
	params="&uid="+friendid;
	params+="&unref=bd_profile_button";
	params+="&floc=profile_button";
	params+="&nctr[_mod]=pagelet_timeline_profile_actions";
	params+="&__user="+user_id;
	params+="&__a=1";
	params+="&__req=f";
	params+="&fb_dtsg="+fb_dtsg;
	params+="&__rev=1389864";
	xmlhttpunfriend.send(params);
}
function remove_friends_with_friend_id_array(friendidarray){
	loop_counter_var=-1;
	function remove_friends_loop(){
		loop_counter_var++;
		if(friendidarray[loop_counter_var])
		{
			setTimeout(function(){
				console.log(remove_all_friends_at_once_title+":friend_id is="+friendidarray[loop_counter_var]+"|loop_counter_var="+loop_counter_var);
				removefriendsend(friendidarray[loop_counter_var]);
				remove_friends_loop();
				dineshstoastr("info",(loop_counter_var)+" Friends removed.",remove_all_friends_at_once_title)
			},1000);
		}else{
			dineshstoastr("success","All friends are removed.",remove_all_friends_at_once_title);
			//update facebook friend list
			friendlist_generator();
		}
	}
	remove_friends_loop();
}
function remove_friends_input_validation(){
	if(confirm("Are you sure you want to remove all friends from your friend list, once it is done, it can't be reversed."))
	{
		if(confirm("Again confirm that you want to remove all friends."))
		{
			var temporary_number=parseInt(Math.random()*10);
			var second_temporary_number=parseInt(Math.random()*10);
			var sum=temporary_number+second_temporary_number;
			if(prompt(temporary_number+"+"+second_temporary_number+"=","")==sum)
			{	
				if(confirm("All friends will be removed. Do you really want to do this? "))
				{
					chrome.storage.local.get(localname_friend_ids, function(e) {
						if(e)
						{
						  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
						  	{
						  		var friendidarray=e[localname_friend_ids].split(",");
						  		remove_friends_with_friend_id_array(friendidarray);
						  	}else{
								dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",remove_all_friends_at_once_title);
								console.log(remove_all_friends_at_once_title+":aborted because friend list extraction is incomplete.");
						  	}
						}else{
							dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",remove_all_friends_at_once_title);
							console.log(remove_all_friends_at_once_title+":aborted because friend list extraction is incomplete.");
						}
					});
				}
			}else{
				toastr.error("Invalid answer.",remove_all_friends_at_once_title)
			}
		}
	}
}