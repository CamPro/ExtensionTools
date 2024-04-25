 function adverra_id_extractor(){
	 text = '';
	         iziToast.info({				 
    title: 'รอสักครู่',
  position: 'topCenter',
  timeout: 2000,
    message: 'กำลังเช็ค ID...',
});
			 
			 
original_url =  $('#adverra_id_extractor_url').val();
url = original_url;
 var url_process = url.match(/([a-z]+\:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/ig);
   if (url_process)
    {
		
		 url=url.replace("https\:\/\/","").replace("http\:\/\/","").replace("\:\/\/","");
        url=url.split("\/");
        if(url[0].match(".facebook.com"))
        { 
		  if(url[1].split("?"))
            {
				   if(url[1]&&url[1]!="")
                {
				
                         
					/////////////////////////////////////////	 
                    var url_array_collect=[];
                    for(temp_var=1;url[temp_var];temp_var++)
                    {
                        console.log("url["+temp_var+"]="+url[temp_var].split("\?")[0]);
                        if(url[temp_var].split("\?")[0]&&url[temp_var].split("\?")[0]!="")
                        {
                           url_array_collect.push(url[temp_var].split("\?")[0]);
                        }
                        if(url[temp_var].split("\?")[1]&&url[temp_var].split("\?")[1]!="")
                        {
                            var location_search="\?"+url[temp_var].split("\?")[1];
                        }
                    }

    
                    var post_id=getParam('fbid',location_search);
				
                    var set=getParam('set',location_search);
                    var story_fbid=getParam('story_fbid',location_search);
                    var account_id=getParam('id',location_search);
                    //to detect facebook notes
                    if(url[1]=="notes")
                    {
                        if(!isNaN(url[4]))
                        {
                            title="Note ID";
                            console.log(title+"="+url[4]);
                            append_html_code(title,url[4]); 
                        }
                        if(!isNaN(url[3]))
                        {
                            title="Note ID";
                            console.log(title+"="+url[3]);
                            append_html_code(title,url[3]); 
                        }
                    }
                    if(account_id)
                    {
                        if(!isNaN(account_id))
                        {
                            title="Account ID";
                            console.log(title+"="+account_id);
                            append_html_code(title,account_id); 
                        }
                    }
                    if(story_fbid)
                    {
                        if(!isNaN(story_fbid))
                        {
                            title="Post ID";
                            console.log(title+"="+story_fbid);
                            append_html_code(title,story_fbid); 
                        }
                    }
                    if(post_id!="")
                    {
                        var photo_post_id=post_id;
                        if(!isNaN(photo_post_id))
                        {
                            title="Post ID/Photo ID:";
                            types = '2';
                        }
						 append_html_code(title,photo_post_id); 
                    }
                    if(set)
                    {
                        set=set.split(".");
                        if(set)
                        {
                            var account_id=set[3];
                            if(!isNaN(account_id))
                            {
                                title="Account ID:";
                                console.log(title+"="+account_id);
                                append_html_code(title,account_id); 
                            }
                        }
                    }
                    //extract account id from https://www.facebook.com/profile.php?id=100009125604149
                    if(original_url.match("profile\.php"))
                    {}
                    if(original_url.match("\/photos\/"))
                    {
                        splited=original_url.split("/");
                        photo_id=splited[splited.length-2];
                        if(!isNaN(photo_id))
                        {
                            title="Photo ID:";
                            console.log(title+"="+photo_id);
                            append_html_code(title,photo_id); 
                        }
                    }
                    extraction_process_url_params(url_array_collect);
                    console.log(url_array_collect);
                
						 
						 
						 
						 
						 
					/////////////////////////	 

						 
						  
				}
				else{
			
					
					Swal.fire('เกิดข้อผิดพลาด','ไม่สามารถดึง ID กรุณากรอก URL อื่น', 'error');
					
					
				}
			}
		}
		else{
			
				Swal.fire('เกิดข้อผิดพลาด','URL ที่ใส่ ต้องเป็น URL ของ Facebook', 'error');
		}
	}
	else{
		
		Swal.fire('นี่ไม่ใช่ URL ','กรุณากรอก URL ของ Facebook', 'error');
		
	}
 
 
 }
 
 
 
 
 
 
 
function extract_page_id(page_id)
{
    if(!isNaN(page_id))
    {
        console.log("page id="+page_id);
        title="Page id:";
        append_html_code(title,page_id);
    }else{
        alert("URL is tampered.");
    }
}
function extract_post_id(post_id)
{
    if(!isNaN(post_id))
    {
        console.log("post_id="+post_id);
        title="Post id:";
        append_html_code(title,post_id);
    }else{
        alert("URL is tampered.");
    }
}
function event_post_id_append(post_id)
{
    if(!isNaN(post_id))
    {
        console.log("event_post_id="+post_id);
        title="Event post id:";
        append_html_code(title,post_id);
    }else{
        alert("URL is tampered.");
    }
}
function group_post_id_append(post_id)
{
    if(!isNaN(post_id))
    {
        console.log("group_post_id="+post_id);
        title="Group post id:";
        append_html_code(title,post_id);
    }else{
        alert("URL is tampered.");
    }
}
function id_extract_event(account_username)
{
    if(!isNaN(account_username))
    {
        console.log("Event id is:"+account_username);
        title="Event ID:";
        append_html_code(title,account_username);
    }else{
        alert("URL is tampered.");
    }
}
function extract_video_id(video_id)
{
    if(!isNaN(video_id))
    {
        console.log("video id is="+video_id); 
        title="Post ID/ Video id:";
        append_html_code(title,video_id);   
    }
}
function id_extract_group(account_username)
{

    if(isNaN(account_username))
    {
        pageurl="https://mbasic.facebook.com/groups/"+account_username;
        dinesh = new XMLHttpRequest();
        dinesh.open("GET", pageurl, true);
        dinesh.onreadystatechange = function () {
            if (dinesh.readyState == 4 && dinesh.status == 200) {
                var responsa =dinesh.responseText.match(/\/groups\/\d+/g)[0];
                responsa=responsa.replace("\/groups\/","");
                title="Group ID:";
                console.log(title+"="+responsa);
                append_html_code(title,responsa);  
            }
        }
        dinesh.send();
    }else{
        title="Group ID:";
        console.log(title+"="+account_username);
        append_html_code(title,account_username);  
    }
}
 
 
 
 
 
 function append_html_code(title,id){
title = '<b style="font-size:20px;font-weight:bold">'+title;
text = text+'<p>'+title+'<input class="copytext'+id+'" type="text" value="'+id+'" style="font-size:30px; text-align:center;width:90%;"  ><a datashow="copytext'+id+'" class="copyto btn-floating mb-1 btn-flat waves-effect waves-light pink accent-2 white-text">  <i class="material-icons">content_copy</i></a><p></b>';

Swal.fire({
			    title:'Copy ตัวเลขไปใช้ได้เลยค่ะ' ,
  type: 'success',
  html:text,
})
    iziToast.success({				 
    title: 'เรียบร้อย',
  position: 'topCenter',
  timeout: 3000,
    message: 'พบ ID แล้ว Copy ไปใช้ได้เลย',
});	 
 }
 
 

 
 
 
 function extraction_process_url_params(url_array_collect)
{
	console.log(url_array_collect);
	
	
    if(url_array_collect[2])
    {
        if(url_array_collect[2]=="permalink")
        {
            if(url_array_collect[0]=="groups")
            {
                id_extract_group(url_array_collect[1]);
                if(!isNaN(url_array_collect[3]))
                {
                    group_post_id_append(url_array_collect[3]);
                }
            }
            if(url_array_collect[0]=="events")
            {
                id_extract_event(url_array_collect[1]);
                if(!isNaN(url_array_collect[3]))
                {
                    event_post_id_append(url_array_collect[3]);
                }
            }
        }
        if(url_array_collect[1]=="videos")
        {
			  extract_video_id(url_array_collect[2]);
			  //extract_video_id();
			/*
            id_extract_account(url_array_collect[0]);
            if(!isNaN(url_array_collect[2]))
            {
                extract_video_id(url_array_collect[2]);
            }else if(!isNaN(url_array_collect[3])){
                extract_video_id(url_array_collect[3]);
            }
			*/
        }
        if(url_array_collect[0]=="pages")
        {
            if(!isNaN(url_array_collect[2]))
            {
                extract_page_id(url_array_collect[2]);
            }
        }
        if(url_array_collect[1]=="posts")
        {
            if(url_array_collect[0])
            {
                id_extract_account(url_array_collect[0]);
            }
            if(!isNaN(url_array_collect[2]))
            {
                extract_post_id(url_array_collect[2]);
            }
        }
    }else{
        if(url_array_collect[1])
        {
            if(url_array_collect[0]=="groups")
            {
                id_extract_group(url_array_collect[1]);
            }
            if(url_array_collect[0]=="events")
            {
                id_extract_event(url_array_collect[1]);
            }
        }else{
            id_extract_account(url_array_collect[0]);
        }
    }
}
 
 
 
 
 
 
 
 
 
 function id_extract_account(account_username)
 
{
	
    function error_msgs(){
        //toastr.error("Unable to retrieve account ID");
    }

    if(isNaN(account_username))
    {
	responsa = '';
        pageurl="https://m.facebook.com/"+account_username+"";
		
        dinesh = new XMLHttpRequest();
        dinesh.open("GET", pageurl, true);
        dinesh.onreadystatechange = function () {
            if (dinesh.readyState == 4 && dinesh.status == 200) {
                var responsa = dinesh.responseText;
			      responsa =    responsa.replace(/&quot;/g,'"');
                if (responsa.match(/"profile_id":\d+/g)) {
					
					var last_array = (responce_id=responsa.match(/"profile_id":\d+/g).length-1);
				
                    var responce_id=responsa.match(/"profile_id":\d+/g)[last_array];
                    responce_id=responce_id.replace('"profile_id":',"");
                    if(!isNaN(responce_id))
                    {
                        title="Account ID:";
                        console.log(title+"="+responce_id);
					 append_html_code(title,responce_id); 
						
					
                    }else{
                        error_msgs();
                    }
                }
				
				else
				
				 if (responsa.match(/page_id:\"\d+/g)) {
						
					var last_array  =responsa.match(/page_id:\"\d+/g)[0];
				console.log(last_array);
                    responce_id=last_array.replace('page_id:\"',"");
                    if(!isNaN(responce_id))
                    {
                        title="Page ID:";
                        console.log(title+"="+responce_id);
					 append_html_code(title,responce_id); 
						
					
                    }else{
                        error_msgs();
                    }
                }
				
				
				
				
            }
        }
        dinesh.send();
    }else{
        alert("account id is:"+responsa.id);
        //document.getElementById("fst789_id_extractor_result").innerText = account_username;
    }
}
 
 
 
 
 
 
 
 
 
 function getParam ( sname,location_search )
{
    if(location_search&&sname)
    {
		
        var params = location_search.substr(location_search.indexOf("?")+1);
        var sval = "";
        params = params.split("&");
          // split param and value into individual pieces
          for (var i=0; i<params.length; i++)
             {
               temp = params[i].split("=");
               if ( [temp[0]] == sname ) { sval = temp[1]; }
             }
			
        return sval;
    }else{
        return '';
    }
}

 
 
 
 
 
 
 
 
 
 
 
