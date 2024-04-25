/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var post_on_liked_pages_title="Post On Liked Pages";
function send_page_post(access_token,page_id,message,link)
{
	var http5=new XMLHttpRequest();
	var url="https://graph.facebook.com/v2.3/"+page_id+"/feed";
	http5.open("POST",url,true);
	var post_data="&message="+message+"&link="+link+"&access_token="+access_token;
	http5.onreadystatechange = function () 
	{
		if (http5.readyState == 4)
		{
			if(http5.responseText.match("error"))
			{
				toastr.error(give_graph_api_error(http5.responseText),post_on_liked_pages_title);
			}else{
				toastr.info(("Posted on <a href='https://www.facebook.com/"+page_id+"'>facebook.com/"+page_id+"</a>"),post_on_liked_pages_title);			
			}
		};
	}
	http5.send(post_data);
}
function post_on_liked_pages(page_likes_array,access_token,message,link,delay_time)
{
	var starting_number=(-1);
	function inner_loop_post_on_pages(){
		starting_number++;
		if(page_likes_array[starting_number])
		{
			page_id=page_likes_array[starting_number];
			send_page_post(access_token,page_id,message,link)
			setTimeout(function(){
				inner_loop_post_on_pages();
			}, (delay_time*1000));
		}else{
			alert("Posted on all liked pages");
		}
	}
	inner_loop_post_on_pages();
}
function post_on_liked_pages_input_validation(page_likes_array)
{
	var access_token=document.getElementById("fst789_polp_access_token").value.trim();
	var message=document.getElementById("fst789_polp_message").value.trim();
	var link=document.getElementById("fst789_polp_link").value.trim();
	var delay_time=parseInt(document.getElementById("fst789_polp_delay_time").value.trim());
	var error_array=[];
	if(!Boolean(access_token)||access_token=="")
	{
		error_array.push("Invalid access token");
	}
	if(!Boolean(message)||message=="")
	{
		error_array.push("Invalid message");
	}
	if(!Boolean(delay_time)||delay_time=="")
	{
		error_array.push("Invalid delay time");
	}
	if(Boolean(isNaN(delay_time))||delay_time=="")
	{
		error_array.push("Delay time is not a valid number");
	}
	if(!is_valid_url(link)&&!link=="")
	{
		error_array.push("Please enter valid URL.");
	}
	console.log(error_array);
	if(error_array[0])
	{
		show_errors(error_array,post_on_liked_pages_title);
	}else{
		post_on_liked_pages(page_likes_array,access_token,message,link,delay_time);
	}
}
function start_to_post_on_liked_pages(){
	chrome.storage.local.get(localname_user_likes, function(e) {
		if(e)
		{
		  	if(e[localname_user_likes]!=""&&e[localname_user_likes])
		  	{
		  		if(e[localname_user_likes][0]&&e[localname_user_likes][0]!="")
		  		{
		  			//code to execute if page likes are extracted
		  			post_on_liked_pages_input_validation(e[localname_user_likes]);
		  		}else{
		  			toastr.error("Please wait until user likes are extracted.",post_on_liked_pages_title);
		  		}
		  	}else{
		  		toastr.error("Please wait until user likes are extracted.",post_on_liked_pages_title);
		  	}
		}else{
			toastr.error("Please wait until user likes are extracted.",post_on_liked_pages_title);
		}
	});
}