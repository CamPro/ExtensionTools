/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var download_facebook_video_title="Download Facebook Videos";
var video_result_div_id="fst789_video_downloader_url_input";
function video_downloader_result_append(video_id){
	video_id=escape(video_id);
	var download_link="https\:\/\/x.facebook.com\/video\/video.php\?v\="+video_id;
	$("#fst789_video_downloader_result").html('<a target="_blank" href="'+download_link+'">Click this link then press CTRL+S to download video</a>');
	$("#fst789_video_downloader_result").fadeIn();
}
function start_fb_video_downloader()
{
	var message='Please wait, generating download link';
    toastr.info(message,download_facebook_video_title);
    //reset html
    document.getElementById(video_result_div_id).innerHTML="";
    original_url=document.getElementById(video_result_div_id).value;
    url = original_url;
    var url_process = url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
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
                    extraction_process_url_params_video_downloader(url_array_collect);
                }else{
                    var message_to_show="Nothing to extract, please enter another URL";
                    toastr.error(message_to_show,download_facebook_video_title);
                    console.log(message_to_show);
                }
            }else{
                var message_to_show="Nothing to extract, please enter another URL";
                toastr.error(message_to_show,download_facebook_video_title);
                console.log(message_to_show);
            }
        }else{
            var message_to_show="URL entered by you doesn't belong to facebook.com";
            toastr.error(message_to_show,download_facebook_video_title);
        }
    } else {
        var message_to_show="Please Enter a valid URL";
        toastr.error(message_to_show,download_facebook_video_title);
    }
}
function extract_video_id_video_downloader(video_id)
{
    if(!isNaN(video_id))
    {
        console.log("video id is="+video_id); 
        video_downloader_result_append(video_id)
    }else{
    	unable_to_download_video();
    }
}
function unable_to_download_video(){
	alert("Unable to generate download link for this video");
}
function extraction_process_url_params_video_downloader(url_array_collect)
{
    if(url_array_collect[2])
    {
        if(url_array_collect[1]=="videos")
        {
            if(!isNaN(url_array_collect[2]))
            {
                extract_video_id_video_downloader(url_array_collect[2]);
            }else if(!isNaN(url_array_collect[3])){
                extract_video_id_video_downloader(url_array_collect[3]);
            }else{
            	unable_to_download_video();
            }
        }else{
        	unable_to_download_video();
        }
    }else{
    	unable_to_download_video();
    }
}