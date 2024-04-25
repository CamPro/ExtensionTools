function advera_premium_get_mygroups(){
	advera_premium_get_mygroups_start();
	
	
	}


function  advera_premium_get_mygroups_start(){

advera_premium_get_mygroups_all = [];
			// post_id =   $('#adverra_premium_get_mygroups_id').val();
			 page_token =  localStorage.getItem('access_token');
			 	//ldb.set('mygroups','');	
			   advera_premium_get_mygroups_start_get();
			   
			  
			   
			   
  function  advera_premium_get_mygroups_start_get(url = 'https://graph.facebook.com/me/groups?fields=id,member_count,privacy,name,unread,description&access_token='+page_token){
	
$('.premium_get_mygroups_inbox_loads').show();
	// post_id =   $('#adverra_premium_get_mygroups_id').val();
	      $('.premium_get_mygroups_inbox_loads_success').hide();
	      $('.premium_get_mygroups_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลของกลุ่มที่เข้าร่วม<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลกลุ่มที่เข้าร่วม';

	
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
		 
	
		 

		 idxx = "'"+data.id+"'";
			advera_premium_get_mygroups_all.push({'id': idxx,'name': removeXMLInvalidChars(data.name),'member_count': data.member_count,'privacy':data.privacy,'unread': (data.unread),'description': removeXMLInvalidChars(data.description)});

    });
	
	

	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_mygroups_all.length+' รายการ',
});
			advera_premium_get_mygroups_start_get(paging.next)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_mygroups_all.length+' รายการ';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('mygroups',JSON.stringify(advera_premium_get_mygroups_all));
			
		 load_advera_premium_get_mygroups_all('','');	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_mygroups_all.length+' รายการ';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('mygroups',JSON.stringify(advera_premium_get_mygroups_all));
			
		 load_advera_premium_get_mygroups_all('','');	
		
		   
		
		
	}
});
	

}
	
}










////////////////
function load_advera_premium_get_mygroups_all(page_id,page_name){
	

$("#data-table-premium-get-mygroups").dataTable().fnDestroy();
	

	ldb.get('mygroups', function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-mygroups").DataTable({  
												  
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



/*
                    {
                        extend:    'excelHtml5',
						charset: 'UTF-8',
					   fieldSeparator: ';',
					   bom: true,
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'รายการข้อมูลกลุ่มที่เข้าร่วม',
                        titleAttr: 'Export รายการข้อมูลกลุ่มที่เข้าร่วมทั้งหมด',
                        className: 'btnx btn-app export excel',
						
                      
                    },*/
                  
                
                    
                ]
          
          
        }
    

    ,
		  data:all_data,
		   "columns": [
            { "data": "id" },
            { "data": "name" },
			{ "data": "member_count" },
			{ "data": "privacy" },
			{ "data": "unread" },
			{ "data": "description" },
	

			
			
		


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
       return '<a href="https://www.facebook.com/'+data.replace(/\'/g, '')+'" target="_blank">'+data.replace(/\'/g, '')+'</a>';
   }
},







],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_mygroups").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_mygroups").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_mygroups_inbox_loads').hide();
$('.premium_get_mygroups_inbox_loads_success').show();
	  $('.premium_get_mygroups_name').text('ข้อมูลกลุ่มที่เข้าร่วม');

   });





	


}


  $(".premium_get_mygroups_name_export").on("click", function() {
		ldb.get('mygroups', function (JSONData) {	
									  
			JSONToCSVConvertor(JSONData, 'รายการข้อมูลกลุ่มที่เข้าร่วมทั้งหมด',1)	
			
			  });

 });