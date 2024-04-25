/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var suggest_friends_title="Suggest Friends To Another Friend";
function suggest_friends_function_two(friendidarray,anotherfried,delaytime){
	a=-1;
	function adding()
	{
	   	a++;
	   	if(friendidarray[a])
	   	{
	   		var friendid=friendidarray[a];
	   		requrl="/ajax/friends/suggest";
			suggestion_params="&receiver="+friendid;
			//suggestion_params+="&newcomer="+friendid;
			suggestion_params+="&newcomer="+anotherfried;
			suggestion_params+="&attempt_id=e0513e5b018be5f60fd743180632fd71";
			suggestion_params+="&ref=passive_megaphone";
			suggestion_params+="&__user="+user_id;
			suggestion_params+="&__a=1";
			suggestion_params+="&__dyn=7n8anEAMCBDTUKt2u6aOQeEFoW9J6yUgByVbGAFpaGEVFLO7xCm6p_AyoSnx2";
			suggestion_params+="&__req=5k";
			suggestion_params+="&fb_dtsg="+fb_dtsg;
			suggestion_params+="&ttstamp=26581727978481061119811512072";
			var http4 = new XMLHttpRequest;
			http4.open("POST", requrl, true);
			http4.onreadystatechange = function () 
			{
				if (http4.readyState==4 && http4.status==200)
	   			{
					http4.close;
					if(http4.responseText.match("errorSummary"))
					{
						dineshstoastr("error","An error occured while suggesting friends. Please recheck your input. Also make sure that id entered by you is friend of yours.",suggest_friends_title);
					}
					console.log(a+" friends suggested to another friend friend_id="+friendid+" Counter="+a);
					dineshstoastr("info","Suggestions sent successfully.",suggest_friends_title);
					setTimeout(function(){
						adding();
					}, delaytime*1000);
				};
			};
			http4.send(suggestion_params);
	   	}else{
	   		dineshstoastr("success","All friends are suggested.",suggest_friends_title);
	   		alert("All friends are suggested.");
	   	}
	};
	adding();
}
function startsuggest(){
	if(confirm("Are you sure you want to suggest your friends to another friend?"))
	{
		var anotherfried=document.getElementById("fst789_sfaf_friend_id").value;
		var delaytime=document.getElementById("fst789_sfaf_delay_time").value;
		anotherfried=parseInt(anotherfried);
		delaytime=parseInt(delaytime);
		if(isNaN(delaytime)||delaytime<1)
		{
			dineshstoastr("info","Delay time was invalid. It is now set to 1 second.",suggest_friends_title)
			delaytime=1;
		}
		if(anotherfried&&!isNaN(anotherfried))
		{
			if(fb_dtsg!=null&&user_id!=null&&fb_dtsg!=""&&user_id!="")
			{
				chrome.storage.local.get(localname_friend_ids, function(e) {
					if(e)
					{
					  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
					  	{
					  		var friendidarray=e[localname_friend_ids].split(",");
					  		suggest_friends_function_two(friendidarray,anotherfried,delaytime);
					  	}else{
							dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",remove_all_friends_at_once_title);
							console.log(remove_all_friends_at_once_title+":aborted because friend list extraction is incomplete.");
					  	}
					}else{
						dineshstoastr("error","Friend list extraction is not complete. Please wait until friend list extraction is complete.",remove_all_friends_at_once_title);
						console.log(remove_all_friends_at_once_title+":aborted because friend list extraction is incomplete.");
					}
				});
			}
			else
			{
				alert("Make sure you are logged in. Please refresh this page. Invalid friend id.");
			}
		}else
		{
			alert("Invalid friend id");
		}
	};
}