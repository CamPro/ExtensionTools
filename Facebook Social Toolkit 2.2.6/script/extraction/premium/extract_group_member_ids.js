/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var group_member_id_extraction_title="Group Member ID extraction tool";
function appendGroupMemberIds(counter,gid){
	var targetAppendId='fst789_g785nb5673Ids9362';
	var resultHolder="fst789_egmids_result_holder";
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
function start_group_member_id_extraction(){
	var start_num=(-30);
	var member_id_array=[];
	var group_id=parseInt(document.getElementById("fst789_egmids_gid").value);
	if(isNaN(group_id))
	{
		toastr.error("Enter valid Group ID",group_member_id_extraction_title);
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
							toastr.info("Please wait extracting Group Member IDs",group_member_id_extraction_title);
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
							for(var tempvar=0;uniqueNames[tempvar];tempvar++)
							{
								//$("#fst789_egmids_result_holder").append("<a target=\"_blank\" href=\"http\:\/\/www\.facebook\.com\/"+uniqueNames[tempvar]+"\">"++"</a><br>");
								appendGroupMemberIds(tempvar,uniqueNames[tempvar]);
							}
							console.log(uniqueNames.length);
							if(uniqueNames.length>0)
							{
								toastr.success("Group Member IDs Extracted successfully",group_member_id_extraction_title);
			 				}else{
			 					toastr.error("Unable to extract Group Member IDs",group_member_id_extraction_title);
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
