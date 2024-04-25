$('#adverra_premium_birthday_data').val(localStorage.getItem('bd'));
function adverra_premium_birthday(){
	localStorage.setItem('adverra_premium_birthday_stop','0');
	 var data  = 	$('#adverra_premium_birthday_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการอวยพรวันเกิดเพื่อนที่เกิดวันนี้?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_birthday_data').val().trim();
  adverra_premium_birthday_delay_min  = 0;	
  adverra_premium_birthday_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่คำอวยพรวันเกิด',
})
		     $('#adverra_premium_birthday_data').focus();
		  return false;
	  }
	  
	  

	  

	  
	  
	 $('#adverra_premium_birthday_report').html('');
	 count_adverra_premium_birthday_error = 0;
	 count_adverra_premium_birthday_success = 0;
	 count_adverra_premium_birthday_all = 0;
	 	localStorage.setItem('adverra_premium_birthday_loop',0);
		localStorage.setItem('adverra_premium_birthday_data','');
	 get_adverra_premium_birthday(0);
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_birthday(loop){
bdtday = get_datetoay();
	 page_token =  localStorage.getItem('access_token');
	url = "https://graph.facebook.com/fql?q=SELECT uid, name,pic_square, birthday_date FROM user WHERE strpos(birthday_date,'"+bdtday+"/') >=0 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())&access_token="+page_token+"&method=GET";

 console.log(url)

		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
if(typeof data[0] != 'undefined'){
send_adverra_premium_birthday(loop,data)		
	  }
	  else{
			setTimeout(function(){
title = 'อวยพรวันเกิดเพื่อนวันนี้'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_birthday_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_birthday_success" style="font-size:20px;"> '+count_adverra_premium_birthday_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_birthday_error" style="font-size:20px;"> '+count_adverra_premium_birthday_error+' </span> </button>',

})
	  $('.adverra_premium_birthday_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  }



								})
	
	
		
}










