function adverra_separate(){


 var data  = 	$('#adverra_separate_data').val().trim().split(/\r\n|\r|\n/);
 if(data[0] == ''){
 Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'กรุณาใส่ข้อมูล',
})
  $("#adverra_separate_data").focus();
 return false;
 }
 
 if($("#adverra_separate_limit_num").val() < 1){
 Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ต้องใส่จำนวนการแบ่งอยจ่างน้อย 1 ',
})
 $("#adverra_separate_limit_num").focus();
 return false;
 }
 
 
  var data = 	remove_duplicates(data);
 var count = data.length;
 var count_list = 0;
 var max_number = 	$("#adverra_separate_limit_num").val();
 var number_for_data = count/max_number;
 var datas = '';
 var number_for_data_s = count%max_number;
 if(number_for_data_s != 0){
	 number_for_data = number_for_data+1;
 }
 
 $(".adverra_separate_list").html('');
 
     for(var i=1;i< (number_for_data);i++){
		 datas = '';
		 for(var j=(0+(max_number*i))-max_number;j<(max_number*i);j++){
			 	if(data[j]){
		          datas += data[j]+'&#13;&#10;';
				}
			
		 }
	
		 count_list = (datas.trim().split('&#13;&#10;').length-1);
		
		if(i<10){
			icon = '<i class="material-icons prefix">filter_'+i+'</i>';	
		}
		else{
				icon = '<i class="material-icons prefix">filter_9_plus</i>';
			
		}
	 $(".adverra_separate_list").append('<div class="input-field col s12"> '+icon+'<textarea id="" class="copytext'+i+' materialize-textarea" style="height:100px;height:200px;max-height:250px; overflow-y:scroll;" >'+datas+'</textarea> ชุดที่ '+i+' จำนวน ' +count_list+' รายการ <a datashow="copytext'+i+'" class="copyto btn-floating mb-1 btn-flat waves-effect waves-light pink accent-2 white-text">  <i class="material-icons">content_copy</i></a></div>')

		 
     }

	
	
}