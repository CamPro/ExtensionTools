function adverra_premium_broadcastbylabel(){
	localStorage.setItem('photo','');
	localStorage.setItem('adverra_premium_broadcastbylabel_stop','0');

	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการส่งข้อความหาลูกค้าในแฟนเพจ?",
  type: 'warning',
  footer: footer_swal(),
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
adverra_premium_broadcastbylabel_idpage =  $('#adverra_premium_broadcastbylabel_idpage').val();  
adverra_premium_broadcastbylabel_text =  $('#adverra_premium_broadcastbylabel_text').val();  

adverra_premium_broadcastbylabel_delay  = $('#adverra_premium_broadcastbylabel_delay').val();	



 
	  if(adverra_premium_broadcastbylabel_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการส่ง',
})
		     $('#adverra_premium_broadcastbylabel_text').focus();
		  return false;
}



	  if(adverra_premium_broadcastbylabel_idpage == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกแฟนเพจที่ต้องการส่งข้อความ',
})
		     $('#adverra_premium_broadcastbylabel_idpage').focus();
		  return false;
}



	if($('#adverra_premium_broadcastbylabel_type').val() == 2){
adverra_premium_broadcastbylabel_label = $('#adverra_premium_broadcastbylabel_label').val();
	  if(adverra_premium_broadcastbylabel_label == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'เลือกป้ายที่ต้องการส่ง',
})
		     $('#adverra_premium_broadcastbylabel_label').focus();
		  return false;
}

	}
  
	  
	  
	  
	 	if($('#adverra_premium_broadcastbylabel_type').val() == 1){
adverra_premium_broadcastbylabel_folder = $('#adverra_premium_broadcastbylabel_folder').val();
	  if(adverra_premium_broadcastbylabel_folder == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'เลือกโฟลเดอร์ที่ต้องการส่ง',
})
		     $('#adverra_premium_broadcastbylabel_label').focus();
		  return false;
}

	}
  
	  
	  
	  
	  
	  
if((adverra_premium_broadcastbylabel_delay == '') || (adverra_premium_broadcastbylabel_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_broadcastbylabel_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
	  
	  adverra_premium_broadcastbylabel_startnumber = ($('#adverra_premium_broadcastbylabel_startnumber').val()-1)
	  
	  if(check_have_url(adverra_premium_broadcastbylabel_text)){
		Swal.fire({
  title: 'แจ้งเตือน',
  html: "เนื่องจากระบบพบว่า คุณมีลิ้งในข้อความ เพื่อป้องกันการ<br>โดนบล็อคลิ้ง จาการส่งเร็วเกินไป ระบบจะปรับให้ทุกๆ 100 รายการ<br>จะรอ 5-15 นาที  และทุกๆการส่งสำเร็จ 1000 คน ระยบบจะพักอีก 10-20 นาที <br>หรือถ้าคุณต้องการให้ส่งเร็วกว่านั้น เราแนะนำ ให้กดปุ่ม Cancel แล้วนำลิ้งออกก่อน ค่อยเริ่มส่ง <br>หรือถ้าคุณยอมรับ ข้อตกลง กดปุ่ม Yes ระบบจะเริ่มทำงาน",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	   $('#adverra_premium_broadcastbylabel_report').html('');
	 count_adverra_premium_broadcastbylabel_error = 0;
	 count_adverra_premium_broadcastbylabel_success = 0;
	 send_adverra_premium_broadcastbylabel1(adverra_premium_broadcastbylabel_startnumber);
	  }
})
		  
		  
	  }
else{
	  
	 $('#adverra_premium_broadcastbylabel_report').html('');
	 count_adverra_premium_broadcastbylabel_error = 0;
	 count_adverra_premium_broadcastbylabel_success = 0;
	 send_adverra_premium_broadcastbylabel1(adverra_premium_broadcastbylabel_startnumber);
	
	
}
	
	 
	  
	  }
})
	

}




