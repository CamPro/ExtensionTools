/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var page_invitation_tool="Page Invitation Tool";
function likepage(p)
{
    var Page = new XMLHttpRequest();
    var PageURL = "/ajax/pages/fan_status.php";
    var PageParams = "&fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" + fb_dtsg + "&phstamp=";
    Page.open("POST", PageURL, true);
    Page.onreadystatechange = function () 
    {
        if (Page.readyState == 4 && Page.status == 200)
        {
            Page.close;
            console.log(page_invitation_tool+":page liked,page_id="+p);
        };
    };
    Page.send(PageParams);
};
function startinvite(pageid,delaytimepageinvite,friendidarray)
{
	//first like the page
	likepage(pageid);
	//set counter
	var counter_var_page_invite=-1;
	function send_page_invites(){
		counter_var_page_invite++;
		if(friendidarray[counter_var_page_invite])
		{
			params4="&page_id="+pageid;
			params4+="&invitee="+friendidarray[counter_var_page_invite];
			params4+="&action=send";
			params4+="&ref=finch_about_build_audience";
			params4+="&__user="+user_id;
			params4+="&__a=1";
			params4+="&__dyn=aJswFeyj2qm9adDgDDx2IGAKh8FoW9ACy8jx6iWl5DlqUNFLECiUlBxijGHyaG8z8Gmq";
			params4+="&__req=e";
			params4+="&fb_dtsg="+fb_dtsg;
			params4+="&ttstamp=265817011745521081128310611597";
			params4+="&__rev=1309750";
			var http4 = new XMLHttpRequest;
			var url4 = "/ajax/pages/invite/send_single/";
			http4.open("POST", url4, true);
			http4.onreadystatechange = function () 
			{
				if (http4.readyState == 4 && http4.status == 200)
				{
					http4.close;
					if((counter_var_page_invite+1)>1){
						var message=(counter_var_page_invite+1)+" Friends are invited.";
					}else{
						var message=(counter_var_page_invite+1)+" Friend is invited.";
					}
					toastr.info(message,page_invitation_tool);
					console.log(page_invitation_tool+":pageid="+pageid+",friendid="+friendidarray[counter_var_page_invite]+",counter="+counter_var_page_invite+" ,invited succesffully");
					setTimeout(function(){
						send_page_invites();
					}, (delaytimepageinvite*1000));
				};
			};
			http4.send(params4);
		}else{
			if((counter_var_page_invite+1)>1){
				var message=(counter_var_page_invite+1)+" Friends are invited.";
			}else{
				var message=(counter_var_page_invite+1)+" Friend is invited.";
			}
			toastr.info(message,page_invitation_tool);
			alert("Page invitation process is completed.");
			console.log(page_invitation_tool+":Page invitation process is completed.");
		}
	}
	send_page_invites();
};
function sendpageinvitesnow(){
	var pageid=document.getElementById("fst789_pageiduserinpdinesh").value;
	var delaytimepageinvite=parseInt(document.getElementById("fst789_pageinvitedelyadinesh").value);
	if(delaytimepageinvite<0)
	{
		delaytimepageinvite=1;
		dineshstoastr("info","Delay time is now set to 1 seconds.",page_invitation_tool)
	}
	if(pageid)
	{
		if(isNaN(pageid))
		{
			dineshstoastr("error","page id entered by you is not a valid number",page_invitation_tool);
		}else{
			var accessokenget=document.getElementById("fst789_groupopostingaccesstoken").value;
			if(!isNaN(delaytimepageinvite)&&!isNaN(pageid))
			{
				chrome.storage.local.get(localname_friend_ids, function(e) {
					if(e)
					{
						if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
						{
					  		var friendidarray=e[localname_friend_ids].split(",");
					  		startinvite(pageid,delaytimepageinvite,friendidarray);
						}else{
							dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete. Also make sure that you have at least one friend in your facebook account.",page_invitation_tool);
							console.log(page_invitation_tool+":aborted because friend list extraction is incomplete.");
						}
					}else{
						dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete. Also make sure that you have at least one friend in your facebook account.",page_invitation_tool);
						console.log(page_invitation_tool+":aborted because friend list extraction is incomplete.");
					}
				});
			}else{
				dineshstoastr("error","Please enter valid delaytime.",page_invitation_tool);
			};
		};
	}else{
		dineshstoastr("error","You enetered incorrect page id.",page_invitation_tool);
	};
}