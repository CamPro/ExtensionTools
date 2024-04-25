function advera_premium_get_group_members(){
	
		check_tokenmember(advera_premium_get_group_membersx)
function advera_premium_get_group_membersx(){
	
	
	
	 post_id =   $('#adverra_premium_get_group_members_id').val();
	 if(post_id == ''){
		 		     Swal.fire({
   title:'คุณจำเป็นต้องใส่ ID กลุ่มที่ต้องการดึงสมาชิกก่อนค่ะ' ,
  type: 'error',
  text:'',

})
		 return false;
	 }
	 
	  page_token =  localStorage.getItem('token_appvip');
$.ajax({
		url: 'https://graph.facebook.com/'+post_id+'/members?limit=1&fields=gender,address,birthday,relationship_status,email,name,about,middle_name,administrator,first_name,hometown,education,languages,is_verified,last_name,location,id,devices,mobile_phone,joined&access_token='+page_token,
        type: "get", 
complete: function(result) {
		result = JSON.parse(result.responseText);
	 if(typeof result.data != 'undefined' ){
	      advera_premium_get_group_members_start();
	}
	else{
		 		     Swal.fire({
   title:'' ,
  type: 'error',
  html:'<h5>โพสนี้ไม่สามารถดึงสมาชิกในกลุ่มได้</h5>',

})
		 return false;
		
	}
}
	 
});	 
	 
	 
	
	
}
}


function  advera_premium_get_group_members_start(){
	
advera_premium_get_group_members_all = [];
			 post_id =   $('#adverra_premium_get_group_members_id').val();
			 page_token =  localStorage.getItem('token_appvip');
			 	ldb.set('group_members_'+post_id,'');	
			   advera_premium_get_group_members_start_get();
			   
			  
			   
			   
  function  advera_premium_get_group_members_start_get(url = 'https://graph.facebook.com/'+post_id+'/members?limit=100&fields=gender,address,birthday,relationship_status,email,name,about,middle_name,administrator,first_name,hometown,education,languages,is_verified,last_name,location,id,devices,mobile_phone,joined&access_token='+page_token){
	
$('.premium_get_group_members_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_group_members_id').val();
	      $('.premium_get_group_members_inbox_loads_success').hide();
	      $('.premium_get_group_members_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลสมาชิกในกลุ่มของโพส '+post_id+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลสมาชิกในกลุ่มโพส';

	
	$.getJSON(url, function(results) {
							
	
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
          locationx = '';
		if(typeof data.location != 'undefined' ){
			 locationx = data.location.name;
			 
		 }
		 hometown = '';
		 if(typeof data.hometown != 'undefined' ){
			 hometown = data.hometown.name;
			 
		 }
		 
		 
			advera_premium_get_group_members_all.push({'id_account': data.id,'name': removeXMLInvalidChars(cleanx(data.name)),'gender': data.gender,'Relationship_Status':removeXMLInvalidChars(data.relationship_status),'hometown': cleanx(hometown),'Current_City': cleanx(locationx),'birthday': (data.birthday),'email': cleanx(data.email),'mobile_phone': cleanx(data.mobile_phone)});
		 
		 
		 
			//advera_premium_get_group_members_all.push({'id': data.id,'from_name': removeXMLInvalidChars(data.from.name),'from_id': data.from.id,'like_count': (like_count),'message': removeXMLInvalidChars(data.message),'comment_count': (comment_count),'created_time': parseDateString(data.created_time).toLocaleString()});

    });
	
	adverra_premium_get_group_members_limit = $('#adverra_premium_get_group_members_limit').val();
	if(advera_premium_get_group_members_all.length < adverra_premium_get_group_members_limit){
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_group_members_all.length+' คน',
});
			advera_premium_get_group_members_start_get(paging.next)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_group_members_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('group_members_'+post_id,JSON.stringify(advera_premium_get_group_members_all));
			
		 load_advera_premium_get_group_members_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_group_members_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('group_members_'+post_id,JSON.stringify(advera_premium_get_group_members_all));
			
		 load_advera_premium_get_group_members_all(post_id,post_id);	
		
		   
		
		
	}
	}
	else{
		
			message = title+' ตามจำนวนที่คุณใส่เรียบร้อยแล้ว '+advera_premium_get_group_members_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('group_members_'+post_id,JSON.stringify(advera_premium_get_group_members_all));
			
		 load_advera_premium_get_group_members_all(post_id,post_id);	
		
		   
		
		
	
		
		
	}
});
	

}
	
}










