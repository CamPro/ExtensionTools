/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var friend_email_extraction_title="Extract Emails";
var friend_append_div="fst789__efe_result";
function appendFriendEmail(counter,username,friendId){
	var targetAppendId='extractFriendId343';
	var resultHolder=friend_append_div;
	if(!document.getElementById(targetAppendId)){
		//reset html
    	document.getElementById(resultHolder).innerHTML="";
    	var tableHtml='';
		tableHtml+='<thead>';
    		tableHtml+='<tr>';
    			tableHtml+='<th colspan="4">';
    			tableHtml+='Friends\' Emails';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
	
    		tableHtml+='<tr>';
    			tableHtml+='<th>';
    			tableHtml+='#';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='Friends\' Email';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='Friend ID';
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
function friend_email_extraction(friend_id_array,friend_append_div){
	var access_token=document.getElementsByClassName('fst789_fstaccesstokeninput')[0].value;
	var index=-1;
	function inner_loop_friend_email(){
		index++;
		if(friend_id_array[index])
		{
			function group_email_append(friend_id)
			{
				var http4 = new XMLHttpRequest;
				http4.open("GET", "/"+friend_id, true);
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
				    	appendFriendEmail(index,username,friend_id);
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
function extract_friend_email_start()
{
	chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
		{
		  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
		  	{
		  		var friendidarray=e[localname_friend_ids].split(",");
		  		if(friendidarray[0])
		  		{
		  			friend_email_extraction(friendidarray,friend_append_div);
		  		}else{
		  			dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",friend_email_extraction_title);
					console.log(friend_email_extraction_title+":aborted because friend list extraction is incomplete.");
		  		}
		  	}else{
				dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",friend_email_extraction_title);
				console.log(friend_email_extraction_title+":aborted because friend list extraction is incomplete.");
		  	}
		}else{
			dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",friend_email_extraction_title);
			console.log(message_all_friends_title+":aborted because friend list extraction is incomplete.");
		}
	});
}