function send_adverra_premium_birthday(loop,data){
datax = data;

if(!check_internet()){
	adverra_premium_birthday_time_out = setTimeout(function(){send_adverra_premium_birthday(loop,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_birthday_time_out != 'undefined' ){
		clearTimeout(adverra_premium_birthday_time_out);
}
  data  = 	data;
  adverra_premium_birthday_delay_min  = 1;	
  adverra_premium_birthday_delay_max  = 1;	
  adverra_premium_birthday_delay  =  getRandomInt(adverra_premium_birthday_delay_min, adverra_premium_birthday_delay_max);

   p_id = data[loop].uid;
  target_id = data[loop].uid;
  name = data[loop].name;
  
  
  title = 'อวยพรวันเกิดเพื่อน';
  count_adverra_premium_birthday = data.length;
  
	if(localStorage.getItem('adverra_premium_birthday_stop') == 1){
	clearTimeout(adverra_premium_birthday_time_out);
	}
	else{
  
  adverra_premium_birthday_data  = 	spintax($('#adverra_premium_birthday_data').val().trim());

parms = 'jazoest='+jazoest+'&fb_dtsg='+fb_dtsg+'&walltarget='+target_id+'&render_notif_only=1&birthday=1&message_text='+adverra_premium_birthday_data+'&message='+adverra_premium_birthday_data+'&source=birthdays_home&post=Post&__user='+user_id+'&__a=1&__req=9l&__be=1&__rev='+__rev+'&__s=%3A9v518i%3Ayltr92&__hsi=6730300757099527843-0&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<=(count_adverra_premium_birthday)){
 $.ajax({
		url: "https://www.facebook.com/ajax/stream/inline.php",
        type: "post",
        data:parms,
		  complete: function(data1){
			localStorage.setItem('bd',adverra_premium_birthday_data);
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_birthday_all++;
		  
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' '+name+' รายการนี้ ',position: 'bottomRight',timeout: 2000,message:'',});
                   report_append('#adverra_premium_birthday_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_birthday_all)+'.'+name);
                   count_adverra_premium_birthday_success++;
				     $('.adverra_premium_birthday_success').text(count_adverra_premium_birthday_success+'/'+count_adverra_premium_birthday);
		  }
		  else{
			       $('.adverra_premium_birthday_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_birthday_all),});
				   report_append('#adverra_premium_birthday_report','red',texteror,target_id,(count_adverra_premium_birthday_all)+'.'+name);
                    count_adverra_premium_birthday_error++;
					$('.adverra_premium_birthday_error').text(count_adverra_premium_birthday_error+'/'+count_adverra_premium_birthday);
			  }
		



   $('.adverra_premium_birthday_time').show();
   progress_adverra_premium_birthday = (100/count_adverra_premium_birthday)*loop;
   $('#adverra_premium_birthday_progress').attr('data-perc',Math.round(progress_adverra_premium_birthday));
   if(progress_adverra_premium_birthday > 0 && progress_adverra_premium_birthday < 30){
       $('.adverra_premium_birthday_bar').addClass('color3');
	   $('.adverra_premium_birthday_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_birthday>30 && progress_adverra_premium_birthday < 80){
		  $('.adverra_premium_birthday_bar').removeClass('color3');
	      $('.adverra_premium_birthday_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_birthday >= 80){
	    $('.adverra_premium_birthday_bar').removeClass('color4');
		$('.adverra_premium_birthday_bar').removeClass('color3');

	   
   }
  

    progressbarx();
	localStorage.setItem('adverra_premium_birthday_loop',loop);
	countdown_x(adverra_premium_birthday_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_birthday',count_adverra_premium_birthday);
	
	if(loop >= count_adverra_premium_birthday){
				setTimeout(function(){
title = 'อวยพรวันเกิดเพื่อนวันนี้'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_birthday_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_birthday_success" style="font-size:20px;"> '+count_adverra_premium_birthday_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_birthday_error" style="font-size:20px;"> '+count_adverra_premium_birthday_error+' </span> </button>',

})
	  $('.adverra_premium_birthday_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}


		localStorage.setItem('adverra_premium_birthday_loop',loop);
		localStorage.setItem('adverra_premium_birthday_data','');

countdown_x(adverra_premium_birthday_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_birthday',count_adverra_premium_birthday);



if(loop>=(count_adverra_premium_birthday)){
	get_adverra_premium_birthday(0);

}
adverra_premium_birthday_time_out = setTimeout(function(){send_adverra_premium_birthday(loop,data)}, (200)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_birthday_next(){
	localStorage.setItem('adverra_premium_birthday_stop','0');
	 var data  = 	$('#adverra_premium_birthday_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "อวยพรวันเกิดเพื่อนที่เกิดวันนี้ต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_birthday_data').val().trim();
  adverra_premium_birthday_delay_min  = 0;	
  adverra_premium_birthday_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่คำอวยพรวันเกิด',
})
		     $('#adverra_premium_birthday_data').focus();
		  return false;
	  }
	  
	  

	  
	 //$('#adverra_premium_birthday_report').html('');
	 //count_adverra_premium_birthday_error = 0;
	// count_adverra_premium_birthday_success = 0;

////////////////
bdtday = get_datetoay();
	 page_token =  localStorage.getItem('access_token');
	url = "https://graph.facebook.com/fql?q=SELECT uid, name,pic_square, birthday_date FROM user WHERE strpos(birthday_date,'"+bdtday+"') >=0 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())&access_token="+page_token+"&method=GET";

 console.log(url)

		$.getJSON(url, function(results) {
	
	  var data = results.data;
	  
if(typeof data[0] != 'undefined'){
send_adverra_premium_birthday(localStorage.getItem('adverra_premium_birthday_loop'),data);		
	  }
	  else{
			setTimeout(function(){
title = 'อวยพรวันเกิดเพื่อนวันนี้'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_birthday_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_birthday_success" style="font-size:20px;"> '+count_adverra_premium_birthday_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_birthday_error" style="font-size:20px;"> '+count_adverra_premium_birthday_error+' </span> </button>',

})
	  $('.adverra_premium_birthday_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  }



								})
	
	
/////////

	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_birthday_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_birthday_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_birthday_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_birthday_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_birthday_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_birthday_dateend').val(currentDate);
$('#adverra_premium_birthday_datestart').val(currentDate_start);


