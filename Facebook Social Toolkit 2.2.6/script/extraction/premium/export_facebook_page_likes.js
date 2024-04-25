/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function pagefanextraction(){
	alert("Please run this tool on facebook page, make sure that you are acting as an admin of the page.");
	dineshstoastr("info","Please run this tool on facebook page, make sure that you are acting as an admin of the page.","Facebook Page Fan Extractor")
	var pageid=document.documentElement.innerHTML.match(/"USER_ID":"\d+"/g)[0].replace('"USER_ID":"',"").replace('"','');
	var starnum=0;
	var collector=',';
	function looper(starnum){
		if(pageid)
		{
			var url='/ajax/browser/list/page_fans/?';
			url+='page_id='+pageid;
			url+='&edge=public_profile%3Afbpage_to_user';
			url+='&__user='+pageid;
			url+='&__a=1';
			url+='&__req=c';
			url+='&__rev=1522031';
			url+='&start='+starnum;
			var http = new XMLHttpRequest();
			http.open("GET", url, true);
			http.onreadystatechange = function() 
			{
			    if(http.readyState == 4 && http.status == 200) 
			    {
			    	if(!http.responseText.match("errorSummary"))
			    	{
			    		if(http.responseText.match(/user_id=\d+/g))
			    		{
			    			var c=http.responseText.match(/user_id=\d+/g);
			    			collector+=","+c.toString();
			    			if(collector.match(",,"))
			    			{
			    				collector=collector.replace(",,","");
			    			}else if(collector.match(","))
			    			{
			    				collector=collector.replace(",","");
			    			}
			    			for(;collector.match("user_id=");){
			    				collector=collector.replace("user_id=","");
			    			}
			    			for(;collector.match(",");){
			    				collector=collector.replace(",","<br>");
			    			}
			    			collector=collector+"<br>";
			    			console.log(collector);
			        		document.getElementById("fst789_dineshlikeextractdive2").innerHTML=collector;
			        		console.log(collector.split("user_id").length);
			        		looper(collector.split("<br>").length);
			    		}else{
			    			for(;collector.match("user_id=");){
			    				collector=collector.replace("user_id=","");
			    			}
			    			for(;collector.match(",");){
			    				collector=collector.replace(",","<br>");
			    			}
			    			document.getElementById("fst789_dineshlikeextractdive2").innerHTML=collector;
			    			alert("Finished extraction of fans."+collector.split("<br>").length+" fans extracted.");
			    			document.getElementById("fst789_csv_page_fan_id").style["display"]="block";
			    		}
			    	}else{
			    		alert("Error occured");
			    	}
			    }
			}
			http.send(null);
		}else{
			alert("Error, no page id found. Please run this script on a facebook page");
		}
	}
	looper(starnum);
}