
function adverra_premium_invitelikeposttopage(){
	localStorage.setItem('adverra_premium_invitelikeposttopage_stop','0');
	 var data  = 	$('#adverra_premium_invitelikeposttopage_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการเชิญคนถูกใจโพสนี้มากดถูกใจเพจ?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_invitelikeposttopage_data').val().trim();
  adverra_premium_invitelikeposttopage_delay_min  = 0;	
  adverra_premium_invitelikeposttopage_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่ ID โพส',
})
		     $('#adverra_premium_invitelikeposttopage_data').focus();
		  return false;
	  }
	  
	  

	  

	  
	  
	 $('#adverra_premium_invitelikeposttopage_report').html('');
	 count_adverra_premium_invitelikeposttopage_error = 0;
	 count_adverra_premium_invitelikeposttopage_success = 0;
	 count_adverra_premium_invitelikeposttopage_all = 0;
	 	localStorage.setItem('adverra_premium_invitelikeposttopage_loop',0);
		localStorage.setItem('adverra_premium_invitelikeposttopage_data','');
		
		
		
		
		
		
	 get_adverra_premium_invitelikeposttopage(0);
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_invitelikeposttopage(loop){
post_id = $('#adverra_premium_invitelikeposttopage_data').val().trim();
limit = $('#adverra_premium_invitelikeposttopage_limit').val().trim();
get_adverra_premium_invitelikeposttopage_from = get_data_from(post_id);

get_adverra_premium_invitelikeposttopage_fromname = get_adverra_premium_invitelikeposttopage_from.split('||')[0];
get_adverra_premium_invitelikeposttopage_fromid = get_adverra_premium_invitelikeposttopage_from.split('||')[1];
post_id = get_adverra_premium_invitelikeposttopage_from.split('||')[2];
	 page_token =  localStorage.getItem('access_token');
	//url = 'https://graph.facebook.com/fql?q=SELECT user_id,post_id FROM like WHERE object_id = '+post_id+'  LIMIT '+limit+'&access_token='+page_token;
url = 'https://www.facebook.com/ufi/reaction/profile/browser/fetch/?limit=1000&reaction_type=&total_count=200&ft_ent_identifier='+post_id;
 
 
datapara = '__user='+user_id+'&__a=1&__req=e7&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';
$.ajax({
		url:url,
		data:datapara,
        type: "post", 
complete: function(results) {
	
	  var data = results.responseText;
	  
if(typeof data.indexOf('invitee') != -1){
		
		
		if(!data.match(/invitee=\d+/gm)){
			  Swal.fire({
   title:'ไม่สามารถเชิญคนถูกใจ<br>จากโพสนี้ได้' ,
  type: 'error',
  html:'<div style="text-align:left">อาจเป็นเพราะดังนี้<br>1.โพสนี้อาจเชิญหมดแล้ว<br> 2.ID Post ที่เอามาใส่ อาจไม่ใช่โพสในเพจที่เฟสนี้เป็นแอดมิน <br>3.ถ้าเป็นวิดีโอในแฟนเพจที่เราเป็นแอดมินแล้ว แต่ยังไม่ได้ ให้คอมเม้นวิดีโอนั้นสัก 1 เม้น แล้วค่อยลองกด<br>4.ระบบจะดึงมาแค่ คนกด like โพสนั้นล่าสุด 2000 คนถ้าคนที่ยังไม่ได้เชิญมากกว่านั้นระบบจะไม่ดึงมา</div>',

})
		return false;	
		}
		
		data  = data.match(/invitee=\d+/gm);
		console.log(data)
send_adverra_premium_invitelikeposttopage(loop,data)		
	  }
	  else{
			setTimeout(function(){
title = 'เชิญคนถูกใจโพสมากดถูกใจแฟนเพจ'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_invitelikeposttopage_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_invitelikeposttopage_success" style="font-size:20px;"> '+count_adverra_premium_invitelikeposttopage_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_invitelikeposttopage_error" style="font-size:20px;"> '+count_adverra_premium_invitelikeposttopage_error+' </span> </button>',

})
	  $('.adverra_premium_invitelikeposttopage_time').hide();
	
return false;
}, (500)); 
		  
		  
		  
	  }

}

								})
	
	
		
}










