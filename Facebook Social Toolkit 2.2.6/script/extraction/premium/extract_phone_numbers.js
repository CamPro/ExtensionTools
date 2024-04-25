/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var extract_phone_numbers_title="Extract Phone Numbers";
function appendFriendPhone(counter,phone,id,username){
	var targetAppendId='fst789576865878';
	var resultHolder="fst789_efnff_result_holder";
	if(!document.getElementById(targetAppendId)){
		//reset html
    	document.getElementById(resultHolder).innerHTML="";
    	var tableHtml='';
		tableHtml+='<thead>';
    		tableHtml+='<tr>';
    			tableHtml+='<th colspan="4">';
    			tableHtml+='Friends Phone Numbers';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
    		tableHtml+='</tr>';
	
    		tableHtml+='<tr>';
			
    			tableHtml+='<th>';
    			tableHtml+='Phone Number';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
			
    			tableHtml+='<th>';
    			tableHtml+='ID';
    			tableHtml+=invisibleComma;
    			tableHtml+='</th>';
	
    			tableHtml+='<th>';
    			tableHtml+='Username';
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
			appendString+=phone;
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
		appendString+="\"\>"+username;
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
function get_phone_number(id,htmlstring,username,index)
{
	//htmlstring is responce text of facebook users profile page
	var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
	var array_matches = pattern.exec(htmlstring);
	htmlstring=array_matches[0];
	//console.log(htmlstring);
	//function to prase html code of facebook gorup table and save to chrome storage
	var html_code = $.parseHTML( htmlstring );
	var html_parse=$(html_code).find('#contact-info > div > div > div:nth-child(1)').text();
	
	if(html_parse)
	{
		mobile_number=html_parse.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace('+','').replace('-','').replace('/','');
		mobile_number=mobile_number.replace('Mobile','');
		mobile_number=parseInt(mobile_number);
		if(mobile_number&&mobile_number!=0&&!isNaN(mobile_number)&&!isNaN(id))
		{
			//console.log('Phone number extracted');
			console.log(mobile_number);
			//$().append((mobile_number.toString()+"<br>"));
			appendFriendPhone(index,mobile_number,id,username);
			toastr.info("URL: fb.com/"+id+" , Mobile number: "+mobile_number,extract_phone_numbers_title);
		}
	}
}
function get_html_code(id,username,index){
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
	    				get_phone_number(id,htmlstring,username,index);
						http5.close;
					}
				}
				http5.send(null);
	    	}else{
	    		var htmlstring = http4.responseText;
	    		get_phone_number(id,htmlstring,username,index);
				http4.close;
	    	}
	    };
	};
	http4.send(null);
}
function get_user_name(id,index){
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
		    	get_html_code(id,username,index);
				http4.close;
		    };
		};
		http4.send(null);
	}else{
		toastr.error("Access token is blank, Please restart the tool after a while.");
	}
}
function start_extracting_phone_numbers(friendidarray){
	var index=(-1);
	toastr.info("Phone number extraction started.",extract_phone_numbers_title);
	function ineerLoop(){
		index++;
		if(friendidarray[index])
		{
			var friend_id=friendidarray[index];
			get_user_name(friend_id,index);
			setTimeout(function(){
				ineerLoop();
			},1000);
		}else{
			alert("Phone number extraction Completed.");
			toastr.success("Phone number extraction Completed.",extract_phone_numbers_title);
		}
	}
	ineerLoop();
}
function start_phone_number_extraction(){
	chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
		{
		  	if(e[localname_friend_ids]!=""&&e[localname_friend_ids])
		  	{
		  		var friendidarray=e[localname_friend_ids].split(",");
		  		if(isNaN(friendidarray[0]))
		  		{
		  			toastr.error("Unable to detect friend IDs",extract_phone_numbers_title);
		  		}else{
		  			start_extracting_phone_numbers(friendidarray);
		  		}
		  	}else{
				dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_phone_numbers_title);
		  	}
		}else{
			dineshstoastr("error","Friend list extraction is not complete, Please wait until friend list extraction is complete.",extract_phone_numbers_title);
		}
	});
}