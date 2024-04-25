/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var group_trasnfer_tool_title="Facebook group trasnfer tool";
function sendup(request_number,groupidgrouptransfer,targetfriendidgrouptransfer)
{
	request_parms="&fb_dtsg="+fb_dtsg;
	request_parms+="&group_id="+groupidgrouptransfer;
	request_parms+="&source=typeahead";
	request_parms+="&ref=";
	request_parms+="&message_id=u_0_7";
	request_parms+="&members="+targetfriendidgrouptransfer;
	request_parms+="&freeform=Justine";
	request_parms+="&__user="+user_id;
	request_parms+="&__a=1";
	request_parms+="&__dyn=7n8anEAMCBynzpQ9UoHaEWy6zECiq78hAKGgSGGeqrWpUpBxCuUW5ogw";
	request_parms+="&__req=8";
	request_parms+="&ttstamp=26581729882102531141061218651";
	request_parms+="&__rev=1307954";
	var http4 = new XMLHttpRequest;
	http4.open("POST", "/ajax/groups/members/add_post.php", true);
	http4.onreadystatechange=function()
	{
		if (http4.readyState==4 && http4.status==200)
	    {
	    	var parsed_request=JSON.parse(http4.responseText.replace("for (;;);",""));
	    	console.log(parsed_request);
	    	if(http4.responseText.match("error"))
	    	{
	    		if(parsed_request.errorDescription)
	    		{
	    			if(parsed_request.errorSummary)
	    			{
	    				//alert(parsed_request.errorDescription);
	    				dineshstoastr("error",(parsed_request.errorDescription+","+parsed_request.errorSummary),group_trasnfer_tool_title);
	    			}
	    		}
	    	};
	    	dineshstoastr("info",request_number+" requests sent.",group_trasnfer_tool_title);
	    };
	}
	http4.send(request_parms);
}
function realtransferengine(group_id_array,targetfriendidgrouptransfer,speedcontrolgroupmembertransfer,starting_group_number,ending_group_number)
{
	//send friend request to add as friend
	add_as_friend(targetfriendidgrouptransfer);
	starting_group_number=(starting_group_number-1);
	ending_group_number=(ending_group_number-1);
	request_number=(starting_group_number-1);
	function loopsender_function(){
		request_number++;
		groupidgrouptransfer=group_id_array[request_number];
		console.log('groupidgrouptransfer='+groupidgrouptransfer+'|starting_group_number='+starting_group_number+'|ending_group_number='+ending_group_number);
		sendup((request_number+1),groupidgrouptransfer,targetfriendidgrouptransfer,speedcontrolgroupmembertransfer);
		setTimeout(function(){
			if(request_number<ending_group_number)
			{
				loopsender_function();
			}else{
				message_to_show='Group trasnfered successfully in selected range.';
				alert(message_to_show);
				toastr.success(message_to_show,group_trasnfer_tool_title);
			}
		}, (speedcontrolgroupmembertransfer*1000));
	}
	loopsender_function();
}
function grouptransferengine()
{
	targetfriendidgrouptransfer=parseInt(document.getElementById("fst789_friendsidgrouptranfer").value);
	speedcontrolgroupmembertransfer=parseInt(document.getElementById("fst789_delaynumcontainer").value);
	starting_group_number=parseInt(document.getElementById("fst789_gt_starting_group_number").value);
	ending_group_number=parseInt(document.getElementById("fst789_gt_ending_group_number").value);
	var error_array=[];
	if(speedcontrolgroupmembertransfer<0)
	{
		error_array.push("Delay time can't be negative.");
	}
	if(targetfriendidgrouptransfer<0)
	{
		error_array.push("Friend ID can't be negative.");
	}
	if(targetfriendidgrouptransfer<0)
	{
		error_array.push("Friend ID can't be negative.");
	}
	if(!starting_group_number)
	{
		error_array.push("Starting group number is invalid");
	}
	if(!ending_group_number)
	{
		error_array.push("Ending group number is invalid");
	}
	if(ending_group_number==starting_group_number)
	{
		error_array.push("Starting group number and ending group number can't be equal.");
	}
	if(starting_group_number>ending_group_number)
	{
		error_array.push("Starting group number can't be greater than ending group number");
	}
	if(!speedcontrolgroupmembertransfer)
	{
		error_array.push("Delay time is invalid.");
	}
	if(!targetfriendidgrouptransfer)
	{
		error_array.push("Target friend id is invalid.");
	}
	if(starting_group_number<0)
	{
		error_array.push("Starting group number can't be zero or negative");
	}
	if(ending_group_number<0)
	{
		error_array.push("Ending group number can't be zero or negative");
	}
	if(error_array[0])
	{
		show_errors(error_array,group_trasnfer_tool_title);
	}else{
		chrome.storage.local.get(localname_group_ids, function(e) {
			console.log(e);
			if(e)
			{
			  	if(e[localname_group_ids]!=""&&e[localname_group_ids])
			  	{
			  		if(e[localname_group_ids][0]&&e[localname_group_ids][0]!="")
			  		{
			  			var group_id_array=e[localname_group_ids];
			  			realtransferengine(group_id_array,targetfriendidgrouptransfer,speedcontrolgroupmembertransfer,starting_group_number,ending_group_number);
			  		}else{
			  			message_to_show="Are you sure you are member of facebook groups?";
						dineshstoastr("error",message_to_show,group_trasnfer_tool_title);
						console.log(message_to_show);
			  		}
			  	}else{
			  		message_to_show="Group extraction is not complete, Please wait until Group extraction is complete.";
					dineshstoastr("error",message_to_show,group_trasnfer_tool_title);
					console.log(message_to_show);
			  	}
			}else{
				message_to_show="Group extraction is not complete, Please wait until Group extraction is complete.";
				dineshstoastr("error",message_to_show,group_trasnfer_tool_title);
				console.log(message_to_show);
			}
		});
	}
}