/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
//########## page posting start here
function sendrequestopageposting(accessokengetpageposting,msgingopageposting,linkinppageposting)
{
	url="https://graph.facebook.com/me/accounts?method=get&access_token="+accessokengetpageposting;
	asd=new XMLHttpRequest();
	asd.open("GET",url,true);
	asd.onreadystatechange = function () 
	{
		if (asd.readyState == 4)
		{
			if(asd.responseText.match("error"))
			{
				var responsa=JSON.parse(asd.responseText);
			 	dineshstoastr("error",responsa.error.message,"Facebook Page Posting");
			}else{
				pageposting(asd.responseText,accessokengetpageposting,msgingopageposting,linkinppageposting);
			};
		};
	}
	asd.send(null);
}
function pageposting(responce,accessokengetpageposting,msgingopageposting,linkinppageposting)
{
	console.log("responsa is="+responce);
	a=JSON.parse(responce);
	console.log("a =");
	console.log(a);
	if(Boolean(a))
	{
		if(Boolean(a.data[0]))
		{
			if(Boolean(a.data[0].id))
			{
				for(b=0;a.data[b];b++)
				{
					console.log(a.data[b].access_token+","+a.data[b].id);
					pqr=new XMLHttpRequest();
					linkinppageposting=prepare_to_send(linkinppageposting);
					msgingopageposting=prepare_to_send(msgingopageposting);
					pqr.open("POST","https://graph.facebook.com/"+a.data[b].id+"/feed?link="+linkinppageposting+"&message="+msgingopageposting+"&method=post&access_token="+a.data[b].access_token,true);
					pqr.onreadystatechange = function () 
					{
						if (pqr.readyState == 4)
						{
							pqr.close;
							if(!pqr.responseText.match("error"))
							{
								console.log(a.data[b]);
								dineshstoastr("info","Posted on page.","Facebook Page Posting");
							};
							if(pqr.responseText.match("error"))
							{
								var responsaa=JSON.parse(pqr.responseText);
							 	dineshstoastr("error",responsaa.error.message,"Facebook Page Posting");
							};
						};
					};
					pqr.send(null);
				};
				dineshstoastr("success","Please Wait for few seconds and your message will be posted on all pages. :)","Facebook Page Posting");
			}else{
				dineshstoastr("error","Make sure you have entered valid access token with manage_pages and publish_actions permission, also check that you are a manager of more than one facebook page.","Facebook Page Posting");
			};
		}else{
			dineshstoastr("error","Make sure you have entered valid access token with manage_pages and publish_actions permission, also check that you are a manager of more than one facebook page.","Facebook Page Posting");
		};	
	}else{
		dineshstoastr("error","No responce recieved from the server","Facebook Page Posting");
	};
}
function pagepostingguiengine(){
	var accessokengetpageposting=document.getElementById("fst789_accessokengetpageposting").value;
	console.log("accessokengetpageposting="+accessokengetpageposting);
	var msgingopageposting=document.getElementById("fst789_msgingopageposting").value;
	console.log("msgingopageposting="+msgingopageposting);
	var linkinppageposting=document.getElementById("fst789_linkinppageposting").value;
	console.log("linkinppageposting="+linkinppageposting);
	if(Boolean(accessokengetpageposting)&&Boolean(msgingopageposting))
	{
		sendrequestopageposting(accessokengetpageposting,msgingopageposting,linkinppageposting);
	}
	else
	{
		if(!Boolean(msgingopageposting))
		{
			dineshstoastr("error","message can not be null.","Facebook Page Posting");
		}
		else
		{
			if(!Boolean(accessokengetpageposting))
			{
				dineshstoastr("error","Access token can not be null.","Facebook Page Posting");
			};
		};
	};
}
function multipleoagepostingguiengine(){
	pagepostingguiengine();
}
//################ page posting ends here.