function adverra_premium_sendfriend(){
	localStorage.setItem('photo','');
	localStorage.setItem('adverra_premium_sendfriend_stop','0');
	 var data  = 	$('#adverra_premium_sendfriend_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการส่งข้อความหาเพื่อน",
  type: 'warning',
  footer: footer_swal(),
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
adverra_premium_sendfriend_idpage =  $('#adverra_premium_sendfriend_idpage').val();  
adverra_premium_sendfriend_text =  $('#adverra_premium_sendfriend_text').val();  
adverra_premium_sendfriend_data  = 	$('#adverra_premium_sendfriend_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_sendfriend_delay  = $('#adverra_premium_sendfriend_delay').val();	



 
	  if(adverra_premium_sendfriend_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการส่ง',
})
		     $('#adverra_premium_sendfriend_text').focus();
		  return false;
}



	  if(adverra_premium_sendfriend_idpage == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกแฟนเพจที่ต้องการส่งข้อความ',
})
		     $('#adverra_premium_sendfriend_idpage').focus();
		  return false;
}




	  if(adverra_premium_sendfriend_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account  ที่ต้องการส่งหา อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_sendfriend_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_sendfriend_delay == '') || (adverra_premium_sendfriend_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_sendfriend_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
	  
	  
	  
	  if(check_have_url(adverra_premium_sendfriend_text)){
		Swal.fire({
  title: 'แจ้งเตือน',
  html: "เนื่องจากระบบพบว่า คุณมีลิ้งในข้อความ เพื่อป้องกันการ<br>โดนบล็อคลิ้ง จาการส่งเร็วเกินไป ระบบจะปรับให้ทุกๆ 45 รายการ<br>จะรอ 15-30 นาที <br>หรือถ้าคุณต้องการให้ส่งเร็วกว่านั้น เราแนะนำ ให้กดปุ่ม Cancel แล้วนำลิ้งออกก่อน ค่อยเริ่มส่ง <br>หรือถ้าคุณยอมรับ ข้อตกลง กดปุ่ม Yes ระบบจะเริ่มทำงาน",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	   $('#adverra_premium_sendfriend_report').html('');
	 count_adverra_premium_sendfriend_error = 0;
	 count_adverra_premium_sendfriend_success = 0;
	 send_adverra_premium_sendfriend(0);
	  
	  
	  }
})
		  
		  
	  }
else{
	  
	 $('#adverra_premium_sendfriend_report').html('');
	 count_adverra_premium_sendfriend_error = 0;
	 count_adverra_premium_sendfriend_success = 0;
	 send_adverra_premium_sendfriend(0);
	
	
}
	
	 
	  
	  }
})
	

}



