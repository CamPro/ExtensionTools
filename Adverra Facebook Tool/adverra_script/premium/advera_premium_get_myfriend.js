function advera_premium_get_myfriend(){
	advera_premium_get_myfriend_start();
	
	
	}


function  advera_premium_get_myfriend_start(){

advera_premium_get_myfriend_all = [];
			// post_id =   $('#adverra_premium_get_myfriend_id').val();
			 page_token =  localStorage.getItem('access_token');
			 	//ldb.set('myfriend','');	
			   advera_premium_get_myfriend_start_get(0,);
			   
			  

		advera_premium_get_myfriend_xs = 0;	   
  function  advera_premium_get_myfriend_start_get(advera_premium_get_myfriend_xs,url = "https://graph.facebook.com/fql?q=SELECT uid,sex, name,online_presence, birthday,relationship_status FROM user WHERE uid IN ( SELECT uid2 FROM friend WHERE uid1 = '"+user_id+"') limit "+advera_premium_get_myfriend_xs+",500&access_token="+page_token+"&method=GET"){
	
$('.premium_get_myfriend_inbox_loads').show();
	// post_id =   $('#adverra_premium_get_myfriend_id').val();
	      $('.premium_get_myfriend_inbox_loads_success').hide();
	      $('.premium_get_myfriend_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลของเพื่อน<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลเพื่อน';

	
	$.getJSON(url, function(results) {
							
	
    var data = results.data;

   $.each(data, function (i, data) {
	
		 
			advera_premium_get_myfriend_all.push({'id': cleanx(data.uid),'name': removeXMLInvalidChars(cleanx(data.name)),'sex': removeXMLInvalidChars(cleanx(data.sex)),'online_presence': data.online_presence,'birthday':removeXMLInvalidChars(cleanx(data.birthday)),'relationship_status':removeXMLInvalidChars(cleanx(data.relationship_status))});

    });
	
	

	if(typeof data != 'undefined'){
		
if(typeof data[0] != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_myfriend_all.length+' รายการ',
});
			advera_premium_get_myfriend_x = advera_premium_get_myfriend_xs+500;
	
			urlx = "https://graph.facebook.com/fql?q=SELECT uid, name, birthday,sex,online_presence,relationship_status FROM user WHERE uid IN ( SELECT uid2 FROM friend WHERE uid1 = '"+user_id+"') limit "+advera_premium_get_myfriend_x+",500&access_token="+page_token+"&method=GET";	
			advera_premium_get_myfriend_start_get(advera_premium_get_myfriend_x,urlx)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_myfriend_all.length+' รายการ';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('myfriend',JSON.stringify(advera_premium_get_myfriend_all));
			
		 load_advera_premium_get_myfriend_all('','');	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_myfriend_all.length+' รายการ';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('myfriend',JSON.stringify(advera_premium_get_myfriend_all));
			
		 load_advera_premium_get_myfriend_all('','');	
		
		   
		
		
	}
	
});
	

}
	
}










////////////////
function load_advera_premium_get_myfriend_all(page_id,page_name){
	

$("#data-table-premium-get-myfriend").dataTable().fnDestroy();
	

	ldb.get('myfriend', function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-myfriend").DataTable({  
												  
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
                        title:'รายการข้อมูลเพื่อน',
                        titleAttr: 'Export รายการข้อมูลเพื่อนทั้งหมด',
                        className: 'btnx btn-app export excel',
						
                      
                    },
                  
                
                    
                ]
          
          
        }
    

    ,
		  data:all_data,
		   "columns": [
            { "data": "id" },
			{ "data": "id" },
            { "data": "name" },
			{ "data": "sex" },
			{ "data": "online_presence" },
			{ "data": "relationship_status" },
			{ "data": "birthday" },
			
			
	

			
			
		


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
   'targets': 1,
   'searchable':true,
   'orderable':true,
   'render': function (data, type, full, meta){
       return '<span class="avatar-contact avatar-online"><img src="https://graph.facebook.com/'+data+'/picture?type=small" alt="avatar"></span>';
   }
},

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
   

  
  
  
  		   $("input#global_filter_premium_get_myfriend").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_myfriend").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_myfriend_inbox_loads').hide();
$('.premium_get_myfriend_inbox_loads_success').show();
	  $('.premium_get_myfriend_name').text('ข้อมูลเพื่อน');

   });





	


}

