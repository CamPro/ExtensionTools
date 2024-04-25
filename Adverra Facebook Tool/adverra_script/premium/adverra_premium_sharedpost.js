function adverra_premium_sharedpost(){
	localStorage.setItem('adverra_premium_sharedpost_stop','0');
	 var data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการแชร์โพสลงกลุ่ม?",
  type: 'warning',
  footer: footer_swal(),
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {

adverra_premium_sharedpost_text =  $('#adverra_premium_sharedpost_text').val();  
adverra_premium_sharedpost_data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_sharedpost_delay_min  = $('#adverra_premium_sharedpost_delay_min').val();	
adverra_premium_sharedpost_delay_max  = $('#adverra_premium_sharedpost_delay_max').val();	
  adverra_premium_sharedpost_delay  =  getRandomInt(adverra_premium_sharedpost_delay_min, adverra_premium_sharedpost_delay_max);

 adverra_premium_sharedpost_url = $('#adverra_premium_sharedpost_url').val();	
	  if(adverra_premium_sharedpost_url == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุลิ้ง ที่ต้องการแชร์',
})
		     $('#adverra_premium_sharedpost_url').focus();
		  return false;
}



 
	  if(adverra_premium_sharedpost_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการแชร์',
})
		     $('#adverra_premium_sharedpost_text').focus();
		  return false;
}








	  if(adverra_premium_sharedpost_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group  ที่ต้องการแชร์เข้าไป อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_sharedpost_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_sharedpost_delay == '') || (adverra_premium_sharedpost_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_sharedpost_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
	  

	  
	 $('#adverra_premium_sharedpost_report').html('');
	 count_adverra_premium_sharedpost_error = 0;
	 count_adverra_premium_sharedpost_success = 0;
	 send_adverra_premium_sharedpost(0);
	
	

	 
	  
	  }
})
	

}