function send_adverra_premium_sendfriend(loop){


if(!check_internet()){
	adverra_premium_sendfriend_time_out = setTimeout(function(){send_adverra_premium_sendfriend(loop)}, (1000*5));
	return false;
}




if(typeof adverra_premium_sendfriend_time_out != 'undefined' ){
		clearTimeout(adverra_premium_sendfriend_time_out);
}
  adverra_premium_sendfriend_data  = 	$('#adverra_premium_sendfriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_sendfriend_text  = $('#adverra_premium_sendfriend_text').val();
  adverra_premium_sendfriend_idpage  =    user_id;

  
  adverra_premium_sendfriend_delay  = $('#adverra_premium_sendfriend_delay').val();	
  //adverra_premium_sendfriend_delay  =  getRandomInt(adverra_premium_sendfriend_delay_min, adverra_premium_sendfriend_delay_max);
  target_id = adverra_premium_sendfriend_data[loop];
  title = 'ส่งข้อความหาเพื่อน';
  count_adverra_premium_sendfriend = adverra_premium_sendfriend_data.length;
  
	if(localStorage.getItem('adverra_premium_sendfriend_stop') == 1){
	clearTimeout(adverra_premium_sendfriend_time_out);
	}
	else{
		
		localStorage.setItem('photo','');
		if($('#adverra_premium_sendfriend_img').get(0).files.length > 0){
		 adverra_premium_sendfriend_upload_file_fb(adverra_premium_sendfriend_idpage,'adverra_premium_sendfriend_img',0,'send_adverra_premium_sendfriend');
		}
	else{
		send_adverra_premium_sendfriend_next();
		
	}
	
	

	
	
	function adverra_premium_sendfriend_upload_file_fb(id_page,img,adverra_premium_sendfriend_photo_loop) {
	if(adverra_premium_sendfriend_photo_loop < $('#'+img).get(0).files.length){	
var formData = new FormData();
formData.append('upload_1024', $('#'+img)[0].files[adverra_premium_sendfriend_photo_loop]);
	
	 $.ajax({
		url : 'https://upload.facebook.com/ajax/mercury/upload.php?request_user_id='+id_page+'&__user='+user_id+'&__a=1&__req=3d&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3Aidl0z4%3A9y9r1n&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk',
        type: "post",
		  data : formData,
       processData: false, 
	      contentType: false,  
       dataType: 'json',
   
		  complete: function(results){
			  var responce = results.responseText.replace("for (;;);", "");
    parsed_request = JSON.parse(responce);
	photo_id = parsed_request.payload.metadata[0].fbid;
			  photo_upload = localStorage.getItem('photo');
            localStorage.setItem('photo',photo_upload+','+photo_id);
			  iziToast.info({title:'อัพรูป',position: 'topRight',timeout: 1000,message: 'ที่ '+(adverra_premium_sendfriend_photo_loop+1),});
			adverra_premium_sendfriend_upload_file_fb(id_page,img,(adverra_premium_sendfriend_photo_loop+1));
			  },
     

    });
	
	}
	else{
	
        send_adverra_premium_sendfriend_next();
		
	}
}


	
	
	
	function  send_adverra_premium_sendfriend_next(){
		
			
		adverra_premium_sendfriend_photo_all =  localStorage.getItem('photo').replace(/^,/, '');
		adverra_premium_sendfriend_photo_all = adverra_premium_sendfriend_photo_all.split(',');
		adverra_premium_sendfriend_photo_all_img_okx = '';
		  $.each(adverra_premium_sendfriend_photo_all, function(i,adverra_premium_sendfriend_photo_all_id) {
	             adverra_premium_sendfriend_photo_all_img_okx =    adverra_premium_sendfriend_photo_all_img_okx+'&image_ids['+i+']='+adverra_premium_sendfriend_photo_all_id;
		});
	
	 adverra_premium_sendfriend_text = encodeURIComponent(spintax(adverra_premium_sendfriend_text));
     adverra_premium_sendfriend_number = Math.floor(Math.random() * 100000000000000) + 1;

	if(adverra_premium_sendfriend_photo_all != ''){
		adverra_premium_sendfriend_photo_all_img_status = 'true';
	}
	else{
		adverra_premium_sendfriend_photo_all_img_status = 'false';
		adverra_premium_sendfriend_photo_all_img_okx = '';
		
	}
	
	
	
		
		
		
		
		
		
		
		
parms = 'client=mercury&action_type=ma-type%3Auser-generated-message&body='+(adverra_premium_sendfriend_text)+'&ephemeral_ttl_mode=0&has_attachment='+adverra_premium_sendfriend_photo_all_img_status+adverra_premium_sendfriend_photo_all_img_okx+'&message_id='+adverra_premium_sendfriend_number+'&offline_threading_id='+adverra_premium_sendfriend_number+'&other_user_fbid='+target_id+'&source=source%3Apage_unified_inbox&specific_to_list[0]=fbid%3A'+target_id+'&specific_to_list[1]=fbid%3A'+adverra_premium_sendfriend_idpage+'&timestamp=1564061116109&request_user_id='+adverra_premium_sendfriend_idpage+'&__user='+user_id+'&__a=1&__req=1n&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3A38ai1u%3Amxgv29&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<(count_adverra_premium_sendfriend)){
 $.ajax({
		url: "https://www.facebook.com/messaging/send/",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText,'adverra_premium_sendfriend');
		  if(texteror == '' && give_success_description(data1.responseText,'adverra_premium_sendfriend') != ''){
			      
			       iziToast.success({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title: title+' คนนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
                   report_append('#adverra_premium_sendfriend_report','green',title+'สำเร็จ','messages/t/'+target_id,loop+'.'+target_id);
                   count_adverra_premium_sendfriend_success++;
				     $('.adverra_premium_sendfriend_success').text(count_adverra_premium_sendfriend_success+'/'+count_adverra_premium_sendfriend);
		  }
		  else{
			       $('.adverra_premium_sendfriend_success').text();
				   iziToast.error({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title:texteror,position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
				   report_append('#adverra_premium_sendfriend_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_sendfriend_error++;
					$('.adverra_premium_sendfriend_error').text(count_adverra_premium_sendfriend_error+'/'+count_adverra_premium_sendfriend);
			  }
		

   $('.adverra_premium_sendfriend_time').show();
   progress_adverra_premium_sendfriend = (100/count_adverra_premium_sendfriend)*loop;
   $('#adverra_premium_sendfriend_progress').attr('data-perc',Math.round(progress_adverra_premium_sendfriend));
   if(progress_adverra_premium_sendfriend > 0 && progress_adverra_premium_sendfriend < 30){
       $('.adverra_premium_sendfriend_bar').addClass('color3');
	   $('.adverra_premium_sendfriend_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_sendfriend>30 && progress_adverra_premium_sendfriend < 80){
		  $('.adverra_premium_sendfriend_bar').removeClass('color3');
	      $('.adverra_premium_sendfriend_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_sendfriend >= 80){
	    $('.adverra_premium_sendfriend_bar').removeClass('color4');
		$('.adverra_premium_sendfriend_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_sendfriend_loop',loop);
		
		
	  if(check_have_url(adverra_premium_sendfriend_text)){
		   if(((count_adverra_premium_sendfriend_success+1)%45) == 0){
		  adverra_premium_sendfriend_delay = getRandomInt(300,900);
		   }
	  }
	  else{
		  
		   if(((count_adverra_premium_sendfriend_success+1)%45) == 0){
		  adverra_premium_sendfriend_delay = getRandomInt(900,1800);
		   }
		  
		  
	  }
countdown_x_min((adverra_premium_sendfriend_delay),title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_sendfriend',count_adverra_premium_sendfriend);



if(loop>=(count_adverra_premium_sendfriend)){
	setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_sendfriend+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_sendfriend_success" style="font-size:20px;"> '+count_adverra_premium_sendfriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_sendfriend_error" style="font-size:20px;"> '+count_adverra_premium_sendfriend_error+' </span> </button>',

})
	  $('.adverra_premium_sendfriend_time').hide();
	
return false;
}, (5000)); 
}
adverra_premium_sendfriend_time_out = setTimeout(function(){send_adverra_premium_sendfriend(loop)}, (1000*adverra_premium_sendfriend_delay)); 
		
		
		
		
           
      },


    });
}
else{}

	}
	}
}















function adverra_premium_sendfriend_next(){

	localStorage.setItem('adverra_premium_sendfriend_stop','0');
	 var data  = 	$('#adverra_premium_sendfriend_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ส่งข้อความหาเพื่อนต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
  
adverra_premium_sendfriend_idpage =  $('#adverra_premium_sendfriend_idpage').val();  
adverra_premium_sendfriend_text =  $('#adverra_premium_sendfriend_text').val();  
adverra_premium_sendfriend_data  = 	$('#adverra_premium_sendfriend_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_sendfriend_delay  = $('#adverra_premium_sendfriend_delay').val();	



 
	  if(adverra_premium_sendfriend_text == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุข้อความ ที่ต้องการส่ง',
})
		     $('#adverra_premium_sendfriend_text').focus();
		  return false;
}



	  if(adverra_premium_sendfriend_idpage == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกแฟนเพจที่ต้องการส่งข้อความ',
})
		     $('#adverra_premium_sendfriend_idpage').focus();
		  return false;
}




	  if(adverra_premium_sendfriend_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account  ที่ต้องการส่งหา อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_sendfriend_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_sendfriend_delay == '') || (adverra_premium_sendfriend_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_sendfriend_delay').focus();
		   return false; 
	  }
	  
	  
	  

	  
	  
	 //$('#adverra_premium_sendfriend_report').html('');
	 //count_adverra_premium_sendfriend_error = 0;
	// count_adverra_premium_sendfriend_success = 0;
	
	 send_adverra_premium_sendfriend(localStorage.getItem('adverra_premium_sendfriend_loop'));
	 
	  
	  }
})
	
	 
	
	
}


