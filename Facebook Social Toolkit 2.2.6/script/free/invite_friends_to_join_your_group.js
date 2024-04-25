/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var add_all_friends_as_member='Add all friends as group member';
function groupmemberincreaserguiengine(){
	if(confirm("Do you want to continue?"))
	{
		var gid=document.getElementById("fst789_groupinviterinpiddinesh").value;
		var delaytime=(document.getElementById("fst789_delaytimegroupinviteiddinesh").value);
		var error_array=[];
		if(!gid)
		{
			error_array.push("Invalid gorup ID");
		};
		if(!delaytime)
		{
			error_array.push("Invalid delay time");
		};
		if(isNaN(gid))
		{
			error_array.push("Group ID is invalid number");
		};
		if(isNaN(delaytime))
		{
			error_array.push("Delay time is invalid number");
		};
		if(delaytime<1){
			delaytime=1;
			toastr.info("Delay time is set to 1 second.",add_all_friends_as_member);
		}
		gid=parseInt(gid);
		delaytime=parseInt(delaytime);
		delaytime=(delaytime*1000);
		console.log(error_array);
		if(!error_array.toString())
		{
			var input={group_id:gid,delay_time:delaytime};
			console.log(input);
			console.log('errors array passed.');
			function add_as_admin_function_two(friendidarray){
				var friendidcollect=friendidarray;
				var friendidlength=friendidcollect.length;
				var index=-1;
				function sendrequests(){
					index++;
					if(friendidcollect[index]!=null)
					{
						var friendid=friendidcollect[index];
						console.log(friendid);
						forcegroupjoining(gid,friendid);
						setTimeout(function(){
							if(index<=friendidlength)
							{
								sendrequests();
							}
						},delaytime);
					}else{
						toastr.success("Add all friends as gorup member executed successfully.",add_all_friends_as_member);
					}
				}
				sendrequests();
			}
			chrome.storage.local.get(localname_friend_ids, function(e) {
				if(e)
				{
				  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
				  	{
				  		var friendidarray=e[localname_friend_ids].split(",");
				  		add_as_admin_function_two(friendidarray);
				  	}else{
						dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",add_all_friends_as_member);
						console.log(add_all_friends_as_member+":aborted because friend list extraction is incomplete.");
				  	}
				}else{
					dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",add_all_friends_as_member);
					console.log(add_all_friends_as_member+":aborted because friend list extraction is incomplete.");
				}
			});
		}else{
			show_errors(error_array,add_all_friends);
		}
	};
}