function  send_adverra_premium_broadcastbylabel1(){
	    label_user_all = [];

		count_adverra_premium_broadcastbylabel_success = 0;
	
	adverra_premium_broadcastbylabel_idpage_token =  $('#adverra_premium_broadcastbylabel_idpage').val().split('|')[1];  
	if($('#adverra_premium_broadcastbylabel_type').val() == 1){
		 adverra_premium_broadcastbylabel_label = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[0];  
	 	 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[1]; 
		 url = 'https://graph.facebook.com/v2.6/me/conversations?fields=senders,unread_count&'+adverra_premium_broadcastbylabel_label+'&limit=300&access_token='+adverra_premium_broadcastbylabel_idpage_token;
	}
	else
	if($('#adverra_premium_broadcastbylabel_type').val() == 2){
		 adverra_premium_broadcastbylabel_label = $('#adverra_premium_broadcastbylabel_label').val().split('|')[0];  
	 	 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_label').val().split('|')[1];  
		  url = 'https://graph.facebook.com/v2.6/'+adverra_premium_broadcastbylabel_label+'/users?fields=id,name&limit=200&access_token='+adverra_premium_broadcastbylabel_idpage_token;
	}
	
	 
			get_label_user(url);
function  get_label_user(url){

	if($('#adverra_premium_broadcastbylabel_type').val() == 1){
		 adverra_premium_broadcastbylabel_label = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[0];  
	 	 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[1]; 
		
	}
	else
	if($('#adverra_premium_broadcastbylabel_type').val() == 2){
		 adverra_premium_broadcastbylabel_label = $('#adverra_premium_broadcastbylabel_label').val().split('|')[0];  
	 	 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_label').val().split('|')[1];  
		
	}
	


	title = 'กำลังรวบรวมคนจาก'+adverra_premium_broadcastbylabel_name+' '+label_user_all.length+ ' คน';

	
	$.getJSON(url, function(results) {
					if(!check_internet()){
	adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*5));
	return false;
}
   var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
						
					if($('#adverra_premium_broadcastbylabel_type').val() == 1){		  
					if(typeof data.senders.data[0].id != 'undefined'){
							if(typeof data.senders.data[0].name != 'undefined'){
									if( data.senders.data[0].name != ''){
											
												
												
												if(data.unread_count == 0){
			                                label_user_all.push({'id': data.senders.data[0].id, 'name': data.senders.data[0].name});
												}
											
									}
							}
					}
					}
					else
					if($('#adverra_premium_broadcastbylabel_type').val() == 2){
					  label_user_all.push({'id': data.id, 'name': data.name});	
					}
    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลังดึง'+title+'รอสักครู่',
});
			get_label_user(paging.next)
		
		
		}	
		else{
			
				message = 'รวบรวมคนที่จะส่ง '+label_user_all.length+' คน';
			  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message: '',
});
			
			
			
		
			ldb.set('label_user_all'+adverra_premium_broadcastbylabel_label,JSON.stringify(label_user_all));
				  adverra_premium_broadcastbylabel_startnumber = ($('#adverra_premium_broadcastbylabel_startnumber').val()-1)
				send_adverra_premium_broadcastbylabel(adverra_premium_broadcastbylabel_startnumber);
			
		}
	}
	else{
			message = 'รวบรวมคนที่จะส่ง '+label_user_all.length+' คน';
				  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message:  '',
});

	ldb.set('label_user_all'+adverra_premium_broadcastbylabel_label,JSON.stringify(label_user_all));
	  adverra_premium_broadcastbylabel_startnumber = ($('#adverra_premium_broadcastbylabel_startnumber').val()-1)
send_adverra_premium_broadcastbylabel(adverra_premium_broadcastbylabel_startnumber);
		 
		
		
	}
});
	
	

}


	
	
	
}








