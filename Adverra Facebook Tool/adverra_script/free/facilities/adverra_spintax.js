function adverra_spintax(){

$(".adverra_spintax_list").html('');
var data = remove_duplicates($("#adverra_spintax_data").val().trim().split(/\r\n|\r|\n/));
var datas = '';
var count = data.length;
for(var i=0; i<count;i++){
	datas += data[i]+'|';
	
}

 datas = myRoom.myAction(datas.slice(0, -1).trim());  
 $(".adverra_spintax_list").html('<div class="input-field col s12"> <i class="material-icons prefix">view_list</i><textarea id="" class="copytext materialize-textarea" style="height:300px;height:300px;max-height:300px; overflow-y:scroll;" >{'+datas+'}</textarea>copy ข้อมูลด้านบนนี้ไปใช้ได้เลยค่ะ  <a datashow="copytext" class="copyto btn-floating mb-1 btn-flat waves-effect waves-light pink accent-2 white-text">  <i class="material-icons">content_copy</i></a><div>')



	
}



