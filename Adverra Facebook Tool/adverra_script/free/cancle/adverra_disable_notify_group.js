
function send_disable_notify(i){
groups_notifyx = 	localStorage.getItem('groups_notify');	
groups_notifys  = groups_notifyx.split(',');

if(i< ((groups_notifys.length-1)) ){	
				params = '__user='+user_id+'&__a=1&__req=47&__be=1&dpr=1.5&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';
				
				
 $.ajax({
		url: "https://www.facebook.com/groups/notification/settings/edit/?group_id="+groups_notifys[i]+"&subscription_level=1",
        type: "post",
        data:params,
		  complete: function(data1){ 
		  loop = (i+1);
		  			        iziToast.info({			 
 //image:'https://graph.facebook.com/'+groups_notifys[i]+'/picture',		
  position: 'topCenter',
  timeout: 1000,
    message: 'ปิดการแจ้งเตือนกลุ่ม '+groups_notifys[i]+' นี้แล้ว กลุ่มที่ '+loop,
});
             send_disable_notify(loop);
           
      },

    });
 
}
else{
					Swal.fire(
  'ปิดการแจ้งเตือนกลุ่ม',
  'ปิดการแจ้งเตือนทุกกลุ่มเรียบร้อยแล้วค่ะ',
  'success'
)
	
	
}


}







function start_disable_notify(){
	
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการปิดการแจ้งเตือนกลุ่มของคุณทั้งหมด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	//  var access_token = localStorage.getItem('access_token');
	 localStorage.setItem('groups_notify', '');
	url = 'https://mbasic.facebook.com/groups/?seemore&refid=27&ref=bookmarks';  
group_notify = [];	
get_group_disable_notify(url)
	  
	  }
})


}


function  get_group_disable_notify(url){
	
	$.get(url, function(results) {
							
			var htmlstring = results;	
			  
	    	if(htmlstring.match(/groups\/\d+/g))
	    	{
					
	    		var group_id_array=htmlstring.match(/groups\/\d+/g);
				
	    		for(var temp_var=0;group_id_array[temp_var];temp_var++)
	    		{
	    			group_id_array[temp_var]=parseInt(group_id_array[temp_var].replace("groups\/","").replace("\"\]",""));
	    		}
	    		group_id_array=unique_array(group_id_array);
			   localStorage.setItem('groups_notify', group_id_array);
	                
		  			        iziToast.success({			 	
  position: 'topCenter',
  timeout: 5000,
    message: 'รวบรวมข้อมูลกลุ่มทั้งหมด '+ group_id_array.length  +' กลุ่มสำเร็จ รอยกเลิกการแจ้งเตือน',
});
			send_disable_notify(0);
			}
			else{
				
								Swal.fire(
  'คุณยังไม่มีกลุ่ม',
  'คุณยังไม่มีกลุ่มที่เข้าร่วม',
  'error'
)
	
				
				
			}
			
							
});

}


























