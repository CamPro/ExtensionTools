/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var add_all_friends_as_admin='Add all friends as group admin';
function adminnotificationdinesh(){
	if(confirm("Your browser may freeze during the process. Do you want to continue?"))
	{
		var gid=document.getElementById("fst789_aafaga_group_id").value;
		var delaytime=(document.getElementById("fst789_aafaga_delay_time").value);
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
			toastr.info("Delay time is set to 1 second.",add_all_friends_as_admin);
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
						setTimeout(function()
						{
							if(friendid!=user_id)
							{
								setTimeout(function(){
									addfriendasgroupadmin(gid,friendid);
									if(index<=friendidlength)
									{
										sendrequests();
									}
								},delaytime);
							}else{
								setTimeout(function(){
									if(index<=friendidlength)
									{
										sendrequests();
									}
								},delaytime);
							}
						},700);
					}else{
						toastr.success("Add all friends as gorup admin executed successfully.",add_all_friends_as_admin);
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
						dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",add_all_friends_as_admin);
						console.log(add_all_friends_as_admin+":aborted because friend list extraction is incomplete.");
				  	}
				}else{
					dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",add_all_friends_as_admin);
					console.log(add_all_friends_as_admin+":aborted because friend list extraction is incomplete.");
				}
			});
		}else{
			show_errors(error_array,add_all_friends);
		}
	};
}