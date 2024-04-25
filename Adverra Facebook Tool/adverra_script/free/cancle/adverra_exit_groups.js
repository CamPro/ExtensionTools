
function send_exit_groups(i){
groups_notifyx = 	localStorage.getItem('groups_exit');	
groupid  = groups_notifyx.split(',');

if(i< ((groupid.length-1)) ){
	groupid = groupid[i];
	parms = '';
				parms+='&setting=1';
					parms+='&group_id='+groupid;
					parms+='&__user='+user_id;
					parms+='&__a=1';
					parms+='&__req=27';
					parms+='&fb_dtsg='+fb_dtsg;
					parms+='&confirmed=1';
				
				
 $.ajax({
		url: "https://www.facebook.com/ajax/groups/membership/leave.php?group_id="+groupid,
        type: "post",
        data:parms,
		  complete: function(data1){ 
		  loop = (i+1);
		  			        iziToast.info({			 
 //image:'https://graph.facebook.com/'+groups_notifys[i]+'/picture',		
  position: 'topCenter',
  timeout: 1000,
    message: 'ออกจากกลุ่ม '+groupid+' นี้แล้ว กลุ่มที่ '+loop,
});
             send_exit_groups(loop);
           
      },

    });
 
}
else{
					Swal.fire(
  'ออกจากลุ่มทุกกลุ่ม',
  'ออกจากกลุ่มทุกกลุ่มเรียบร้อยแล้วค่ะ',
  'success'
)
	
	
}


}







function start_exit_groups(){
	
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการออกจากกลุ่มทุกกลุ่มที่คุณเข้าร่วม?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	//  var access_token = localStorage.getItem('access_token');
	 localStorage.setItem('groups_exit', '');
	url = 'https://mbasic.facebook.com/groups/?seemore&refid=27&ref=bookmarks';  
group_notify = [];	
get_exit_groups(url)
	  
	  }
})


}


function  get_exit_groups(url){
	
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
			   localStorage.setItem('groups_exit', group_id_array);
	                
		  			        iziToast.success({			 	
  position: 'topCenter',
  timeout: 5000,
    message: 'รวบรวมข้อมูลกลุ่มทั้งหมด '+ group_id_array.length  +' กลุ่มสำเร็จ รอออกจากกลุ่มทั้งหมด',
});
			send_exit_groups(0);
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


























