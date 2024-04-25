
function sendunlikesnowtwo(i){
fbp_like = 	localStorage.getItem('fbp_like');	
fanapageidcollect = fbp_like.split(',');

if(i< ((fanapageidcollect.length-1)) ){	
				params="&fbpage_id="+fanapageidcollect[i];
				params+="&add=false";
				params+="&reload=false";
				params+="&fan_origin=liked_menu";
				params+="&__user="+user_id;
				params+="&__a=1";
				params+="&__req=d";
				params+="&fb_dtsg="+fb_dtsg;
				
				
 $.ajax({
		url: "https://www.facebook.com/ajax/pages/fan_status.php",
        type: "post",
        data:params,
		  complete: function(data1){ 
		  loop = (i+1);
		  			        iziToast.info({			 
 image:'https://graph.facebook.com/'+fanapageidcollect[i]+'/picture',		
  position: 'topCenter',
  timeout: 1000,
    message: 'ยกเลิกถูกใจเพจนี้แล้ว',
});
             sendunlikesnowtwo(loop);
           
      },

    });
 
}
else{
					Swal.fire(
  'ยกเลิกถูกใจแฟนเพจ',
  'ยกเลิกกดถูกใจแฟนเพจทั้งหมดแล้วค่ะ',
  'success'
)
	
	
}


}







function unlikeallpagesfunction(){
	
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการยกเลิกถูกใจแฟนเพจทั้งหมด?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	//  var access_token = localStorage.getItem('access_token');
	url = 'https://graph.facebook.com/me/likes?fields=id&limit=1000&access_token='+access_token;  
fbp_like = [];	
get_fanpage_like(url)
	  
	  }
})


}


function  get_fanpage_like(url){
	
	$.getJSON(url, function(results) {
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
			fbp_like.push(data.id);
    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: 'ดึงข้อมูลแฟนเพจที่คุณถูกใจ',
  position: 'topCenter',
  timeout: 1000,
    message: 'กำลังรวบรวมแฟนเพจที่คุณถูกใจ',
});
			get_fanpage_like(paging.next)
		
		
		}	
		else{
			  iziToast.success({			 
    title: 'รวบรวมข้อมูลแฟนเพจที่คุณถูกใจเรียบร้อย',
  position: 'topCenter',
  timeout: 3000,
    message: 'รวบรวมเรียบร้อยกำลังรอการยกเลิกถูกใจ',
});
			
			
			     
		localStorage.setItem('fbp_like', fbp_like);	
		  sendunlikesnowtwo(0);
		
			
		}
	}
	else{
				  iziToast.success({			 
    title: 'รวบรวมข้อมูลแฟนเพจที่คุณถูกใจเรียบร้อย',
  position: 'topCenter',
  timeout: 3000,
    message: 'รวบรวมเรียบร้อยกำลังรอการยกเลิกถูกใจ',
});
		
		localStorage.setItem('fbp_like', fbp_like);
		  sendunlikesnowtwo(0);
		
		
	}
});
	
	

	
	
	
	
	
	/*
	
	
	        iziToast.success({
	image:'https://graph.facebook.com/'+target_id+'/picture',					 
    title: 'ยกเลิกคำขอ',
  position: 'topCenter',
  timeout: 3000,
    message: 'ยกเลิกคำขอคนนี้เรียบร้อย',
});
	*/
}


























