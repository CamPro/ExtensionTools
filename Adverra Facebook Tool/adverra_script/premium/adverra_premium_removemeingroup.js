function adverra_premium_removemeingroup(){
	localStorage.setItem('adverra_premium_removemeingroup_stop','0');
	 var data  = 	$('#adverra_premium_removemeingroup_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบโพสที่เราโพส?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removemeingroup_data').val().trim();
  adverra_premium_removemeingroup_delay_min  = 0;	
  adverra_premium_removemeingroup_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removemeingroup_data').focus();
		  return false;
	  }
	  
	  

	  

	  
	  
	 $('#adverra_premium_removemeingroup_report').html('');
	 count_adverra_premium_removemeingroup_error = 0;
	 count_adverra_premium_removemeingroup_success = 0;
	 count_adverra_premium_removemeingroup_all = 0;
	next_adverra_premium_removemeingroup(0);
	 
	  
	  }
})
	
	 
	
	
}


function next_adverra_premium_removemeingroup(loop_big){
	

	
		     dataxx  = 	$('#adverra_premium_removemeingroup_data').val().trim().split(/\r\n|\r|\n/);
	         adverra_premium_removemeingroup_data_countx =  dataxx.length;
			 
		
	 $('.adverra_premium_removemeingroup_time').show();
   progress_adverra_premium_removemeingroup = (100/adverra_premium_removemeingroup_data_countx)*(loop_big+1);

   $('#adverra_premium_removemeingroup_progress').attr('data-perc',Math.round(progress_adverra_premium_removemeingroup));
   if(progress_adverra_premium_removemeingroup > 0 && progress_adverra_premium_removemeingroup < 30){
       $('.adverra_premium_removemeingroup_bar').addClass('color3');
	   $('.adverra_premium_removemeingroup_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_removemeingroup>30 && progress_adverra_premium_removemeingroup < 80){
		  $('.adverra_premium_removemeingroup_bar').removeClass('color3');
	      $('.adverra_premium_removemeingroup_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_removemeingroup >= 80){
	    $('.adverra_premium_removemeingroup_bar').removeClass('color4');
		$('.adverra_premium_removemeingroup_bar').removeClass('color3');

	   
   }

   
			 
	if(loop_big<(adverra_premium_removemeingroup_data_countx)){
			 
	 progressbarx();
		 iziToast.info({title:'ค้นหาโพสจากกลุ่ม'+dataxx[loop_big],position: 'bottomRight',timeout: 2000,message: 'กลุ่มที่ '+(loop_big+1),});
		get_adverra_premium_removemeingroup(0,loop_big,dataxx)
		
	}
	else{
		
		
		
			setTimeout(function(){
title = 'ลบโพสจากกลุ่ม'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removemeingroup_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removemeingroup_success" style="font-size:20px;"> '+count_adverra_premium_removemeingroup_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removemeingroup_error" style="font-size:20px;"> '+count_adverra_premium_removemeingroup_error+' </span> </button>',

})
	  $('.adverra_premium_removemeingroup_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  
		
		
	
		
	}
}


function get_adverra_premium_removemeingroup(loop,loop_big,data){

	  var adverra_premium_removemeingroup_text = 	$('#adverra_premium_removemeingroup_text').val().trim();
	  var adverra_premium_removemeingroup_datestart = 	$('#adverra_premium_removemeingroup_datestart').val().trim();
	  var adverra_premium_removemeingroup_dateend = 	$('#adverra_premium_removemeingroup_dateend').val().trim();
	   dataxx  = 	$('#adverra_premium_removemeingroup_data').val().trim().split(/\r\n|\r|\n/);
	   adverra_premium_removemeingroup_data_countx =  dataxx.length;
	//   if(isNaN(dataxx[])){
		   
		   
	//   }
	  
	  if(adverra_premium_removemeingroup_text != ''){
		adverra_premium_removemeingroup_text =   adverra_premium_removemeingroup_text.split(',');
		find_text = '';
		$.each(adverra_premium_removemeingroup_text, function (index, value) {
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
			 adverra_premium_removemeingroup_type_textx = '';
			 adverra_premium_removemeingroup_type_linkx = '';
			 adverra_premium_removemeingroup_type_photox = '';
			 adverra_premium_removemeingroup_type_videox = '';
			 adverra_premium_removemeingroup_type_albumx = '';
	

	if($('#adverra_premium_removemeingroup_type_text').prop("checked") == true){
	
	         adverra_premium_removemeingroup_type_textx = ' strlen(attachment.fb_object_type) = 0 or';
	}
	if($('#adverra_premium_removemeingroup_type_link').prop("checked") == true){
	       adverra_premium_removemeingroup_type_linkx = "  attachment.fb_object_type = 'link' or";
	}
	if($('#adverra_premium_removemeingroup_type_photo').prop("checked") == true){
	         adverra_premium_removemeingroup_type_photox = " attachment.fb_object_type = 'photo' or";
	}
	if($('#adverra_premium_removemeingroup_type_video').prop("checked") == true){
	  adverra_premium_removemeingroup_type_videox = " attachment.fb_object_type = 'video' or";
	}
	if($('#adverra_premium_removemeingroup_type_album').prop("checked") == true){
		 adverra_premium_removemeingroup_type_albumx = " attachment.fb_object_type = 'album' or";
	
	}
	
	
	
	
where = adverra_premium_removemeingroup_type_textx+' '+adverra_premium_removemeingroup_type_linkx+' '+adverra_premium_removemeingroup_type_photox+' '+adverra_premium_removemeingroup_type_videox+' '+adverra_premium_removemeingroup_type_albumx;

             lastIndex2 = where.lastIndexOf("or");
             where = where.substring(0, lastIndex2);
		   where = 'and ('+ where+')';


	if($('#adverra_premium_removemeingroup_type_all').prop("checked") == true){
	         where = '';
			 adverra_premium_removemeingroup_type_textx = '';
			 adverra_premium_removemeingroup_type_linkx = '';
			 adverra_premium_removemeingroup_type_photox = '';
			 adverra_premium_removemeingroup_type_videox = '';
			 adverra_premium_removemeingroup_type_albumx = '';
	}

if(!isNaN(data[loop_big])){
	 page_token =  localStorage.getItem('token_intragram');
	url = "https://graph.facebook.com/fql?q=SELECT post_id, message,type FROM stream WHERE source_id = "+data[loop_big]+"  " +where+" " +find_text+" and (created_time >= '"+date_to_timestamp(adverra_premium_removemeingroup_datestart) +"'  and  created_time  <= '"+date_to_timestamp(adverra_premium_removemeingroup_dateend)+"')  and actor_id=me() LIMIT 0,100&access_token="+page_token+"&method=GET";

 console.log(url);
		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
if(typeof data[0] != 'undefined'){
send_adverra_premium_removemeingroup(loop,loop_big,data)		
	  }
	  else{
		  
		  loop_big++;
		 
		  next_adverra_premium_removemeingroup(loop_big);
		  
		  }



								})
	
}
else{
	
  next_adverra_premium_removemeingroup(loop_big);	
}
		
}










function send_adverra_premium_removemeingroup(loop,loop_big,data){


if(!check_internet()){
	adverra_premium_removemeingroup_time_out = setTimeout(function(){send_adverra_premium_removemeingroup(loop,loop_big,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_removemeingroup_time_out != 'undefined' ){
		clearTimeout(adverra_premium_removemeingroup_time_out);
}
  data  = 	data;
  adverra_premium_removemeingroup_delay_min  = 1;	
  adverra_premium_removemeingroup_delay_max  = 1;	
  adverra_premium_removemeingroup_delay  =  getRandomInt(adverra_premium_removemeingroup_delay_min, adverra_premium_removemeingroup_delay_max);
  if(typeof data[loop] != 'undefined' ){
if(typeof data[loop].post_id != 'undefined' ){
  p_id = data[loop].post_id.split('_')[0];
  target_id = data[loop].post_id.split('_')[1];
  
  }
else{
	
		get_adverra_premium_removemeingroup(0,loop_big,data)
	
	return false;
}
  
  }
  else{
	  get_adverra_premium_removemeingroup(0,loop_big,data)
	
	return false;
	  
	  
  }
  title = 'ลบโพส';
  count_adverra_premium_removemeingroup = data.length;
  
	if(localStorage.getItem('adverra_premium_removemeingroup_stop') == 1){
	clearTimeout(adverra_premium_removemeingroup_time_out);
	}
	else{
  
parms = 'group_id='+p_id+'&post_id='+target_id+'&story_dom_id=mall_post_'+target_id+'%3A6%3A0&entstory_context=%7B%22last_view_time%22%3A1567788341%2C%22fbfeed_context%22%3Atrue%2C%22location_type%22%3A2%2C%22outer_object_element_id%22%3A%22mall_post_'+target_id+'%3A6%3A0%22%2C%22object_element_id%22%3A%22mall_post_'+target_id+'%3A6%3A0%22%2C%22is_ad_preview%22%3Afalse%2C%22is_editable%22%3Afalse%2C%22mall_how_many_post_comments%22%3A2%2C%22bump_reason%22%3A0%2C%22enable_comment%22%3Afalse%2C%22has_preclick_auto_pivot_unit%22%3Afalse%2C%22story_width%22%3A502%2C%22frtp_eligible%22%3Afalse%2C%22tn-str%22%3A%22-R%22%7D&surface=group_post_chevron&location=2&nctr[_mod]=pagelet_group_mall&__user='+user_id+'&__a=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk&confirmed=1';

if(loop<(count_adverra_premium_removemeingroup)){
 $.ajax({
		url: "https://www.facebook.com/ajax/groups/mall/delete/",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_removemeingroup_all++;
		  
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' รายการนี้ '+target_id,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removemeingroup_all),});
                   report_appendno_pic('#adverra_premium_removemeingroup_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_removemeingroup_all)+'.'+target_id);
                   count_adverra_premium_removemeingroup_success++;
				     $('.adverra_premium_removemeingroup_success').text(count_adverra_premium_removemeingroup_success);
		  }
		  else{
			       $('.adverra_premium_removemeingroup_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removemeingroup_all),});
				   report_appendno_pic('#adverra_premium_removemeingroup_report','red',texteror,target_id,(count_adverra_premium_removemeingroup_all)+'.'+target_id);
                    count_adverra_premium_removemeingroup_error++;
					$('.adverra_premium_removemeingroup_error').text(count_adverra_premium_removemeingroup_error);
					next_adverra_premium_removemeingroup((loop_big+1));
					return false;
			  }
		

if(count_adverra_premium_removemeingroup_all >= $("#adverra_premium_removemeingroup_limit").val()){
				setTimeout(function(){
title = 'ลบโพสจากกลุ่ม'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removemeingroup_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removemeingroup_success" style="font-size:20px;"> '+count_adverra_premium_removemeingroup_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removemeingroup_error" style="font-size:20px;"> '+count_adverra_premium_removemeingroup_error+' </span> </button>',

})
	  $('.adverra_premium_removemeingroup_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}
  

		localStorage.setItem('adverra_premium_removemeingroup_loop',loop);
		localStorage.setItem('adverra_premium_removemeingroup_data',data);
		localStorage.setItem('adverra_premium_removemeingroup_loop_big',loop_big);
countdown_x(adverra_premium_removemeingroup_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_removemeingroup',count_adverra_premium_removemeingroup);



if(loop>=(count_adverra_premium_removemeingroup)){
	get_adverra_premium_removemeingroup(0,loop_big,data)

}
adverra_premium_removemeingroup_time_out = setTimeout(function(){send_adverra_premium_removemeingroup(loop,loop_big,data)}, (200)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_removemeingroup_next(){
	localStorage.setItem('adverra_premium_removemeingroup_stop','0');
	 var data  = 	$('#adverra_premium_removemeingroup_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ลบโพสที่เราโพสต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removemeingroup_data').val().trim();
  adverra_premium_removemeingroup_delay_min  = 0;	
  adverra_premium_removemeingroup_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removemeingroup_data').focus();
		  return false;
	  }
	  
	  

	  
	 //$('#adverra_premium_removemeingroup_report').html('');
	 //count_adverra_premium_removemeingroup_error = 0;
	// count_adverra_premium_removemeingroup_success = 0;

	 send_adverra_premium_removemeingroup(localStorage.getItem('adverra_premium_removemeingroup_loop'),localStorage.getItem('adverra_premium_removemeingroup_loop_big'),localStorage.getItem('adverra_premium_removemeingroup_data'));
	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_removemeingroup_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_removemeingroup_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_removemeingroup_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_removemeingroup_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_removemeingroup_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_removemeingroup_dateend').val(currentDate);
$('#adverra_premium_removemeingroup_datestart').val(currentDate_start);


