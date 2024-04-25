function adverra_premium_likefriend(){
	localStorage.setItem('adverra_premium_likefriend_stop','0');
	 var data  = 	$('#adverra_premium_likefriend_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการแสดงความรู้สึกต่อโพสของเพื่อนใช่ไหม?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_likefriend_data').val().trim();

	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account เพื่อน อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_likefriend_data').focus();
		  return false;
	  }
	  
	  sListx = [];
$('.adverra_premium_likefriend_type').each(function () {
	if ($(this).is(":checked"))
{												 
    sListx.push($(this).val());
}
});
	  
if(sListx.length == 0){
	
	
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องเลือกรูปแบบการแสดงความรู้สึกต่อโพส',
})
		    
		  return false;
	  
	
}
	  
	  
	 $('#adverra_premium_likefriend_report').html('');
	 count_adverra_premium_likefriend_error = 0;
	 count_adverra_premium_likefriend_success = 0;
	 count_adverra_premium_likefriend_all = 0;
	 
	 get_adverra_premium_likefriend(0);
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_likefriend(loop_big){
	

  adverra_premium_likefriend_data  = 	$('#adverra_premium_likefriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_likefriend_delay_min  = $('#adverra_premium_likefriend_delay_min').val();	
  adverra_premium_likefriend_delay_max  = $('#adverra_premium_likefriend_delay_max').val();	
  adverra_premium_likefriend_delay  =  getRandomInt(adverra_premium_likefriend_delay_min, adverra_premium_likefriend_delay_max);
	  var adverra_premium_likefriend_limitx = 	$('#adverra_premium_likefriend_limitx').val().trim();
	  var adverra_premium_likefriend_limit = 	$('#adverra_premium_likefriend_limit').val().trim();
   adverra_premium_likefriend_target = adverra_premium_likefriend_data[loop_big];
adverra_premium_likefriend_data_countbig = adverra_premium_likefriend_data.length;



   $('.adverra_premium_likefriend_time').show();
   progress_adverra_premium_likefriend = (100/adverra_premium_likefriend_data_countbig)*loop_big;
   $('#adverra_premium_likefriend_progress').attr('data-perc',Math.round(progress_adverra_premium_likefriend));
   if(progress_adverra_premium_likefriend > 0 && progress_adverra_premium_likefriend < 30){
       $('.adverra_premium_likefriend_bar').addClass('color3');
	   $('.adverra_premium_likefriend_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_likefriend>30 && progress_adverra_premium_likefriend < 80){
		  $('.adverra_premium_likefriend_bar').removeClass('color3');
	      $('.adverra_premium_likefriend_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_likefriend >= 80){
	    $('.adverra_premium_likefriend_bar').removeClass('color4');
		$('.adverra_premium_likefriend_bar').removeClass('color3');

	   
   }

    progressbarx();







title = 'แสดงความรู้สึกต่อโพส'



if(loop_big < adverra_premium_likefriend_data_countbig && count_adverra_premium_likefriend_success < adverra_premium_likefriend_limit){
	 page_token =  localStorage.getItem('access_token');
	url = "https://graph.facebook.com/fql?q=SELECT post_id, message FROM stream WHERE source_id = "+adverra_premium_likefriend_target+"  LIMIT 0,"+adverra_premium_likefriend_limitx+"&access_token="+page_token+"&method=GET";

 console.log(url);
		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
	  
	  
	  
if(typeof data[0] != 'undefined'){
send_adverra_premium_likefriend(0,data,loop_big)		
	  }
	  else{
		  
		  loop_big++;
		  get_adverra_premium_likefriend(loop_big)
		  
		  
		  }



								})
	
}
else{
	
			setTimeout(function(){
title = 'แสดงความรู้สึกต่อโพส'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_likefriend_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_likefriend_success" style="font-size:20px;"> '+count_adverra_premium_likefriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_likefriend_error" style="font-size:20px;"> '+count_adverra_premium_likefriend_error+' </span> </button>',

})
	  $('.adverra_premium_likefriend_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  
	
	
	
	
}
				
		
}










function send_adverra_premium_likefriend(loop,data,loop_big){


if(!check_internet()){
	adverra_premium_likefriend_time_out = setTimeout(function(){send_adverra_premium_likefriend(loop,data,loop_big)}, (1000*5));
	return false;
}




if(typeof adverra_premium_likefriend_time_out != 'undefined' ){
		clearTimeout(adverra_premium_likefriend_time_out);
}
  data  = 	data;
  adverra_premium_likefriend_delay_min  = $('#adverra_premium_likefriend_delay_min').val();	
  adverra_premium_likefriend_delay_max  = $('#adverra_premium_likefriend_delay_max').val();	
  adverra_premium_likefriend_delay  =  getRandomInt(adverra_premium_likefriend_delay_min, adverra_premium_likefriend_delay_max);
  count_adverra_premium_likefriend = data.length;

if(typeof data[loop].post_id != 'undefined'  ){
  p_id = data[loop].post_id.split('_')[0];
  target_id = data[loop].post_id.split('_')[1];
  
  }
  else{
	  
	loop_big++;
	get_adverra_premium_likefriend(loop_big)
	
	  
	  
  }
  title = 'แสดงความรู้สึก';
  
  
	if(localStorage.getItem('adverra_premium_likefriend_stop') == 1){
	clearTimeout(adverra_premium_likefriend_time_out);
	}
	else{
  
  var sList = [];
$('.adverra_premium_likefriend_type').each(function () {
	if ($(this).is(":checked"))
{												 
    sList.push($(this).val());
}
});
adverra_premium_likefriend_type  = sList[Math.floor(Math.random() * sList.length)];

  
parms = 'reaction_type='+adverra_premium_likefriend_type+'&ft_ent_identifier='+target_id+'&m_sess=&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__user='+user_id;

if(loop<(count_adverra_premium_likefriend)){
 $.ajax({
		url: "https://www.facebook.com/ufi/reaction/?ft_ent_identifier="+target_id+"&story_render_location=feed_mobile&feedback_source=1&is_sponsored=0",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_likefriend_all++;
		    adverra_premium_likefriend_data  = 	$('#adverra_premium_likefriend_data').val().trim().split(/\r\n|\r|\n/);
			
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' รายการนี้ '+target_id,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_likefriend_all),});
                   report_appendno_pic('#adverra_premium_likefriend_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_likefriend_all)+'.'+adverra_premium_likefriend_data[loop_big]+'_'+target_id);
                   count_adverra_premium_likefriend_success++;
				     $('.adverra_premium_likefriend_success').text(count_adverra_premium_likefriend_success+' โพส'+' จาก '+(loop_big+1)+'/'+adverra_premium_likefriend_data.length+' คน');
		  }
		  else{
			      
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_likefriend_all),});
				   report_appendno_pic('#adverra_premium_likefriend_report','red',texteror,target_id,(count_adverra_premium_likefriend_all)+'.'+adverra_premium_likefriend_data[loop_big]+'_'+target_id);
                    count_adverra_premium_likefriend_error++;
					$('.adverra_premium_likefriend_error').text(count_adverra_premium_likefriend_error+' โพส'+' จาก '+(loop_big+1)+'/'+adverra_premium_likefriend_data.length+' คน');
			  }
		

if(count_adverra_premium_likefriend_all >= $("#adverra_premium_likefriend_limit").val()){
				setTimeout(function(){
title = 'แสดงความรู้สึกต่อโพสของเพื่อน'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_likefriend_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_likefriend_success" style="font-size:20px;"> '+count_adverra_premium_likefriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_likefriend_error" style="font-size:20px;"> '+count_adverra_premium_likefriend_error+' </span> </button>',

})
	  $('.adverra_premium_likefriend_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}

		localStorage.setItem('adverra_premium_likefriend_loop',loop);
		localStorage.setItem('adverra_premium_likefriend_data',data);
		localStorage.setItem('adverra_premium_likefriend_loop_big',loop_big);
  adverra_premium_likefriend_data  = 	$('#adverra_premium_likefriend_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_likefriend_data_countbig  = adverra_premium_likefriend_data.length;

  if( loop < count_adverra_premium_likefriend){

		adverra_premium_likefriend_time_out = setTimeout(function(){send_adverra_premium_likefriend(loop,data,loop_big)}, (1000)); 
  }
else{
	loop_big++;

  adverra_premium_likefriend_delay_min  = $('#adverra_premium_likefriend_delay_min').val();	
  adverra_premium_likefriend_delay_max  = $('#adverra_premium_likefriend_delay_max').val();	
  adverra_premium_likefriend_delay  =  getRandomInt(adverra_premium_likefriend_delay_min, adverra_premium_likefriend_delay_max);

countdown_x(adverra_premium_likefriend_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop_big,'adverra_premium_likefriend',adverra_premium_likefriend_data_countbig);
setTimeout(function(){
	get_adverra_premium_likefriend(loop_big)
}, (1000*adverra_premium_likefriend_delay));	
	
}
		

		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_likefriend_next(){
	localStorage.setItem('adverra_premium_likefriend_stop','0');
	 var data  = 	$('#adverra_premium_likefriend_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการแสดงความรู้สึกต่อโพสของเพื่อนต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_likefriend_data').val().trim();

	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_likefriend_data').focus();
		  return false;
	  }
	  
	  

	  
	 //$('#adverra_premium_likefriend_report').html('');
	 //count_adverra_premium_likefriend_error = 0;
	// count_adverra_premium_likefriend_success = 0;


	 send_adverra_premium_likefriend(localStorage.getItem('adverra_premium_likefriend_loop'),localStorage.getItem('adverra_premium_likefriend_data'),localStorage.getItem('adverra_premium_likefriend_loop_big'));
	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_likefriend_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_likefriend_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_likefriend_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_likefriend_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_likefriend_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_likefriend_dateend').val(currentDate);
$('#adverra_premium_likefriend_datestart').val(currentDate_start);


