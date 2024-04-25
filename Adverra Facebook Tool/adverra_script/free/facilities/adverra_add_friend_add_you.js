
function adverra_add_friend_add_you(){
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการรับคนที่มาขอคุณเป็นเพื่อนทั้งหมด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	 loop_get_adverra_add_friend_add_you = 0;
	 get_adverra_add_friend_add_you();
	  
	  }
})
	
	
	}



function get_adverra_add_friend_add_you(){

	a=new XMLHttpRequest();
//	a.open("GET","/friends/requests/outgoing/more/?page=1&page_size=50&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user="+user_id+"&__a=1",true);
	a.open("GET","https://mbasic.facebook.com/friends/center/requests/#friends_center_main",true);

	a.onreadystatechange=function(){
		if(a.readyState==4)
		{
			if(a.responseText.match(/uid=\d+/g) )
			{
				var friend_ids=a.responseText.match(/uid=\d+/g);

				for(var temp_var=0;friend_ids[temp_var];temp_var++)
				{
					friend_ids[temp_var]=friend_ids[temp_var].replace("uid=",'');
						
				}
		
				console.log(friend_ids);
				

		send_adverra_add_friend_add_you(friend_ids);
		
			}else{
				Swal.fire(
  'ทำรายการเรียบร้อยแล้ว',
  'รับคนที่มาขอคุณเป็นเพื่อนทั้งหมด '+loop_get_adverra_add_friend_add_you+' คน',
  'success'
)
			}
		}
	}
	a.send();
	
}












function send_adverra_add_friend_add_you(friend_ids){
	adverra_add_friend_add_you_over  = $('#adverra_add_friend_add_you_over').val();
	adverra_add_friend_add_you_delay  = $('#adverra_add_friend_add_you_delay').val();
	
	var tempvar=0;

	function temporary_loop(){
		if((loop_get_adverra_add_friend_add_you < adverra_add_friend_add_you_over)){
		
		function send_adverra_add_friend_add_you2(target_id){
			
				parms = 'action=confirm&id='+target_id+'&ref=%2Freqs.php&floc=friend_center_requests&frefs[0]=jwl&viewer_id='+user_id+'&__user='+user_id+'&__a=1&__req=88&__be=1&dpr=1.5&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+jazoest+'&__spin_b=trunk';
			
 $.ajax({
		url: "https://www.facebook.com/requests/friends/ajax/",
        type: "post",
        data:parms,
		  complete: function(data1){ 
		  texteror = give_error_description(data1.responseText);
		  if(texteror == ''){
        iziToast.success({
	image:'https://graph.facebook.com/'+target_id+'/picture?type=small',					 
    title: 'รับแอด',
  position: 'topCenter',
  timeout: 2000,
    message: 'รับแอดคนนี้เป็นเพื่อนแล้ว คนที่ '+(loop_get_adverra_add_friend_add_you+1),
});
		  
		  setTimeout(function(){
			loop_get_adverra_add_friend_add_you++;				
			temporary_loop();
}, (1000*adverra_add_friend_add_you_delay));
		  
		  }
		  else{
			  
		 Swal.fire(
  'เกิดข้อผิดพลาด',
  texteror,
  'error'
)

		 
	 
			  
			  
		  }
		
					     
           
      },


    });
			
			
			
		}
		if(friend_ids[tempvar])
		{
			send_adverra_add_friend_add_you2(friend_ids[tempvar]);
			tempvar++;
		}else{
			// toastr.info('กำลังยกเลิกรายการ กรุรารอสักครุ่','ยกเลิกรายการ');
			get_adverra_add_friend_add_you();
		}
	}
	else{
				Swal.fire(
  'ทำรายการเรียบร้อยแล้ว',
  'รับคนที่มาขอคุณเป็นเพื่อนทั้งหมด '+loop_get_adverra_add_friend_add_you+' คน',
  'success'
  )
	}
}


	temporary_loop();
}



