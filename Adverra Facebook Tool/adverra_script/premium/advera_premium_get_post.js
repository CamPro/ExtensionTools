function advera_premium_get_post(){
	
	
	 post_id =   $('#adverra_premium_get_post_id').val();
	 if(post_id == ''){
		 		     Swal.fire({
   title:'คุณจำเป็นต้องใส่ ID โพสก่อนค่ะ' ,
  type: 'error',
  text:'',

})
		 return false;
	 }
	 	advera_premium_get_post_xs = 0;	   
	  page_token =  localStorage.getItem('access_token');
$.ajax({
		url: 'https://graph.facebook.com/fql?q=SELECT user_id,post_id FROM like WHERE object_id = '+post_id+'  LIMIT 1&access_token='+page_token,
        type: "get", 
complete: function(result) {
		result = JSON.parse(result.responseText);
	 if(typeof result.data[0].user_id != 'undefined' ){
		 
		    advera_premium_get_post_start();
		 
		 }

	else{
		 		     Swal.fire({
   title:'โพสนี้ไม่สามารถดึงLike ได้' ,
  type: 'error',
  text:'',

})
		 return false;
		
	}
}
	 
});	 
	 
	 
	
	
	
}


function  advera_premium_get_post_start(){
	
advera_premium_get_post_all = [];

			 page_token =  localStorage.getItem('access_token');
			 	ldb.set('likepost_'+post_id,'');	
			   advera_premium_get_post_start_get(0);
			   
			  
			   
 
  function  advera_premium_get_post_start_get(advera_premium_get_post_xs,url = 'https://graph.facebook.com/fql?q=SELECT uid,verified,username,is_blocked,hometown_location,current_location,wall_count,online_presence,name,birthday_date,sex,meeting_sex,relationship_status,education_history,work_history,status,contact_email,email,proxied_email FROM user where uid IN(SELECT user_id FROM like WHERE object_id = '+post_id+'  LIMIT 0,500)&access_token='+page_token){
	  

$('.premium_get_post_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_post_id').val();
	      $('.premium_get_post_inbox_loads_success').hide();
	      $('.premium_get_post_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลLike ของโพส/วิดีโอ '+post_id+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลLike โพส';

	

		  $.ajax({ 
		  url:url,
		  dataType: 'json',
		  type: 'GET', 
          complete: function(results){ 					
	results = JSON.parse(results.responseText);
    var data = results.data;

	
   $.each(data, function (i, data) {
	
 
  
 
  
	  current_location = '';
	   // console.log(data.current_location+'_888888888');
		if(data.current_location != null ){
			 current_location = data.current_location.name;
			  console.log(current_location);
			 
		 }
		 hometown = '';
	 if(data.hometown_location != null  ){
			 hometown = data.hometown_location.name;
			 
		 }
		    console.log(current_location);
		 uid = "'"+data.uid+"'";
		
			advera_premium_get_post_all.push({'Account ID': uid,'Account Name': removeXMLInvalidChars(cleanx(data.name)),'Username': data.username,'Gender': data.sex,'Relationship Status':removeXMLInvalidChars(data.relationship_status),'Hometown': removeXMLInvalidChars(cleanx(hometown)),'Current City': cleanx(current_location),'Birthday': changedmy(data.birthday_date) });
           // fromid = "'"+data.user_id+"'";
			//advera_premium_get_post_all.push({'Account ID': fromid});

    });
	
	if(typeof data != 'undefined'){
		
if(typeof data[0] != 'undefined'){
		
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_post_all.length+' คน',
});
		advera_premium_get_post_x = (advera_premium_get_post_xs+500);
            urlx = 'https://graph.facebook.com/fql?q=SELECT uid,verified,username,is_blocked,hometown_location,current_location,wall_count,online_presence,name,birthday_date,sex,meeting_sex,relationship_status,education_history,work_history,status,contact_email,email,proxied_email FROM user where uid IN(SELECT user_id FROM like WHERE object_id = '+post_id+'  LIMIT '+advera_premium_get_post_x+',500)&access_token='+page_token
			//urlx = 'https://graph.facebook.com/fql?q=SELECT user_id,post_id FROM like WHERE object_id = '+post_id+'  LIMIT '+advera_premium_get_post_x+',500&access_token='+page_token;	
		
			advera_premium_get_post_start_get(advera_premium_get_post_x,urlx)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_post_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('likepost_'+post_id,JSON.stringify(advera_premium_get_post_all));
			
		 load_advera_premium_get_post_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_post_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('likepost_'+post_id,JSON.stringify(advera_premium_get_post_all));
			
		 load_advera_premium_get_post_all(post_id,post_id);	
		
		   
		
		
	}
	  }
});
	
  }

	
}










////////////////
function load_advera_premium_get_post_all(page_id,page_name){
	

$("#data-table-premium-get-likepost").dataTable().fnDestroy();
	

	ldb.get('likepost_'+page_id, function (all_datas) {
all_data = $.parseJSON((all_datas));

  console.log(all_data);
     var table = $("#data-table-premium-get-likepost").DataTable({  
												  
     responsive: false,
		  /* dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',-->*/
    
   /* 
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
                        title:'รายการข้อมูลLike ของโพส'+page_name,
                        titleAttr: 'Export รายการข้อมูลLike ของโพส ในโพส '+page_name+ ' ทั้งหมด',
                        className: 'btnx btn-app export excel',
						 exportOptions: {
                            columns: [0,1, 2, 3, 4, 5,6 ]
                        },
                      
                    },
                  
                
                    
                ]
          
          
        }
    

    ,*/
		  data:all_data,
		   "columns": [
            { "data": "Account ID" },
			{ "data": "Account Name" },
            { "data": "Username" },
			{ "data": "Gender" },
			{ "data": "Birthday" },
            { "data": "Relationship Status" },
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
   'render': function (data, type, full, meta){
         return '<a href="https://www.facebook.com/'+data.replace(/\'/g, '')+'" target="_blank">'+data.replace(/\'/g, '')+'</a>';
   }
},







],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_post").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_post").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_post_inbox_loads').hide();
$('.premium_get_post_inbox_loads_success').show();
	  $('.premium_get_post_name').text('ข้อมูลLike โพส '+page_name);

   });





	
  $(".premium_get_post_export").on("click", function() {
	ldb.get('likepost_'+page_id, function (JSONData) {
									  
			JSONToCSVConvertor(JSONData, 'รายการข้อมูลLike ของโพส'+page_name,1)	
			
			  });

 });

}


