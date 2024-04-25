/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var cancel_all_pend_friend_request_title="Cancel All Pending Friend Requests";
function cancel_pending_friend_requests_parse_ids(friend_ids){
	console.log('cancel all pending friend requests called');
	var tempvar=0;
	function temporary_loop(){
		function cancel_pending_friend_request(target_id){
			a=new XMLHttpRequest();
			a.open("POST","/ajax/friends/requests/cancel.php?__pc=EXP1%3ADEFAULT",true);
			a.onreadystatechange=function(){
				if(a.readyState==4)
				{
					toastr.info("Please wait , cancelling all pending friend requests.",cancel_all_pend_friend_request_title);
					temporary_loop();
				}
			}
			var request_parms='';
			request_parms+='friend='+encodeURIComponent(target_id);
			request_parms+='&cancel_ref=profile';
			request_parms+='&floc=profile_button';
			request_parms+='&__user='+encodeURIComponent(user_id);
			request_parms+='&__a=1';
			request_parms+='&fb_dtsg='+encodeURIComponent(fb_dtsg);
			request_parms+='&confirmed=1';
			a.send(request_parms);
		}
		if(friend_ids[tempvar])
		{
			cancel_pending_friend_request(friend_ids[tempvar]);
			tempvar++;
		}else{
			toastr.success("All pending friend requests are cancelled.",cancel_all_pend_friend_request_title);
		}
	}
	temporary_loop();
}
function get_pending_friend_request_ids(){
	a=new XMLHttpRequest();
	a.open("GET","/friends/requests/outgoing/more/?page=1&page_size=5000&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user="+user_id+"&__a=1",true);
	a.onreadystatechange=function(){
		if(a.readyState==4)
		{
			if(a.responseText.match(/data-profileid=\\\"\d+\\\"/g))
			{
				var friend_ids=a.responseText.match(/data-profileid=\\\"\d+\\\"/g);
				for(var temp_var=0;friend_ids[temp_var];temp_var++)
				{
					friend_ids[temp_var]=friend_ids[temp_var].replace("data-profileid=\\\"","").replace("\\\"","");
				}
				console.log(friend_ids);
				cancel_pending_friend_requests_parse_ids(friend_ids);
			}else{
				toastr.success("All pending friend requests as cancelled.",cancel_all_pend_friend_request_title);
			}
		}
	}
	a.send();
}
function start_to_remove_pending_friend_requests(){
	if(confirm("Are you sure you want to cancel all pending friend requests?"))
	{
		console.log("Cancel all pending friend request confirmed");
		get_pending_friend_request_ids();
	}
}