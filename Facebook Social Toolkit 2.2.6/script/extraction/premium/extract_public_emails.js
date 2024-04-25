/*not using relative path
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var extract_emails_friends_title="Extract Public Emails Of Friends";
var notifNumEmail34=4;
function appendFriendPublicEmail(email,id,username){
	var targetAppendId='fstw345345v345';
	var resultHolder="fst789_epeof_result_holder";
	if(!document.getElementById(targetAppendId)){
		//reset html
    	document.getElementById(resultHolder).innerHTML="";
    	var tableHtml='';
		tableHtml+='<thead>';
    		tableHtml+='<tr>';
    			tableHtml+='<th colspan="4">';
    			tableHtml+='Friends\' Public Emails';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
	
    		tableHtml+='<tr>';
			
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
		var id=id;
		var appendString='';
		appendString+='<tr>';

			appendString+='<td>';
			appendString+='<a target="_blank" href="mailto:'+email+'">';
			appendString+=email;
			appendString+='</a>';
			appendString+=invisibleComma;
			appendString+='</td>';

		appendString+='<td>';
		appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
		appendString+=id;
		appendString+="\"\>"+id;
		appendString+="\<\/a\>";
		appendString+=invisibleComma;
		appendString+='</td>';

		appendString+='<td>';
		appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
		appendString+=username;
		appendString+="\"\>https://www.facebook.com/"+username;
		appendString+="\<\/a\>";
		appendString+=invisibleComma;
		appendString+='</td>';

		appendString+='</tr>';
		$("#"+targetAppendId).append(appendString);
}
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function get_email_friend(id,htmlstring,username)
{
	notifNumEmail34++;
	if(notifNumEmail34%5==0){
		toastr.info("Please wait, extracting public emails of friends");
	}
	var html_parse=decodeHtml(htmlstring);
	var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

	if(html_parse)
	{
		if(html_parse.match(re)){
			if(html_parse.match(re)[0]){
				var email_address=html_parse.match(re)[0];
				if(email_address){
					appendFriendPublicEmail(email_address,id,username);
					toastr.info('<a target="_blank" href="mailto:'+email_address+'">'+email_address+'</a>',extract_emails_friends_title);
				}
			}
		}
	}
}
function get_html_code_email(id,username){
	console.log("get_html_code_email called");
	var http4 = new XMLHttpRequest;
	var url4 = "https://m.facebook.com/"+username+"\?v\=info";
	http4.open("GET", url4, true);
	http4.onreadystatechange = function ()
	{
	    if (http4.readyState == 4){
	    	if(http4.responseURL)
	    	{
	    		http4.close;
	    		var http5 = new XMLHttpRequest;
				var url5 = http4.responseURL.replace("\?\_rdr","")+"\?v\=info";
				http5.open("GET", url5, true);
				http5.onreadystatechange = function ()
				{
					if (http5.readyState == 4 && http5.status == 200){
						var htmlstring = http5.responseText;
	    				get_email_friend(id,htmlstring,username);
						http5.close;
					}
				}
				http5.send(null);
	    	}else{
	    		var htmlstring = http4.responseText;
	    		get_email_friend(id,htmlstring);
				http4.close;
	    	}
	    };
	};
	http4.send(null);
}
function get_user_name_email(id){
	console.log("get_user_name_email called");
	var http4 = new XMLHttpRequest;
	var access_token=document.getElementsByClassName('fst789_fstaccesstokeninput')[0].value;
	if(access_token){
		var url4 = "https://graph.facebook.com/"+id+"?access_token="+access_token;
		http4.open("GET", url4, true);
		http4.onreadystatechange = function ()
		{
		    if (http4.readyState == 4 && http4.status == 200){
		    	var htmlstring = http4.responseText;
		    	htmlstring=JSON.parse(htmlstring);
		    	var username=htmlstring['username'];
		    	if(!username)
		    	{
					username=id;
		    	}
		    	get_html_code_email(id,username);
				http4.close;
		    };
		};
		http4.send(null);

	}else{
		toastr.error("Access token is blank, Please restart the tool after a while.");
	}
}
function start_extracting_emmails_of_friends(friendidarray){
	console.log("start_extracting_emmails_of_friends called");
	var index=(-1);
	toastr.info("Email extraction started.",extract_emails_friends_title);
	function ineerLoop(){
		index++;
		if(friendidarray[index])
		{
			var friend_id=friendidarray[index];
			get_user_name_email(friend_id);
			setTimeout(function(){
				ineerLoop();
			},1000);
		}else{
			alert("Email extraction Completed.");
			toastr.success("Email extraction Completed.",extract_emails_friends_title);
		}
	}
	ineerLoop();
}
function start_email_extraction(){
	chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
		{
		  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
		  	{
		  		var friendidarray=e[localname_friend_ids].split(",");
		  		if(isNaN(friendidarray[0]))
		  		{
		  			toastr.error("Unable to detect friend IDs",extract_emails_friends_title);
		  		}else{
		  			start_extracting_emmails_of_friends(friendidarray);
		  		}
		  	}else{
				dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_emails_friends_title);
		  	}
		}else{
			dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_emails_friends_title);
		}
	});
}