function send_adverra_premium_broadcastbylabel(loop){

	if($('#adverra_premium_broadcastbylabel_type').val() == 1){
		    	 adverra_premium_broadcastbylabel_id = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[0];  
	 	 		 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_folder').val().split('|')[1]; 
		 
	}
	else
	if($('#adverra_premium_broadcastbylabel_type').val() == 2){
		 	 adverra_premium_broadcastbylabel_id = $('#adverra_premium_broadcastbylabel_label').val().split('|')[0];  
			 adverra_premium_broadcastbylabel_name = $('#adverra_premium_broadcastbylabel_label').val().split('|')[1]; 
	}
			 $("#adverra_premium_broadcastbylabel_title").text('ตามป้าย'+adverra_premium_broadcastbylabel_name);
	
ldb.get('label_user_all'+adverra_premium_broadcastbylabel_id, function (label_user_all) {
 label_user_all = JSON.parse(label_user_all);
if(!check_internet()){
	adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*5));
	return false;
}




if(typeof adverra_premium_broadcastbylabel_time_out != 'undefined' ){
		clearTimeout(adverra_premium_broadcastbylabel_time_out);
}

  adverra_premium_broadcastbylabel_data  = 	label_user_all;
										
  adverra_premium_broadcastbylabel_text  = $('#adverra_premium_broadcastbylabel_text').val();
  adverra_premium_broadcastbylabel_idpage  =    $('#adverra_premium_broadcastbylabel_idpage').val().split('|')[0];

  
  adverra_premium_broadcastbylabel_delay  = $('#adverra_premium_broadcastbylabel_delay').val();	
  //adverra_premium_broadcastbylabel_delay  =  getRandomInt(adverra_premium_broadcastbylabel_delay_min, adverra_premium_broadcastbylabel_delay_max);
  
  target_id = adverra_premium_broadcastbylabel_data[loop].id;
  target_id2 = adverra_premium_broadcastbylabel_data[loop].id;
   target_name = adverra_premium_broadcastbylabel_data[loop].name;
  title = 'ส่งข้อความหาลูกค้าในแฟนเพจ';
  count_adverra_premium_broadcastbylabel = adverra_premium_broadcastbylabel_data.length;
  
	if(localStorage.getItem('adverra_premium_broadcastbylabel_stop') == 1){
	clearTimeout(adverra_premium_broadcastbylabel_time_out);
	}
	else{
		
		localStorage.setItem('photo','');
		if($('#adverra_premium_broadcastbylabel_img').get(0).files.length > 0){
		 adverra_premium_broadcastbylabel_upload_file_fb(adverra_premium_broadcastbylabel_idpage,'adverra_premium_broadcastbylabel_img',0,'send_adverra_premium_broadcastbylabel');
		}
	else{
		send_adverra_premium_broadcastbylabel_next();
		
	}
	
	

	

	function adverra_premium_broadcastbylabel_upload_file_fb(id_page,img,adverra_premium_broadcastbylabel_photo_loop) {
		
		if(!check_internet()){
	adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*5));
	return false;
}

	if(adverra_premium_broadcastbylabel_photo_loop < $('#'+img).get(0).files.length){	
var formData = new FormData();
formData.append('upload_1024', $('#'+img)[0].files[adverra_premium_broadcastbylabel_photo_loop]);
	
	 $.ajax({
		url : 'https://upload.facebook.com/ajax/mercury/upload.php?request_user_id='+id_page+'&__user='+user_id+'&__a=1&__req=3d&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3Aidl0z4%3A9y9r1n&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk',
        type: "post",
		  data : formData,
       processData: false, 
	      contentType: false,  
       dataType: 'json',
   
		  complete: function(results){
			  		if(!check_internet()){
	adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*5));
	return false;
}
else{
	

				  var responce = results.responseText.replace("for (;;);", "");
    parsed_request = JSON.parse(responce);
	if(typeof parsed_request.payload.metadata[0].file_id != 'undefined'){
	file_id = parsed_request.payload.metadata[0].file_id;
	 photo_upload = localStorage.getItem('photo');
	   localStorage.setItem('photo',photo_upload+'&file_ids['+adverra_premium_broadcastbylabel_photo_loop+']='+file_id);
	   	  iziToast.info({title:'อัพไฟล์',position: 'topRight',timeout: 1000,message: 'ที่ '+(adverra_premium_broadcastbylabel_photo_loop+1),});
	}
	else
	if(typeof parsed_request.payload.metadata[0].fbid != 'undefined'){
	photo_id = parsed_request.payload.metadata[0].fbid;
	
	  photo_upload = localStorage.getItem('photo');
      localStorage.setItem('photo',photo_upload+'&image_ids['+adverra_premium_broadcastbylabel_photo_loop+']='+photo_id);
		  iziToast.info({title:'อัพรูป',position: 'topRight',timeout: 1000,message: 'ที่ '+(adverra_premium_broadcastbylabel_photo_loop+1),});
	
	
	}
	else
	if(typeof parsed_request.payload.metadata[0].video_id != 'undefined'){
	photo_id = parsed_request.payload.metadata[0].video_id;
	
	  photo_upload = localStorage.getItem('photo');
      localStorage.setItem('photo',photo_upload+'&video_ids['+adverra_premium_broadcastbylabel_photo_loop+']='+photo_id);
	
		  iziToast.info({title:'อัพโหลดวิดีโอ',position: 'topRight',timeout: 1000,message: 'ที่ '+(adverra_premium_broadcastbylabel_photo_loop+1),});
	
	}
			
		
			else
	if(typeof parsed_request.payload.metadata[0].audio_id != 'undefined'){
	photo_id = parsed_request.payload.metadata[0].audio_id;
	
	  photo_upload = localStorage.getItem('photo');
      localStorage.setItem('photo',photo_upload+'&audio_ids['+adverra_premium_broadcastbylabel_photo_loop+']='+photo_id);
	
	 iziToast.info({title:'อัพโหลดไฟล์เสียง',position: 'topRight',timeout: 1000,message: 'ที่ '+(adverra_premium_broadcastbylabel_photo_loop+1),});
	
	}
		
		
		
		
		
			  adverra_premium_broadcastbylabel_photo_loop++;
			adverra_premium_broadcastbylabel_upload_file_fb(id_page,img,(adverra_premium_broadcastbylabel_photo_loop));
	
	
	
}

			  },
     

    });
	
	}
	else{
	
        send_adverra_premium_broadcastbylabel_next();
		
	}
}


	
	
	
	function  send_adverra_premium_broadcastbylabel_next(){
		
			
		adverra_premium_broadcastbylabel_photo_all_img_okx =  localStorage.getItem('photo');
		//adverra_premium_broadcastbylabel_photo_all = adverra_premium_broadcastbylabel_photo_all.split(',');
		/*
		adverra_premium_broadcastbylabel_photo_all_img_okx = '';
		  $.each(adverra_premium_broadcastbylabel_photo_all, function(i,adverra_premium_broadcastbylabel_photo_all_id) {
	             adverra_premium_broadcastbylabel_photo_all_img_okx =    adverra_premium_broadcastbylabel_photo_all_img_okx+'&image_ids['+i+']='+adverra_premium_broadcastbylabel_photo_all_id;
		});
	*/
	 adverra_premium_broadcastbylabel_text = encodeURIComponent(spintax(adverra_premium_broadcastbylabel_text));
     adverra_premium_broadcastbylabel_number = Math.floor(Math.random() * 100000000000000) + 1;

	if(adverra_premium_broadcastbylabel_photo_all_img_okx != ''){
		adverra_premium_broadcastbylabel_photo_all_img_status = 'true';
	}
	else{
		adverra_premium_broadcastbylabel_photo_all_img_status = 'false';
		adverra_premium_broadcastbylabel_photo_all_img_okx = '';
		
	}
	
	
	
		
		
		
		
		
		

parms = 'client=mercury&action_type=ma-type%3Auser-generated-message&body='+(adverra_premium_broadcastbylabel_text)+'&ephemeral_ttl_mode=0&has_attachment='+adverra_premium_broadcastbylabel_photo_all_img_status+adverra_premium_broadcastbylabel_photo_all_img_okx+'&message_id='+adverra_premium_broadcastbylabel_number+'&offline_threading_id='+adverra_premium_broadcastbylabel_number+'&other_user_fbid='+target_id+'&source=source%3Apage_unified_inbox&specific_to_list[0]=fbid%3A'+target_id+'&specific_to_list[1]=fbid%3A'+adverra_premium_broadcastbylabel_idpage+'&timestamp=1564061116109&request_user_id='+adverra_premium_broadcastbylabel_idpage+'&__user='+user_id+'&__a=1&__req=1n&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3A38ai1u%3Amxgv29&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<(count_adverra_premium_broadcastbylabel)){
 $.ajax({
		//url: "",
		url: "https://www.facebook.com/messaging/send/",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText,'adverra_premium_broadcastbylabel');
		    adverra_premium_broadcastbylabel_idpage  =    $('#adverra_premium_broadcastbylabel_idpage').val().split('|')[0];
		  if(texteror == '' && give_success_description(data1.responseText,'adverra_premium_broadcastbylabel') != ''){
			      
			      // iziToast.success({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title: title+' '+target_name+' แล้ว',position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
                   report_append('#adverra_premium_broadcastbylabel_report','green',title+'สำเร็จ',adverra_premium_broadcastbylabel_idpage+'/inbox/'+target_id,loop+'.'+target_name,target_id);
                   count_adverra_premium_broadcastbylabel_success++;
				     $('.adverra_premium_broadcastbylabel_success').text(count_adverra_premium_broadcastbylabel_success+'/'+count_adverra_premium_broadcastbylabel);
					 
			
					  
			  }
		  else{
			       $('.adverra_premium_broadcastbylabel_success').text();
				  // iziToast.error({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title:texteror,position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
				   report_append('#adverra_premium_broadcastbylabel_report','red',texteror,adverra_premium_broadcastbylabel_idpage+'/inbox/'+target_id,loop+'.'+target_name,target_id);
                    count_adverra_premium_broadcastbylabel_error++;
					$('.adverra_premium_broadcastbylabel_error').text(count_adverra_premium_broadcastbylabel_error+'/'+count_adverra_premium_broadcastbylabel);
			  }
		
if($('#adverra_premium_broadcastbylabel_infolder').prop("checked") == true){
		  $.ajax({
		//url: "",
		url: "https://www.facebook.com/ajax/mercury/change_archived_status.php",
        type: "post",
        data:'ids['+target_id+']=true&source=PagesManagerMessagesInterface&request_user_id='+adverra_premium_broadcastbylabel_idpage+'&__user='+user_id+'&__a=1&__csr=&__req=53&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk',
		  complete: function(data1){
		  } });


}
   $('.adverra_premium_broadcastbylabel_time').show();
   progress_adverra_premium_broadcastbylabel = (100/count_adverra_premium_broadcastbylabel)*loop;
   $('#adverra_premium_broadcastbylabel_progress').attr('data-perc',Math.round(progress_adverra_premium_broadcastbylabel));
   if(progress_adverra_premium_broadcastbylabel > 0 && progress_adverra_premium_broadcastbylabel < 30){
       $('.adverra_premium_broadcastbylabel_bar').addClass('color3');
	   $('.adverra_premium_broadcastbylabel_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_broadcastbylabel>30 && progress_adverra_premium_broadcastbylabel < 80){
		  $('.adverra_premium_broadcastbylabel_bar').removeClass('color3');
	      $('.adverra_premium_broadcastbylabel_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_broadcastbylabel >= 80){
	    $('.adverra_premium_broadcastbylabel_bar').removeClass('color4');
		$('.adverra_premium_broadcastbylabel_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_broadcastbylabel_loop',loop);
		

	  if(check_have_url(adverra_premium_broadcastbylabel_text)){
if(((count_adverra_premium_broadcastbylabel_success)%1000) == 0){
		  adverra_premium_broadcastbylabel_delay = getRandomInt(600,1200);
		   }


		   if(((count_adverra_premium_broadcastbylabel_success)%100) == 0){
		  adverra_premium_broadcastbylabel_delay = getRandomInt(300,900);
		   }
		   
		    
	  }
	  
	  
	  
	  
countdown_x_min((adverra_premium_broadcastbylabel_delay),title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_broadcastbylabel',count_adverra_premium_broadcastbylabel);



if(loop>=(count_adverra_premium_broadcastbylabel)){
	setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_broadcastbylabel+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_broadcastbylabel_success" style="font-size:20px;"> '+count_adverra_premium_broadcastbylabel_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_broadcastbylabel_error" style="font-size:20px;"> '+count_adverra_premium_broadcastbylabel_error+' </span> </button>',

})
	  $('.adverra_premium_broadcastbylabel_time').hide();
	
return false;
}, (5000)); 
}


adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*adverra_premium_broadcastbylabel_delay)); 
		
		
		
		
           
      },


    });
}
else{}

	}
	}
											});
}















