function adverra_premium_removefriend(){
	localStorage.setItem('adverra_premium_removefriend_stop','0');
	// var data  = 	$('#adverra_premium_removefriend_data').val().trim();
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบเพื่อนตามที่ตั้งค่าไว้?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {


	  

	  
	  
	 $('#adverra_premium_removefriend_report').html('');
	 count_adverra_premium_removefriend_error = 0;
	 count_adverra_premium_removefriend_success = 0;
	 count_adverra_premium_removefriend_all = 0;
	 setTimeout(function(){ get_adverra_premium_removefriend(0); }, 1000);
	
	 
	  
	  }
})
	
	 
	
	
}





function get_adverra_premium_removefriend(loop){






 page_token =  localStorage.getItem('access_token');
 var date3m = Math.round(+new Date()/1000)-(90*24*60*60);

        friend  = fqlquery('https://graph.facebook.com/fql?q=SELECT uid FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 =me())&access_token='+page_token);
         if(typeof friend.data[0] != 'undefined' ){
			     user_data =  friend.data;
			 
			 }
user_idf_array_foreignernotthai = [];
user_idf_array_join = [];
user_all_resultcl = [];
user_idf_array_checkpostfriendall = [];
    send_adverra_premium_removefriend_foreignernotthaix = 1;
	send_adverra_premium_removefriend_nothavejoinx      = 1;
	send_adverra_premium_removefriend_likeandcommentx =   1 ;
	send_adverra_premium_removefriend_checkpostfriendx =  1 ;
 	if($('#adverra_premium_removefriend_type_3').prop("checked") == true){
		   send_adverra_premium_removefriend_foreignernotthaix = 0;
	       send_adverra_premium_removefriend_foreignernotthai();
	}
	
	
	
	if($('#adverra_premium_removefriend_type_4').prop("checked") == true){
		send_adverra_premium_removefriend_nothavejoinx = 0;
	 send_adverra_premium_removefriend_nothavejoin();
	}
 
 
	if($('#adverra_premium_removefriend_type_1').prop("checked") == true){
	send_adverra_premium_removefriend_likeandcommentx = 0;
	   send_adverra_premium_removefriend_likeandcomment();
	}
	
	
	if($('#adverra_premium_removefriend_type_2').prop("checked") == true){
		send_adverra_premium_removefriend_checkpostfriendx = 0;
	     send_adverra_premium_removefriend_checkpostfriend(user_data);
	}


	
	check_allremovefriend_type();
	
	
 
 
   user_idf_array_foreignernotthai= [];
  function send_adverra_premium_removefriend_foreignernotthai(){
 
          	$.getJSON("https://graph.facebook.com/fql?q=SELECT uid,name,current_location FROM user WHERE current_location != '' and current_location.country != 'Thailand' and uid in (SELECT uid2 FROM friend WHERE uid1=me())&access_token="+page_token, function(results) {
								
					if(typeof results.data[0] != 'undefined' ){		
              $.each(results.data, function (i, data_info) {
						if(user_idf_array_foreignernotthai.indexOf(data_info.uid) == -1  && data_info.uid != user_id ){
						user_idf_array_foreignernotthai.push(data_info.uid);	 
						}
			 });
				
				
				}
				send_adverra_premium_removefriend_foreignernotthaix = 1;
				 console.log('user_idf_array_foreignernotthai:'+user_idf_array_foreignernotthai);																																																				 
		});
			 
  iziToast.info({title:'กำลังตรวจสอบเพื่อนที่เป็นคนต่างชาติ',  position:'topCenter',timeout: 3000,message:loop,});
  }
 
 
 
 
 user_idf_array_checkpostfriend = [];
 user_idf_array_checkpostfriendall = [];
 function send_adverra_premium_removefriend_checkpostfriend(user_data,loop = 0){
	$.getJSON("https://graph.facebook.com/fql?q=SELECT uid,status_id,time FROM status WHERE uid =   '"+user_data[loop].uid+"' and time  > "+date3m+" limit 1&access_token="+page_token, function(results) {
								
					if(typeof results.data[0] != 'undefined' ){		
              $.each(results.data, function (i, data_info) {
						if(user_idf_array_checkpostfriend.indexOf(data_info.uid) == -1  && data_info.uid != user_id ){
						user_idf_array_checkpostfriend.push(data_info.uid);	 
						}
			 });
																																																																	             }
			  	loop++;
			  
			  if(loop<user_data.length){
		   send_adverra_premium_removefriend_checkpostfriend(user_data,loop);
	}
	else{
		     $.each(user_data, function (i, user_data) {
				if(user_idf_array_checkpostfriend.indexOf(user_data.uid) == -1){
					user_idf_array_checkpostfriendall.push(user_data.uid);	 
				}
		          
		 });
 send_adverra_premium_removefriend_checkpostfriendx = 1;
   console.log(user_idf_array_checkpostfriendall);
		

		
		
		
		}
	
			
	if(loop%5==0){
 iziToast.info({title:'กำลังเช็คเพื่อนที่ไม่มีความเคลื่อนไหวมากกว่า 3 เดือน ตรวจสอบแล้ว '+loop+' คน',  position:'topCenter',timeout: 3000,message:loop,});
	}  
	
	
																																																										 		
								
								
							
																																																										 
		});
																																																										 
	
}



 
 
 
 
 
 
 
 function send_adverra_premium_removefriend_nothavejoin(){
	 user_idf_array_join = [];
             iziToast.info({title:'กำลังตรวจสอบเพื่อนที่ไม่มีเพื่อนร่วมกับเฟสของคุณ',  position:'topCenter',timeout: 5000,message:loop,});
       post_nothavejoin  = fqlquery('https://graph.facebook.com/fql?q=SELECT uid, mutual_friend_count FROM user WHERE mutual_friend_count = 0 and uid IN (SELECT uid2 FROM friend WHERE  uid1=me())&access_token='+page_token);
         if(typeof post_nothavejoin.data[0] != 'undefined' ){
	
	             post_nothavejoin =  post_nothavejoin.data;
				  $.each(post_nothavejoin, function (i, data_infojoin) {
						if(user_idf_array_join.indexOf(data_infojoin.uid) == -1  && data_infojoin.uid != user_id ){
						user_idf_array_join.push(data_infojoin.uid);	 
						}
			 });
				  send_adverra_premium_removefriend_nothavejoinx = 1;
	                console.log('join:'+user_idf_array_join);
					console.log('count:'+user_idf_array_join.length);
           }



 
 }

 
 

	
	
 
 function send_adverra_premium_removefriend_likeandcomment(){



 	 iziToast.info({title:'กำลังหาตรวจสอบเเพื่อนที่ไม่ Comment ในเฟสของคุณ',  position:'topCenter',timeout: 3000,message:'',});
 post_datac  = fqlquery('https://graph.facebook.com/fql?q=SELECT post_id FROM stream WHERE source_id=me() and(comments.count > 0) &access_token='+page_token);
if(typeof post_datac.data[0] != 'undefined' ){
	
	post_datac =  post_datac.data;
	send_adverra_premium_removefriend_comment(post_datac);
}
else{

user_idf_array_comment = [1];

}


 
 
 
 
 
 
 
 
 
  iziToast.info({title:'กำลังตรวจสอบเพื่อนที่ไม่กด Like ในเฟสของคุณ',  position:'topCenter',timeout: 3000,message:loop,});
	post_datal  = fqlquery('https://graph.facebook.com/fql?q=SELECT post_id FROM stream WHERE source_id=me() and(likes.count > 0) &access_token='+page_token);

if(typeof post_datal.data[0] != 'undefined' ){
	
	post_datal =  post_datal.data;
	send_adverra_premium_removefriend_like(post_datal);
}
else{

user_idf_array_like = [1];
	 send_adverra_premium_removefriend_likeandcommentx = 1;
		send_adverra_premium_removefriend_lcAll(user_data);
	
	
}






user_idf_array_like = [];
user_idf_array_comment = [];



function send_adverra_premium_removefriend_comment(post_data,loop = 0){

	$.getJSON("https://graph.facebook.com/fql?q=SELECT user_id FROM like where post_id = '"+post_data[loop].post_id+"' limit 1000&access_token="+page_token, function(results) {
              $.each(results.data, function (i, data_info) {
						if(user_idf_array_comment.indexOf(data_info.user_id) == -1  && data_info.user_id != user_id ){
						user_idf_array_comment.push(data_info.user_id);	 
						}
			 });
			  	loop++;
			  
			  if(loop<post_data.length){
		   send_adverra_premium_removefriend_comment(post_data,loop);
	}
	else{
		  //console.log('Comment:'+user_idf_array_comment);
		
	}
	
			
	if(loop%15==0){
 iziToast.info({title:'กำลังหาตรวจสอบเเพื่อนที่ไม่ Comment ในเฟสของคุณ',  position:'topCenter',timeout: 3000,message:loop,});
	}  
		});

	
}








function send_adverra_premium_removefriend_like(post_data,loop = 0){

	$.getJSON("https://graph.facebook.com/fql?q=SELECT user_id FROM like where post_id = '"+post_data[loop].post_id+"' limit 1000&access_token="+page_token, function(results) {
              $.each(results.data, function (i, data_info) {
						if(user_idf_array_like.indexOf(data_info.user_id) == -1  && data_info.user_id != user_id ){
						user_idf_array_like.push(data_info.user_id);	 
						}
			 });
			  	loop++;
			  
			  if(loop<post_data.length){
		   send_adverra_premium_removefriend_like(post_data,loop);
	}
	else{
		send_adverra_premium_removefriend_lcAll(user_data);
		
	}
	
			
	if(loop%10==0){
 iziToast.info({title:'กำลังตรวจสอบเพื่อนที่ไม่กด Like ในเฟสของคุณ',  position:'topCenter',timeout: 3000,message:loop,});
	}  
		});

	
}










 }
 
 
 
 
 
function send_adverra_premium_removefriend_lcAll(user_data){
	user_all = [];
	user_all_resultcl = [];
	user_all = uniquex(user_idf_array_like.concat(user_idf_array_comment))
if(user_all.length>0){
     $.each(user_data, function (i, user_data) {
					
				if(user_all.indexOf(user_data.uid) == -1){
					user_all_resultcl.push(user_data.uid);	 
				}
		          
		 });
}

	 send_adverra_premium_removefriend_likeandcommentx = 1;
   console.log(user_all_resultcl);
}


 
 
}

		












