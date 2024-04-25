function adverra_premium_postgroup(){
	localStorage.setItem('adverra_premium_postgroup_stop','0');
	 var data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการโพสลงกลุ่ม?",
  type: 'warning',
  footer: footer_swal(),
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {

adverra_premium_postgroup_text =  $('#adverra_premium_postgroup_text').val();  
adverra_premium_postgroup_data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_postgroup_delay_min  = $('#adverra_premium_postgroup_delay_min').val();	
adverra_premium_postgroup_delay_max  = $('#adverra_premium_postgroup_delay_max').val();	
  adverra_premium_postgroup_delay  =  getRandomInt(adverra_premium_postgroup_delay_min, adverra_premium_postgroup_delay_max);

 adverra_premium_postgroup_code = $('#adverra_premium_postgroup_code').val();	
	  if(adverra_premium_postgroup_code == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ Code หาได้จาก apppost.net',
})
		     $('#adverra_premium_postgroup_code').focus();
		  return false;
}



 




	  if(adverra_premium_postgroup_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group  ที่ต้องการโพสเข้าไป อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_postgroup_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_postgroup_delay == '') || (adverra_premium_postgroup_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_postgroup_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
	  

	   $('#adverra_premium_postgroup_report').html('');
	
	 count_adverra_premium_postgroup_error = 0;
	 count_adverra_premium_postgroup_success = 0;
	 setTimeout(function(){
	 send_adverra_premium_postgroup(0,1,0);
	}, (1000)); 
 
	
	

	 
	  
	  }
})
	
}