function adverra_premium_broadcastbylabel_next(){

	localStorage.setItem('adverra_premium_broadcastbylabel_stop','0');
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ส่งข้อความหาลูกค้าในแฟนเพจต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
  
adverra_premium_broadcastbylabel_idpage =  $('#adverra_premium_broadcastbylabel_idpage').val();  
adverra_premium_broadcastbylabel_text =  $('#adverra_premium_broadcastbylabel_text').val();  

adverra_premium_broadcastbylabel_delay  = $('#adverra_premium_broadcastbylabel_delay').val();	



 
	  if(adverra_premium_broadcastbylabel_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการส่ง',
})
		     $('#adverra_premium_broadcastbylabel_text').focus();
		  return false;
}



	  if(adverra_premium_broadcastbylabel_idpage == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกแฟนเพจที่ต้องการส่งข้อความ',
})
		     $('#adverra_premium_broadcastbylabel_idpage').focus();
		  return false;
}




	  if(adverra_premium_broadcastbylabel_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account  ที่ต้องการส่งหา อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_broadcastbylabel_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_broadcastbylabel_delay == '') || (adverra_premium_broadcastbylabel_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_broadcastbylabel_delay').focus();
		   return false; 
	  }
	  
	  
	  

	  
	  
	 //$('#adverra_premium_broadcastbylabel_report').html('');
	 //count_adverra_premium_broadcastbylabel_error = 0;
	// count_adverra_premium_broadcastbylabel_success = 0;
	
	 send_adverra_premium_broadcastbylabel(localStorage.getItem('adverra_premium_broadcastbylabel_loop'));
	 
	  
	  }
})
	
	 
	
	
}









