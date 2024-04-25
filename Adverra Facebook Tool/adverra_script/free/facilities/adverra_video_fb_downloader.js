function video_downloader_result_append(hd,sd){
	hd_link = '';
	sd_link = '';
if(hd != ''){
	hd_link = '<a href="'+hd+'" target="_blank">Download Video HD</a><br>';
}
if(sd != ''){
	sd_link = '<a href="'+sd+'" target="_blank">Download Video SD</a><br>';
}
text = hd_link+sd_link+'คลิกที่ลิ้งด้านบน จะเปิดเข้าไปที่วิดีโอ จากนั้น หากต้องการ Save วิดีโอให้กด Ctrl+S';

Swal.fire({
			    title:'คลิกที่ลิ้งเพื่อ Download Video' ,
  type: 'success',
  html:text,
})
    iziToast.success({				 
    title: 'เรียบร้อย',
  position: 'topCenter',
  timeout: 3000,
    message: 'คลิกที่ลิ้งเพื่อดาวน์โหลดวิดีโอได้เลย',
});	
}



function adverra_video_fb_downloader()
{

	url = $('#adverra_video_fb_downloader_url').val();
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
					
					url = 'https://www.apppost.net/fbdowload.php?url='+url_process[0];
					
					
					$.ajax({
		url: url,
        type: "get",
		  complete: function(xhr){ 
            var responce = xhr.responseText;
			var data = JSON.parse(responce);
			hd = data.hd_src_no_ratelimit;
			sd = data.sd_src_no_ratelimit;
	
	/*
	
			//results = responce.match(/hd_src:/g);
			results = String(responce.match(/hd_src_no_ratelimit:"([^"]*")/g));
			results2 = String(responce.match(/sd_src_no_ratelimit:"([^"]*")/g));
			alert(results);
			//video_url = results.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
			resultsx = results.replace('\"', '');
			resultsx2 = results2.replace('\"', '')
			var video_url_hd_src = '';
			var video_url_sd_src = '';
			video_url_hd_src = resultsx.replace('hd_src_no_ratelimit:', '').replace('\"', '');
			video_url_sd_src = resultsx2.replace('hd_src_no_ratelimit:', '').replace('\"', '');
            video_url_hd_src2 = video_url_hd_src.replace(',hd_src_no_ratelimit:', '');
			video_url_sd_src2 = video_url_sd_src.replace(',hd_src_no_ratelimit:', '');
			
			*/
			if(hd != ''  ||  sd != ''){
	        video_downloader_result_append(hd,sd);
			}
			else{
				//toastr.info(message,adverra_langs());
				url = url_process[0].replace("www","mbasic");
									$.ajax({
									url: url,
									type: "get",
									  complete: function(xhr){ 
										var responce = xhr.responseText;
										results = decodeURIComponent(String(responce.match(/video_redirect([^"]*")/g)));
									    results = results.replace("video_redirect\/?src=","");
										video_url_sd_src2 = results.replace('"',"");
										
										 // toastr.info('กำลัง ตรวจสอบวิดีโอ รอสักครู่');
										video_downloader_result_append('',video_url_sd_src2);
										
	
				    },


    });
				
			/*	
				
			$("#fst789_video_downloader_result2").html('<span style="color:#FF0000">ไม่สามารถดาวโหลดวิดีโอนี้ได้ หรือ url ที่คุณนำเอามาใส่ไม่ใช่ url วิดีโอ</span>');
	        $("#fst789_video_downloader_result2").fadeIn();	
			*/
			}
		
        
           
      },


    });
 
                    //extraction_process_url_params_video_downloader(url_array_collect);
                }else{
                    var message_to_show="ไม่สามารถดาวน์โหลดวิดีโอได้ กรุณาเปลี่ยนURL";
                    Swal.fire({
			    title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:message_to_show,
})
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
