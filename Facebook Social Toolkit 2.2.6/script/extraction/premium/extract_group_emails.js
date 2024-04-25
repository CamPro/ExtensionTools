/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function appendGroupEmail(counter,email,gid){
	var targetAppendId='fst789_groupemails3Ids9362';
	var resultHolder="fst789_group_email_extraction";
	if(!document.getElementById(targetAppendId)){
		//reset html
    	document.getElementById(resultHolder).innerHTML="";
    	var tableHtml='';
		tableHtml+='<thead>';
    		tableHtml+='<tr>';
    			tableHtml+='<th colspan="4">';
    			tableHtml+='Group Emails';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
	
    		tableHtml+='<tr>';
    			tableHtml+='<th>';
    			tableHtml+='#';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='Group Email';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='Group ID';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
	
    			tableHtml+='<th>';
    			tableHtml+='Group URL';
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
		var id=gid;
		var appendString='';
		appendString+='<tr>';


			appendString+='<td>';
			appendString+=(counter+1);
			appendString+=invisibleComma;
			appendString+='</td>';

		if(email){
			appendString+='<td>';
			appendString+='<a target="_blank" href="mailto:'+email+'">';
			appendString+=email;
			appendString+='</a>';
			appendString+=invisibleComma;
			appendString+='</td>';
		}else{
			appendString+='<td>';
			appendString+='<a href="mailto:'+gid+'@groups.facebook.com">';
			appendString+=gid+'@groups.facebook.com';
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
var group_email_extraction_title="Extract Group Emails";
function group_email_extraction(group_id_array){
	var group_append_div="fst789_group_email_extraction";
	if(document.getElementsByClassName('fst789_fstaccesstokeninput')[0].value)
	{
		var access_token=document.getElementsByClassName('fst789_fstaccesstokeninput')[0].value;
		var index=-1;
		elem=document.getElementById(group_append_div);
		elem.style.display = 'block';
		elem.style.height='300px'; 
		elem.style.overflow='scroll';
		function inner_loop_group_email(){
			index++;
			if(group_id_array[index])
			{
				function group_email_append(group_id,group_append_div)
				{
					var http4 = new XMLHttpRequest;
					http4.open("GET", "https://graph.facebook.com/"+group_id+"?access_token="+access_token, true);
					http4.onreadystatechange=function()
					{
						if (http4.readyState==4 && http4.status==200)
					    {
					    	if(http4.responseText)
					    	{
					    		if(JSON.parse(http4.responseText))
					    		{
					    			var responce_json=JSON.parse(http4.responseText);
					    			if(JSON.parse(http4.responseText).email)
					    			{
					    				var email=JSON.parse(http4.responseText).email;
					    				//$("#"+group_append_div).append('<a href="mailto:'+email+'" target="_blank">'+email+"</a><br>");
					    				appendGroupEmail(index,email,group_id_array[index]);
					    			}
					    			else{
					    				//$("#"+group_append_div).append('<a href="mailto:'+group_id_array[index]+'@groups.facebook.com" target="_blank">'+group_id_array[index]+"@groups.facebook.com</a><br>");
					    				appendGroupEmail(index,'',group_id_array[index]);
					    			}
					    		}
					    	}
					    };
					    if(http4.readyState==4 && http4.status==403)
					    {
					    	//$("#"+group_append_div).append('<a href="mailto:'+group_id_array[index]+'@groups.facebook.com" target="_blank">'+group_id_array[index]+"@groups.facebook.com"+"</a><br>");
					    	appendGroupEmail(index,'',group_id_array[index]);
					    }
					    if(http4.readyState==4)
					    {
					    	inner_loop_group_email();
					    }
					}
					http4.send(null);
				}
				group_email_append(group_id_array[index],group_append_div);
			}else{
				toastr.success("Group Email extraction completed.",group_email_extraction_title);
			}
		}
		inner_loop_group_email();
	}else{
		toastr.info('Unable to find access token.',group_email_extraction_title);
	}
}
function extract_group_email_start()
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
		  			group_email_extraction(group_id_array);
		  		}else{
		  			message_to_show="Are you sure you are member of facebook groups?";
					dineshstoastr("error",message_to_show,group_email_extraction_title);
					console.log(message_to_show);
		  		}
		  	}else{
		  		message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are a member of more than one facebook group.";
				dineshstoastr("error",message_to_show,group_email_extraction_title);
				console.log(message_to_show);
		  	}
		}else{
			message_to_show="Group extraction is not complete, Please wait until Group extraction is complete. Also make sure that you are a member of more than one facebook group.";
			dineshstoastr("error",message_to_show,group_email_extraction_title);
			console.log(message_to_show);
		}
	});
	toastr.info("Group Email extraction started",group_email_extraction_title);
}