function  check_allremovefriend_type(){
	
		if(send_adverra_premium_removefriend_foreignernotthaix == 1 
		   && send_adverra_premium_removefriend_nothavejoinx == 1 
		   && send_adverra_premium_removefriend_likeandcommentx == 1 
		   && send_adverra_premium_removefriend_checkpostfriendx == 1){
user_all_removefriend1=[];
user_all_removefriend2=[];
user_all_removefriend_result=[];
user_all_removefriend1 = uniquex(user_idf_array_foreignernotthai.concat(user_idf_array_join))
user_all_removefriend2 = uniquex(user_all_resultcl.concat(user_idf_array_checkpostfriendall))
user_all_removefriend_result = uniquex(user_all_removefriend1.concat(user_all_removefriend2))




adverra_premium_removefriend_data_remove     = 	$('#adverra_premium_removefriend_data_remove').val().trim().split(/\r\n|\r|\n/);
adverra_premium_removefriend_data_notremove  = 	$('#adverra_premium_removefriend_data_notremove').val().trim().split(/\r\n|\r|\n/);

user_all_removefriend_result = uniquex(user_all_removefriend_result.concat(adverra_premium_removefriend_data_remove))

/////////////


	user_all_removefriend_resultxx = [];
    $.each(user_all_removefriend_result, function (i, user_all_removefriend_resultx) {
						if(adverra_premium_removefriend_data_notremove.indexOf(user_all_removefriend_resultx) == -1  ){
						user_all_removefriend_resultxx.push(user_all_removefriend_resultx);	 
						}
			 });
	
	user_all_removefriend_result = user_all_removefriend_resultxx;


///////////////
console.log(user_all_removefriend_result);
	           Swal.fire({
  title: 'คุณต้องารลบเพื่อน<br>ตามจำนวนด้านล่างนี้?',
  html: "ระบบตรวจสอบเพื่อนตามคุณสมบัติที่คุณเลือก<br>ได้จำนวนทั้งสิ้น "+user_all_removefriend_result.length+' คน จากเพื่อนที่มีทั้งหมด '+user_data.length+' คน คุณจะลบทั้งหมดใช่หรือไม่',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	  send_adverra_premium_removefriend(0,user_all_removefriend_result)
	  
	  
	  
	  }
})
	

			
		}
		else{
			
		 setTimeout(function(){  check_allremovefriend_type()}, 1000);
			
			
			}
		
		
	}




