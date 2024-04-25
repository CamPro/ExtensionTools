/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var post_on_multiple_groups_title="Post On Multiple Groups (Graph Api Explorer)";
function pogwatgrouppotup(group_id_array,responce,accessokenget,msgingo,linkinp,delayinppostonmultiplegroups,grouppostingstartnuminp,ending_group_number)
{
	var b=(grouppostingstartnuminp-1);
	ending_group_number=(ending_group_number-1);
	var erronumgroupposting=0;
	function looper()
	{
		pqr=new XMLHttpRequest();
		msgingo=prepare_to_send(msgingo);
		linkinp=prepare_to_send(linkinp);
		var group_id_to_post_on=group_id_array[b];
		pqr.open("POST","https://graph.facebook.com/"+group_id_to_post_on+"/feed?link="+linkinp+"&message="+msgingo+"&method=post&access_token="+escape(accessokenget),true);
		b++;
		pqr.onreadystatechange = function () 
		{
			if (pqr.readyState == 4&&pqr.status == 200)
			{
				var message_to_show="Posted on group number "+b;
				dineshstoastr("info",message_to_show,post_on_multiple_groups_title);
			};
			if (pqr.readyState == 4&&pqr.status == 403)
			{
				var message_to_show="Access token entered by you does not have publishing permissions. Group posting ended on group number "+b;
				dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
				alert(message_to_show);
			};
			if (pqr.readyState == 4&&pqr.status == 400)
			{	
				if(accesstokenexpirationcondtion)
				{
					var message_to_show="Access token entered by you has been expired while posting on group number "+b+". Please generate a new a new access token and start posting with starting group number "+b+".";
					alert(message_to_show);
					toastr.info(message_to_show,post_on_multiple_groups_title);
				}else{
					var message_to_show="Please check that you have entered correct URL and message. Also make sure that you are not blocked from posting on Facebook Groups. Group posting ended on group number "+b+".";
					alert(message_to_show);
					dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
				}
			};
            if(pqr.readyState == 4)
			{
				var accesstokenexpirationcondtion=pqr.responseText.match("The session has been invalidated")||pqr.responseText.match("Error validating access token")||pqr.responseText.match("session is invalid");
				pqr.close;
				if(pqr.responseText.match("error"))
				{
					erronumgroupposting++;
					dineshstoastr("error",erronumgroupposting+" requests failed to post.",post_on_multiple_groups_title);
				};
				if(accesstokenexpirationcondtion)
				{
				}else{
					if(group_id_array[b]!=null&&b<=ending_group_number)
					{
						setTimeout(function(){
                            if(!pqr.responseText.match("It looks like you were misusing this feature"))
                            {
							  	looper();
                            }else{
                            	var message_to_show="Please slow down, You are misusing this feature. Group posting ended on group number "+b+".";
								dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
								alert(message_to_show);
							};
						},(delayinppostonmultiplegroups*1000));
					}
					else{
						var message_to_show=("Posting completed. Group posting ended on group number "+b+".");
						dineshstoastr("success",message_to_show,post_on_multiple_groups_title);
						alert(message_to_show);
					};
				};
			};
		};
		pqr.send(null);
	};
	looper();
}
function postonmultiplegroupsguiengine(){
	var grouppostingstartnuminp=parseInt(document.getElementById("fst789_grouppostingstartnuminp").value);
	var ending_group_number=parseInt(document.getElementById("fst789_pog_end_num").value);
	var accessokenget=document.getElementById("fst789_groupopostingaccesstoken").value;
	var msgingo=document.getElementById("fst789_grouppostingmessage").value;
	var linkinp=document.getElementById("fst789_grouppostinglink").value;
	var delayinppostonmultiplegroups=parseInt(document.getElementById("fst789_grouppostingdelaywrapper").value);
	var error_var=[];
	if(!grouppostingstartnuminp)
	{
		error_var.push("Starting group number is invalid.");
	}
	if(!ending_group_number)
	{
		error_var.push("Ending group number is invalid.");
	}
	if(ending_group_number==grouppostingstartnuminp)
	{
		error_var.push("Starting group number and ending group number can't be equal.");
	}
	if(grouppostingstartnuminp<1)
	{
		error_var.push("Starting group number should be greater than 0.");
	}
	if(ending_group_number<1)
	{
		error_var.push("Ending group number should be greater than 1.");
	}
	if(!msgingo)
	{
		error_var.push("Message can't be null");
	}
	if(error_var[0])
	{
		show_errors(error_var,post_on_multiple_groups_title);
	}else{
		get_item=localname_group_ids;
		chrome.storage.local.get(get_item, function(e) {
			if(e)
			{
			  	if(e[get_item]!=""&&e[get_item])
			  	{
			  		if(e[get_item][0]&&e[get_item][0]!="")
			  		{
			  			var group_id_array=e[get_item];
			  			pogwatgrouppotup(group_id_array,'',accessokenget,msgingo,linkinp,delayinppostonmultiplegroups,grouppostingstartnuminp,ending_group_number)
			  		}else{
			  			message_to_show="Are you sure you are member of facebook groups?";
						dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
						console.log(message_to_show);
			  		}
			  	}else{
			  		message_to_show="Group extraction is not complete, Please wait until Group extraction is complete.";
					dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
					console.log(message_to_show);
			  	}
			}else{
				message_to_show="Group extraction is not complete, Please wait until Group extraction is complete.";
				dineshstoastr("error",message_to_show,post_on_multiple_groups_title);
				console.log(message_to_show);
			}
		});
	}
}
function grouppostinstartergui(){
	postonmultiplegroupsguiengine();
}