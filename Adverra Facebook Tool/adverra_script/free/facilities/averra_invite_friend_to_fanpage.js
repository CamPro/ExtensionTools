
function send_averra_invite_friend_to_fanpage(i,xloob){
//v//ar friend_invite = $('.friend_invite:checkbox:checked').map(function() {
   // return this.value;
//}).get();
friend_invite = [];


var oTable = $('#data-table-friend').dataTable();
var rowcollection =  oTable.$(".friend_invite:checked", {"page": "all"});
rowcollection.each(function(index,elem){
    var checkbox_value = $(elem).val();
  friend_invite.push(checkbox_value);
});

if((friend_invite) == ''){
	
		 Swal.fire('เกิดข้อผิดพลาด', 'กรุณาเลือกรายชื่อเพื่อนที่ต้องการส่งคำเชิญ','error');
		 return false;
	}
else
if((friend_invite).length == 1){
	
		 Swal.fire('เกิดข้อผิดพลาด', 'กรุณาเลือกรายชื่อเพื่อนที่ต้องการส่งคำเชิญ 2 รายการขึ้นไป','error');
		 return false;
	}

friend_invite = friend_invite.join(",");
friend_invite = friend_invite.split(',');
loob = 0;

console.log(xloob);


if((xloob)< ((friend_invite.length-1)) ){
console.log('///////////////////////');
	adverra_f_to_like_page_id = $('#adverra_f_to_like_page_id').val();
	adverra_f_to_like_message = $('#adverra_f_to_like_message').val();
	adverra_f_to_delay = $('#adverra_f_to_delay').val();
	adverra_f_to_send_message = $('#adverra_f_to_send_message');
	
	
	
	
	if(adverra_f_to_like_page_id == ''){
	
		 Swal.fire('เกิดข้อผิดพลาด', 'กรุณาใส่ ID แฟนเพจ','error');
		 return false;
	}
	else
	if(adverra_f_to_delay < 5 || adverra_f_to_delay == ''){
	
		 Swal.fire('เกิดข้อผิดพลาด', 'ใส่ หน่วงเวลาขั้นต่ำ 5 วินาทีเพื่อไม่ให้เร็วเกินไปครับ','error');
		 return false;
	}
	
	
	if(adverra_f_to_send_message.is(':checked')){
          chk = true;
      }
	  else{
		  chk = false;
	  }
	 
	
	    invite = '';
		//console.log(friend_invite);
		x = 0;
	   for(j=i;j<(i+40);j++){
		  	if(typeof friend_invite[j] != 'undefined'){
		   invite = invite+'&invitees['+x+']='+friend_invite[j];
		    x++;  
		   }
		
	   }

console.log(invite);
loob = (i+40);
xloob = xloob+x;



				parms='page_id='+adverra_f_to_like_page_id+'&invite_note='+adverra_f_to_like_message+'&send_in_messenger='+chk+invite+'&ref=modal_page_invite_dialog_v2 &__user='+user_id+'&__a=1&__req=1k&__be=1&_&dpr=1.5&__rev='+__rev+'&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk';	
 $.ajax({
		url: "https://www.facebook.com/pages/batch_invite_send/",
        type: "post",
        data:parms,
		  complete: function(data1){ 
		texteror = '';
		texteror = give_error_description(data1.responseText);
	if(texteror == ''){
		  loop = (i+1);
		  			        iziToast.info({			 	
  position: 'topCenter',
  timeout: 1000,
  title:'กำลังเชิญเพื่อน',
    message: 'เชิญแล้ว '+ xloob+ ' คน',
});
		  setTimeout(function(){ 		
          send_averra_invite_friend_to_fanpage(loob,xloob);
		    }, (adverra_f_to_delay*1000));
     
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
else{
	
					Swal.fire(
  'เชิญเพื่อนเรียบร้อยแล้ว',
  'เชิญเพื่อนมากดถูกใจแฟนเพจเรียบร้อยแล้ว',
  'success'
)


	
	
}


}







function averra_invite_friend_to_fanpage(){
	
	
	           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณต้องการจะเชิญเพื่อนให้มาถูกใจแฟนเพจใช่หรือไม่?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	  
	  
	  send_averra_invite_friend_to_fanpage(0,0);
	 
	  
	  
	  }
})


}






















