/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var extract_group_id_title="Extract Group IDs";
function append_group_id_array(group_id_array)
{
	var gorupIdtargetId='fst789_group3Ids9362';
	var resultHolder='fst789_gide_result_holder';
	//reset html
    document.getElementById(resultHolder).innerHTML="";
    var tableHtml='';
	tableHtml+='<thead>';
    	tableHtml+='<tr>';
    		tableHtml+='<th colspan="3">';
    		tableHtml+='Group IDs';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    	tableHtml+='<tr>';
    		tableHtml+='<th>';
    		tableHtml+='#';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Group IDs';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
		
    		tableHtml+='<th>';
    		tableHtml+='Group URL';
    		tableHtml+=invisibleComma;
    		tableHtml+='</th>';
    	tableHtml+='</tr>';
    tableHtml+='</thead>';

    tableHtml+='<tbody id="'+gorupIdtargetId+'">';
    tableHtml+='</tbody>';
    var targetTable=document.createElement("table");
    targetTable.setAttribute("class","pure-table");
    targetTable.innerHTML=tableHtml;
    document.getElementById(resultHolder).appendChild(targetTable);
	
	for(var tempvar=0;group_id_array[tempvar];tempvar++)
	{
		if(!isNaN(parseInt(group_id_array[tempvar])))
		{
			var id=group_id_array[tempvar];

			var appendString='';
			appendString+='<tr>';

			appendString+='<td>';
			appendString+=(tempvar+1);
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
			appendString+=id;
			appendString+="\"\>https://www.facebook.com/"+id;
			appendString+="\<\/a\>";
			appendString+=invisibleComma;
			appendString+='</td>';

			appendString+='</tr>';
			$("#"+gorupIdtargetId).append(appendString);
		}
	}
	var message_to_show="Group IDs are extracted";
	toastr.success(message_to_show,extract_group_id_title);
	//show export to csv button
	document.getElementById("fst789_csv_gorup_id").style["display"]="block";
}
function show_group_list_extraction()
{
	get_item=localname_group_ids;
	chrome.storage.local.get(get_item, function(e) {
		if(e)
		{
		  	if(e[get_item]!=""&&e[get_item])
		  	{
		  		if(e[get_item][0]&&e[get_item][0]!="")
		  		{
		  			var group_id_array=e[get_item];
		  			append_group_id_array(group_id_array);
		  		}else{
		  			message_to_show="Are you sure you are member of facebook groups?";
					dineshstoastr("error",message_to_show,extract_group_id_title);
					console.log(message_to_show);
		  		}
		  	}else{
		  		message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are a member of more than one Facebook Group.";
				dineshstoastr("error",message_to_show,extract_group_id_title);
				console.log(message_to_show);
		  	}
		}else{
			message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are a member of more than one Facebook Group.";
			dineshstoastr("error",message_to_show,extract_group_id_title);
			console.log(message_to_show);
		}
	});
}