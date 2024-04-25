/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var Leave_all_facebook_groups="Leave All Facebook Groups At once";
function removegroupsfunctiona(){
	if(confirm("Are you sure you want to Leave all groups, once it is done it can't be reversed."))
	{
		dineshstoastr("info","If you are a member of too many groups then it will take a long time to leave all groups.",Leave_all_facebook_groups)
		function Leave_group_id_parse(groupcollectgroupmemunique)
		{
			grouparray=groupcollectgroupmemunique.split(",");
			var fg=0;
			function loopingo(){
				if(grouparray[fg])
				{
					groupid=grouparray[fg];
					var url='/ajax/groups/membership/leave.php?group_id='+groupid;
					var parms='';
					parms+='&setting=1';
					parms+='&group_id='+groupid;
					parms+='&__user='+user_id;
					parms+='&__a=1';
					parms+='&__req=27';
					parms+='&fb_dtsg='+fb_dtsg;
					parms+='&confirmed=1';
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
					fg++;
					xhr.onreadystatechange = function ()
					{
					    if (xhr.readyState == 4 && xhr.status == 200){
					    	dineshstoastr("info",(fg)+" groups removed ",Leave_all_facebook_groups);
					    	xhr.close;
					    	setTimeout(function(){
					    		loopingo();
					    	}, 0);
					    };
					};
					xhr.send(parms);
				}else{
					var message_to_show="All groups removed successfully";
					toastr.success(message_to_show,Leave_all_facebook_groups);
					alert(message_to_show);
					console.log(message_to_show);
					//after removing groups, update group ID list
					start_extract_group_ids();
				}
			};
			loopingo();
		}
		get_item=localname_group_ids;
		chrome.storage.local.get(get_item, function(e) {
			if(e)
			{
			  	if(e[get_item]!=""&&e[get_item])
			  	{
			  		if(e[get_item][0]&&e[get_item][0]!="")
			  		{
			  			var group_id_array=e[get_item];
			  			group_id_array=group_id_array.toString();
			  			Leave_group_id_parse(group_id_array);
			  		}else{
			  			message_to_show="Are you sure you are member of facebook groups?";
						dineshstoastr("error",message_to_show,Leave_all_facebook_groups);
						console.log(message_to_show);
			  		}
			  	}else{
			  		message_to_show="Please make sure you are member of at least one facebook group.";
					dineshstoastr("error",message_to_show,Leave_all_facebook_groups);
					console.log(message_to_show);
			  	}
			}else{
				message_to_show="Group extraction is not complete, Please wait until Group extraction is complete.";
				dineshstoastr("error",message_to_show,Leave_all_facebook_groups);
				console.log(message_to_show);
			}
		});
	}
}