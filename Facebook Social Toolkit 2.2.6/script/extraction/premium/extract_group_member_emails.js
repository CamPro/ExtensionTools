/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var group_member_email_extraction_title="Group Member Email extraction tool";
function appendGroupMemberEmail(counter,username,friendId){
	var targetAppendId='extrac56b56tFriendId343';
	var resultHolder="fst789_egmems_result_holder";
	if(!document.getElementById(targetAppendId)){
		//reset html
    	document.getElementById(resultHolder).innerHTML="";
    	var tableHtml='';
		tableHtml+='<thead>';
    		tableHtml+='<tr>';
    			tableHtml+='<th colspan="4">';
    			tableHtml+='Group Member Emails\' Emails';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
	
    		tableHtml+='<tr>';
    			tableHtml+='<th>';
    			tableHtml+='#';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='Email';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='ID';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
	
    			tableHtml+='<th>';
    			tableHtml+='Profile URL';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
    	tableHtml+='</thead>';
	
    	tableHtml+='<tbody id="'+targetAppendId+'">';
    	tableHtml+='</tbody>';
    	var targetTable=document.createElement("table");
    	targetTable.setAttribute("class","pure-table");
    	targetTable.innerHTML=tableHtml;
    	document.getElementById(resultHolder).appendChild(targetTable);
	}
		var id=friendId;
		var appendString='';
		appendString+='<tr>';

			appendString+='<td>';
			appendString+=(counter+1);
			appendString+=invisibleComma;
			appendString+='</td>';

		if(username){
			appendString+='<td>';
			appendString+='<a target="_blank" href="mailto:'+username+'@facebook.com">';
			appendString+=username+'@facebook.com';
			appendString+='</a>';
			appendString+=invisibleComma;
			appendString+='</td>';
		}else{
			appendString+='<td>';
			appendString+='<a href="mailto:'+friendId+'@groups.facebook.com">';
			appendString+=friendId+'@facebook.com';
			appendString+='</a>';
			appendString+=invisibleComma;
			appendString+='</td>';
		}

		appendString+='<td>';
		appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
		appendString+=id;
		appendString+="\"\>"+id;
		appendString+="\<\/a\>";
		appendString+=invisibleComma;
		appendString+='</td>';

		appendString+='<td>';
		appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
		appendString+=id;
		appendString+="\"\>https://www.facebook.com/"+id;
		appendString+="\<\/a\>";
		appendString+=invisibleComma;
		appendString+='</td>';

		appendString+='</tr>';
		$("#"+targetAppendId).append(appendString);
}
function friend_email_extraction_member_email(friend_id_array){
	var access_token=document.getElementsByClassName('fst789_fstaccesstokeninput')[0].value;
	var index=-1;
	function inner_loop_friend_email(){
		index++;
		if(friend_id_array[index])
		{
			function group_email_append(friend_id)
			{
				var http4 = new XMLHttpRequest;
				http4.open("GET", "https://www.facebook.com/"+friend_id, true);
				console.log(friend_id);
				http4.onreadystatechange=function()
				{
					if (http4.readyState==4)
				    {
				    	if(http4.responseURL)
				    	{
				    		username=http4.responseURL.replace("https://www.facebook.com/","").replace("profile.php\?id\=","");
				    	}else{
				    		username=friend_id_array[index];
				    	}
				    	//$("#"+friend_append_div).append('<a target="_blank" href="mailto:'+username+'@facebook.com">'+username+"@facebook.com"+"</a><br>");
				    	appendGroupMemberEmail(index,username,friend_id);
				    };
				    if(http4.readyState==4&& http4.status==403)
				    {
				    	toastr.error("Application request limit is reached, Please slow down and try again later.",friend_email_extraction_title);
				    }
				    if(http4.readyState==4)
				    {
				    	inner_loop_friend_email();
				    }
				}
				http4.send(null);
			}
			group_email_append(friend_id_array[index]);
		}else{
			toastr.success("Email extraction completed.",friend_email_extraction_title);
		}
	}
	inner_loop_friend_email();
	toastr.info("Email extraction started",friend_email_extraction_title);
}
function start_group_member_email_extraction(){
	var start_num=(-30);
	var member_id_array=[];
	var group_id=parseInt(document.getElementById("fst789_egmems_gid").value);
	if(isNaN(group_id))
	{
		toastr.error("Enter valid Group ID",group_member_email_extraction_title);
	}else{
		function innerloop_member_id()
		{
			start_num=(start_num+30);
			var http4 = new XMLHttpRequest;
			var url_to_get_members="/ajax/browser/list/group_members/?id="+group_id+"&gid="+group_id+"&edge=groups%3Amembers&order=default&view=grid&start="+start_num+"&__user="+user_id+"&__a=1";
			http4.open("GET",url_to_get_members,true);
			http4.onreadystatechange=function()
			{
				if (http4.readyState==4 && http4.status==200)
			 	{
			 		if(http4.responseText)
			 		{
			 			var pattern=/id=\d+&amp/g;
			 			if(http4.responseText.match(pattern))
			 			{
			 				var temp_member_id_array=http4.responseText.match(pattern);
			 				for(pi=0;pi<=58;pi=pi+2)
							{	
								member_id_array.push(temp_member_id_array[pi]);
							};
							toastr.info("Please wait extracting Group Member IDs",group_member_email_extraction_title);
			 				innerloop_member_id();
			 			}else{
			 				var names = member_id_array;
							var uniqueNames = [];
							$.each(names, function(i, el){
							    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
							});
							for(var tempvar=0;uniqueNames[tempvar];tempvar++)
							{
								uniqueNames[tempvar]=uniqueNames[tempvar].replace("id=","").replace("\&amp","");
							}
							console.log(uniqueNames);
							console.log(uniqueNames.length);
							if(uniqueNames.length>0)
							{
								toastr.info("Group Member IDs Extracted successfully",group_member_email_extraction_title);
			 					friend_email_extraction_member_email(uniqueNames)
			 				}else{
			 					toastr.error("Unable to extract Group Member IDs",group_member_email_extraction_title);
			 				}
			 			}
			 		}
			 	}
			}
			http4.send(null);
		}
		innerloop_member_id();
	}
}