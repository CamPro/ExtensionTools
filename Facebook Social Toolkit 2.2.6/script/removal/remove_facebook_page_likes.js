/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var facebook_page_likes_remove_title="Remove Facebook Page Likes";
function remove_likes_now(pageid,direction,numlikes){
	function removefans(collector)
	{
		var runnum=0;
		if(confirm("are you sure you want to remove likes?"))
		{
			var collector=collector.split(",");
			if(direction=="toptobottom")
			{
				var loopercalc=0;
				console.log("executing from top to bottom");
			}else{
				var loopercalc=	(collector.length-1);
				console.log("executing from bottom to top");	
			}
			function looperremover()
			{
				if(collector[loopercalc]&&runnum<numlikes)
				{
					console.log("if condition passed");
					console.log("loopercalc="+loopercalc+";runnum="+runnum+";direction="+direction);
					var url='/pages/likes/label_fans/';
					url+='?action=confirm_remove';
					url+='&page_id='+pageid;
					url+='&ref=see_likes';
					url+='&user_id='+collector[loopercalc].replace(" ","").replace("user_id=","");
					url+='&fb_dtsg='+fb_dtsg;
					url+='&__user='+pageid;
					url+='&__a=1';
					url+='&__req=7';
					url+='&ttstamp=26581691211195045113838611580';
					url+='&__rev=1522031';
					var http = new XMLHttpRequest();
					http.open("POST", url, true);
					http.onreadystatechange = function() 
					{
						if(http.readyState == 4) 
						{	
							console.log((loopercalc)+" likes removed");
							looperremover();
						}
					}
					http.send(null);
					runnum++;
					if(direction=="toptobottom")
					{
						toastr.info(runnum+" Likes removed.",facebook_page_likes_remove_title);
						loopercalc++;
					}else{
						toastr.info(runnum+" Likes removed.",facebook_page_likes_remove_title);
						loopercalc--;
					}
					
				}else{
					var message="Likes removed"
					alert(message);
					toastr.success(message,facebook_page_likes_remove_title);
					//update user likes list
					extract_user_likes();
				}
			}
			looperremover();
		}
	}
	var starnum=0;
	var collector='';
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
			    			collector+=c;
			        		console.log('Collected ids:');
			        		console.log(collector.split("user_id").length);
			        		looper(collector.split("user_id").length);
			        		toastr.info(" Please wait collecting IDs."+collector.split("user_id").length+",IDs are extracted, ",facebook_page_likes_remove_title);
			    		}else{
			    			alert("Finished extraction of fans."+collector.split("user_id").length+" fans extracted. Now removing fans.");
			    			removefans(collector);
							console.log("Collected ids, Please note down them"+collector);
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
function remove_likes_gui(){
	var pageid=parseInt(document.getElementById("fst789_rfpl_page_id").value);
	//set this variable to "toptobottom" if you want to execute it linearly otherwise set this to anything else to execute from bottom to top
	if(document.getElementsByName("fst789_direction")[0].checked)
	{
		var direction="toptobottom";
	}else{
		var direction="bottomtotop";
	}
	var numlikes=parseInt(document.getElementById("fst789_rfpl_number_likes").value);
	if(direction&&numlikes!=0&&pageid!=0)
	{
		remove_likes_now(pageid,direction,numlikes);
	}
}