function load_advera_premium_get_group_members_all(page_id,page_name){
	

$("#data-table-premium-get-group-members").dataTable().fnDestroy();
	

	ldb.get('group_members_'+page_id, function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-group-members").DataTable({  
												  
          responsive: false,
		   dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
    
    
  buttons: {
          dom: {
            container:{
              tag:'div',
              className:'flexcontent'
            },
            buttonLiner: {
              tag: null
            }
          },
          
          
          
          
          
          
          buttons: [




                    {
                        extend:    'excelHtml5',
						charset: 'UTF-8',
					   fieldSeparator: ';',
					   bom: true,
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'รายการข้อมูลสมาชิกในกลุ่มของโพส'+page_name,
                        titleAttr: 'Export รายการข้อมูลสมาชิกในกลุ่มของโพส ในโพส '+page_name+ ' ทั้งหมด',
                        className: 'btnx btn-app export excel',
						
                      
                    },
                  
                
                    
                ]
          
          
        }
    

    ,
		  data:all_data,
		   "columns": [
            { "data": "id_account" },
            { "data": "name" },
			{ "data": "gender" },
			{ "data": "birthday" },
			{ "data": "email" },
			{ "data": "mobile_phone" },
			{ "data": "mobile_phone" },
			{ "data": "Relationship_Status" },
			{ "data": "hometown" },
			{ "data": "Current_City" },

			
			
			
		


        ],
   
    "paging": true,
    "ordering": true,
	"scrollY": $(window).height() - 200 + "px",
	"lengthMenu":[100],
    "info": true,
	 'columnDefs': [
{
    "defaultContent": "-",
    "targets": "_all"
  }	,				
					


{
   'targets': 0,
   'searchable':false,
   'orderable':false,
   'render': function (data, type, full, meta){
       return '<a href="https://www.facebook.com/'+data+'" target="_blank">'+data+'</a>';
   }
},



{
   'targets': 6,
   'searchable':false,
   'orderable':false,
   'render': function (data, type, full, meta){
       return data.replace('+66','0');
   }
},




],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_group_members").on("keyup click", function() {
																					
      filterGlobal();
   });

   $("input.column_filter").on("keyup click", function() {
      filterColumn(
         $(this)
            .parents("tr")
            .attr("data-column")
      );
   });
   
   
   
	  $("#chk_all_inbox").on("click", function() {
	
	 var cells = table.column(0).nodes(), // Cells from 1st column
        state = this.checked;

    for (var i = 0; i < cells.length; i += 1) {
        cells[i].querySelector("input[type='checkbox']").checked = state;
		
    }				
	
	Swal.fire({
  position: 'top-end',
  type: 'info',
  title: 'เลือกจำนวน '+cells.length+' รายการ',
  showConfirmButton: false,
  timer: 1500
})
// $(':checkbox[name=foo]').prop('checked', this.checked);

});	
		
	
	
function filterGlobal() {
      table.search($("#global_filter_premium_get_group_members").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
   }

   function filterColumn(i) {
      table
         .column(i)
         .search(
            $("#col" + i + "_filter").val(),
            $("#col" + i + "_regex").prop("checked"),
            $("#col" + i + "_smart").prop("checked")
         )
         .draw();
   }

	
	
   $('.premium_get_group_members_inbox_loads').hide();
$('.premium_get_group_members_inbox_loads_success').show();
	  $('.premium_get_group_members_name').text('ข้อมูลสมาชิกในกลุ่มโพส '+page_name);

   });





	


}

