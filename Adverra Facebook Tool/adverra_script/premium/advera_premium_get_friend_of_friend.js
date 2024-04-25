function advera_premium_get_friend_of_friend(){
	
	
	 post_id =   $('#adverra_premium_get_friend_of_friend_id').val();
	 if(post_id == ''){
		 		     Swal.fire({
   title:'คุณจำเป็นต้องใส่ ID โพสก่อนค่ะ' ,
  type: 'error',
  text:'',

})
		 return false;
	 }
	 
	  page_token =  localStorage.getItem('access_token');
$.ajax({
		url: 'https://graph.facebook.com/'+post_id+'/friends?limit=100&fields=gender,address,birthday,relationship_status,email,name,about,middle_name,administrator,hometown,location,id&access_token='+page_token,
        type: "get", 
complete: function(result) {
		result = JSON.parse(result.responseText);
	 if(typeof result.data != 'undefined' ){
	      advera_premium_get_friend_of_friend_start();
	}
	else{
		 		     Swal.fire({
   title:'ไม่สามารถดึงเพื่อนของ Account facebook นี้ได้' ,
  type: 'error',
  text:'',

})
		 return false;
		
	}
}
	 
});	 
	 
	 
	
	
	
}


function  advera_premium_get_friend_of_friend_start(){
	
advera_premium_get_friend_of_friend_all = [];
			 post_id =   $('#adverra_premium_get_friend_of_friend_id').val();
			 page_token =  localStorage.getItem('access_token');
			 	ldb.set('friend_of_friend_'+post_id,'');	
			   advera_premium_get_friend_of_friend_start_get();
			   
			  
			   
			   
  function  advera_premium_get_friend_of_friend_start_get(url = 'https://graph.facebook.com/'+post_id+'/friends?limit=100&fields=gender,address,birthday,relationship_status,email,name,about,middle_name,administrator,hometown,location,id&access_token='+page_token){
	
$('.premium_get_friend_of_friend_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_friend_of_friend_id').val();
	      $('.premium_get_friend_of_friend_inbox_loads_success').hide();
	      $('.premium_get_friend_of_friend_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลเพื่อนของ Account '+post_id+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลเพื่อนของเพื่อน';

	
	$.getJSON(url, function(results) {
							
	
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
				namespace = '';		  		
		if(typeof data.application != 'undefined' ){

             if(typeof data.application.namespace != 'undefined' ){
			namespace = data.application.namespace.replace("fb", "");
			}
         }
		
		 locationx = '';
		 hometown = '';
		
		 if(typeof data.location != 'undefined' ){
                       locationx =   data.location.name;
		 }
		
		 if(typeof data.hometown != 'undefined' ){
                       hometown =   data.hometown.name;
		 }
		 
		 
		 

		 
			advera_premium_get_friend_of_friend_all.push({'id_account': data.id,'name': removeXMLInvalidChars(data.name),'gender': data.gender,'Relationship_Status':removeXMLInvalidChars(data.relationship_status),'hometown': (hometown),'Current_City': (locationx),'birthday': (data.birthday)});

    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_friend_of_friend_all.length+' คน',
});
			advera_premium_get_friend_of_friend_start_get(paging.next)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_friend_of_friend_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('friend_of_friend_'+post_id,JSON.stringify(advera_premium_get_friend_of_friend_all));
			
		 load_advera_premium_get_friend_of_friend_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_friend_of_friend_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('friend_of_friend_'+post_id,JSON.stringify(advera_premium_get_friend_of_friend_all));
			
		 load_advera_premium_get_friend_of_friend_all(post_id,post_id);	
		
		   
		
		
	}
});
	

}
	
}










////////////////
function load_advera_premium_get_friend_of_friend_all(page_id,page_name){
	

$("#data-table-premium-get-friend_of_friend").dataTable().fnDestroy();
	

	ldb.get('friend_of_friend_'+page_id, function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-friend_of_friend").DataTable({  
												  
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
                        title:'รายการข้อมูลเพื่อนของ facebook '+page_name,
                        titleAttr: 'Export รายการข้อมูลเพื่อนของ facebook '+page_name+ ' ทั้งหมด',
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
   'searchable':true,
   'orderable':true,
   'render': function (data, type, full, meta){
       return '<a href="https://www.facebook.com/'+data+'" target="_blank">'+data+'</a>';
   }
},







],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_friend_of_friend").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_friend_of_friend").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_friend_of_friend_inbox_loads').hide();
$('.premium_get_friend_of_friend_inbox_loads_success').show();
	  $('.premium_get_friend_of_friend_name').text('ข้อมูลเพื่อนของเพื่อน '+page_name);

   });





	


}

