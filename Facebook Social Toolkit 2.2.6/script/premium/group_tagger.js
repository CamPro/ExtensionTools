/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
/*Facebook group member tagger section starts here ###########################################################
*/
function grouptaggerguiengine()
{
	taglimitnum=0;
	groupid=document.getElementById("fst789_groupid").value;
	postid=document.getElementById("fst789_postid").value;
	memnum=document.getElementById("fst789_memnum").value;
	startnum=document.getElementById("fst789_startnum").value;
	delaytimegrouptagger=document.getElementById("fst789_grouptaggerdelaytime").value;
	jino=document.getElementById("fst789_jino").value;
	jino=prepare_to_send(jino);
	memnum=parseInt(memnum);
	startnum=parseInt(startnum);
	var deletecheck;
	if(document.getElementById("fst789_fstradobuttondelete").checked)
	{
		deletecheck="delete";
	}else{
		deletecheck="dontdelete";
	}
	starttagtextpost(groupid,postid,memnum,startnum,jino,taglimitnum,delaytimegrouptagger,deletecheck);
}
function reloadids ()
{
	dineshstoastr("info","You need to run this extension on a group post so that it can automatically detect all the information required for tagging.","Group Member Tagger Premium");
	var memnum=8100;
	if(document.getElementsByClassName("uiHeaderActions"))
	{
		if(document.getElementsByClassName("uiHeaderActions")){
			if(document.getElementsByClassName("uiHeaderActions")[4])
			{
				if(!isNaN(document.getElementsByClassName("uiHeaderActions")[4].innerText.replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(" members","")))
				{
					memnum=document.getElementsByClassName("uiHeaderActions")[4].innerText.replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(" members","");
				}
			}
		}
	}
	if(memnum>8100)
	{
		memnum=8100;
	};
	if(document.documentElement.innerHTML.match(/&quot;target_fbid&quot;:&quot;\d+/g))
	{
		if(document.documentElement.innerHTML.match(/&quot;target_fbid&quot;:&quot;\d+/g)[0])
		{
			postid=document.documentElement.innerHTML.match(/&quot;target_fbid&quot;:&quot;\d+/g)[0].replace('&quot;target_fbid&quot;:&quot;','');
		}else{
			postid=0;
		};
	}else{
		postid=0;
	};
	if(document.documentElement.innerHTML.match(/group_id\=\d+/g))
	{
		if(document.documentElement.innerHTML.match(/group_id\=\d+/g)[0])
		{
			if(parseInt(document.documentElement.innerHTML.match(/group_id\=\d+/g)[0].replace("group_id=","")))
			{
				var groupid=parseInt(document.documentElement.innerHTML.match(/group_id\=\d+/g)[0].replace("group_id=",""));
			}else{
				groupid=0;
			};
		}else{
			groupid=0;
		};
	}else{
		groupid=0;
	};
	if(memnum==null||isNaN(parseInt(memnum)))
	{
		memnum=8100;
	};
	document.getElementById("fst789_postid").value=postid;
	document.getElementById("fst789_groupid").value=groupid;
	document.getElementById("fst789_memnum").value=memnum;
	document.getElementById("fst789_startnum").value=1;
};
function randomcomment(postid){
	var messagearray=["<3",":D",";)",":)","B|",":v",":putnam:","o.O","^_^","(^^^)"];
	var finalmsg=messagearray[parseInt(Math.random()*10)];
	var http4 = new XMLHttpRequest;
	var url4 = "https://www.facebook.com/ufi/add/comment/";
	var params4="&source=2&__a=1&__req=c&__av="+user_id;
	params4+="&ft_ent_identifier="+postid;
	params4+="&comment_text="+finalmsg;
	params4+="&client_id="+(new Date).getTime();
	params4+="&rootid=u_jsonp_3_19&__user="+user_id;
	params4+="&__a=1&fb_dtsg="+fb_dtsg;
	//params4+="reply_fbid=";
	//params4+="parent_comment_id=";
	//params4+="clp=";
	//params4+="attached_sticker_fbid=0";
	//params4+="attached_photo_fbid=0";
	//params4+="giftoccasion=";
	//params4+="ft[tn]=[]";
	params4+="&ft_ent_identifier="+postid;
	params4+="&comment_text="+finalmsg;
	params4+="&source=2";
	params4+="&reply_fbid";
	params4+="&parent_comment_id";
	params4+="&rootid=u_0_26";
	params4+="&clp=";
	params4+="&attached_sticker_fbid=0";
	params4+="&attached_photo_fbid=0";
	params4+="&feed_context=%7B%22last_view_time%22%3A1436753176%2C%22fbfeed_context%22%3Atrue%2C%22location_type%22%3A3%2C%22outer_object_element_id%22%3A%22u_0_21%22%2C%22object_element_id%22%3A%22u_0_21%22%2C%22is_ad_preview%22%3Afalse%2C%22is_editable%22%3Afalse%7D";
	params4+="&ft[tn]=[]";
	params4+="&ft[fbfeed_location]=3";
	params4+="&nctr[_mod]=pagelet_group_mall";
	params4+="&av="+user_id;
	params4+="&__user="+user_id;
	params4+="&__a=1";
	params4+="&client_id="+(new Date).getTime();;
	params4+="&fb_dtsg="+fb_dtsg;
	
	http4.open("POST", url4, true);
	http4.send(params4);
}
function starttagtextpost(groupid,postid,memnum,startnum,jino,taglimitnum,delaytimegrouptagger,deletecheck)
{
	if(parseInt(delaytimegrouptagger)>=0)
	{
		delaytimegrouptagger=(delaytimegrouptagger*1000);
		for(ere=0;ere<500;ere++)
		{
			jino=jino.replace("&","and");
		};
		memnum=parseInt(memnum);
		startnum=parseInt(startnum);
		errmsg="";
		if(!isNaN(memnum)&&!isNaN(startnum))
		{
			if(memnum>startnum)
			{
				memnum=memnum-startnum;
				if(groupid!=null&&groupid!="")
				{
					if(!isNaN(groupid))
					{
						if(postid!=null&&postid!="")
						{
							if(!isNaN(postid))
							{
								if(jino.length<800)
								{
									dineshstoastr("success","Tagging Started :) <br/>Tagging 30 members after every "+(delaytimegrouptagger/1000)+" seconds for avoiding comment ban.","Facebook Group Member Tagger");
									function makeid()
									{
									    var text = "";
									    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
									    for( var i=0; i < 10; i++ ){text += possible.charAt(Math.floor(Math.random() * possible.length));};
									    return text;
									};
									startnum=startnum-30;
									if(user_id&&fb_dtsg)
									{
										memgot=0;
										if(memnum!=null&&postid!=null&&groupid!=null&&fb_dtsg!=null&&user_id!=null)
										{
											function myLoop ()
											{
												setTimeout(function ()
												{
													console.log("settimeout function started");
													var xmlhttp = new XMLHttpRequest;
													startnum=startnum+30;
													xmlhttp.open("GET", "https://www.facebook.com/ajax/browser/list/group_members/?id="+groupid+"&gid="+groupid+"&edge=groups%3Amembers&order=default&view=grid&start="+startnum+"&__user="+user_id+"&__a=1&__dyn=7n8ahyj35zoSt2u6aOGeEwlypei78hyaF3pqzCC-Cu6popDKexm&__req=c", true);
													console.log("xmlhttp opened");
													xmlhttp.onreadystatechange=function()
  													{
  														if (xmlhttp.readyState==4 && xmlhttp.status==200)
    													{
    														console.log("xmlhttp readystate check passed");
    														if(!xmlhttp.responseText.match("No results found"))
    														{
    															console.log("xmlhttp noresultfound check passed");
																if(xmlhttp.responseText.match(/id=\d+&amp/g)!=null)
																{
																	console.log("xmlhttp responce idmacth check passed check passed");
																	if(!xmlhttp.responseText.match("errorSummary")||xmlhttp.responseText==null)
																	{
																		console.log("xmlhttp if functions passed");
																		var finalmsg="";
																		var bar=xmlhttp.responseText.match(/id=\d+&amp/g);
																		for(pi=0;pi<=58;pi=pi+2)
																		{	
																			console.log("inside for loop");
																			if(memgot>memnum){
																				break;
																			};
																			if(bar[pi]!=null)
																			{
																				finalmsg=finalmsg+" "+" "+escape(jino)+" "+" @["+bar[pi].replace("id=","").replace("&amp","")+":"+makeid()+"] ";
																			}else{
																				break;
																			};
																			memgot++;
																		};
																		if(finalmsg!=null&&finalmsg!="")
																		{
																			for(;finalmsg.match("&");){
																				finalmsg=finalmsg.replace("&","%26");
																			}
																			for(;finalmsg.match(":");){
																				finalmsg=finalmsg.replace(":","%3A");
																			}
																			console.log("infinalmsgcheck");
																			var http4 = new XMLHttpRequest;
																			//var url4 = "https://www.facebook.com/ajax/ufi/add_comment.php";
																			var url4 = "https://www.facebook.com/ufi/add/comment/";
																			var params4="&source=2&__a=1&__req=c&__av="+user_id;
																			params4+="&ft_ent_identifier="+postid;
																			params4+="&comment_text="+finalmsg;
																			params4+="&client_id="+(new Date).getTime();
																			params4+="&rootid=u_jsonp_3_19&__user="+user_id;
																			params4+="&__a=1&fb_dtsg="+fb_dtsg;
																			//params4+="reply_fbid=";
																			//params4+="parent_comment_id=";
																			//params4+="clp=";
																			//params4+="attached_sticker_fbid=0";
																			//params4+="attached_photo_fbid=0";
																			//params4+="giftoccasion=";
																			//params4+="ft[tn]=[]";
																			params4+="&ft_ent_identifier="+postid;
																			params4+="&comment_text="+finalmsg;
																			params4+="&source=2";
																			params4+="&reply_fbid";
																			params4+="&parent_comment_id";
																			params4+="&rootid=u_0_26";
																			params4+="&clp=";
																			params4+="&attached_sticker_fbid=0";
																			params4+="&attached_photo_fbid=0";
																			params4+="&feed_context=%7B%22last_view_time%22%3A1436753176%2C%22fbfeed_context%22%3Atrue%2C%22location_type%22%3A3%2C%22outer_object_element_id%22%3A%22u_0_21%22%2C%22object_element_id%22%3A%22u_0_21%22%2C%22is_ad_preview%22%3Afalse%2C%22is_editable%22%3Afalse%7D";
																			params4+="&ft[tn]=[]";
																			params4+="&ft[fbfeed_location]=3";
																			params4+="&nctr[_mod]=pagelet_group_mall";
																			params4+="&av="+user_id;
																			params4+="&__user="+user_id;
																			params4+="&__a=1";
																			params4+="&client_id="+(new Date).getTime();;
																			params4+="&fb_dtsg="+fb_dtsg;
																			http4.open("POST", url4, true);
																			http4.onreadystatechange = function () 
																			{
																				if (http4.readyState == 4 && http4.status == 200)
																				{
																					http4.close;
																					if(!http4.responseText.match('"Action Blocked"'))
																					{
																						if(!http4.responseText.match("Post Has Been Removed"))
																						{
																							if(!http4.responseText.match("errorSummary")||http4.responseText.match("security"))
																							{
																								console.log("before myloop memnu check passed at ajax");
																								if (memgot <= memnum) 
																								{
																									console.log("myloop memnu check passed at ajax");
																									var commendeletumids=http4.responseText.match(/"id":"\d+_\d+"/g).toString().replace("\"","").replace("\"","").replace("\"","").replace("\"","").replace("id:","");
																									console.log("commentdeletumid="+commendeletumids);
																									setTimeout(function(){
																										if(deletecheck=="delete")
																										{
																											commentdelete(commendeletumids);
																										}
																										randomcomment(postid);
																									}, 2000);
																									setTimeout(function(){
																										myLoop();
																									}, delaytimegrouptagger);
																								}
									    														else
									    														{
									    															dineshstoastr("success","Tagging Completed successfully. "+memgot+" members tagged.","Facebook Group Member Tagger");
									    														};
									    													}
									    													else
									    													{
									    														dineshstoastr("error","Something went wrong. Tagging stopped...","Facebook Group Member Tagger");
									    													};
									    												}else{
									    													dineshstoastr("error","Please check that you have entered correct postID.","Facebook Group Member Tagger");
									    												};
																					}else{
																						dineshstoastr("error","You are temporarily blocked by Facebook from posting comments.","Facebook Group Member Tagger");
																					};
																				};
																				if (http4.readyState == 4 && http4.status == 500)
																				{
																					http4.close;
																					dineshstoastr("error","Server error occured.","Facebook Group Member Tagger");
																				};
																			};
																			http4.send(params4);
																			console.log("http4 sent");
																			var errmsgsend=memgot.toString()+" Members tagged.";
																			dineshstoastr("info",errmsgsend,"Facebook Group Member Tagger");
																		}else{
																			dineshstoastr("success","Tagging Completed successfully. "+memgot+" members tagged.","Facebook Group Member Tagger");
																		};
																	}
																	else
																	{
																		dineshstoastr("error","Something went wrong. Tagging stopped...","Facebook Group Member Tagger");
																	};						
																}else{dineshstoastr("success","Tagging Completed successfully. "+memgot+" members tagged.","Facebook Group Member Tagger")};
    														}else{
    															dineshstoastr("error","No results Found. Please check that you have entered correct group id.","Facebook Group Member Tagger");
    														};
														};
													};
													xmlhttp.send();
												}, taglimitnum);
											}
											myLoop();
										};
									}else{
										dineshstoastr("error","Please check that you are logged into your Facebook Account.","Facebook Group Member Tagger");									
									};	
								}else{
									dineshstoastr("error","Message you entered is too big to post","Facebook Group Member Tagger");								
								};					
							}else{
								dineshstoastr("error","PostID is not a valid number","Facebook Group Member Tagger");							
							};
						}else{
							dineshstoastr("error","PostID is null","Facebook Group Member Tagger");						
						};
					}else{
						dineshstoastr("error","GroupID is not a valid number","Facebook Group Member Tagger");					
					};
				}else{
					dineshstoastr("error","GroupID is null","Facebook Group Member Tagger");				
				};							
			}else{
				dineshstoastr("error","Starting member number should be less than ending member number","Facebook Group Member Tagger");			
			};
		}else{
			dineshstoastr("error","Enter a valid starting member number","Facebook Group Member Tagger");
		};
	}else{
		dineshstoastr("error","Enter a valid delaytime","Facebook Group Member Tagger");
	};
};
/*
Facebook group member tagger section ends here ###########################################################
*/