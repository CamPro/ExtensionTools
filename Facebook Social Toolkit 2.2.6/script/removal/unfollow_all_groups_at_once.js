/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
unfrollow_all_groups_at_once_title="Unfollow All Facebook Groups At once";
function unofollow_group_request(group_id)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/groups/membership/unfollow_group/", true);
	var parms='';
	parms+="group_id="+group_id;
	parms+="&unfollow=1";
	parms+="&__user="+user_id;
	parms+="&__a=1";
	parms+="&__req=d";
	parms+="&fb_dtsg="+fb_dtsg;
	xhr.send(parms);
}
function unfollowgroupsfunctiona(){
	if(confirm("Are you sure you want to unfollow all groups and turn off notifications for all groups at once?"))
	{
		dineshstoastr("info","If you are a member of too many groups then it will take a long time to unfollow all groups. Please be patient. Your browser may freeze during the process.","Unfollow All Groups At Once")
		function unfollowgorupspassarra(groupcollectgroupmemunique)
		{
			grouparray=groupcollectgroupmemunique.split(",");
			var fg=0;
			function loopingo(){
				if(grouparray[fg])
				{
					groupid=grouparray[fg];
					//unfollows group
					unofollow_group_request(groupid);
					//code given below turns off notifications
					var url='';
					url+='/ajax/groups/notifications/update.php?';
					url+='&setting=1';
					url+='&group_id='+groupid;
					url+='&__user='+user_id;
					url+='&__a=1';
					url+='&__dyn=aJioFuy9k9FoAESt2uu4aAiAy95BxN6yUgByV9BiGF4KLyairYyy8lBxiLGjAKGDh9UGmWhF6nUGQSiZ3oyq4-qq8zVE';
					url+='&__req=90';
					url+='&fb_dtsg='+fb_dtsg;
					url+='&ttstamp=26581721126580651174511711373';
					url+='&__rev=1523988';
					var xhr = new XMLHttpRequest();
					xhr.open("POST", url, true);
					fg++;
					xhr.onreadystatechange = function ()
					{
					    if (xhr.readyState == 4 && xhr.status == 200){
					    	dineshstoastr("info",(fg)+" groups unfollowed ",unfrollow_all_groups_at_once_title);
					    	xhr.close;
					    	setTimeout(function(){
					    		loopingo();
					    	}, 0);
					    };
					};
					xhr.send();
				}else{
					var message="Notifications turned off for all Facebook groups.";
					toastr.success(message,unfrollow_all_groups_at_once_title);
					alert(message);
					//after unfollowing groups, update group ID list
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
			  			unfollowgorupspassarra(group_id_array);
			  		}else{
			  			message_to_show="Are you sure you are member of facebook groups?";
						dineshstoastr("error",message_to_show,unfrollow_all_groups_at_once_title);
						console.log(message_to_show);
			  		}
			  	}else{
			  		message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are member of at least 1 facebook group.";
					dineshstoastr("error",message_to_show,unfrollow_all_groups_at_once_title);
					console.log(message_to_show);
			  	}
			}else{
				message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are member of at least 1 facebook group.";
				dineshstoastr("error",message_to_show,unfrollow_all_groups_at_once_title);
				console.log(message_to_show);
			}
		});
	}
}