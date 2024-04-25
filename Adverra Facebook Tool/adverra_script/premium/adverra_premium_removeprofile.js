function adverra_premium_removeprofile(){
	localStorage.setItem('adverra_premium_removeprofile_stop','0');
	 var data  = 	$('#adverra_premium_removeprofile_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบโพสในโปรไฟล์?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removeprofile_data').val().trim();
  adverra_premium_removeprofile_delay_min  = 0;	
  adverra_premium_removeprofile_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removeprofile_data').focus();
		  return false;
	  }
	  
	  

	  

	  
	  
	 $('#adverra_premium_removeprofile_report').html('');
	 count_adverra_premium_removeprofile_error = 0;
	 count_adverra_premium_removeprofile_success = 0;
	 count_adverra_premium_removeprofile_all = 0;
	 get_adverra_premium_removeprofile(0);
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_removeprofile(loop){
	  var adverra_premium_removeprofile_data = 	$('#adverra_premium_removeprofile_data').val().trim();
	  var adverra_premium_removeprofile_text = 	$('#adverra_premium_removeprofile_text').val().trim();
	  var adverra_premium_removeprofile_datestart = 	$('#adverra_premium_removeprofile_datestart').val().trim();
	  var adverra_premium_removeprofile_dateend = 	$('#adverra_premium_removeprofile_dateend').val().trim();
	  if(adverra_premium_removeprofile_text != ''){
		adverra_premium_removeprofile_text =   adverra_premium_removeprofile_text.split(',');
		find_text = '';
		$.each(adverra_premium_removeprofile_text, function (index, value) {
	      find_text = " strpos(message,'"+value+"') >=0 or"+find_text;				  
	   });
		
		var lastIndex = find_text.lastIndexOf("or");
             find_text = find_text.substring(0, lastIndex);
		   find_text = 'and ('+ find_text+')';
		  
	  }
	else{
		find_text = '';
		
		
	}
	
	where = '';
			 adverra_premium_removeprofile_type_textx = '';
			 adverra_premium_removeprofile_type_linkx = '';
			 adverra_premium_removeprofile_type_photox = '';
			 adverra_premium_removeprofile_type_videox = '';
			 adverra_premium_removeprofile_type_albumx = '';
	

	if($('#adverra_premium_removeprofile_type_text').prop("checked") == true){
	
	         adverra_premium_removeprofile_type_textx = ' strlen(attachment.fb_object_type) = 0 or';
	}
	if($('#adverra_premium_removeprofile_type_link').prop("checked") == true){
	       adverra_premium_removeprofile_type_linkx = "  attachment.fb_object_type = 'link' or";
	}
	if($('#adverra_premium_removeprofile_type_photo').prop("checked") == true){
	         adverra_premium_removeprofile_type_photox = " attachment.fb_object_type = 'photo' or";
	}
	if($('#adverra_premium_removeprofile_type_video').prop("checked") == true){
	  adverra_premium_removeprofile_type_videox = " attachment.fb_object_type = 'video' or";
	}
	if($('#adverra_premium_removeprofile_type_album').prop("checked") == true){
		 adverra_premium_removeprofile_type_albumx = " attachment.fb_object_type = 'album' or";
	
	}
	
	
	
where = adverra_premium_removeprofile_type_textx+' '+adverra_premium_removeprofile_type_linkx+' '+adverra_premium_removeprofile_type_photox+' '+adverra_premium_removeprofile_type_videox+' '+adverra_premium_removeprofile_type_albumx;

             lastIndex2 = where.lastIndexOf("or");
             where = where.substring(0, lastIndex2);
		   where = 'and ('+ where+')';


	if($('#adverra_premium_removeprofile_type_all').prop("checked") == true){
	         where = '';
			 adverra_premium_removeprofile_type_textx = '';
			 adverra_premium_removeprofile_type_linkx = '';
			 adverra_premium_removeprofile_type_photox = '';
			 adverra_premium_removeprofile_type_videox = '';
			 adverra_premium_removeprofile_type_albumx = '';
	}

	
	 page_token =  localStorage.getItem('access_token');
	url = "https://graph.facebook.com/fql?q=SELECT post_id, message FROM stream WHERE source_id = "+user_id+"  " +where+" " +find_text+" and (created_time >= '"+date_to_timestamp(adverra_premium_removeprofile_datestart) +"'  and  created_time  <= '"+date_to_timestamp(adverra_premium_removeprofile_dateend)+"') LIMIT 0,100&access_token="+page_token+"&method=GET";

 console.log(url);
		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
if(typeof data[0] != 'undefined'){
send_adverra_premium_removeprofile(loop,data)		
	  }
	  else{
			setTimeout(function(){
title = 'ลบโพสจากโปรไฟล์'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removeprofile_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removeprofile_success" style="font-size:20px;"> '+count_adverra_premium_removeprofile_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removeprofile_error" style="font-size:20px;"> '+count_adverra_premium_removeprofile_error+' </span> </button>',

})
	  $('.adverra_premium_removeprofile_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  }



								})
	
	
		
}










