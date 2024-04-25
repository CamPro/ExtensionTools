function adverra_premium_commentpost(){
	localStorage.setItem('adverra_premium_commentpost_stop','0');
	 var data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการคอมเม้นหรือดันโพส?",
  type: 'warning',
  footer: footer_swal(),
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {

adverra_premium_commentpost_text =  $('#adverra_premium_commentpost_text').val();  
adverra_premium_commentpost_data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_commentpost_delay_min  = $('#adverra_premium_commentpost_delay_min').val();	
adverra_premium_commentpost_delay_max  = $('#adverra_premium_commentpost_delay_max').val();	
  adverra_premium_commentpost_delay  =  getRandomInt(adverra_premium_commentpost_delay_min, adverra_premium_commentpost_delay_max);

 adverra_premium_commentpost_code = $('#adverra_premium_commentpost_code').val();	
	  if(adverra_premium_commentpost_code == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ Code หาได้จาก apppost.net',
})
		     $('#adverra_premium_commentpost_code').focus();
		  return false;
}



 




	  if(adverra_premium_commentpost_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group  ที่ต้องการคอมเม้นเข้าไป อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_commentpost_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_commentpost_delay == '') || (adverra_premium_commentpost_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_commentpost_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
	  

	   $('#adverra_premium_commentpost_report').html('');
	
	 count_adverra_premium_commentpost_error = 0;
	 count_adverra_premium_commentpost_success = 0;
	 send_adverra_premium_commentpost(0,1,0);
	
 
	
	

	 
	  
	  }
})
	
}


