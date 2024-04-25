/*
//
//  Created by Weera Deesri on 29/3/16.
//  Copyright (c) 2015 Weera Deesri of Adverra.com All rights reserved.
//
*/
//var cancel_all_pend_friend_request_title="ยกเลิกที่คุณส่งคำขอเพื่อนทั้งหมด";
var cancel_all_remove_friend_title="ลบเพื่อนทั้งหมด";

function cancel_pending_friend_requests_parse_ids(friend_ids){
	var tempvar=0;
	function temporary_loop(){
		function cancel_pending_friend_request(target_id){
			
				parms = 'subject_id='+target_id+'&ref_param=outgoing_requests&floc=friend_center_outgoing_requests&frefs=null&m_sess=&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__user='+user_id;
			
 $.ajax({
		url: "https://m.facebook.com/a/friendrequest/cancel/index.php",
        type: "post",
        data:parms,
		  complete: function(data1){ 
        iziToast.success({
	image:'https://graph.facebook.com/'+target_id+'/picture',					 
    title: 'ยกเลิกคำขอ',
  position: 'topCenter',
  timeout: 3000,
    message: 'ยกเลิกคำขอคนนี้เรียบร้อย',
});
					temporary_loop();     
           
      },


    });
			
			
			
		}
		if(friend_ids[tempvar])
		{
			cancel_pending_friend_request(friend_ids[tempvar]);
			tempvar++;
		}else{
			// toastr.info('กำลังยกเลิกรายการ กรุรารอสักครุ่','ยกเลิกรายการ');
			get_pending_friend_request_ids();
		}
	}
	temporary_loop();
}


function get_pending_friend_request_ids(){
	a=new XMLHttpRequest();
//	a.open("GET","/friends/requests/outgoing/more/?page=1&page_size=50&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user="+user_id+"&__a=1",true);
	a.open("GET","https://mbasic.facebook.com/friends/center/requests/outgoing/?ppk=0&tid=u_0_0&bph=1#friends_center_main",true);

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
				
	
		cancel_pending_friend_requests_parse_ids(friend_ids);
			}else{
				Swal.fire(
  'ยกเลิกส่งคำขอเพื่อนเรียบร้อยแล้ว',
  'ยกเลิกคำขอเพื่อนสำเร็จเรียบร้อยแล้ว',
  'success'
)
			}
		}
	}
	a.send();
	
}
function start_to_remove_pending_friend_requests(){
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการยกเลิกที่คุณส่งคำขอเพื่อนทั้งหมด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	  get_pending_friend_request_ids();
	  
	  }
})
	
	
	}






function adverra_remove_all_friend(){
	if(confirm(adverra_langs('Do_you_want_to_quit_all_friends')))
	{
		toastr.info("เริ่มลบเพื่อน",cancel_all_remove_friend_title);

			chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
				{
					
					if(e[localname_friend_ids]!="")
					{
						var friend_id_array=e[localname_friend_ids].split(",");
						if(friend_id_array[0])
						{
							get_remove_all_friend(0) ;
								
						}
					
			        }
				
				}
	});
		
		
		
		
		
		
	}

}





function get_remove_all_friend(count){
	
		chrome.storage.local.get(localname_friend_ids, function(e) {
		if(e)
		{
		  	if(e[localname_friend_ids]!="")
		  	{
		  		var friend_id_array=e[localname_friend_ids].split(",");
		  		if(friend_id_array[0])
		  		{
					if(count == friend_id_array.length){
						toastr.success("ลบเพื่อนล้วค่ะ หากไม่สามารถเลิกเป็นเเพื่อนหมดให้กดลบเพื่อนอีกครั้งค่ะ",cancel_all_remove_friend_title);
						alert('ลบเพื่อนล้วค่ะ หากไม่สามารถเลิกเป็นเเพื่อนหมดให้กดลบเพื่อนอีกครั้งค่ะ');
						
		  			
					}
					else{
					
						get_remove_f(count,friend_id_array);
						
					}
					
					
		  		}else{
		  			toastr.error("ไม่มีเพื่อนค่ะ",cancel_all_remove_friend_title);
						alert('ไม่มีเพื่อนค่ะ');
		  		}
		  	}else{
				dineshstoastr("error","ยังดึงรายการเพื่อนไม่เสร็จ กรุณารอสักครู่ค่ะ",cancel_all_remove_friend_title);
				console.log(extract_friend_id_title+":aborted because friend list extraction is incomplete.");
		  	}
		}else{
			//dineshstoastr("error","more_click_email_facebook",extract_friend_id_title);
			//console.log(extract_friend_id_title+":aborted because friend list extraction is incomplete.");
		}
	});
	
	
}
function get_remove_f(count,friend_id_array){
	 setTimeout(function() {	
	var request_parms='friend_id='+friend_id_array[count]+'&noReload=true&unref=bd_friends_tab&m_sess=&fb_dtsg='+fb_dtsg+'&__user='+user_id;			
 $.ajax({
		url: "https://m.facebook.com/a/friends/remove",
        type: "post",
		async: false, 
        data:request_parms,
		  complete: function(data1){ 
              
					toastr.info("รอสักครู่ อยู่ระหว่างการดำเนินการเลิกเป็นเพื่อน <br>ID : "+friend_id_array[count]+" <br>คนที่ "+(count+1),cancel_all_remove_friend_title);
					count = count+1;
                 get_remove_all_friend(count);
				
				
           
      },


    });		 
    
	 	


	},(100));
	 
}
	
	







