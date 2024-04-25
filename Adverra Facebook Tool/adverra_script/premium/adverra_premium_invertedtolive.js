
function adverra_premium_invertedtolive_give_success_description(text,id_element) {
	
    var str='';
    if(text){
        if(text.replace("for (;;);", "")){
            try {
                var o = JSON.parse(text.replace("for (;;);", ""));
                if (o && typeof o === "object" && o !== null) {
                    if(JSON.parse(text.replace("for (;;);", ""))){
						
                       str  = 'success';
                    }
                }
            }
            catch (e) {
            }    
        }

    }
    return str;
}














function adverra_premium_invertedtolive(){
	localStorage.setItem('adverra_premium_invertedtolive_stop','0');
	 var data  = 	$('#adverra_premium_invertedtolive_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการเชิญเพื่อนมาดู Live สด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_invertedtolive_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_invertedtolive_delay_min  = $('#adverra_premium_invertedtolive_delay_min').val();	
  adverra_premium_invertedtolive_delay_max  = $('#adverra_premium_invertedtolive_delay_max').val();
	  if(data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_invertedtolive_data').focus();
		  return false;
	  }
	  
	  
if((adverra_premium_invertedtolive_delay_min == '') || (adverra_premium_invertedtolive_delay_min < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 5 ',
})
		     $('#adverra_premium_invertedtolive_delay_min').focus();
		   return false; 
	  }
	  
	  
if((adverra_premium_invertedtolive_delay_max == '') || (adverra_premium_invertedtolive_delay_max < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนมากสุดอย่างน้อย 15 ',
})
		   $('#adverra_premium_invertedtolive_delay_max').focus();
		    return false;
	  }
	  
	  
	 $('#adverra_premium_invertedtolive_report').html('');
	 count_adverra_premium_invertedtolive_error = 0;
	 count_adverra_premium_invertedtolive_success = 0;
	 send_adverra_premium_invertedtolive(0);
	 
	  
	  }
})
	
	 
	
	
}



function send_adverra_premium_invertedtolive(loop){


if(!check_internet()){
	adverra_premium_invertedtolive_time_out = setTimeout(function(){send_adverra_premium_invertedtolive(loop)}, (1000*5));
	return false;
}




if(typeof adverra_premium_invertedtolive_time_out != 'undefined' ){
		clearTimeout(adverra_premium_invertedtolive_time_out);
}
  data  = 	$('#adverra_premium_invertedtolive_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_invertedtolive_delay_min  = $('#adverra_premium_invertedtolive_delay_min').val();	
  adverra_premium_invertedtolive_delay_max  = $('#adverra_premium_invertedtolive_delay_max').val();	
  adverra_premium_invertedtolive_delay  =  getRandomInt(adverra_premium_invertedtolive_delay_min, adverra_premium_invertedtolive_delay_max);

  target_id = data[loop];
  title = 'สงคำเชิญเพื่อน';
  count_adverra_premium_invertedtolive = data.length;
  
	if(localStorage.getItem('adverra_premium_invertedtolive_stop') == 1){
	clearTimeout(adverra_premium_invertedtolive_time_out);
	}
	else{
  
parms = '__user='+user_id+'&__a=1&__req=5a&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<(count_adverra_premium_invertedtolive)){
	
	
	
	  adverra_premium_invertedtolive_video  = $('#adverra_premium_invertedtolive_video').val();	
	
	
 $.ajax({
		url: "https://www.facebook.com/live_video/invite_friends/?video_id="+adverra_premium_invertedtolive_video+"&friend_ids[0]="+target_id+"&source=www_ui",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		 	  texteror = give_error_description(data1.responseText,'adverra_premium_invertedtolive');
		  if(texteror == '' && adverra_premium_invertedtolive_give_success_description(data1.responseText,'adverra_premium_invertedtolive') != ''){
			      
			       iziToast.success({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title: title+' คนนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
                   report_append('#adverra_premium_invertedtolive_report','green',title+'สำเร็จ',target_id,loop+'.'+target_id);
                   count_adverra_premium_invertedtolive_success++;
				     $('.adverra_premium_invertedtolive_success').text(count_adverra_premium_invertedtolive_success+'/'+count_adverra_premium_invertedtolive);
		  }
		  else{
			       $('.adverra_premium_invertedtolive_success').text();
				   iziToast.error({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title:texteror,position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
				   report_append('#adverra_premium_invertedtolive_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_invertedtolive_error++;
					$('.adverra_premium_invertedtolive_error').text(count_adverra_premium_invertedtolive_error+'/'+count_adverra_premium_invertedtolive);
			  }
		

   $('.adverra_premium_invertedtolive_time').show();
   progress_adverra_premium_invertedtolive = (100/count_adverra_premium_invertedtolive)*loop;
   $('#adverra_premium_invertedtolive_progress').attr('data-perc',Math.round(progress_adverra_premium_invertedtolive));
   if(progress_adverra_premium_invertedtolive > 0 && progress_adverra_premium_invertedtolive < 30){
       $('.adverra_premium_invertedtolive_bar').addClass('color3');
	   $('.adverra_premium_invertedtolive_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_invertedtolive>30 && progress_adverra_premium_invertedtolive < 80){
		  $('.adverra_premium_invertedtolive_bar').removeClass('color3');
	      $('.adverra_premium_invertedtolive_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_invertedtolive >= 80){
	    $('.adverra_premium_invertedtolive_bar').removeClass('color4');
		$('.adverra_premium_invertedtolive_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_invertedtolive_loop',loop);
countdown_x(adverra_premium_invertedtolive_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_invertedtolive',count_adverra_premium_invertedtolive);



if(loop>=(count_adverra_premium_invertedtolive)){
	setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_invertedtolive+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_invertedtolive_success" style="font-size:20px;"> '+count_adverra_premium_invertedtolive_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_invertedtolive_error" style="font-size:20px;"> '+count_adverra_premium_invertedtolive_error+' </span> </button>',

})
	  $('.adverra_premium_invertedtolive_time').hide();
	
return false;
}, (5000)); 
}
adverra_premium_invertedtolive_time_out = setTimeout(function(){send_adverra_premium_invertedtolive(loop)}, (1000*adverra_premium_invertedtolive_delay)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_invertedtolive_next(){
	localStorage.setItem('adverra_premium_invertedtolive_stop','0');
	 var data  = 	$('#adverra_premium_invertedtolive_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "เชิญเพื่อนมาดู Live สดต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_invertedtolive_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_invertedtolive_delay_min  = $('#adverra_premium_invertedtolive_delay_min').val();	
  adverra_premium_invertedtolive_delay_max  = $('#adverra_premium_invertedtolive_delay_max').val();
	  if(data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_invertedtolive_data').focus();
		  return false;
	  }
	  
	  
if((adverra_premium_invertedtolive_delay_min == '') || (adverra_premium_invertedtolive_delay_min < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 5 ',
})
		     $('#adverra_premium_invertedtolive_delay_min').focus();
		   return false; 
	  }
	  
	  
if((adverra_premium_invertedtolive_delay_max == '') || (adverra_premium_invertedtolive_delay_max < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนมากสุดอย่างน้อย 15 ',
})
		   $('#adverra_premium_invertedtolive_delay_max').focus();
		    return false;
	  }
	  
	  
	 //$('#adverra_premium_invertedtolive_report').html('');
	 //count_adverra_premium_invertedtolive_error = 0;
	// count_adverra_premium_invertedtolive_success = 0;
	
	 send_adverra_premium_invertedtolive(localStorage.getItem('adverra_premium_invertedtolive_loop'));
	 
	  
	  }
})
	
	 
	
	
}