function send_adverra_premium_sharedpost(loop){


if(!check_internet()){
	adverra_premium_sharedpost_time_out = setTimeout(function(){send_adverra_premium_sharedpost(loop)}, (1000*5));
	return false;
}




if(typeof adverra_premium_sharedpost_time_out != 'undefined' ){
		clearTimeout(adverra_premium_sharedpost_time_out);
}
  adverra_premium_sharedpost_data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_sharedpost_text  = $('#adverra_premium_sharedpost_text').val();

adverra_premium_sharedpost_text =  $('#adverra_premium_sharedpost_text').val();  
adverra_premium_sharedpost_data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_sharedpost_delay_min  = $('#adverra_premium_sharedpost_delay_min').val();	
adverra_premium_sharedpost_delay_max  = $('#adverra_premium_sharedpost_delay_max').val();	
  adverra_premium_sharedpost_delay  =  getRandomInt(adverra_premium_sharedpost_delay_min, adverra_premium_sharedpost_delay_max);


  //adverra_premium_sharedpost_delay  =  getRandomInt(adverra_premium_sharedpost_delay_min, adverra_premium_sharedpost_delay_max);
  target_id = adverra_premium_sharedpost_data[loop];
  title = 'แชร์โพสลงกลุ่ม';
  count_adverra_premium_sharedpost = adverra_premium_sharedpost_data.length;
  
	if(localStorage.getItem('adverra_premium_sharedpost_stop') == 1){
	clearTimeout(adverra_premium_sharedpost_time_out);
	}
	else{
		
	 adverra_premium_sharedpost_getscraper(target_id);
	

	
	
	function adverra_premium_sharedpost_getscraper(target_id) {
		
		
			

var formData ='__user='+user_id+'&__a=1&__af=iw&__req=s&__be=-1&__rev=3035698&fb_dtsg='+fb_dtsg+'&__spin_r=3035698&__spin_b=trunk';
	 link_shared = spintax($("#adverra_premium_sharedpost_url").val().trim());
	 link_shared = link_shared.replace('web.facebook','www.facebook');
	 $.ajax({
		url : "https://www.facebook.com/react_composer/scraper/?composer_id=rc.u_jsonp_5_1p&target_id="+target_id+"&scrape_url="+link_shared+"&entry_point=group&source_attachment=STATUS&source_logging_name=link_pasted&av="+user_id+"&dpr=1.5",
        type: "post",
		  data : formData, 
       dataType: 'json',
   
		  complete: function(results){
			  
			  
			   if(results.responseText.indexOf('for (;;);') == -1){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ลิ้งที่คุณใส่ไม่ถูกต้อง ใส่ใหม่อีกครั้ง',
})

		  return false;
}
			  
			  	  var paramsxs = '';
			   var responce = results.responseText.replace("for (;;);", "");
      parsed_request = JSON.parse(responce);
	  
	  
	  /////////////////////////////////////////////
	  		
		  texteror = give_error_description(results.responseText,'adverra_premium_sharedpost');
		  if(texteror == ''){
			    var adverra_premium_sharedpost_type=JSON.stringify(parsed_request.jsmods.require[1][3][1].attachmentConfig.type);
	  var paramsx=parsed_request.jsmods.require[1][3][1].attachmentConfig.params;

      for(var px=0;px< paramsx.length;px++){
		paramsxs += 'attachment[params]['+px+']='+paramsx[px]+'&';
		  
	  }

if(!check_have_url_fb(link_shared)){
  var adverra_premium_sharedpost_img=paramsx.external_img;
	  var adverra_premium_sharedpost_img = adverra_premium_sharedpost_img.split(':\"');
	  var adverra_premium_sharedpost_img = adverra_premium_sharedpost_img[1].split('\",');
	  adverra_premium_sharedpost_img = adverra_premium_sharedpost_img[0].replace(/\\/g, '');
	var adverra_premium_sharedpost_title=paramsx.title;
    var adverra_premium_sharedpost_summary=paramsx.summary;
	var adverra_premium_sharedpost_global_share_id=paramsx.global_share_id;
}
	  localStorage.setItem('adverra_premium_sharedpost_type','');
	  localStorage.setItem('adverra_premium_sharedpost_type',adverra_premium_sharedpost_type);
	  
	   localStorage.setItem('adverra_premium_sharedpost_params','');
	  localStorage.setItem('adverra_premium_sharedpost_params',paramsxs);
	  
	    localStorage.setItem('adverra_premium_sharedpost_img','');
	  localStorage.setItem('adverra_premium_sharedpost_img',adverra_premium_sharedpost_img);
	  
	    localStorage.setItem('adverra_premium_sharedpost_title','');
	  localStorage.setItem('adverra_premium_sharedpost_title',adverra_premium_sharedpost_title);
	  
	    localStorage.setItem('adverra_premium_sharedpost_summary','');
	  localStorage.setItem('adverra_premium_sharedpost_summary',adverra_premium_sharedpost_summary);
	  
	  
	     localStorage.setItem('adverra_premium_sharedpost_global_share_id','');
	  localStorage.setItem('adverra_premium_sharedpost_global_share_id',adverra_premium_sharedpost_global_share_id);
	  
	 send_adverra_premium_sharedpost_next(target_id);
			  
		  
			  
			  }
		  else{
			 send_adverra_premium_sharedpost_next(target_id);
			  }
		
	  
	  ///////////////////////////////////////
	
			  
			  },
     

    });
	
	

       
		
	
}


	
	
	
	function  send_adverra_premium_sharedpost_next(target_id){
		

		adverra_premium_sharedpost_photo_all_img_okx = '';

	 adverra_premium_sharedpost_text = encodeURIComponent(spintax(adverra_premium_sharedpost_text));
     adverra_premium_sharedpost_number = Math.floor(Math.random() * 100000000000000) + 1;

adverra_premium_sharedpost_limit = $('#adverra_premium_sharedpost_limit').val();
	if(count_adverra_premium_sharedpost < adverra_premium_sharedpost_limit){
		count_adverra_premium_sharedpost = count_adverra_premium_sharedpost;
		
	}
	else{
		
		count_adverra_premium_sharedpost = adverra_premium_sharedpost_limit;
		
	}
	

	adverra_premium_sharedpost_type =   localStorage.getItem('adverra_premium_sharedpost_type');
	adverra_premium_sharedpost_params =  localStorage.getItem('adverra_premium_sharedpost_params')
	 msg_shared = spintax($("#adverra_premium_sharedpost_text").val());
	 link_shared = spintax($("#adverra_premium_sharedpost_url").val());
	 
	 
	 
	 	if($("#adverra_premium_sharedpost_checktime").is(":checked")){
	var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	msg_shared = msg_shared+"\n"+datetime
}
	
		if(check_have_url_fb(link_shared)){
params = adverra_premium_sharedpost_params+'attachment[type]='+adverra_premium_sharedpost_type+'&attachment[reshare_original_post]=true&composer_entry_time=87&composer_session_id=f91b4244-d0d0-469d-9c94-1a78592a8c3f&composer_session_duration=9&composer_source_surface=group&hide_object_attachment=false&num_keystrokes=0&num_pastes=0&privacyx&ref=group&xc_sticker_id=0&target_type=group&xhpc_message='+msg_shared+'&xhpc_message_text='+msg_shared+'&xc_share_params='+adverra_premium_sharedpost_params+'&xc_share_target_type=18&is_react=true&xhpc_composerid=rc.u_0_2c&xhpc_targetid='+target_id+'&xhpc_context=profile&xhpc_timeline=false&xhpc_finch=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&__user='+user_id+'&__a=1&__dyn=7AgNe-4amaxx2u6aZGeFxqeCwDKEyGgS8zCC-C267Uqzob4q2i5U4e1FDyUJu9xK5WAwDKaxeUW3Wta3iaVVoboGq4e9Dxh1rz8-cxu5od8a8CidwBx62q3PxqrXgiABxG7WAxC5oixO19DBxu3Cq68y2i6rGUpxy5Urx13QWwgFoC9ghjKbyEky8-uazodotK8UK8GEhAx28yoW789efydk6eaCyo8fguy9m&__req=16&__be=1&__pc=PHASED%3ADEFAULT&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';
url = "https://www.facebook.com/ajax/updatestatus.php?av="+user_id+"&dpr=1.5";

		}
		else{
			
			
	 adverra_premium_sharedpost_img = localStorage.getItem('adverra_premium_sharedpost_img');
	  

	 adverra_premium_sharedpost_title =  localStorage.getItem('adverra_premium_sharedpost_title');
	  

	 adverra_premium_sharedpost_summary =  localStorage.getItem('adverra_premium_sharedpost_summary');
	  
	  

	adverra_premium_sharedpost_global_share_id =  localStorage.getItem('adverra_premium_sharedpost_global_share_id');
			
			 params = "fb_dtsg=" + fb_dtsg;
			params += "&xhpc_context="+msg_shared;
			params += "&xhpc_ismeta=1";
			params += "&xhpc_timeline=";
			params += "&xhpc_composerid=u_0_r";
			params += "&xhpc_targetid=" + target_id;
			params += "&xhpc_publish_type=1";
			params += "&xhpc_message_text="+msg_shared;
			params += "&xhpc_message="+msg_shared;
			params += "&aktion=post";
			params += "&app_id=2309869772";
			params += "&attachment[params][urlInfo][canonical]=" + link_shared;
			params += "&attachment[params][urlInfo][final]=" + link_shared;
			params += "&attachment[params][urlInfo][user]=" + link_shared;
			params += "&attachment[params][responseCode]=200";
			params += "&attachment[params][title]=" + adverra_premium_sharedpost_title;
			params += "&attachment[params][summary]=" + adverra_premium_sharedpost_summary;
			params += "&attachment[params][content_removed]=false";
			params += "&attachment[params][images][0]=" + adverra_premium_sharedpost_img;
			params += "&attachment[params][ranked_images][ranking_model_version]=10";
			params += "&attachment[params][video_info][duration]=0";
			params += "&attachment[params][medium]=106";
			params += "&attachment[params][url]=" + link_shared;
			params += "&attachment[params][cache_hit]=1";
			params += "&attachment[params][global_share_id]="+adverra_premium_sharedpost_global_share_id;
			params += "&attachment[params][was_recent]=";
			params += "&attachment[params][metaTagMap][0][http-equiv]=content-type";
			params += "&attachment[params][metaTagMap][0][content]=text%2Fhtml%3B%20charset%3Dutf-8";
			params += "&attachment[params][metaTagMap][1][itemprop]=image";
			params += "&attachment[params][og_info][guesses][0][0]=og%3Aurl";
			params += "&attachment[params][og_info][guesses][0][1]=" + link_shared;
			params += "&attachment[params][og_info][guesses][1][0]=og%3Atitle";
			params += "&attachment[params][og_info][guesses][1][1]=Google";
			params += "&attachment[params][og_info][guesses][2][0]=og%3Aimage";
			params += "&attachment[params][og_info][guesses][3][0]=og%3Alocale";
			params += "&attachment[params][og_info][guesses][3][1]=tr";
			params += "&attachment[params][ttl]=604800";
			params += "&attachment[params][error]=1";
			params += "&attachment[type]=100";
			params += "&composer_metrics[image_selected]=0";
			params += "&is_explicit_place=";
			params += "&composertags_place=";
			params += "&composertags_place_name=";
			params += "&action_type_id[0]=";
			params += "&object_str[0]=";
			params += "&object_id[0]=";
			params += "&hide_object_attachment=0";
			params += "&og_suggestion_mechanism=";
			params += "&og_suggestion_logging_data=";
			params += "&icon_id=";
			params += "&composertags_city=";
			params += "&disable_location_sharing=false";
			params += "&composer_predicted_city=";
			params += "&nctr[_mod]=pagelet_composer";
			params += "&__user=" + user_id;
			params += "&__a=1";
			params += "&__req=y";
			params += "&__rev="+__rev;
			
			url = "https://www.facebook.com/composerx/intercept/status/?xhpc_message="+msg_shared+"&xhpc_composerid=rc.u_0_1m&xhpc_targetid="+target_id+"&av="+user_id+"&dpr=1";;
			
			
			
		}

if(loop<(count_adverra_premium_sharedpost)){
 $.ajax({
		url: url,
        type: "post",
        data:params,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText,'adverra_premium_sharedpost');
		  if(texteror == '' && data1.responseText.match(/post_id=\d+/g)){
			      id_post = data1.responseText.match(/post_id=\d+/g);
				  id_post = id_post[0].replace('post_id=', '');
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_sharedpost_report','green',title+'สำเร็จ',id_post,loop+'.'+target_id+'_'+id_post);
                   count_adverra_premium_sharedpost_success++;
				     $('.adverra_premium_sharedpost_success').text(count_adverra_premium_sharedpost_success+'/'+count_adverra_premium_sharedpost);
		  }
		  else{
			  if(texteror != ''){
			       $('.adverra_premium_sharedpost_success').text();
				   iziToast.error({title:texteror,position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
				   report_appendno_pic('#adverra_premium_sharedpost_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_sharedpost_error++;
					$('.adverra_premium_sharedpost_error').text(count_adverra_premium_sharedpost_error+'/'+count_adverra_premium_sharedpost);
			  }else{
				  
	
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_sharedpost_report','green',title+'สำเร็จ แต่อาจรอแอดมินกลุ่มอนุมัติ','groups/'+target_id+'/pending',loop+'.'+target_id+'_');
                   count_adverra_premium_sharedpost_success++;
				     $('.adverra_premium_sharedpost_success').text(count_adverra_premium_sharedpost_success+'/'+count_adverra_premium_sharedpost);
				  
				  
				  
			  }
			  }
		

   $('.adverra_premium_sharedpost_time').show();
   progress_adverra_premium_sharedpost = (100/count_adverra_premium_sharedpost)*loop;
   $('#adverra_premium_sharedpost_progress').attr('data-perc',Math.round(progress_adverra_premium_sharedpost));
   if(progress_adverra_premium_sharedpost > 0 && progress_adverra_premium_sharedpost < 30){
       $('.adverra_premium_sharedpost_bar').addClass('color3');
	   $('.adverra_premium_sharedpost_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_sharedpost>30 && progress_adverra_premium_sharedpost < 80){
		  $('.adverra_premium_sharedpost_bar').removeClass('color3');
	      $('.adverra_premium_sharedpost_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_sharedpost >= 80){
	    $('.adverra_premium_sharedpost_bar').removeClass('color4');
		$('.adverra_premium_sharedpost_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_sharedpost_loop',loop);
		
		/*
	  if(check_have_url(adverra_premium_sharedpost_text)){
		   if((count_adverra_premium_sharedpost_success%120) == 0){
		  adverra_premium_sharedpost_delay = getRandomInt(300,900);
		   }
	  }
	  */
countdown_x_min((adverra_premium_sharedpost_delay),title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_sharedpost',count_adverra_premium_sharedpost);



if(loop>=(count_adverra_premium_sharedpost) ){
	setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_sharedpost+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_sharedpost_success" style="font-size:20px;"> '+count_adverra_premium_sharedpost_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_sharedpost_error" style="font-size:20px;"> '+count_adverra_premium_sharedpost_error+' </span> </button>',

})
	  $('.adverra_premium_sharedpost_time').hide();
	
return false;
}, (2000)); 
}
adverra_premium_sharedpost_time_out = setTimeout(function(){send_adverra_premium_sharedpost(loop)}, (1000*adverra_premium_sharedpost_delay)); 
		
		
		
		
           
      },


    });
}
else{}

	}
	}
}















