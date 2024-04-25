/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var display_user_likes_title="Extract User Likes";
function append_page_likes_id_array(page_likes_id_array)
{
	//cleanup
    document.getElementById('fst789_eulikes_result_holder').innerHTML="";
	//reset html
	var tableHtml='';
	tableHtml+='<thead>';
    	tableHtml+='<tr>';
    		tableHtml+='<th colspan="3">';
    		tableHtml+='Liked Pages';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    	tableHtml+='<tr>';
    		tableHtml+='<th>';
    		tableHtml+='#';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Page ID';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Page URL';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    tableHtml+='</thead>';

    tableHtml+='<tbody id="fst789_dulikes78">';
    tableHtml+='</tbody>';
    var targetTable=document.createElement("table");
    targetTable.setAttribute("class","pure-table");
    targetTable.innerHTML=tableHtml;
    document.getElementById("fst789_eulikes_result_holder").appendChild(targetTable);
	for(var tempvar=0;page_likes_id_array[tempvar];tempvar++)
	{
		if(!isNaN(parseInt(page_likes_id_array[tempvar])))
		{
			var appendString='';
			appendString+='<tr>';

			appendString+='<td>';
			appendString+=(tempvar+1);
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='<td>';
			appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
			appendString+=page_likes_id_array[tempvar];
			appendString+="\"\>"+page_likes_id_array[tempvar];
			appendString+="\<\/a\>";
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='<td>';
			appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
			appendString+=page_likes_id_array[tempvar];
			appendString+="\"\>https://www.facebook.com/"+page_likes_id_array[tempvar];
			appendString+="\<\/a\>";
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='</tr>';
			$("#fst789_dulikes78").append(appendString);
		}
	}
	var message_to_show="Page Likes are extracted are extracted";
	toastr.success(message_to_show,display_user_likes_title);
}
function show_user_likes()
{
	chrome.storage.local.get(localname_user_likes, function(e) {
		if(e)
		{
		  	if(e[localname_user_likes]!=""&&e[localname_user_likes])
		  	{
		  		if(e[localname_user_likes][0]&&e[localname_user_likes][0]!="")
		  		{
		  			append_page_likes_id_array(e[localname_user_likes]);
		  		}else{
		  			var message_to_show="Unable to detect page likes";
					toastr.error(message_to_show,display_user_likes_title);
		  		}
		  	}else{
		  		var message_to_show="Please wait until page likes extraction process is completed";
				toastr.error(message_to_show,display_user_likes_title);
		  	}
		}else{
			var message_to_show="Please wait until page likes extraction process is completed";
			toastr.error(message_to_show,display_user_likes_title);
		}
	});
}