function send_adverra_premium_postgroup(loop,count_post,rounds){

var token = localStorage.getItem('access_token');
	var post_code = $("#adverra_premium_postgroup_code").val();
	var post_idpost  = $("#adverra_premium_postgroup_data").val().trim().split(/\r\n|\r|\n/);
	var message = $("#post_code").val();
	var post_loop = $("#adverra_premium_postgroup_addloop").is(":checked");
	var time_round = $("#adverra_premium_postgroup_addloop_number").val();
  //  var id_post = post_idpost[loop].split("_").pop(-1);
  var id_post = post_idpost[loop];
	var count_post_idpost = post_idpost.length;
    var post_switching = document.querySelector('input[name=adverra_premium_postgroup_random]:checked').value;


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
		url : "https://www.apppost.net/api/post?message_token="+post_code+"&count="+counts,
        type: "get",
       dataType: 'json',
   
		  complete: function(results){
      responce = results.responseText;
      data = JSON.parse(responce);

      var type = data[0].type;
      var messages = encodeURIComponent(data[0].message);
	  var picture = data[0].picture;
	  var link = data[0].link;
	  var name = encodeURIComponent(data[0].name);
	  var caption = encodeURIComponent(data[0].caption);
	  var description = encodeURIComponent(data[0].description);
	  var price_sell = data[0].price_sell;
	  var title_sell = encodeURIComponent(data[0].title_sell);
	  var count_postx = data[0].count_post;
	  var currency = data[0].currency;

 // iziToast.info({title: 'กำลังดึงโพสจาก Server',position: 'topCenter',timeout: 2000,message: '',});

 




////////////////////////////
post_id = post_idpost[loop];

  if(messages.indexOf('groupname') > -1){
		 title =  get_data_title(post_id);
		messages =   messages.replace("groupname", title);
	  }
	   if(link.indexOf('groupname') > -1){
		   title =  get_data_title(post_id);
		link =   link.replace("groupname", title);
	  }
	   if(name.indexOf('groupname') > -1){
		   title =  get_data_title(post_id);
		name =   name.replace("groupname", title);
	  }
	   if(caption.indexOf('groupname') > -1){
		   title =  get_data_title(post_id);
		   
		caption =   caption.replace("groupname",title); 
	  }
	   if(title_sell.indexOf('groupname') > -1){
		   
		   title =  get_data_title(post_id);
		title_sell =   title_sell.replace("groupname", title); 
		  
	  }
	
	
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
if(typeof adverra_premium_postgroup_time_out != 'undefined' ){
		clearTimeout(adverra_premium_postgroup_time_out);
}
  adverra_premium_postgroup_data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
  adverra_premium_postgroup_text  = $('#adverra_premium_postgroup_text').val();

adverra_premium_postgroup_text =  $('#adverra_premium_postgroup_text').val();  
adverra_premium_postgroup_data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_postgroup_delay_min  = $('#adverra_premium_postgroup_delay_min').val();	
adverra_premium_postgroup_delay_max  = $('#adverra_premium_postgroup_delay_max').val();	
adverra_premium_postgroup_delay  =  getRandomInt(adverra_premium_postgroup_delay_min, adverra_premium_postgroup_delay_max);

place = $("#adverra_premium_postgroup_namelocation").val();
photo_id = picture;	
photo_id = photo_x.split(',').sort();	
photo_count = (photo_id.length);

var photo_idx = "";
for(i=0;i<photo_count;i++){
	
	photo_ids = photo_id[i];
	if(photo_ids != ''){
	photo_idx = photo_idx+"&composer_unpublished_photo["+i+"]="+photo_ids;
	}
}





  //adverra_premium_postgroup_delay  =  getRandomInt(adverra_premium_postgroup_delay_min, adverra_premium_postgroup_delay_max);
  target_id = adverra_premium_postgroup_data[loop];
  title = 'โพสลงกลุ่ม';
  count_adverra_premium_postgroup = adverra_premium_postgroup_data.length;
  
	if(localStorage.getItem('adverra_premium_postgroup_stop') == 1){
	clearTimeout(adverra_premium_postgroup_time_out);
	}
	else{
		
	
	

		

		adverra_premium_postgroup_photo_all_img_okx = '';

	 adverra_premium_postgroup_text = encodeURIComponent(spintax(adverra_premium_postgroup_text));
     adverra_premium_postgroup_number = Math.floor(Math.random() * 100000000000000) + 1;

adverra_premium_postgroup_limit = $('#adverra_premium_postgroup_limit').val();
	if(count_adverra_premium_postgroup < adverra_premium_postgroup_limit){
		count_adverra_premium_postgroup = count_adverra_premium_postgroup;
		
	}
	else{
		
		count_adverra_premium_postgroup = adverra_premium_postgroup_limit;
		
	}
	
	adverra_premium_postgroup_type =   localStorage.getItem('adverra_premium_postgroup_type');
	adverra_premium_postgroup_params =  localStorage.getItem('adverra_premium_postgroup_params')
	 messages = spintax(messages);
	 link_shared = spintax($("#adverra_premium_postgroup_url").val());
	 
	   iziToast.info({title: 'กำลังโพส',position: 'topCenter',timeout: 2000,message: '',});
	 if($("#adverra_premium_postgroup_checktime").is(":checked")){
	var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	messages = messages+"\n"+datetime
}
	 var currency  = currency;
params = '';
if(type == 3){
 params = "fb_dtsg="+fb_dtsg+"rating=0&message="+messages+"&target="+target_id+"&ch=&linkUrl="+link+"&album_fbid=0&fs=&waterfall_id=9cc60089ceefb5f6010cb0aabc271b40&unpublished_content_type=0&scheduled_year=&scheduled_month=&scheduled_day=&scheduled_hours=&scheduled_minutes=&scheduled_am_pm=&is_backdated=&backdated_year=&backdated_month=&backdated_day=&at=&npn=&iscurrent=&npp=&npw=&npa=&npz=&freeform_tag_place=&npc=&loc=%7B%7D&%5B0%5D=&text_%5B0%5D=&ogaction=&ogobj=&ogphrase=&ogicon=&oghideattachment=&ogsuggestionmechanism=&%5B1%5D=&text_%5B1%5D=&source_loc=composer_group&sid=&appid=&internal_extra=&link_no_change=&csid=26c10bc5-7ea0-4862-91aa-78d15eecb9e7&waterfall_source=composer_group&=%E0%B9%82%E0%B8%9E%E0%B8%AA%E0%B8%95%E0%B9%8C&m_sess=&__req=f&__user="+user_id;
    var url = "https://m.facebook.com/a/group/post/add/?gid="+target_id+"&refid=18";

		}
		else
		 if(type == 2 || type == 4){
	 
	 
   var url = "https://www.facebook.com/media/upload/photos/composer/?av="+user_id+"&dpr=1";




   params = "fb_dtsg="+fb_dtsg+"attachment&backdated_date[year]&backdated_date[month]&backdated_date[day]&backdated_date[hour]&backdated_date[minute]&boosted_post_config&composer_entry_time=161&composer_session_id=fd24e7fc-9d08-4d9a-a330-039917be6a41&composer_session_duration=20&composer_source_surface=group&composertags_city&composertags_place&feed_topics&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&num_keystrokes=0&num_pastes=0&post_surfaces_blacklist&privacyx&prompt_id&prompt_tracking_string&ref=group&target_type=group&xhpc_message="+messages+"&xhpc_message_text="+messages+"&is_forced_reshare_of_post&xc_disable_config[xc_disable_link]&is_react=true&xhpc_composerid=rc.js_1jm&xhpc_targetid="+target_id+"&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=false&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&scheduled=false&future_date&future_time"+photo_idx+"&slideshow_spec&waterfallxapp=web_react_composer&__user="+user_id+"&__a=1&__af=i0&__req=6p";
   
		 }
		else 
		 if(type == 5){
	var post_check_not_buy =  $("#adverra_premium_postgroup_checkdefine").is(":checked");;
	 if(post_check_not_buy){ //ถ้าไม่ใช่กลุ่มขายจะโพสปกติ
		result_groups =  senddata_get3('https://m.facebook.com/groups/'+target_id);
		if(result_groups.responseText.indexOf('composer_entry_trigger')>-1){
			
			 var post_place = $("#adverra_premium_postgroup_namelocation").val();
    var url = "https://upload.facebook.com/media/upload/photos/composer/?__a=1&__user="+user_id;
   params = 'fb_dtsg='+fb_dtsg+'composertags_city&composertags_place&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&privacyx&prompt_id&ref=group&is_redspace_post=false&target_type=group&xhpc_message='+messages+'&xhpc_message_text='+messages+'&is_forced_reshare_of_post&is_react=true&xhpc_composerid=rc+js_6k&xhpc_targetid='+target_id+'&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=false&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&composer_attachment_sell_title='+title_sell+'&composer_attachment_sell_price='+price_sell+'&composer_attachment_sell_currency='+currency+'&composer_attachment_sell_category&composer_attachment_sell_location_page_id=&composer_attachment_sell_pickup_note=&post_to_marketplace=false&cross_post_checked=false&composer_attachment_sell_autos_make=&composer_attachment_sell_autos_model=&composer_attachment_sell_autos_vin=&composer_attachment_sell_autos_year=&composer_attachment_sell_autos_odometer=&composer_attachment_sell_autos_odometer_units=kilometers'+photo_idx+'&is_slideshow=true&composer_attachment_sell_location_page_id=&composer_attachment_sell_pickup_note='+post_place;
			
		}
			else{
				
				
		
		var url = "https://www.facebook.com/media/upload/photos/composer/?av="+user_id+"&dpr=1";

   params = "fb_dtsg="+fb_dtsg+"attachment&backdated_date[year]&backdated_date[month]&backdated_date[day]&backdated_date[hour]&backdated_date[minute]&boosted_post_config&composer_entry_time=161&composer_session_id=fd24e7fc-9d08-4d9a-a330-039917be6a41&composer_session_duration=20&composer_source_surface=group&composertags_city&composertags_place&feed_topics&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&num_keystrokes=0&num_pastes=0&post_surfaces_blacklist&privacyx&prompt_id&prompt_tracking_string&ref=group&target_type=group&xhpc_message="+messages+"&xhpc_message_text="+messages+"&is_forced_reshare_of_post&xc_disable_config[xc_disable_link]&is_react=true&xhpc_composerid=rc.js_1jm&xhpc_targetid="+target_id+"&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=false&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&scheduled=false&future_date&future_time"+photo_idx+"&slideshow_spec&waterfallxapp=web_react_composer&__user="+user_id+"&__a=1&__dyn=aKhoFeyfyGmaomgDxyG8EiolzFEbFbGAdyedirWo8popyUW3F6wAxu13wFG2K49UKbkwy8xa5WjzHz9XDG4XzE8-EiGt0gKum4UpKq4G-FFUkxvDAyXUG49e5o5ami9J7By8K48hxGbwYzoGr_gnHggKm7WxGAKiamezE-5EG9z8CqnCxeEgAw&__af=i0&__req=6p";
		
		
		
		
	
				
				
				
			}
			
		}
	else{
		
					
			 var post_place = $("#adverra_premium_postgroup_namelocation").val();
    var url = "https://upload.facebook.com/media/upload/photos/composer/?__a=1&__user="+user_id;
   params = 'fb_dtsg='+fb_dtsg+'composertags_city&composertags_place&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&privacyx&prompt_id&ref=group&is_redspace_post=false&target_type=group&xhpc_message='+messages+'&xhpc_message_text='+messages+'&is_forced_reshare_of_post&is_react=true&xhpc_composerid=rc+js_6k&xhpc_targetid='+target_id+'&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=false&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&composer_attachment_sell_title='+title_sell+'&composer_attachment_sell_price='+price_sell+'&composer_attachment_sell_currency='+currency+'&composer_attachment_sell_category&composer_attachment_sell_location_page_id=&composer_attachment_sell_pickup_note=&post_to_marketplace=false&cross_post_checked=false&composer_attachment_sell_autos_make=&composer_attachment_sell_autos_model=&composer_attachment_sell_autos_vin=&composer_attachment_sell_autos_year=&composer_attachment_sell_autos_odometer=&composer_attachment_sell_autos_odometer_units=kilometers'+photo_idx+'&is_slideshow=true&composer_attachment_sell_location_page_id=&composer_attachment_sell_pickup_note='+post_place;
		/*
		var url = "https://www.facebook.com/media/upload/photos/composer/?av="+user_id+"&dpr=1";

   params = "fb_dtsg="+fb_dtsg+"attachment&backdated_date[year]&backdated_date[month]&backdated_date[day]&backdated_date[hour]&backdated_date[minute]&boosted_post_config&composer_entry_time=161&composer_session_id=fd24e7fc-9d08-4d9a-a330-039917be6a41&composer_session_duration=20&composer_source_surface=group&composertags_city&composertags_place&feed_topics&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&num_keystrokes=0&num_pastes=0&post_surfaces_blacklist&privacyx&prompt_id&prompt_tracking_string&ref=group&target_type=group&xhpc_message="+messages+"&xhpc_message_text="+messages+"&is_forced_reshare_of_post&xc_disable_config[xc_disable_link]&is_react=true&xhpc_composerid=rc.js_1jm&xhpc_targetid="+target_id+"&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=false&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&scheduled=false&future_date&future_time"+photo_idx+"&slideshow_spec&waterfallxapp=web_react_composer&__user="+user_id+"&__a=1&__dyn=aKhoFeyfyGmaomgDxyG8EiolzFEbFbGAdyedirWo8popyUW3F6wAxu13wFG2K49UKbkwy8xa5WjzHz9XDG4XzE8-EiGt0gKum4UpKq4G-FFUkxvDAyXUG49e5o5ami9J7By8K48hxGbwYzoGr_gnHggKm7WxGAKiamezE-5EG9z8CqnCxeEgAw&__af=i0&__req=6p";
		
		
		*/
		
	}
		 
		 
	 }
		 
		 
if(loop<(count_adverra_premium_postgroup)){
	$(".adverra_premium_postgroup_r").text((parseInt(rounds)+1));
 $.ajax({
		url: url,
        type: "post",
        data:params,
		  complete: function(data1){
			loop++;  
		  texteror = give_error_description(data1.responseText,'adverra_premium_postgroup');
		  if(texteror == '' && data1.responseText.match(/post_id=\d+/g)){
			      id_post = data1.responseText.match(/post_id=\d+/g);
				  id_post = id_post[0].replace('post_id=', '');
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_postgroup_report','green',title+'สำเร็จ',id_post,loop+'.'+target_id+'_'+id_post);
                   count_adverra_premium_postgroup_success++;
				     $('.adverra_premium_postgroup_success').text(count_adverra_premium_postgroup_success+'/'+(count_adverra_premium_postgroup*(rounds+1)));
		  }
		  else{
			  if(texteror != ''){
			       $('.adverra_premium_postgroup_success').text();
				   iziToast.error({title:texteror,position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
				   report_appendno_pic('#adverra_premium_postgroup_report','red',texteror,target_id,loop+'.'+target_id);
                    count_adverra_premium_postgroup_error++;
					$('.adverra_premium_postgroup_error').text(count_adverra_premium_postgroup_error+'/'+(count_adverra_premium_postgroup*(rounds+1)));
			  }else{
				  
	
			       iziToast.success({title: title+' รายการนี้แล้ว',position: 'topCenter',timeout: 2000,message: 'รายการที่ '+(loop),});
                   report_appendno_pic('#adverra_premium_postgroup_report','green',title+'สำเร็จ แต่อาจรอแอดมินกลุ่มอนุมัติ','groups/'+target_id+'/pending',loop+'.'+target_id+'_');
                   count_adverra_premium_postgroup_success++;
				     $('.adverra_premium_postgroup_success').text(count_adverra_premium_postgroup_success+'/'+count_adverra_premium_postgroup);
				  
				  
				  
			  }
			  }
		

   $('.adverra_premium_postgroup_time').show();
   progress_adverra_premium_postgroup = (100/count_adverra_premium_postgroup)*loop;
   $('#adverra_premium_postgroup_progress').attr('data-perc',Math.round(progress_adverra_premium_postgroup));
   if(progress_adverra_premium_postgroup > 0 && progress_adverra_premium_postgroup < 30){
       $('.adverra_premium_postgroup_bar').addClass('color3');
	   $('.adverra_premium_postgroup_bar').removeClass('color4');
   }
   else
    if(progress_adverra_premium_postgroup>30 && progress_adverra_premium_postgroup < 80){
		  $('.adverra_premium_postgroup_bar').removeClass('color3');
	      $('.adverra_premium_postgroup_bar').addClass('color4');
		

   }
   else
   if(progress_adverra_premium_postgroup >= 80){
	    $('.adverra_premium_postgroup_bar').removeClass('color4');
		$('.adverra_premium_postgroup_bar').removeClass('color3');

	   
   }

    progressbarx();
		localStorage.setItem('adverra_premium_postgroup_loop',loop);
		localStorage.setItem('adverra_premium_postgroup_count_post',count_postx);
		localStorage.setItem('adverra_premium_postgroup_rounds',(rounds+1));
		
		/*loop,count_post,rounds
	  if(check_have_url(adverra_premium_postgroup_text)){
		   if((count_adverra_premium_postgroup_success%120) == 0){
		  adverra_premium_postgroup_delay = getRandomInt(300,900);
		   }
	  }
	  */
countdown_x_min((adverra_premium_postgroup_delay),title,'รอ'+title+' โพสต่อไปในอีก ',loop,'adverra_premium_postgroup',count_adverra_premium_postgroup);



if(loop>=(count_adverra_premium_postgroup) ){
	
	setTimeout(function(){
if($("#adverra_premium_postgroup_addloop").prop("checked") == false){
  Swal.fire({
 title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+(count_adverra_premium_postgroup*(rounds+1))+' รายการ<br>โพสแล้ว'+(rounds+1) +' รอบ',
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_postgroup_success" style="font-size:20px;"> '+count_adverra_premium_postgroup_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_postgroup_error" style="font-size:20px;"> '+count_adverra_premium_postgroup_error+' </span> </button>',

})
	  $('.adverra_premium_postgroup_time').hide();
	
return false;
}
else{

adverra_premium_postgroup_limit_loop = 	$("#adverra_premium_postgroup_limit_loop").val();
	if((rounds+1) < adverra_premium_postgroup_limit_loop){
rounds++;	

adverra_premium_postgroup_addloop_number = 	$("#adverra_premium_postgroup_addloop_number").val();
adverra_premium_postgroup_addloop_delay = ((adverra_premium_postgroup_addloop_number*60));
$('.adverra_premium_postgroup_time').show();
countdown_x_min_r((adverra_premium_postgroup_addloop_delay),title,'รอ'+title+' โพสต่อไปในอีก ',loop,'adverra_premium_postgroup',count_adverra_premium_postgroup);

setTimeout(function(){send_adverra_premium_postgroup(0,1,rounds)}, (1000*adverra_premium_postgroup_addloop_delay)); 


	}
	else{
		
			setTimeout(function(){

  Swal.fire({
   title:title+'ทั้งหมดเรียบร้อย<br>จากทั้งหมด '+count_adverra_premium_postgroup+' รายการ<br>โพสแล้ว'+(rounds+1) +' รอบ',
  type: 'success',
  html:' <button class="btn waves-effect waves-light green " type="button" > ผ่าน <span class="adverra_premium_postgroup_success" style="font-size:20px;"> '+count_adverra_premium_postgroup_success+'</span> </button> <button class="btn waves-effect waves-light red " type="button"> ไม่ผ่าน <span class="adverra_premium_postgroup_error" style="font-size:20px;"> '+count_adverra_premium_postgroup_error+' </span> </button>',

})
	  $('.adverra_premium_postgroup_time').hide();
	
return false;

}, (2000)); 
		
		
		
	}
	
}



}, (2000)); 
}

adverra_premium_postgroup_time_out = setTimeout(function(){send_adverra_premium_postgroup(loop,count_postx,rounds)}, (1000*adverra_premium_postgroup_delay)); 
		
		
		
		
           
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















function adverra_premium_postgroup_next(){

	localStorage.setItem('adverra_premium_postgroup_stop','0');
	 var data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "โพสลงกลุ่มต่อจากเดิม",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
  
adverra_premium_postgroup_idpage =  $('#adverra_premium_postgroup_idpage').val();  
adverra_premium_postgroup_text =  $('#adverra_premium_postgroup_text').val();  
adverra_premium_postgroup_data  = 	$('#adverra_premium_postgroup_data').val().trim().split(/\r\n|\r|\n/);
adverra_premium_postgroup_delay  = $('#adverra_premium_postgroup_delay').val();	



 
	  if(adverra_premium_postgroup_code == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ Code หาได้จาก apppost.net',
})
		     $('#adverra_premium_postgroup_code').focus();
		  return false;
}



 




	  if(adverra_premium_postgroup_data[0] == ''){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องระบุ ID Group  ที่ต้องการโพสเข้าไป อย่างน้อย 1 รายการ',
})
		     $('#adverra_premium_postgroup_data').focus();
		  return false;
}
	  
	  
	  
if((adverra_premium_postgroup_delay == '') || (adverra_premium_postgroup_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_postgroup_delay_min').focus();
		   return false; 
	  }
	  
	  
	  
if((adverra_premium_postgroup_delay == '') || (adverra_premium_postgroup_delay < 0)){
		   Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนน้อยสุดอย่างน้อย 1 ',
})
		     $('#adverra_premium_postgroup_delay').focus();
		   return false; 
	  }
	  
	  
	  

	  
	  
	 //$('#adverra_premium_postgroup_report').html('');
	 //count_adverra_premium_postgroup_error = 0;
	// count_adverra_premium_postgroup_success = 0;
	//loop,count_post,rounds
	 send_adverra_premium_postgroup(localStorage.getItem('adverra_premium_postgroup_loop'),localStorage.getItem('adverra_premium_postgroup_count_post'),localStorage.getItem('adverra_premium_postgroup_rounds'));
	 
	  
	  }
})
	
	 
	
	
}





$(document).on('change', '#adverra_premium_postgroup_addloop', function() {
																		   
				if($(this).prop("checked") == false){
						 $("#adverra_premium_postgroup_addloop_number").prop('disabled', true);
				}
				else{
					
					 $("#adverra_premium_postgroup_addloop_number").prop('disabled', false);
				}
																		   
																		   
});																	   
	
