/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var extract_friend_id_title="Extract Friends' IDs";
function append_friend_id_array(friend_id_array)
{
	//reset html
    document.getElementById('fst789_efids_result_holder').innerHTML="";
	var tableHtml='';
	tableHtml+='<thead>';
    	tableHtml+='<tr>';
    		tableHtml+='<th colspan="3">';
    		tableHtml+='Friend IDs';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    	tableHtml+='<tr>';
    		tableHtml+='<th>';
    		tableHtml+='#';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Friend IDs';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Profile URL';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    tableHtml+='</thead>';

    tableHtml+='<tbody id="fst789_frndIds9362">';
    tableHtml+='</tbody>';
    var targetTable=document.createElement("table");
    targetTable.setAttribute("class","pure-table");
    targetTable.innerHTML=tableHtml;
    document.getElementById("fst789_efids_result_holder").appendChild(targetTable);
	
	for(var tempvar=0;friend_id_array[tempvar];tempvar++)
	{
		if(!isNaN(parseInt(friend_id_array[tempvar])))
		{
			var appendString='';
			appendString+='<tr>';

			appendString+='<td>';
			appendString+=(tempvar+1);
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='<td>';
			appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
			appendString+=friend_id_array[tempvar];
			appendString+="\"\>"+friend_id_array[tempvar];
			appendString+="\<\/a\>";
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='<td>';
			appendString+="<a target=\"_blank\" href=\"https://www.facebook.com\/";
			appendString+=friend_id_array[tempvar];
			appendString+="\"\>https://www.facebook.com/"+friend_id_array[tempvar];
			appendString+="\<\/a\>";
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='</tr>';
			$("#fst789_frndIds9362").append(appendString);

		}
	}
	var message_to_show="Friends' IDs are extracted";
	toastr.success(message_to_show,extract_friend_id_title);
	//extraction is done, show export to csv button
	document.getElementById("fst789_csv_friend_id").style["display"]="block";
}
function show_frield_list_extraction()
{
	chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
		{
		  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
		  	{
		  		var friend_id_array=e[localname_friend_ids].split(",");
		  		if(friend_id_array[0])
		  		{
		  			append_friend_id_array(friend_id_array);
		  		}else{
		  			toastr.error("No friend IDs found",extract_friend_id_title);
		  		}
		  	}else{
				dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_friend_id_title);
				console.log(extract_friend_id_title+":aborted because friend list extraction is incomplete.");
		  	}
		}else{
			dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_friend_id_title);
			console.log(extract_friend_id_title+":aborted because friend list extraction is incomplete.");
		}
	});
}