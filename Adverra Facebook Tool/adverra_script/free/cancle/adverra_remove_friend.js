
function send_remove_friend(i){
friend_remove = 	localStorage.getItem('friend_remove');	
friend_remove = friend_remove.split(',');

if(i< ((friend_remove.length)) ){	
friend_remove = friend_remove[i];
				params='uid='+friend_remove+'&unref=bd_profile_button&floc=profile_button&nctr[_mod]=pagelet_timeline_profile_actions&__user='+user_id+'&__a=1&__req=4d&__be=1&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev;
				
				
 $.ajax({
		url: "https://www.facebook.com/ajax/profile/removefriendconfirm.php",
        type: "post",
        data:params,
		  complete: function(data1){ 
		  loop = (i+1);
		  			        iziToast.info({			 
 image:'https://graph.facebook.com/'+friend_remove+'/picture',		
  position: 'topCenter',
  timeout: 1000,
    message: 'ลบเพื่อนคนนี้แล้ว',
});
			
			delay = 1;
			if(loop%300==0){
				delay = 1200;
				
			}
			
				if(loop%1000==0){
				delay = 1800;
				
			}
             	setTimeout(function(){
			 send_remove_friend(loop);
			 }, (delay*1000));
           
      },

    });
 
}
else{
					Swal.fire(
  'ลบเพื่อน',
  'ลบเพื่อนทุกคนหมดเรียบร้อยแล้ว',
  'success'
)
	
	
}


}







function adverra_remove_friend(){
	
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการลบเพื่อนทั้งหมด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	//  var access_token = localStorage.getItem('access_token');
	url = 'https://graph.facebook.com/v1.0/me/friends?fields=id&limit=1000&access_token='+access_token;  
friend = [];	
localStorage.setItem('friend_remove', '');	
get_friend_remove(url)
	  
	  }
})


}


function  get_friend_remove(url){
	title = 'ดึงเพื่อน';
	message = 'รวบรวมเพื่อนของคุณเรียบร้อยแล้ว';
	
	$.getJSON(url, function(results) {
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
			friend.push(data.id);
    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: title,
  position: 'topCenter',
  timeout: 1000,
    message: 'กำลังดึงเพื่อน',
});
			get_friend_remove(paging.next)
		
		
		}	
		else{
			  iziToast.success({			 
    title: title,
  position: 'topCenter',
  timeout: 3000,
    message: message,
});
			
			
			     
		localStorage.setItem('friend_remove', friend);	
		  send_remove_friend(0);
		
			
		}
	}
	else{
				  iziToast.success({			 
    title: title,
  position: 'topCenter',
  timeout: 3000,
    message: message,
});
		
		localStorage.setItem('friend_remove', friend);
		  send_remove_friend(0);
		
		
	}
});
	
	

}


