function get_adverra_premium_removefriend_success(){
	
	
				setTimeout(function(){
title = 'ลบเพื่อนต่างๆตามที่ตั้งค่า'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removefriend_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removefriend_success" style="font-size:20px;"> '+count_adverra_premium_removefriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removefriend_error" style="font-size:20px;"> '+count_adverra_premium_removefriend_error+' </span> </button>',

})
	  $('.adverra_premium_removefriend_time').hide();
	
return false;
	}, (2000)); 
}


function send_adverra_premium_removefriend(loop,data){


if(!check_internet()){
	adverra_premium_removefriend_time_out = setTimeout(function(){send_adverra_premium_removefriend(loop,data)}, (1000*5));
	return false;
}




if(typeof adverra_premium_removefriend_time_out != 'undefined' ){
		clearTimeout(adverra_premium_removefriend_time_out);
}
  data  = 	data;


if(typeof data[loop] != 'undefined' ){
  p_id = data[loop];
  target_id = data[loop];
  
  }
else{
	
		get_adverra_premium_removefriend_success(0);
	
	return false;
}
  
  title = 'ลบเพื่อน';
  count_adverra_premium_removefriend = data.length;
  
	if(localStorage.getItem('adverra_premium_removefriend_stop') == 1){
	clearTimeout(adverra_premium_removefriend_time_out);
	}
	else{
  
parms = 'uid='+target_id+'&unref=bd_profile_button&floc=profile_button&nctr[_mod]=pagelet_timeline_profile_actions&__user='+user_id+'&__a=1&__csr=&__req=1y&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';

if(loop<(count_adverra_premium_removefriend)){
 $.ajax({
		url: "https://www.facebook.com/ajax/profile/removefriendconfirm.php",
        type: "post",
        data:parms,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText);
		  count_adverra_premium_removefriend_all++;
		  
		  if(texteror == ''){
			      
			       iziToast.success({title: title+' รายการนี้ '+target_id,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removefriend_all),});
                   report_appendno_pic('#adverra_premium_removefriend_report','green',title+'สำเร็จ',target_id,(count_adverra_premium_removefriend_all)+'.'+target_id);
                   count_adverra_premium_removefriend_success++;
				     $('.adverra_premium_removefriend_success').text(count_adverra_premium_removefriend_success+'/'+data.length);
		  }
		  else{
			       $('.adverra_premium_removefriend_success').text();
				   iziToast.error({title:texteror,position: 'bottomRight',timeout: 2000,message: 'รายการที่ '+(count_adverra_premium_removefriend_all),});
				   report_appendno_pic('#adverra_premium_removefriend_report','red',texteror,target_id,(count_adverra_premium_removefriend_all)+'.'+target_id);
                    count_adverra_premium_removefriend_error++;
					$('.adverra_premium_removefriend_error').text(count_adverra_premium_removefriend_error+'/'+data.length);
			  }
		

if(count_adverra_premium_removefriend_all >= $("#adverra_premium_removefriend_limit").val()){
				setTimeout(function(){
title = 'ลบเพื่อนต่างๆตามที่ตั้งค่า'
  Swal.fire({
   title:title+' ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_removefriend_all+' รายการ' ,
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_removefriend_success" style="font-size:20px;"> '+count_adverra_premium_removefriend_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_removefriend_error" style="font-size:20px;"> '+count_adverra_premium_removefriend_error+' </span> </button>',

})
	  $('.adverra_premium_removefriend_time').hide();
	
return false;
}, (500)); 
		  
	return false;
	
	
}
   $('.adverra_premium_removefriend_time').show();
   progress_adverra_premium_removefriend = (100/count_adverra_premium_removefriend)*loop;
   $('#adverra_premium_removefriend_progress').attr('data-perc',Math.round(progress_adverra_premium_removefriend));
   if(progress_adverra_premium_removefriend > 0 && progress_adverra_premium_removefriend < 30){
       $('.adverra_premium_removefriend_bar').addClass('color3');
	   $('.adverra_premium_removefriend_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_removefriend>30 && progress_adverra_premium_removefriend < 80){
		  $('.adverra_premium_removefriend_bar').removeClass('color3');
	      $('.adverra_premium_removefriend_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_removefriend >= 80){
	    $('.adverra_premium_removefriend_bar').removeClass('color4');
		$('.adverra_premium_removefriend_bar').removeClass('color3');

	   
   }
adverra_premium_removefriend_delay = 0.5;
if(count_adverra_premium_removefriend_all%300==0){
	  adverra_premium_removefriend_delay  =  getRandomInt(300, 600);
	
}

if(count_adverra_premium_removefriend_all%1000==0){
	  adverra_premium_removefriend_delay  =  getRandomInt(900, 1800);
	
}

    progressbarx();
		localStorage.setItem('adverra_premium_removefriend_loop',loop);
		localStorage.setItem('adverra_premium_removefriend_data',(data));
countdown_x(adverra_premium_removefriend_delay,title,'รอ'+title+' คนต่อไปในอีก ',loop,'adverra_premium_removefriend',count_adverra_premium_removefriend);


adverra_premium_removefriend_limit = $('#adverra_premium_removefriend_limit').val();
if(loop>=(count_adverra_premium_removefriend) || (loop>=adverra_premium_removefriend_limit)){
	get_adverra_premium_removefriend_success(0);

}



adverra_premium_removefriend_time_out = setTimeout(function(){send_adverra_premium_removefriend(loop,data)}, (adverra_premium_removefriend_delay*1000)); 
		
		
		
		
           
      },


    });
}
else{}


	}
}