function send_adverra_premium_removeprofile(loop,data){


if(!check_internet()){
	adverra_premium_removeprofile_time_out = setTimeout(function(){send_adverra_premium_removeprofile(loop,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_removeprofile_time_out != 'undefined' ){
		clearTimeout(adverra_premium_removeprofile_time_out);
}
  data  = 	data;
  adverra_premium_removeprofile_delay_min  = 1;	
  adverra_premium_removeprofile_delay_max  = 1;	
  adverra_premium_removeprofile_delay  =  getRandomInt(adverra_premium_removeprofile_delay_min, adverra_premium_removeprofile_delay_max);
if(typeof data[loop].post_id != 'undefined' ){
  p_id = data[loop].post_id.split('_')[0];
  target_id = data[loop].post_id.split('_')[1];
  
  }
else{
	
		get_adverra_premium_removeprofile(0);
	
	return false;
}
  
  title = 'ลบโพส';
  count_adverra_premium_removeprofile = data.length;
  
	if(localStorage.getItem('adverra_premium_removeprofile_stop') == 1){
	clearTimeout(adverra_premium_removeprofile_time_out);
	}
	else{
  
parms = 'jazoest='+jazoest+'&fb_dtsg='+fb_dtsg+'&__user='+user_id+'&__a=1&__req=13&__be=1&__pc=PHASED%3ADEFAULT&dpr=1.5&__rev='+__rev+'&__s=k5hw3l%3Audlni4%3Asa7i8u&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<(count_adverra_premium_removeprofile)){
 $.ajax({
		url: "https://www.facebook.com/ajax/timeline/delete?identifier=S%3A_I"+data[loop].post_id +"&location=9&story_dom_id=u_fetchstream_2_2&render_location=5&is_notification_preview=0",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_removeprofile_all++;
		  
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' รายการนี้ '+target_id,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removeprofile_all),});
                   report_appendno_pic('#adverra_premium_removeprofile_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_removeprofile_all)+'.'+target_id);
                   count_adverra_premium_removeprofile_success++;
				     $('.adverra_premium_removeprofile_success').text(count_adverra_premium_removeprofile_success);
		  }
		  else{
			       $('.adverra_premium_removeprofile_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removeprofile_all),});
				   report_appendno_pic('#adverra_premium_removeprofile_report','red',texteror,target_id,(count_adverra_premium_removeprofile_all)+'.'+target_id);
                    count_adverra_premium_removeprofile_error++;
					$('.adverra_premium_removeprofile_error').text(count_adverra_premium_removeprofile_error);
			  }
		

if(count_adverra_premium_removeprofile_all >= $("#adverra_premium_removeprofile_limit").val()){
				setTimeout(function(){
title = 'ลบโพสจากโปรไฟล์'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removeprofile_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removeprofile_success" style="font-size:20px;"> '+count_adverra_premium_removeprofile_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removeprofile_error" style="font-size:20px;"> '+count_adverra_premium_removeprofile_error+' </span> </button>',

})
	  $('.adverra_premium_removeprofile_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}
   $('.adverra_premium_removeprofile_time').show();
   progress_adverra_premium_removeprofile = (100/count_adverra_premium_removeprofile)*loop;
   $('#adverra_premium_removeprofile_progress').attr('data-perc',Math.round(progress_adverra_premium_removeprofile));
   if(progress_adverra_premium_removeprofile > 0 && progress_adverra_premium_removeprofile < 30){
       $('.adverra_premium_removeprofile_bar').addClass('color3');
	   $('.adverra_premium_removeprofile_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_removeprofile>30 && progress_adverra_premium_removeprofile < 80){
		  $('.adverra_premium_removeprofile_bar').removeClass('color3');
	      $('.adverra_premium_removeprofile_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_removeprofile >= 80){
	    $('.adverra_premium_removeprofile_bar').removeClass('color4');
		$('.adverra_premium_removeprofile_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_removeprofile_loop',loop);
		localStorage.setItem('adverra_premium_removeprofile_data',data);
countdown_x(adverra_premium_removeprofile_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_removeprofile',count_adverra_premium_removeprofile);



if(loop>=(count_adverra_premium_removeprofile)){
	get_adverra_premium_removeprofile(0);

}
adverra_premium_removeprofile_time_out = setTimeout(function(){send_adverra_premium_removeprofile(loop,data)}, (200)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_removeprofile_next(){
	localStorage.setItem('adverra_premium_removeprofile_stop','0');
	 var data  = 	$('#adverra_premium_removeprofile_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ลบโพสในโปรไฟล์ต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removeprofile_data').val().trim();
  adverra_premium_removeprofile_delay_min  = 0;	
  adverra_premium_removeprofile_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removeprofile_data').focus();
		  return false;
	  }
	  
	  

	  
	 //$('#adverra_premium_removeprofile_report').html('');
	 //count_adverra_premium_removeprofile_error = 0;
	// count_adverra_premium_removeprofile_success = 0;

	 send_adverra_premium_removeprofile(localStorage.getItem('adverra_premium_removeprofile_loop'),localStorage.getItem('adverra_premium_removeprofile_data'));
	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_removeprofile_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_removeprofile_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_removeprofile_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_removeprofile_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_removeprofile_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_removeprofile_dateend').val(currentDate);
$('#adverra_premium_removeprofile_datestart').val(currentDate_start);