function adverra_premium_sharedpost_next(){

	localStorage.setItem('adverra_premium_sharedpost_stop','0');
	 var data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "แชร์โพสลงกลุ่มต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
  
adverra_premium_sharedpost_idpage =  $('#adverra_premium_sharedpost_idpage').val();  
adverra_premium_sharedpost_text =  $('#adverra_premium_sharedpost_text').val();  
adverra_premium_sharedpost_data  = 	$('#adverra_premium_sharedpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_sharedpost_delay  = $('#adverra_premium_sharedpost_delay').val();	



 
	  if(adverra_premium_sharedpost_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการส่ง',
})
		     $('#adverra_premium_sharedpost_text').focus();
		  return false;
}



	  if(adverra_premium_sharedpost_idpage == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกแฟนเพจที่ต้องการส่งข้อความ',
})
		     $('#adverra_premium_sharedpost_idpage').focus();
		  return false;
}




	  if(adverra_premium_sharedpost_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account  ที่ต้องการส่งหา อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_sharedpost_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_sharedpost_delay == '') || (adverra_premium_sharedpost_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_sharedpost_delay').focus();
		   return false; 
	  }
	  
	  
	  

	  
	  
	 //$('#adverra_premium_sharedpost_report').html('');
	 //count_adverra_premium_sharedpost_error = 0;
	// count_adverra_premium_sharedpost_success = 0;
	
	 send_adverra_premium_sharedpost(localStorage.getItem('adverra_premium_sharedpost_loop'));
	 
	  
	  }
})
	
	 
	
	
}