function adverra_premium_removefriend_next(){
	localStorage.setItem('adverra_premium_removefriend_stop','0');

	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "ลบเพื่อนต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {


	 send_adverra_premium_removefriend(localStorage.getItem('adverra_premium_removefriend_loop'),localStorage.getItem('adverra_premium_removefriend_data').split(','));
	 
	  
	  }
})
	
	 
	
	
}



$(document).on('change', '#adverra_premium_removefriend_type_all', function() {

	if($(this).prop("checked") == false){
		$(".adverra_premium_removefriend_type").each(function() {
					  $(this).prop('checked', false);										 
		});													 
		
	}
	else
	if($(this).prop("checked") == true){
		
		$(".adverra_premium_removefriend_type").each(function() {
			 $(this).prop('checked', true);
			
			});
	}

		
});



$(document).on('change', '.adverra_premium_removefriend_type', function() {
																		   
				if($(this).prop("checked") == false){
						  $('#adverra_premium_removefriend_type_all').prop('checked', false);
				}
																		   
																		   
});																	   
	

var fullDate = new Date();console.log(fullDate);
var twoDigitMonth = (fullDate.getMonth()+1)+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var currentDate_start = twoDigitDate + "-" + twoDigitMonth + "-" + (fullDate.getFullYear()-10);console.log(currentDate)
var currentDate = twoDigitDate + "-" + twoDigitMonth + "-" + fullDate.getFullYear();console.log(currentDate)
$('#adverra_premium_removefriend_dateend').val(currentDate);
$('#adverra_premium_removefriend_datestart').val(currentDate_start);


