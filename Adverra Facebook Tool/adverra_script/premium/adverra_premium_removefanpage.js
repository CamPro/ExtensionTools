function adverra_premium_removefanpage(){
	localStorage.setItem('adverra_premium_removefanpage_stop','0');
	 var data  = 	$('#adverra_premium_removefanpage_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบโพสในแฟนเพจ?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removefanpage_data').val().trim();
  adverra_premium_removefanpage_delay_min  = 0;	
  adverra_premium_removefanpage_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Page อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removefanpage_data').focus();
		  return false;
	  }
	  
	  

	  

	  
	  
	 $('#adverra_premium_removefanpage_report').html('');
	 count_adverra_premium_removefanpage_error = 0;
	 count_adverra_premium_removefanpage_success = 0;
	 count_adverra_premium_removefanpage_all = 0;
	 get_adverra_premium_removefanpage(0);
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_removefanpage(loop){
	  var adverra_premium_removefanpage_data = 	$('#adverra_premium_removefanpage_data').val().trim();
	  var adverra_premium_removefanpage_text = 	$('#adverra_premium_removefanpage_text').val().trim();
	  var adverra_premium_removefanpage_datestart = 	$('#adverra_premium_removefanpage_datestart').val().trim();
	  var adverra_premium_removefanpage_dateend = 	$('#adverra_premium_removefanpage_dateend').val().trim();
	  if(adverra_premium_removefanpage_text != ''){
		adverra_premium_removefanpage_text =   adverra_premium_removefanpage_text.split(',');
		find_text = '';
		$.each(adverra_premium_removefanpage_text, function (index, value) {
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
			 adverra_premium_removefanpage_type_textx = '';
			 adverra_premium_removefanpage_type_linkx = '';
			 adverra_premium_removefanpage_type_photox = '';
			 adverra_premium_removefanpage_type_videox = '';
			 adverra_premium_removefanpage_type_albumx = '';
	

	if($('#adverra_premium_removefanpage_type_text').prop("checked") == true){
	
	         adverra_premium_removefanpage_type_textx = ' strlen(attachment.fb_object_type) = 0 or';
	}
	if($('#adverra_premium_removefanpage_type_link').prop("checked") == true){
	       adverra_premium_removefanpage_type_linkx = "  attachment.fb_object_type = 'link' or";
	}
	if($('#adverra_premium_removefanpage_type_photo').prop("checked") == true){
	         adverra_premium_removefanpage_type_photox = " attachment.fb_object_type = 'photo' or";
	}
	if($('#adverra_premium_removefanpage_type_video').prop("checked") == true){
	  adverra_premium_removefanpage_type_videox = " attachment.fb_object_type = 'video' or";
	}
	if($('#adverra_premium_removefanpage_type_album').prop("checked") == true){
		 adverra_premium_removefanpage_type_albumx = " attachment.fb_object_type = 'album' or";
	
	}
	
	
	
where = adverra_premium_removefanpage_type_textx+' '+adverra_premium_removefanpage_type_linkx+' '+adverra_premium_removefanpage_type_photox+' '+adverra_premium_removefanpage_type_videox+' '+adverra_premium_removefanpage_type_albumx;

             lastIndex2 = where.lastIndexOf("or");
             where = where.substring(0, lastIndex2);
		   where = 'and ('+ where+')';


	if($('#adverra_premium_removefanpage_type_all').prop("checked") == true){
	         where = '';
			 adverra_premium_removefanpage_type_textx = '';
			 adverra_premium_removefanpage_type_linkx = '';
			 adverra_premium_removefanpage_type_photox = '';
			 adverra_premium_removefanpage_type_videox = '';
			 adverra_premium_removefanpage_type_albumx = '';
	}

	
	 page_token =  localStorage.getItem('access_token');
	url = "https://graph.facebook.com/fql?q=SELECT post_id, message FROM stream WHERE source_id = "+adverra_premium_removefanpage_data+"  " +where+" " +find_text+" and (created_time >= '"+date_to_timestamp(adverra_premium_removefanpage_datestart) +"'  and  created_time  <= '"+date_to_timestamp(adverra_premium_removefanpage_dateend)+"') LIMIT 0,100&access_token="+page_token+"&method=GET";

 console.log(url);
		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
if((typeof data[0] != 'undefined')){
send_adverra_premium_removefanpage(loop,data)		
	  }
	  else{
			setTimeout(function(){
title = 'ลบโพสจากแฟนเพจ'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removefanpage_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removefanpage_success" style="font-size:20px;"> '+count_adverra_premium_removefanpage_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removefanpage_error" style="font-size:20px;"> '+count_adverra_premium_removefanpage_error+' </span> </button>',

})
	  $('.adverra_premium_removefanpage_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  }



								})
	
	
		
}










function send_adverra_premium_removefanpage(loop,data,deletex = 0){


if(!check_internet()){
	adverra_premium_removefanpage_time_out = setTimeout(function(){send_adverra_premium_removefanpage(loop,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_removefanpage_time_out != 'undefined' ){
		clearTimeout(adverra_premium_removefanpage_time_out);
}


  data  = 	data;
  adverra_premium_removefanpage_delay_min  = 1;	
  adverra_premium_removefanpage_delay_max  = 1;	
  adverra_premium_removefanpage_delay  =  getRandomInt(adverra_premium_removefanpage_delay_min, adverra_premium_removefanpage_delay_max);
if(typeof data[loop].post_id != 'undefined' ){
  p_id = data[loop].post_id.split('_')[0];
  target_id = data[loop].post_id.split('_')[1];
  
  }
else{
	
		get_adverra_premium_removefanpage(0);
	
	return false;
}



if($('#adverra_premium_removefanpage_report').html().indexOf(target_id) > -1){
	
			setTimeout(function(){
title = 'ลบโพสจากแฟนเพจ'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removefanpage_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removefanpage_success" style="font-size:20px;"> '+count_adverra_premium_removefanpage_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removefanpage_error" style="font-size:20px;"> '+count_adverra_premium_removefanpage_error+' </span> </button>',

})
	  $('.adverra_premium_removefanpage_time').hide();
	
return false;
}, (500)); 
	return false;
}




  
  title = 'ลบโพส';
  count_adverra_premium_removefanpage = data.length;
  
	if(localStorage.getItem('adverra_premium_removefanpage_stop') == 1){
	clearTimeout(adverra_premium_removefanpage_time_out);
	}
	else{
		
		if(deletex == 1){
		parms = 'confirm_photo_delete=1&photo_delete=%E0%B8%A5%E0%B8%9A&m_sess=&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__dyn=1KQdAmmcwgVU-4UpwGzWAgy79pkdgmxG6UO9wHwAxu3-UcodUbE6u7HzE24xm6Uhx61rxi1MwNwUx60yo88eE2RwVyUb852q3q5U2nweS787S78gwJwWwt8OE5m0hyeKdwle1AwXCwn8mwk888C&__req=c&__ajax__=AYmu7qtlwU4Mek696Zi7yBNhXj9p1cEeO-np3w07NOyOjeyCgO-SccyZ0WNWamJ89FsZvM_LEfyJB1B9yMeI5gbDNv4PqO2q1vUwYYv6pmbsOA&__user='+user_id;
		
		}
		else{
 parms = 'action=remove_content&also_remove_app=0&page_most_recent=1&profile_id='+p_id+'&story_dom_id=u_0_1f&story_fbid='+target_id+'&story_row_time=1406759018&av='+p_id+'&render_location=36&__user='+user_id+'&__a=1&confirmed=true&ban_user=0&fb_dtsg='+fb_dtsg;
		}
//parms = 'jazoest='+jazoest+'&fb_dtsg='+fb_dtsg+'&admin_notes=&__user='+user_id+'&__a=1&__req=8r&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3As1hofk%3Axzp2ik&__spin_r='+__rev+'&__spin_b=trunk';


if(deletex == 1){
		urlxs = 'https://m.facebook.com/a/photo.php?fbid='+target_id+'&refid=13';
		}
		else{
		urlxs = "https://www.facebook.com/ajax/timeline/take_action_on_story.php";
		}

if(loop<(count_adverra_premium_removefanpage)){
 $.ajax({
		url:urlxs,
		//url: "https://www.facebook.com/ajax/timeline/delete?identifier=S%3A_I"+data[loop].post_id+"&location=9&story_dom_id=u_2k_0&render_location=36&is_notification_preview=0&av="+adverra_premium_removefanpage_data,
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_removefanpage_all++;
		  
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' รายการนี้ '+target_id,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removefanpage_all),});
                   report_appendno_pic('#adverra_premium_removefanpage_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_removefanpage_all)+'.'+target_id);
                   count_adverra_premium_removefanpage_success++;
				     $('.adverra_premium_removefanpage_success').text(count_adverra_premium_removefanpage_success);
					 deletex = 0;
		  }
		  else{
			       $('.adverra_premium_removefanpage_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removefanpage_all),});
				   report_appendno_pic('#adverra_premium_removefanpage_report','red',texteror,target_id,(count_adverra_premium_removefanpage_all)+'.'+target_id);
                    count_adverra_premium_removefanpage_error++;
					$('.adverra_premium_removefanpage_error').text(count_adverra_premium_removefanpage_error);
					 deletex = 1;
					 loop = (loop-1);
					 
			  }
		

if(count_adverra_premium_removefanpage_all >= $("#adverra_premium_removefanpage_limit").val()){
				setTimeout(function(){
title = 'ลบโพสจากแฟนเพจ'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removefanpage_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removefanpage_success" style="font-size:20px;"> '+count_adverra_premium_removefanpage_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removefanpage_error" style="font-size:20px;"> '+count_adverra_premium_removefanpage_error+' </span> </button>',

})
	  $('.adverra_premium_removefanpage_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}
   $('.adverra_premium_removefanpage_time').show();
   progress_adverra_premium_removefanpage = (100/count_adverra_premium_removefanpage)*loop;
   $('#adverra_premium_removefanpage_progress').attr('data-perc',Math.round(progress_adverra_premium_removefanpage));
   if(progress_adverra_premium_removefanpage > 0 && progress_adverra_premium_removefanpage < 30){
       $('.adverra_premium_removefanpage_bar').addClass('color3');
	   $('.adverra_premium_removefanpage_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_removefanpage>30 && progress_adverra_premium_removefanpage < 80){
		  $('.adverra_premium_removefanpage_bar').removeClass('color3');
	      $('.adverra_premium_removefanpage_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_removefanpage >= 80){
	    $('.adverra_premium_removefanpage_bar').removeClass('color4');
		$('.adverra_premium_removefanpage_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_removefanpage_loop',loop);
		localStorage.setItem('adverra_premium_removefanpage_data',data);
countdown_x(adverra_premium_removefanpage_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_removefanpage',count_adverra_premium_removefanpage);



if(loop>=(count_adverra_premium_removefanpage)){
	get_adverra_premium_removefanpage(0);

}
adverra_premium_removefanpage_time_out = setTimeout(function(){send_adverra_premium_removefanpage(loop,data,deletex)}, (200)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_removefanpage_next(){
	localStorage.setItem('adverra_premium_removefanpage_stop','0');
	 var data  = 	$('#adverra_premium_removefanpage_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ลบโพสในแฟนเพจต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_removefanpage_data').val().trim();
  adverra_premium_removefanpage_delay_min  = 0;	
  adverra_premium_removefanpage_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Account อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_removefanpage_data').focus();
		  return false;
	  }
	  
	  

	  
	 //$('#adverra_premium_removefanpage_report').html('');
	 //count_adverra_premium_removefanpage_error = 0;
	// count_adverra_premium_removefanpage_success = 0;

	 send_adverra_premium_removefanpage(localStorage.getItem('adverra_premium_removefanpage_loop'),localStorage.getItem('adverra_premium_removefanpage_data'));
	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_removefanpage_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_removefanpage_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_removefanpage_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_removefanpage_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_removefanpage_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_removefanpage_dateend').val(currentDate);
$('#adverra_premium_removefanpage_datestart').val(currentDate_start);