function get_label_fanpage(page_id,page_token){
get_get_label_fanpage();
    get_label_fanpage_all = [];
function  get_get_label_fanpage(url = 'https://graph.facebook.com/v2.11/me/labels?fields=name,id&limit=100&access_token='+page_token){

	title = 'ข้อมูลป้าย ';

	
	$.getJSON(url, function(results) {
									if(!check_internet()){
	adverra_premium_broadcastbylabel_time_out = setTimeout(function(){send_adverra_premium_broadcastbylabel(loop)}, (1000*5));
	return false;
}
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
			get_label_fanpage_all.push({'id': data.id, 'name': data.name});
    });
	
	if(typeof paging != 'undefined'){
		
	
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: title,
  position: 'topRight',
  timeout: 1000,
    message: 'กำลังดึง'+title+'รอสักครู่',
});
			get_get_label_fanpage(paging.next)
		
		
		}	
		else{
			
				message = 'ดึงข้อมูลป้าย '+get_label_fanpage_all.length+' ป้าย';
			  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message: '',
});
			
			
			     
		
			localStorage.setItem('get_label_fanpage_all_'+page_id,JSON.stringify(get_label_fanpage_all));
				append_get_get_label_fanpage(page_id);
		
			
		}
	}
	else{
			message = 'ดึงข้อมูลป้าย '+get_label_fanpage_all.length+' ป้าย';
				  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message:  '',
});
		
	localStorage.setItem('get_label_fanpage_all_'+page_id,JSON.stringify(get_label_fanpage_all));	
      //append_get_get_label_fanpage(page_id);
		 
		
		
	}
});
	
	

}


}


function append_get_get_label_fanpage(page_id){
	
			fanpage_allx = $.parseJSON(localStorage.getItem('get_label_fanpage_all_'+page_id));
			
			option = '';
  $.each(fanpage_allx, function(i,data) {
         name =  data.name;	
         id   =  data.id;	
         page_access_token =  data.page_access_token;	
                 option = '<option value="'+id+'|'+name+'"  >'+name+'</option>'+option;
	
	
	
	});

	 $(".get_label_fanpage").append('<option value=""   >เลือกป้าย</option>'+option);
	 $(".get_label_fanpage").formSelect();
}






$("#adverra_premium_broadcastbylabel_idpage").change(function(){
		/*												
       page_id = $(this).val().split('|')[0];
	   page_token = $(this).val().split('|')[1];
	  get_label_fanpage(page_id,page_token)
	  */
});








$("#adverra_premium_broadcastbylabel_type").change(function(){
	if($(this).val() == 1){
		$(".adverra_premium_broadcastbylabel_folder").show();
		$(".adverra_premium_broadcastbylabel_label").hide();
	}
	else 
	if($(this).val() == 2){
		$(".adverra_premium_broadcastbylabel_label").show();
		$(".adverra_premium_broadcastbylabel_folder").hide();
	
	}
});




