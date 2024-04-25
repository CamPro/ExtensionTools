function advera_premium_get_idconvert(){
	
		check_tokenmember(advera_premium_get_idconvertx)
}
function advera_premium_get_idconvertx(){
	
	   advera_premium_get_idconvert_start();
	
	}



function  advera_premium_get_idconvert_start(){
	
advera_premium_get_idconvert_all = [];
			 post_id =   1;
			 page_token =  localStorage.getItem('token_appvip');
			 	ldb.set('idconvert','');	
			   advera_premium_get_idconvert_start_get(0);
			   
			  

			   
  function  advera_premium_get_idconvert_start_get(xs){
	
	
		   adverra_premium_get_idconvert_data  = 	$('#adverra_premium_get_idconvert_data').val().trim().split(/\r\n|\r|\n/);
		   if((xs+100) < adverra_premium_get_idconvert_data.length){
			   xx =   (xs+100);
		   }
		   else{
			   
			   xx = adverra_premium_get_idconvert_data.length;
			   
		   }
	 console.log(xs,xx);
		   adverra_premium_idconvert_data_array = [];
		   for(i=xs;i<xx;i++){
			   
			   adverra_premium_idconvert_data_array.push(adverra_premium_get_idconvert_data[i]);
		   }
	results = get_alluserfbvip(adverra_premium_idconvert_data_array)
	
$('.premium_get_idconvert_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_idconvert_id').val();
	      $('.premium_get_idconvert_inbox_loads_success').hide();
	      $('.premium_get_idconvert_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลAccount ID ต่างๆ..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูล Account ID ต่างๆ';

	
	
	
	
							
	
    var data = results.data;
   $.each(data, function (i, data) {
          locationx = '';
		if(typeof data.location != 'undefined' ){
			 locationx = data.location.name;
			 
		 }
		 hometown = '';
		 if(typeof data.hometown != 'undefined' ){
			 hometown = data.hometown.name;
			 
		 }

		 
		 dataid  =  "'"+data.uid+"'";
		 cell = '-';
		 cell2 = '-';
		 if(data.cell != null){
			 cell =  "'"+data.cell+"'";
			 cell2 =  "'"+data.cell+"'";
		 }
			advera_premium_get_idconvert_all.push({'Account ID': dataid,'Account Name': removeXMLInvalidChars(cleanx(data.name)),'Username': (cleanx(data.username)),'Email': cleanx(data.email),'Mobile phone': (cell),'Mobile phone2': (cell2.replace('+66','0')),'Gender': data.gender,'Relationship Status':removeXMLInvalidChars(data.relationship_status),'Hometown': cleanx(hometown),'Current City': cleanx(locationx),'Birthday': changedmy(data.birthday)});
		 
		 
		 
			//advera_premium_get_idconvert_all.push({'id': data.id,'from_name': removeXMLInvalidChars(data.from.name),'from_id': data.from.id,'like_count': (like_count),'message': removeXMLInvalidChars(data.message),'comment_count': (comment_count),'created_time': parseDateString(data.created_time).toLocaleString()});

    });
	
	
  if((xs+100) < adverra_premium_get_idconvert_data.length){
		
  if((xs+100) < adverra_premium_get_idconvert_data.length){
			if((xs+100)%200==0){
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_idconvert_all.length+' คน',
});
			}
			 setTimeout(function() {		
					
			advera_premium_get_idconvert_start_get((xs+100))
		   }, 200);
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_idconvert_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('idconvert',JSON.stringify(advera_premium_get_idconvert_all));
			
		 load_advera_premium_get_idconvert_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_idconvert_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('idconvert',JSON.stringify(advera_premium_get_idconvert_all));
			
		 load_advera_premium_get_idconvert_all(post_id,post_id);	
		
		   
		
		
	}
	
	
	


	
}





}













////////////////
function load_advera_premium_get_idconvert_all(page_id,page_name){
	

$("#data-table-premium-get-idconvert").dataTable().fnDestroy();
	

	ldb.get('idconvert', function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-idconvert").DataTable({  
												  
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



                  
                                    
                ]
          
          
        }
    

    ,
		  data:all_data,
		   "columns": [
            { "data": "Account ID" },
            { "data": "Account Name" },
			{ "data": "Username" },
			{ "data": "Email" },
			{ "data": "Mobile phone" },
			{ "data": "Mobile phone2" },
			{ "data": "Gender" },
			{ "data": "Relationship Status" },
			{ "data": "Birthday" },
			{ "data": "Hometown" },
			{ "data": "Current City" },


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



{
   'targets': 4,
   'searchable':true,
   'orderable':true,
   'render': function (data, type, full, meta){
       return  data.replace(/\'/g, '');
	   
   }
},




{
   'targets': 5,
   'searchable':true,
   'orderable':true,
   'render': function (data, type, full, meta){
	  return  data.replace(/\'/g, '');
   }
},



],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_idconvert").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_idconvert").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_idconvert_inbox_loads').hide();
$('.premium_get_idconvert_inbox_loads_success').show();
	  $('.premium_get_idconvert_name').text('ข้อมูล Account ID ต่างๆ');

   });



 $(".premium_get_idconvert_name_export").on("click", function() {
		ldb.get('idconvert', function (JSONData) {	
									  
			JSONToCSVConvertor(JSONData, 'ข้อมูล Account ID ต่างๆ',1)	
			
			  });

 });

	


}



