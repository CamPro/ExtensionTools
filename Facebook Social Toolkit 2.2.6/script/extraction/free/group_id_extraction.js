/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
/*
old code
var group_id_extraction_title="Group Extraction Tool"
function group_info_parse(htmlstring){
	var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
	var array_matches = pattern.exec(htmlstring);
	htmlstring=array_matches[0];
	console.log(htmlstring);
	//function to prase html code of facebook gorup table and save to chrome storage
	var html_code = $.parseHTML( htmlstring );
	console.log(html_code);
	var html_parse=$(html_code[0]).find('#root > table > tbody > tr > td > div:nth-child(2)').html();
	var group_ids=html_parse.match(/groups\/\d+/g);
	for(var tempcountervar=0;group_ids[tempcountervar];tempcountervar++)
	{
		//removing /groups from gorup id arrays
		group_ids[tempcountervar]=group_ids[tempcountervar].replace("groups/","");
	}
	console.log(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_ids)+'}'));
    chrome.storage.local.set(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_ids)+'}'), function(){
    	//save group id array in chrome storage
    	var message='Group extraction completed';
    	//alert(message);
    	console.log(message);
    	toastr.info(message,group_id_extraction_title);
    });
}
function get_group_id_html(callback)
{
	//function to get html code of facebook groups table from facebook
	var http4 = new XMLHttpRequest;
	var url4 = "https://mbasic.facebook.com/groups/?seemore";
	http4.open("GET", url4, true);
	http4.onreadystatechange = function ()
	{
	    if (http4.readyState == 4 && http4.status == 200){
	    	var htmlstring = http4.responseText;
	    	callback(htmlstring);
			http4.close;
	    };
	};
	http4.send(null);
}
function start_extract_group_ids(){
	get_item=localname_group_ids;
	chrome.storage.local.get(get_item, function(e) {
		if(e)
		{
		  	if(e[get_item]!=""&&e[get_item])
		  	{
		  		if(e[get_item][0]&&e[get_item][0]!="")
		  		{
		  			
		  		}else{
		  			//if group ids are not extracted then begin the process
		  			get_group_id_html(function(htmlstring){
						group_info_parse(htmlstring);
					});
		  		}
		  	}else{
		  		get_group_id_html(function(htmlstring){
					group_info_parse(htmlstring);
				});
		  	}
		}else{
			get_group_id_html(function(htmlstring){
				group_info_parse(htmlstring);
			});
		}
	});
}
*/


// new code
var group_id_extraction_title="Group Extraction Tool"
function group_info_parse(htmlstring){
	var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
	var array_matches = pattern.exec(htmlstring);
	htmlstring=array_matches[0];
	console.log(htmlstring);
	//function to prase html code of facebook gorup table and save to chrome storage
	var html_code = $.parseHTML( htmlstring );
	console.log(html_code);
	var html_parse=$(html_code[0]).find('#root > table > tbody > tr > td > div:nth-child(2)').html();
	var group_ids=html_parse.match(/groups\/\d+/g);
	for(var tempcountervar=0;group_ids[tempcountervar];tempcountervar++)
	{
		//removing /groups from gorup id arrays
		group_ids[tempcountervar]=group_ids[tempcountervar].replace("groups/","");
	}
	
}
function generate_group_id_array(silent)
{
	//function to get html code of facebook groups table from facebook
	var http4 = new XMLHttpRequest;
	var url4 = "/bookmarks/groups/";
	http4.open("GET", url4, true);
	http4.onreadystatechange = function ()
	{
	    if (http4.readyState == 4 && http4.status == 200){
	    	var htmlstring = http4.responseText;
	    	if(htmlstring.match(/\["group\_\d+"\]/igm))
	    	{
	    		var group_id_array=htmlstring.match(/\["group\_\d+"\]/igm);
	    		for(var temp_var=0;group_id_array[temp_var];temp_var++)
	    		{
	    			group_id_array[temp_var]=parseInt(group_id_array[temp_var].replace("\[\"group\_","").replace("\"\]",""));
	    		}
	    		group_id_array=unique_array(group_id_array);
	    		console.log(group_id_array);
	    		console.log(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'));
    			chrome.storage.local.set(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'), function(){
    				//if silent is false then output message
	    			if(!silent)
	    			{
	    				var message='Group ID extraction completed';
    					//alert(message);
    					console.log(message);
    					toastr.info(message,group_id_extraction_title);
	    			}else{
	    				console.log("Group IDs updated");
	    			}
    			});
	    	}else{
	    		toastr.info("Unable to find group IDs, make sure you are member of at least one facebook group.",group_id_extraction_title);
	    		//no group IDs found, blank out group IDs
	    		var group_id_array=[];
	    		chrome.storage.local.set(JSON.parse('{"'+localname_group_ids+'":'+JSON.stringify(group_id_array)+'}'), function(){
    				//if silent is false then output message
	    			console.log("no group IDs found, blanked out group IDs");
    			});
	    	}
			http4.close;
	    };
	};
	http4.send(null);
}
function start_extract_group_ids(){
	get_item=localname_group_ids;
	generate_group_id_array(false);
	console.log("Start to extract group ID called");
	/*
	chrome.storage.local.get(get_item, function(e) {
		if(e)
		{
		  	if(e[get_item]!=""&&e[get_item])
		  	{
		  		if(e[get_item][0]&&e[get_item][0]!="")
		  		{

		  			generate_group_id_array(true);
		  		}else{
		  			//if group ids are not extracted then begin the process
		  			
		  		}
		  	}else{
		  		//if group ids are not extracted then begin the process
		  		generate_group_id_array(false);
		  	}
		}else{
			//if group ids are not extracted then begin the process
			generate_group_id_array(false);
		}
	});
	*/
}