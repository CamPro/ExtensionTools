/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var unlike_pages_title="Unlike all facebook pages at once";
function sendunlikesnowtwo(fanapageidcollect){
	var clino=0;
	function innerunlikeloop()
	{
		console.log("inside innerunlikeloop");
		if(fanapageidcollect)
		{
			if(fanapageidcollect[clino])
			{
				console.log("passed all the ifs");
				console.log("valu of clino is "+clino);
				console.log("fanapageidcollect[clino]="+fanapageidcollect[clino])
				var likesxml=new XMLHttpRequest;
				likesxml.open("POST","/ajax/pages/fan_status.php",true);
				params="&fbpage_id="+fanapageidcollect[clino];
				params+="&add=false";
				params+="&reload=false";
				params+="&fan_origin=liked_menu";
				params+="&__user="+user_id;
				params+="&__a=1";
				params+="&__req=d";
				params+="&fb_dtsg="+fb_dtsg;
				likesxml.onreadystatechange = function () 
				{
					if (likesxml.readyState == 4 && likesxml.status == 200)
					{
						console.log("insideonreadystatechange");
						dineshstoastr("info",clino+" pages unliked.",unlike_pages_title);
						innerunlikeloop();
					};
				}
				likesxml.send(params);
			}else{
				dineshstoastr("success","All pages unliked successfully. Total unliked pages = "+clino,unlike_pages_title);
			};
		}else{
			dineshstoastr("info","You have no pages to unlike.",unlike_pages_title);
		};
		clino++;
	}
	innerunlikeloop();
}
function unlikeallpagesfunction(){
	if(confirm("Please confirm that you want to unlike all the pages. Once you unliked all the pages, it cannot be reversed."))
	{
		console.log("unlike all pages started.");
		get_item=localname_user_likes;
		chrome.storage.local.get(get_item, function(e) {
			if(e)
			{
			  	if(e[get_item]!=""&&e[get_item])
			  	{
			  		if(e[get_item][0]&&e[get_item][0]!="")
			  		{
			  			var fanapageidcollect=e[get_item];
			  			sendunlikesnowtwo(fanapageidcollect);
			  		}else{
			  			message_to_show="We can't find facebook pages to unlike.";
						dineshstoastr("error",message_to_show,unlike_pages_title);
						console.log(message_to_show);
			  		}
			  	}else{
			  		message_to_show="Page extraction is not complete, Please wait until Page extraction is complete.";
					dineshstoastr("error",message_to_show,unlike_pages_title);
					console.log(message_to_show);
			  	}
			}else{
				message_to_show="Page extraction is not complete, Please wait until Page extraction is complete.";
				dineshstoastr("error",message_to_show,unlike_pages_title);
				console.log(message_to_show);
			}
		});
	};
}