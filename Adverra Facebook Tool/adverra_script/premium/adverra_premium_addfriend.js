function adverra_premium_addfriend(){
	localStorage.setItem('adverra_premium_addfriend_stop','0');
	 var data  = 	$('#adverra_premium_addfriend_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการเพิ่มเพื่อน?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_addfriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_addfriend_delay_min  = $('#adverra_premium_addfriend_delay_min').val();	
  adverra_premium_addfriend_delay_max  = $('#adverra_premium_addfriend_delay_max').val();
	  if(data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_addfriend_data').focus();
		  return false;
	  }
	  
	  
if((adverra_premium_addfriend_delay_min == '') || (adverra_premium_addfriend_delay_min < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 5 ',
})
		     $('#adverra_premium_addfriend_delay_min').focus();
		   return false; 
	  }
	  
	  
if((adverra_premium_addfriend_delay_max == '') || (adverra_premium_addfriend_delay_max < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนมากสุดอย่างน้อย 15 ',
})
		   $('#adverra_premium_addfriend_delay_max').focus();
		    return false;
	  }
	  
	  
	 $('#adverra_premium_addfriend_report').html('');
	 count_adverra_premium_addfriend_error = 0;
	 count_adverra_premium_addfriend_success = 0;
	 send_adverra_premium_addfriend(0);
	 
	  
	  }
})
	
	 
	
	
}



function send_adverra_premium_addfriend(loop){


if(!check_internet()){
	adverra_premium_addfriend_time_out = setTimeout(function(){send_adverra_premium_addfriend(loop)}, (1000*5));
	return false;
}




if(typeof adverra_premium_addfriend_time_out != 'undefined' ){
		clearTimeout(adverra_premium_addfriend_time_out);
}
  data  = 	$('#adverra_premium_addfriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_addfriend_delay_min  = $('#adverra_premium_addfriend_delay_min').val();	
  adverra_premium_addfriend_delay_max  = $('#adverra_premium_addfriend_delay_max').val();	
  adverra_premium_addfriend_delay  =  getRandomInt(adverra_premium_addfriend_delay_min, adverra_premium_addfriend_delay_max);

  target_id = data[loop];
  title = 'สงคำขอเพื่อน';
  count_adverra_premium_addfriend = data.length;
  
	if(localStorage.getItem('adverra_premium_addfriend_stop') == 1){
	clearTimeout(adverra_premium_addfriend_time_out);
	}
	else{
  
parms = 'to_friend='+target_id+'&action=add_friend&how_found=profile_browser&ref_param=pb_reactions&link_data[ft][tn]=-a&outgoing_id=&logging_location=&no_flyout_on_click=true&ego_log_data&http_referer&floc=list_of_people&__user='+user_id+'&__a=1&__req=8i&__be=1&dpr=1.5&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk&confirmed=0';

if(loop<(count_adverra_premium_addfriend)){
 $.ajax({
		url: "https://www.facebook.com/ajax/add_friend/action.php",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  if(texteror == ''){
			      
			       iziToast.success({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title: title+' คนนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
                   report_append('#adverra_premium_addfriend_report','green',title+'สำเร็จ',target_id,loop+'.'+target_id);
                   count_adverra_premium_addfriend_success++;
				     $('.adverra_premium_addfriend_success').text(count_adverra_premium_addfriend_success+'/'+count_adverra_premium_addfriend);
		  }
		  else{
			       $('.adverra_premium_addfriend_success').text();
				   iziToast.error({image:'https://graph.facebook.com/'+target_id+'/picture?type=small',title:texteror,position: 'topCenter',timeout: 2000,message: 'คนที่ '+(loop),});
				   report_append('#adverra_premium_addfriend_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_addfriend_error++;
					$('.adverra_premium_addfriend_error').text(count_adverra_premium_addfriend_error+'/'+count_adverra_premium_addfriend);
			  }
		

   $('.adverra_premium_addfriend_time').show();
   progress_adverra_premium_addfriend = (100/count_adverra_premium_addfriend)*loop;
   $('#adverra_premium_addfriend_progress').attr('data-perc',Math.round(progress_adverra_premium_addfriend));
   if(progress_adverra_premium_addfriend > 0 && progress_adverra_premium_addfriend < 30){
       $('.adverra_premium_addfriend_bar').addClass('color3');
	   $('.adverra_premium_addfriend_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_addfriend>30 && progress_adverra_premium_addfriend < 80){
		  $('.adverra_premium_addfriend_bar').removeClass('color3');
	      $('.adverra_premium_addfriend_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_addfriend >= 80){
	    $('.adverra_premium_addfriend_bar').removeClass('color4');
		$('.adverra_premium_addfriend_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_addfriend_loop',loop);
countdown_x(adverra_premium_addfriend_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_addfriend',count_adverra_premium_addfriend);



if(loop>=(count_adverra_premium_addfriend)){
	setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_addfriend+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_addfriend_success" style="font-size:20px;"> '+count_adverra_premium_addfriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_addfriend_error" style="font-size:20px;"> '+count_adverra_premium_addfriend_error+' </span> </button>',

})
	  $('.adverra_premium_addfriend_time').hide();
	
return false;
}, (5000)); 
}
adverra_premium_addfriend_time_out = setTimeout(function(){send_adverra_premium_addfriend(loop)}, (1000*adverra_premium_addfriend_delay)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_addfriend_next(){
	localStorage.setItem('adverra_premium_addfriend_stop','0');
	 var data  = 	$('#adverra_premium_addfriend_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "เพิ่มเพื่อนต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_addfriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_addfriend_delay_min  = $('#adverra_premium_addfriend_delay_min').val();	
  adverra_premium_addfriend_delay_max  = $('#adverra_premium_addfriend_delay_max').val();
	  if(data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_addfriend_data').focus();
		  return false;
	  }
	  
	  
if((adverra_premium_addfriend_delay_min == '') || (adverra_premium_addfriend_delay_min < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 5 ',
})
		     $('#adverra_premium_addfriend_delay_min').focus();
		   return false; 
	  }
	  
	  
if((adverra_premium_addfriend_delay_max == '') || (adverra_premium_addfriend_delay_max < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนมากสุดอย่างน้อย 15 ',
})
		   $('#adverra_premium_addfriend_delay_max').focus();
		    return false;
	  }
	  
	  
	 //$('#adverra_premium_addfriend_report').html('');
	 //count_adverra_premium_addfriend_error = 0;
	// count_adverra_premium_addfriend_success = 0;
	
	 send_adverra_premium_addfriend(localStorage.getItem('adverra_premium_addfriend_loop'));
	 
	  
	  }
})
	
	 
	
	
}