function send_adverra_premium_commentpost(loop,count_post,rounds){

var token = localStorage.getItem('access_token');
	var post_code = $("#adverra_premium_commentpost_code").val();
	var post_idpost  = $("#adverra_premium_commentpost_data").val().trim().split(/\r\n|\r|\n/);
	var message = $("#post_code").val();
	var post_loop = $("#adverra_premium_commentpost_addloop").is(":checked");
	var time_round = $("#adverra_premium_commentpost_addloop_number").val();
  //  var id_post = post_idpost[loop].split("_").pop(-1);
  var id_post = post_idpost[loop];
	var count_post_idpost = post_idpost.length;
    var post_switching = document.querySelector('input[name=adverra_premium_commentpost_random]:checked').value;


 if(post_switching == 1){
		  counts = ((loop+rounds)%count_post);
	  }
	  else  if(post_switching == 2){
	      counts = (rounds)%count_post;  
	  }
	  else  if(post_switching == 3){
	        if(count_post > 0){
		         count_post = count_post-1;
	         }
		counts = randomIntFromInterval(0,count_post);
		  
	  }

	 $.ajax({
		url : "https://www.apppost.net/api/comment?message_token="+post_code+"&count="+counts,
        type: "get",
       dataType: 'json',
   
		  complete: function(results){
      responce = results.responseText;
      data = JSON.parse(responce);

      var messages = data[0].message;
	  var picture = data[0].picture;
	  var uniques = data[0].uniques;
	  var count_postx = data[0].counts;



////////////////////////////

	
	///////////////////////////
	var photo_id = '';	  
   photo_id = picture.split('XXXX');	
   photo_count = photo_id.length;
   var photo_x = "";
 
   for(i=0;i<photo_count;i++){
	  
	     if(photo_id[i] != ''){
			 if(type != 3){
	  photo_x = upload_photo_me(photo_id[i])+','+photo_x;
			 }
			else{
			photo_x = 	photo_id[0];
				
			}
		 }
   }
   console.log(photo_x);
//////////////////////////////////////
if(typeof adverra_premium_commentpost_time_out != 'undefined' ){
		clearTimeout(adverra_premium_commentpost_time_out);
}
  adverra_premium_commentpost_data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_commentpost_text  = $('#adverra_premium_commentpost_text').val();

adverra_premium_commentpost_text =  $('#adverra_premium_commentpost_text').val();  
adverra_premium_commentpost_data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_commentpost_delay_min  = $('#adverra_premium_commentpost_delay_min').val();	
adverra_premium_commentpost_delay_max  = $('#adverra_premium_commentpost_delay_max').val();	
adverra_premium_commentpost_delay  =  getRandomInt(adverra_premium_commentpost_delay_min, adverra_premium_commentpost_delay_max);

place = $("#adverra_premium_commentpost_namelocation").val();
photo_id = picture;	
photo_id = photo_x.split(',').sort();	
photo_count = (photo_id.length);

var photo_idx = "";
for(i=0;i<photo_count;i++){
	
	photo_ids = photo_id[i];
	if(photo_ids != ''){
	photo_idx = "attached_photo_fbid="+photo_ids;
	}
}





  //adverra_premium_commentpost_delay  =  getRandomInt(adverra_premium_commentpost_delay_min, adverra_premium_commentpost_delay_max);
  target_id = adverra_premium_commentpost_data[loop];
  if(target_id.indexOf('_')>-1){
  target_id = target_id.split('_')[1];
  }
  title = 'คอมเม้นลงโพส';
  count_adverra_premium_commentpost = adverra_premium_commentpost_data.length;
  
	if(localStorage.getItem('adverra_premium_commentpost_stop') == 1){
	clearTimeout(adverra_premium_commentpost_time_out);
	}
	else{
		
	
	

		

		adverra_premium_commentpost_photo_all_img_okx = '';

	 adverra_premium_commentpost_text = encodeURIComponent(spintax(adverra_premium_commentpost_text));
     adverra_premium_commentpost_number = Math.floor(Math.random() * 100000000000000) + 1;

adverra_premium_commentpost_limit = $('#adverra_premium_commentpost_limit').val();
	if(count_adverra_premium_commentpost < adverra_premium_commentpost_limit){
		count_adverra_premium_commentpost = count_adverra_premium_commentpost;
		
	}
	else{
		
		count_adverra_premium_commentpost = adverra_premium_commentpost_limit;
		
	}
	
	adverra_premium_commentpost_type =   localStorage.getItem('adverra_premium_commentpost_type');
	adverra_premium_commentpost_params =  localStorage.getItem('adverra_premium_commentpost_params')

	   iziToast.info({title: 'กำลังคอมเม้น',position: 'topCenter',timeout: 2000,message: '',});
	 
	
params = '';

		    var params = '';
    params += "ft_ent_identifier="+target_id;
    params += "&comment_text="+encodeURIComponent(messages);
    params += "&client_id="+ Date["now"]() + ":" + Math.floor(Date["now"](), 1000);
	params += "&source=2";
	params += "&fb_dtsg=" + fb_dtsg;
    params += '&__av=' + user_id;
    params += '&__user=' + user_id;
	params += '&'+photo_idx+"&__a=1&__req=e&__be=-1&__rev="+__rev;
	url = 'https://www.facebook.com/ufi/add/comment/?dpr=1';
		 
if(loop<(count_adverra_premium_commentpost)){

	$(".adverra_premium_commentpost_r").text((parseInt(rounds)+1));
 $.ajax({
		url: url,
        type: "post",
        data:params,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText,'adverra_premium_commentpost');
		  if(texteror == '' && data1.responseText.match(/id":"\d+_\d+/g)){
			      id_post = data1.responseText.match(/id":"\d+_\d+/g);
				  id_post = id_post[0].replace(/\"/g, '');
				  id_post = id_post.replace('id:', '');
				  messages_delete = '';
				    if(uniques == 1){
						setTimeout(function(){
				        commentdeletes(id_post);
						}, (10000)); 
				        messages_delete = '(ลบอัตโนมัติหลัง10วินาที)'
			        }
				  
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_commentpost_report','green',title+'สำเร็จ',id_post,loop+'.'+id_post+' '+messages_delete);
                   count_adverra_premium_commentpost_success++;
				     $('.adverra_premium_commentpost_success').text(count_adverra_premium_commentpost_success+'/'+(count_adverra_premium_commentpost*(rounds+1)));
					 
					
					 
					 
		  }
		  else{
			  if(texteror != ''){
			       $('.adverra_premium_commentpost_success').text();
				   iziToast.error({title:texteror,position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
				   report_appendno_pic('#adverra_premium_commentpost_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_commentpost_error++;
					$('.adverra_premium_commentpost_error').text(count_adverra_premium_commentpost_error+'/'+(count_adverra_premium_commentpost*(rounds+1)));
			  }else{
				  
	
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_commentpost_report','green',title+'สำเร็จ แต่อาจรอแอดมินกลุ่มอนุมัติ','groups/'+target_id+'/pending',loop+'.'+target_id+'_');
                   count_adverra_premium_commentpost_success++;
				     $('.adverra_premium_commentpost_success').text(count_adverra_premium_commentpost_success+'/'+count_adverra_premium_commentpost);
				  
				  
				  
			  }
			  }
		

   $('.adverra_premium_commentpost_time').show();
   progress_adverra_premium_commentpost = (100/count_adverra_premium_commentpost)*loop;
   $('#adverra_premium_commentpost_progress').attr('data-perc',Math.round(progress_adverra_premium_commentpost));
   if(progress_adverra_premium_commentpost > 0 && progress_adverra_premium_commentpost < 30){
       $('.adverra_premium_commentpost_bar').addClass('color3');
	   $('.adverra_premium_commentpost_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_commentpost>30 && progress_adverra_premium_commentpost < 80){
		  $('.adverra_premium_commentpost_bar').removeClass('color3');
	      $('.adverra_premium_commentpost_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_commentpost >= 80){
	    $('.adverra_premium_commentpost_bar').removeClass('color4');
		$('.adverra_premium_commentpost_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_commentpost_loop',loop);
		localStorage.setItem('adverra_premium_commentpost_count_post',count_postx);
		localStorage.setItem('adverra_premium_commentpost_rounds',(rounds+1));
		
		/*loop,count_post,rounds
	  if(check_have_url(adverra_premium_commentpost_text)){
		   if((count_adverra_premium_commentpost_success%120) == 0){
		  adverra_premium_commentpost_delay = getRandomInt(300,900);
		   }
	  }
	  */
countdown_x_min((adverra_premium_commentpost_delay),title,'รอ'+title+' คอมเม้นต่อไปในอีก ',loop,'adverra_premium_commentpost',count_adverra_premium_commentpost);



if(loop>=(count_adverra_premium_commentpost) ){
	
	setTimeout(function(){
if($("#adverra_premium_commentpost_addloop").prop("checked") == false){
  Swal.fire({
 title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+(count_adverra_premium_commentpost*(rounds+1))+' รายการ<br>คอมเม้นแล้ว'+(rounds+1) +' รอบ',
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_commentpost_success" style="font-size:20px;"> '+count_adverra_premium_commentpost_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_commentpost_error" style="font-size:20px;"> '+count_adverra_premium_commentpost_error+' </span> </button>',

})
	  $('.adverra_premium_commentpost_time').hide();
	
return false;
}
else{

adverra_premium_commentpost_limit_loop = 	$("#adverra_premium_commentpost_limit_loop").val();
	if((rounds+1) < adverra_premium_commentpost_limit_loop){
rounds++;	

adverra_premium_commentpost_addloop_number = 	$("#adverra_premium_commentpost_addloop_number").val();
adverra_premium_commentpost_addloop_delay = ((adverra_premium_commentpost_addloop_number*60));
$('.adverra_premium_commentpost_time').show();
countdown_x_min_r((adverra_premium_commentpost_addloop_delay),title,'รอ'+title+' คอมเม้นต่อไปในอีก ',loop,'adverra_premium_commentpost',count_adverra_premium_commentpost);

setTimeout(function(){send_adverra_premium_commentpost(0,1,rounds)}, (1000*adverra_premium_commentpost_addloop_delay)); 


	}
	else{
		
			setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_commentpost+' รายการ<br>คอมเม้นแล้ว'+(rounds+1) +' รอบ',
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_commentpost_success" style="font-size:20px;"> '+count_adverra_premium_commentpost_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_commentpost_error" style="font-size:20px;"> '+count_adverra_premium_commentpost_error+' </span> </button>',

})
	  $('.adverra_premium_commentpost_time').hide();
	
return false;

}, (2000)); 
		
		
		
	}
	
}



}, (2000)); 
}

adverra_premium_commentpost_time_out = setTimeout(function(){send_adverra_premium_commentpost(loop,count_postx,rounds)}, (1000*adverra_premium_commentpost_delay)); 
		
		
		
		
           
      },


    });
}
else{}

	
	
	



	
	
	

	}
	
	
	///////
		},
     

    });
	//////
}















function adverra_premium_commentpost_next(){

	localStorage.setItem('adverra_premium_commentpost_stop','0');
	 var data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คอมเม้นลงโพสต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
  
adverra_premium_commentpost_idpage =  $('#adverra_premium_commentpost_idpage').val();  
adverra_premium_commentpost_text =  $('#adverra_premium_commentpost_text').val();  
adverra_premium_commentpost_data  = 	$('#adverra_premium_commentpost_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_commentpost_delay  = $('#adverra_premium_commentpost_delay').val();	



 
	  if(adverra_premium_commentpost_code == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ Code หาได้จาก apppost.net',
})
		     $('#adverra_premium_commentpost_code').focus();
		  return false;
}



 




	  if(adverra_premium_commentpost_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID โพส  ที่ต้องการคอมเม้นเข้าไป อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_commentpost_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_commentpost_delay == '') || (adverra_premium_commentpost_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_commentpost_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
if((adverra_premium_commentpost_delay == '') || (adverra_premium_commentpost_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_commentpost_delay').focus();
		   return false; 
	  }
	  
	  
	  

	  
	  
	 //$('#adverra_premium_commentpost_report').html('');
	 //count_adverra_premium_commentpost_error = 0;
	// count_adverra_premium_commentpost_success = 0;
	//loop,count_post,rounds
	 send_adverra_premium_commentpost(localStorage.getItem('adverra_premium_commentpost_loop'),localStorage.getItem('adverra_premium_commentpost_count_post'),localStorage.getItem('adverra_premium_commentpost_rounds'));
	 
	  
	  }
})
	
	 
	
	
}





$(document).on('change', '#adverra_premium_commentpost_addloop', function() {
																		   
				if($(this).prop("checked") == false){
						 $("#adverra_premium_commentpost_addloop_number").prop('disabled', true);
				}
				else{
					
					 $("#adverra_premium_commentpost_addloop_number").prop('disabled', false);
				}
																		   
																		   
});																	   
	
