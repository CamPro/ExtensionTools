
function start_cancel_all_friend_add_you(){
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบคนที่แอดคุณมา?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	 get_pending_friend_to_you_ids();
	  
	  }
})
	
	
	}



function get_pending_friend_to_you_ids(){
	a=new XMLHttpRequest();
//	a.open("GET","/friends/requests/outgoing/more/?page=1&page_size=50&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user="+user_id+"&__a=1",true);
	a.open("GET","https://mbasic.facebook.com/friends/center/requests/#friends_center_main",true);

	a.onreadystatechange=function(){
		if(a.readyState==4)
		{
			if(a.responseText.match(/uid=\d+/g))
			{
				var friend_ids=a.responseText.match(/uid=\d+/g);

				for(var temp_var=0;friend_ids[temp_var];temp_var++)
				{
					friend_ids[temp_var]=friend_ids[temp_var].replace("uid=",'');
						
				}
		
				console.log(friend_ids);
				
	
		cancel_pending_add_you(friend_ids);
			}else{
				Swal.fire(
  'ทำรายการเรียบร้อยแล้ว',
  'ลบคนที่มาขอคุณเป็นเพื่อนเรียบร้อยแล้ว',
  'success'
)
			}
		}
	}
	a.send();
	
}












function cancel_pending_add_you(friend_ids){
	var tempvar=0;
	function temporary_loop(){
		function cancel_pending_friend_request_to_you(target_id){
			
				parms = 'action=reject&id='+target_id+'&ref=%2Freqs.php&floc=friend_center_requests&frefs[0]=jwl&viewer_id='+user_id+'&__user='+user_id+'&__a=1&__req=2t&__be=1&dpr=1.5&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';
			
 $.ajax({
		url: "https://www.facebook.com/requests/friends/ajax/",
        type: "post",
        data:parms,
		  complete: function(data1){ 
        iziToast.success({
	image:'https://graph.facebook.com/'+target_id+'/picture',					 
    title: 'ลบคำขอเพื่อน',
  position: 'topCenter',
  timeout: 3000,
    message: 'ลบคำขอเพื่อนจากคนนี้แล้ว',
});
					temporary_loop();     
           
      },


    });
			
			
			
		}
		if(friend_ids[tempvar])
		{
			cancel_pending_friend_request_to_you(friend_ids[tempvar]);
			tempvar++;
		}else{
			// toastr.info('กำลังยกเลิกรายการ กรุรารอสักครุ่','ยกเลิกรายการ');
			get_pending_friend_to_you_ids();
		}
	}
	temporary_loop();
}



