/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var claim_as_group_admin_tool="Claim as Group Admin";
function claim_admin_starter(groupcollectgroupmemberadder){
	groupcollectgroupmemberadder=groupcollectgroupmemberadder.split(",");
	groupcollectgroupmemunique=groupcollectgroupmemberadder;
	console.log(groupcollectgroupmemunique);
	var groupadddingsuccess=0;
	var index=(-1);
	function loopingoclaimadmino(){
		index++;
		if(groupcollectgroupmemunique[index])
		{
			console.log(groupcollectgroupmemunique[index]);
			var gid=groupcollectgroupmemunique[index];
			var sendpendi=new XMLHttpRequest;
			params="&source=settings";
			params+="&gid="+gid;
			params+="&nctr[_mod]=pagelet_group_actions";
			params+="&__user="+user_id;
			params+="&__a=1";
			params+="&__dyn=7n8anEAMCBynzpQ9UoGha4Cq7pEsx6iqAdGGzQC-C26m6oKexfx2ubhHAyXBw";
			params+="&__req=7";
			params+="&fb_dtsg="+fb_dtsg;
			params+="&ttstamp=265817190868999116661077172";
			params+="&__rev=1373337";
			sendpendi.open("POST","/ajax/groups/membership/claim_adminship.php",true);
			sendpendi.onreadystatechange = function(a) {
			    if (sendpendi.readyState == 4) 
			    {
			    	if(index%10==0)
			    	{
			    		dineshstoastr("info", "Please wait while claim admin script is executing.", claim_as_group_admin_tool);
			    	}
			    	if (sendpendi.readyState == 4 && sendpendi.status == 200) 
			    	{
			    		if (sendpendi.responseText.match("You are now an admin.")) 
			    		{
			    			groupadddingsuccess++;
			    			console.log("http://fb.com/" + gid);
			    			dineshstoastr("success", "You are now an admin of fb.com/" + gid + ".Total " + groupadddingsuccess + " group(s) owned", claim_as_group_admin_tool);
			    		}
			    	}
			    	if (sendpendi.readyState == 4) 
			    	{
			    		if (groupcollectgroupmemunique[index + 1]) {
							loopingoclaimadmino()
						} else {
							dineshstoastr("success", "Claim admin script executed successfully.", claim_as_group_admin_tool);
						}
					}
			    }
			}
			sendpendi.send(params);
		}else{
			dineshstoastr("success","Claim admin script executed successfully.",claim_as_group_admin_tool);
		};
	}
	loopingoclaimadmino();
}
function claimadmino(){
	chrome.storage.local.get(get_item, function(e) {
		if(e)
		{
		  	if(e[get_item]!=""&&e[get_item])
		  	{
		  		if(e[get_item][0]&&e[get_item][0]!="")
		  		{
		  			var group_id_array=e[get_item];
		  			group_id_array=group_id_array.toString();
		  			var basdasd=confirm("Facebook Claim as Group Admin makes you the admin of the Facebook groups that have no admin or Facebook groups with deactivated Facebook admin accounts. Your browser may freeze up during the process. Do you want to continue?");
					if(basdasd)
					{
						dineshstoastr("info", "Claim admin script started successfully, Please wait until it executes completely.", claim_as_group_admin_tool);
						claim_admin_starter(group_id_array);
					};
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