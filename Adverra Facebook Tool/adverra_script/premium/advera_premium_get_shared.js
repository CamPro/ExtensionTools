function advera_premium_get_shared(){
	
	
	 post_id =   $('#adverra_premium_get_shared_id').val();
	 if(post_id == ''){
		 		     Swal.fire({
   title:'คุณจำเป็นต้องใส่ ID โพสก่อนค่ะ' ,
  type: 'error',
  text:'',

})
		 return false;
	 }
	 
	  page_token =  localStorage.getItem('token_intragram');
$.ajax({
		url: 'https://graph.facebook.com/'+post_id+'/?fields=sharedposts.limit(1){from,message,likes,comments.limit(1).summary(true)}&access_token='+page_token,
        type: "get", 
complete: function(result) {
		result = JSON.parse(result.responseText);
	 if(typeof result.sharedposts != 'undefined' ){
	      advera_premium_get_shared_start();
	}
	else{
		 		     Swal.fire({
   title:'โพสนี้ไม่สามารถดึงแชร์ได้' ,
  type: 'error',
  text:'',

})
		 return false;
		
	}
}
	 
});	 
	 
	 
	
	
	
}


function  advera_premium_get_shared_start(){
	
advera_premium_get_shared_all = [];
			 post_id =   $('#adverra_premium_get_shared_id').val();
			 page_token =  localStorage.getItem('token_intragram');
			 	ldb.set('shared_'+post_id,'');	
			   advera_premium_get_shared_start_get();
			   
			  
			   
			   
  function  advera_premium_get_shared_start_get(url = 'https://graph.facebook.com/'+post_id+'/?fields=sharedposts{from,message,likes,comments.limit(1).summary(true)}&access_token='+page_token){
	
$('.premium_get_shared_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_shared_id').val();
	      $('.premium_get_shared_inbox_loads_success').hide();
	      $('.premium_get_shared_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลแชร์ของโพส '+post_id+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลแชร์โพส';

	
	$.getJSON(url, function(results) {
							
	
    var data = results.sharedposts.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
				namespace = '';		  		
		if(typeof data.application != 'undefined' ){

             if(typeof data.application.namespace != 'undefined' ){
			namespace = data.application.namespace.replace("fb", "");
			}
         }
		
		 like_count = 0;
		 comment_count = 0;
		 if(typeof data.likes != 'undefined' ){
                       like_count =   data.likes.count;
		 }
		 
		 if(typeof data.comments != 'undefined' ){
                       comment_count =   data.comments.summary.total_count;
		 }
		 
		 
			advera_premium_get_shared_all.push({'id': data.id,'from_name': removeXMLInvalidChars(data.from.name),'from_id': data.from.id,'like_count': (like_count),'message': removeXMLInvalidChars(data.message),'comment_count': (comment_count),'created_time': parseDateString(data.created_time).toLocaleString()});

    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_shared_all.length+' คน',
});
			advera_premium_get_shared_start_get(paging.next)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_shared_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('shared_'+post_id,JSON.stringify(advera_premium_get_shared_all));
			
		 load_advera_premium_get_shared_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_shared_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('shared_'+post_id,JSON.stringify(advera_premium_get_shared_all));
			
		 load_advera_premium_get_shared_all(post_id,post_id);	
		
		   
		
		
	}
});
	

}
	
}










////////////////
function load_advera_premium_get_shared_all(page_id,page_name){
	

$("#data-table-premium-get-shared").dataTable().fnDestroy();
	

	ldb.get('shared_'+page_id, function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-shared").DataTable({  
												  
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
                        title:'รายการข้อมูลแชร์ของโพส'+page_name,
                        titleAttr: 'Export รายการข้อมูลแชร์ของโพส ในโพส '+page_name+ ' ทั้งหมด',
                        className: 'btnx btn-app export excel',
						 exportOptions: {
                            columns: [0,1, 2, 3, 4, 5 ]
                        },
                      
                    },
                  
                
                    
                ]
          
          
        }
    

    ,
		  data:all_data,
		   "columns": [
            { "data": "id" },
            { "data": "from_id" },
			{ "data": "from_name" },
			{ "data": "like_count" },
			{ "data": "comment_count" },
			{ "data": "created_time" },
			
			
			
		


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







],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_shared").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_shared").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_shared_inbox_loads').hide();
$('.premium_get_shared_inbox_loads_success').show();
	  $('.premium_get_shared_name').text('ข้อมูลแชร์โพส '+page_name);

   });





	


}