function send_adverra_premium_invitelikeposttopage(loop,data){
datax = data;

if(!check_internet()){
	adverra_premium_invitelikeposttopage_time_out = setTimeout(function(){send_adverra_premium_invitelikeposttopage(loop,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_invitelikeposttopage_time_out != 'undefined' ){
		clearTimeout(adverra_premium_invitelikeposttopage_time_out);
}
  data  = 	data;
  adverra_premium_invitelikeposttopage_delay_min  = 1;	
  adverra_premium_invitelikeposttopage_delay_max  = 1;	
  adverra_premium_invitelikeposttopage_delay  =  getRandomInt(adverra_premium_invitelikeposttopage_delay_min, adverra_premium_invitelikeposttopage_delay_max);

	p_id = data[loop].replace('invitee=','');
   p_id = p_id;
  target_id = p_id;
  name = p_id;

  
  title = 'เชิญคนถูกใจโพสมากดถูกใจแฟนเพจ'+get_adverra_premium_invitelikeposttopage_fromname;
  count_adverra_premium_invitelikeposttopage = data.length;
  
	if(localStorage.getItem('adverra_premium_invitelikeposttopage_stop') == 1){
	clearTimeout(adverra_premium_invitelikeposttopage_time_out);
	}
	else{
  
  adverra_premium_invitelikeposttopage_data  = 	spintax($('#adverra_premium_invitelikeposttopage_data').val().trim());

parms = 'invitee='+p_id+'&page_id='+get_adverra_premium_invitelikeposttopage_fromid+'&ref=likes_dialog&__user='+user_id+'&content_id='+post_id+'&__a=1&__req=kc&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<=(count_adverra_premium_invitelikeposttopage)){
 $.ajax({
		url: "https://www.facebook.com/pages/post_like_invite/send/",
        type: "post",
        data:parms,
		  complete: function(data1){
			
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_invitelikeposttopage_all++;
		  
		  if(texteror.indexOf('365194763546571')>-1){
			  
			  					   Swal.fire({
   title:'หยุดระบบชั่วคราว' ,
  type: 'error',
  html:'เนื่องจาก Facebook จำกัดการเชิญ รอ 24 ชั่วโมงถึงจะใช้ได้อีกครั้ง หรือใช้ Admin อื่นในการเชิญแทน'

})
					 return false;
			  
		  }
		  
		  
		  
		  if(texteror == ''){
			      		
			       iziToast.success({title: title+' '+name+' รายการนี้ ',position: 'bottomRight',timeout: 2000,message:'',});
                   report_append('#adverra_premium_invitelikeposttopage_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_invitelikeposttopage_all)+'.'+name);
                   count_adverra_premium_invitelikeposttopage_success++;
				     $('.adverra_premium_invitelikeposttopage_success').text(count_adverra_premium_invitelikeposttopage_success+'/'+count_adverra_premium_invitelikeposttopage);

					 
		  }
		  else{
			  
			       $('.adverra_premium_invitelikeposttopage_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_invitelikeposttopage_all),});
				   report_append('#adverra_premium_invitelikeposttopage_report','red',texteror,target_id,(count_adverra_premium_invitelikeposttopage_all)+'.'+name);
                    count_adverra_premium_invitelikeposttopage_error++;
					$('.adverra_premium_invitelikeposttopage_error').text(count_adverra_premium_invitelikeposttopage_error+'/'+count_adverra_premium_invitelikeposttopage);
			
			  }
		



   $('.adverra_premium_invitelikeposttopage_time').show();
   progress_adverra_premium_invitelikeposttopage = (100/count_adverra_premium_invitelikeposttopage)*loop;
   $('#adverra_premium_invitelikeposttopage_progress').attr('data-perc',Math.round(progress_adverra_premium_invitelikeposttopage));
   if(progress_adverra_premium_invitelikeposttopage > 0 && progress_adverra_premium_invitelikeposttopage < 30){
       $('.adverra_premium_invitelikeposttopage_bar').addClass('color3');
	   $('.adverra_premium_invitelikeposttopage_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_invitelikeposttopage>30 && progress_adverra_premium_invitelikeposttopage < 80){
		  $('.adverra_premium_invitelikeposttopage_bar').removeClass('color3');
	      $('.adverra_premium_invitelikeposttopage_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_invitelikeposttopage >= 80){
	    $('.adverra_premium_invitelikeposttopage_bar').removeClass('color4');
		$('.adverra_premium_invitelikeposttopage_bar').removeClass('color3');

	   
   }
  

    progressbarx();
	localStorage.setItem('adverra_premium_invitelikeposttopage_loop',loop);
	countdown_x(adverra_premium_invitelikeposttopage_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_invitelikeposttopage',count_adverra_premium_invitelikeposttopage);
limit = $('#adverra_premium_invitelikeposttopage_limit').val().trim();
	if((loop >= count_adverra_premium_invitelikeposttopage)  ||  (loop >= limit)){
				setTimeout(function(){
title = 'เชิญคนถูกใจโพสมากดถูกใจแฟนเพจ'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_invitelikeposttopage_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_invitelikeposttopage_success" style="font-size:20px;"> '+count_adverra_premium_invitelikeposttopage_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_invitelikeposttopage_error" style="font-size:20px;"> '+count_adverra_premium_invitelikeposttopage_error+' </span> </button>',

})
	  $('.adverra_premium_invitelikeposttopage_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}


		localStorage.setItem('adverra_premium_invitelikeposttopage_loop',loop);
		localStorage.setItem('adverra_premium_invitelikeposttopage_data',data);

countdown_x(adverra_premium_invitelikeposttopage_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_invitelikeposttopage',count_adverra_premium_invitelikeposttopage);



if(loop>=(count_adverra_premium_invitelikeposttopage)){
	get_adverra_premium_invitelikeposttopage(0);

}
adverra_premium_invitelikeposttopage_time_out = setTimeout(function(){send_adverra_premium_invitelikeposttopage(loop,data)}, (500)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_invitelikeposttopage_next(){
	localStorage.setItem('adverra_premium_invitelikeposttopage_stop','0');
	 var data  = 	$('#adverra_premium_invitelikeposttopage_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "เชิญคนถูกใจโพสนี้มากดถูกใจเพจต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  data  = 	$('#adverra_premium_invitelikeposttopage_data').val().trim();
  adverra_premium_invitelikeposttopage_delay_min  = 0;	
  adverra_premium_invitelikeposttopage_delay_max  = 0;
	  if(data == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่ ID โพส',
})
		     $('#adverra_premium_invitelikeposttopage_data').focus();
		  return false;
	  }
	  
	  

send_adverra_premium_invitelikeposttopage(localStorage.getItem('adverra_premium_invitelikeposttopage_loop'),localStorage.getItem('adverra_premium_invitelikeposttopage_data').split(','));		
	  
	
	
/////////

	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_invitelikeposttopage_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_invitelikeposttopage_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_invitelikeposttopage_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_invitelikeposttopage_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_invitelikeposttopage_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_invitelikeposttopage_dateend').val(currentDate);
$('#adverra_premium_invitelikeposttopage_datestart').val(currentDate_start);


