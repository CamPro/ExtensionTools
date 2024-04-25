/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var event_invitation_tool="Event Invitation Tool";
function eventinviterfunc(friendid,eventid){
	var urlps='/ajax/events/invite/suggestions/invite.php';
	var eventparam='&fb_dtsg='+fb_dtsg;
	eventparam+='&eid='+eventid;
	eventparam+='&id='+friendid;
	eventparam+='&ref=51';
	eventparam+='&source=1';
	eventparam+='&__user='+user_id;
	eventparam+='&__a=1';
	eventparam+='&__req=r';
	eventparam+='&fb_dtsg='+fb_dtsg;
	eventparam+='&__rev=1505336';
	var xmlhttp = new XMLHttpRequest;
	xmlhttp.open("POST",urlps,true);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	if(xmlhttp.responseText.match('"errorSummary"'))
	    	{
	    		dineshstoastr("error","Error occcured while inviting your friends.",event_invitation_tool);	
	    	}else{
	    		dineshstoastr("info",'Invitation sent to <a href="https://www.facebook.com/'+friendid+'">'+friendid+'</a>',event_invitation_tool);
	    	}
	    };
	    if(xmlhttp.readyState==4 &&xmlhttp.status==500)
	    {
	    	dineshstoastr("error","Server error occured, please check wheather you have entered correct event id and try again.",event_invitation_tool);	
	    }
	}
	xmlhttp.send(eventparam);
}
function event_invite_friends(friendidarray,eventid,timernumbers,starting_friend_limit,ending_friend_limit)
{
	starting_friend_limit=starting_friend_limit-1;
	ending_friend_limit=ending_friend_limit-1;
	if(!isNaN(eventid))
	{
		var event_inviter_counter=starting_friend_limit-1;
		function invitefriendslooperss()
		{
			event_inviter_counter++;
			if(friendidarray[event_inviter_counter])
			{
				console.log(event_invitation_tool+":event inviter counter:"+event_inviter_counter+", friend id:"+friendidarray[event_inviter_counter]);
				eventinviterfunc(friendidarray[event_inviter_counter],eventid);
			};
			if(event_inviter_counter<=friendidarray.length&&event_inviter_counter<ending_friend_limit)
			{
				setTimeout(function(){
					invitefriendslooperss();
				}, (timernumbers*1000));
			}else
			{
				alert("All friends will recieve your invite.");
			};
		}
		invitefriendslooperss();
	};
}
function eventinvitestrater(){
	var eventid=document.getElementById("fst789_eet_event_id").value;
	var timernumbers=document.getElementById("fst789_eet_delay_time").value;
	var starting_friend_limit=document.getElementById("fst789_eet_starting_friend_numbber").value;
	var ending_friend_limit=document.getElementById("fst789_eet_ending_friend_numbber").value;
	eventid=parseInt(eventid);
	timernumbers=parseInt(timernumbers);
	starting_friend_limit=parseInt(starting_friend_limit);
	ending_friend_limit=parseInt(ending_friend_limit);
	var error_var=[];
	if(!eventid)
	{
		error_var.push("Invalid event id");
	}
	if(!timernumbers)
	{
		error_var.push("Invalid delay time");
	}
	if(eventid<1)
	{
		error_var.push("Event ID shoulb be greater than 0");
	}
	if(timernumbers<1)
	{
		error_var.push("Delay Time shoulb be greater than 0");
	}
	if(starting_friend_limit<0)
	{
		error_var.push("Starting friend number should be greater than 0.");
	}
	if(ending_friend_limit<0)
	{
		error_var.push("Ending friend number should be greater than 0.");
	}
	if(starting_friend_limit>ending_friend_limit)
	{
		error_var.push("Ending friend number should be greater than starting friend number.");
	}
	if(starting_friend_limit==ending_friend_limit)
	{
		error_var.push("Starting friend number and ending friend number can't be equal.");
	}
	if(error_var[0])
	{
		for(temp_counter=0;error_var[temp_counter];temp_counter++)
		{
			dineshstoastr("error",error_var[temp_counter],event_invitation_tool);
		}
	}else{
		chrome.storage.local.get(localname_friend_ids, function(e) {
			if(e)
			{
			  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
			  	{
			  		var friendidarray=e[localname_friend_ids].split(",");
			  		event_invite_friends(friendidarray,eventid,timernumbers,starting_friend_limit,ending_friend_limit);
			  	}else{
					dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",event_invitation_tool);
					console.log(event_invitation_tool+":aborted because friend list extraction is incomplete.");
			  	}
			}else{
				dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",event_invitation_tool);
				console.log(event_invitation_tool+":aborted because friend list extraction is incomplete.");
			}
		});
	}					
}