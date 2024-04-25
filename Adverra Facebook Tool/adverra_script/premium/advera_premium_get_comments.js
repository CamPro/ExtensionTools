function advera_premium_get_comments(){
	
	
	 post_id =   $('#adverra_premium_get_comments_id').val();
	 if(post_id == ''){
		 		     Swal.fire({
   title:'คุณจำเป็นต้องใส่ ID โพสก่อนค่ะ' ,
  type: 'error',
  text:'',

})
		 return false;
	 }
	 	advera_premium_get_comments_xs = 0;	   
	  page_token =  localStorage.getItem('access_token');
	 
$.ajax({
		url: 'https://graph.facebook.com/'+post_id+'?fields=from,comments.limit(1)&access_token='+page_token,
        type: "get", 
complete: function(result) {
			 advera_premium_get_comments_fromid = '';
		result = JSON.parse(result.responseText);
	 if(typeof result.comments != 'undefined' ){

		  if(typeof  result.from != 'undefined' ){
		        advera_premium_get_comments_fromid  =  result.from.id;
		  }
		 advera_premium_get_comments_post_id = result.comments.data[0].id.split('_')[0];
	      advera_premium_get_comments_start();
	}
	else
 if(typeof result.id != 'undefined' ){

		  if(typeof  result.from != 'undefined' ){
		        advera_premium_get_comments_fromid  =  result.from.id;
		  }
	 
	 advera_premium_get_comments_post_id = post_id;
	 
		  advera_premium_get_comments_start();
		
	 
	 }
	else{
		 		     Swal.fire({
   title:'โพสนี้ไม่สามารถดึงคอมเม้นได้' ,
  type: 'error',
  text:'',

})
		 return false;
		
	}
}
	 
});	 
	 
	 
	
	
	
}


function  advera_premium_get_comments_start(){
	
advera_premium_get_comments_all = [];

			 page_token =  localStorage.getItem('access_token');
			 	ldb.set('comments_'+post_id,'');	
			   advera_premium_get_comments_start_get(0);
			   
			  
			   

  function  advera_premium_get_comments_start_get(advera_premium_get_comments_xs,url = 'https://graph.facebook.com/fql?q=SELECT post_fbid, fromid, text, time,likes FROM comment WHERE object_id = '+advera_premium_get_comments_post_id+'   LIMIT 0,100&access_token='+page_token){
	  

$('.premium_get_comments_inbox_loads').show();
	 post_id =   $('#adverra_premium_get_comments_id').val();
	      $('.premium_get_comments_inbox_loads_success').hide();
	      $('.premium_get_comments_inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลคอมเม้นของโพส/วิดีโอ '+post_id+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>'); 
	title = 'ดึงข้อมูลคอมเม้นโพส';

	




						 
						 
						 
		  $.ajax({ 
		  url:url,
		  dataType: 'json',
		  type: 'GET', 
          complete: function(results){ 					
	results = JSON.parse(results.responseText);
    var dataxx = results.data;
    var data = results.data;
	
	
// 
 
 
	   
		data_save_fromid = [];
		data_save_one= [];
   $.each(dataxx, function (i, data) {
		//if((data.fromid.toString().length == 15 &&  data.fromid.toString().indexOf('100')>-1) || (data.fromid.toString().length < 14)){
			
			data_save_one.push(data);
			data_save_fromid.push(data.fromid);
		//}
	
	   });	
   
    data_new = get_alluserfb(data_save_fromid).data;



			 $.each(data_save_one, function (i, data) {
	
		 $.each(data_new, function (i, data2) {


if( data.fromid == data2.uid){

	current_location = '';
		if(typeof data2.current_location != 'undefined'){   
		if(data2.current_location != null ){
			 current_location = data2.current_location.name;
;
			 
		 }
		}
		 
		 hometown = '';
		if(typeof data2 != 'undefined'){  
		  // console.log(data2.hometown_location);
	 if(data2.hometown_location != null  ){
			 hometown = data2.hometown_location.name;
			 
		 }
		 
		 }
		 
		   // console.log(current_location);
		  
		 uid = "'"+data2.uid+"'";




            fromid = "'"+data.fromid+"'";
		//	advera_premium_get_comments_all.push({'Comment ID': post_id+'_'+data.post_fbid,'Account Name': '-','Account ID': fromid,'Like count': data.likes, 'Message': removeXMLInvalidChars(data.text),'Created time': getDateFormat(data.time)});

advera_premium_get_comments_all.push({'Comment ID': post_id+'_'+data.post_fbid,'Account ID': fromid,'Account Name': removeXMLInvalidChars(cleanx(data2.name)),'Username': data2.username,'Like count': data.likes, 'Message': removeXMLInvalidChars(data.text),'Created time': getDateFormat(data.time),'Gender': data2.sex,'Relationship Status':removeXMLInvalidChars(data2.relationship_status),'Hometown': removeXMLInvalidChars(cleanx(hometown)),'Current City': cleanx(current_location),'Birthday': changedmy(data2.birthday_date) });
	
}
	
	
		
 });
	
	
	
	
 });

	   
   
	 console.log(advera_premium_get_comments_all);
	
	
	
	
	if(typeof data != 'undefined'){
		
if(typeof data[0] != 'undefined'){
		
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+advera_premium_get_comments_all.length+' คน',
});
		advera_premium_get_comments_x = (advera_premium_get_comments_xs+100);

			urlx = 'https://graph.facebook.com/fql?q=SELECT post_fbid, fromid, text, time,likes FROM comment WHERE object_id = '+advera_premium_get_comments_post_id+'  LIMIT '+advera_premium_get_comments_x+',100&access_token='+page_token;	
		
			advera_premium_get_comments_start_get(advera_premium_get_comments_x,urlx)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+advera_premium_get_comments_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('comments_'+post_id,JSON.stringify(advera_premium_get_comments_all));
			
		 load_advera_premium_get_comments_all(post_id,post_id);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+advera_premium_get_comments_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
		ldb.set('comments_'+post_id,JSON.stringify(advera_premium_get_comments_all));
			
		 load_advera_premium_get_comments_all(post_id,post_id);	
		
		   
		
		
	}
	  }
});
	
  }

	
}










////////////////
function load_advera_premium_get_comments_all(page_id,page_name){
	

$("#data-table-premium-get-comments").dataTable().fnDestroy();
	

	ldb.get('comments_'+page_id, function (all_datas) {
all_data = $.parseJSON((all_datas));

     var table = $("#data-table-premium-get-comments").DataTable({  
												  
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
                        title:'รายการข้อมูลคอมเม้นของโพส'+page_name,
                        titleAttr: 'Export รายการข้อมูลคอมเม้นของโพส ในโพส '+page_name+ ' ทั้งหมด',
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
            { "data": "Comment ID" },
            { "data": "Account ID" },
			{ "data": "Account Name" },
			{ "data": "Username" },
			{ "data": "Message" },
			{ "data": "Like Count" },
			{ "data": "Created time" },
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
       return '<a href="https://www.facebook.com/'+data+'" target="_blank">'+data+'</a>';
   }
},

{
   'targets': 1,
   'render': function (data, type, full, meta){
       return '<a href="https://www.facebook.com/'+data.replace(/\'/g, '')+'" target="_blank">'+data.replace(/\'/g, '')+'</a>';
   }
},





],

	

    
   });
   

  
  
  
  		   $("input#global_filter_premium_get_comments").on("keyup click", function() {
																					
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
      table.search($("#global_filter_premium_get_comments").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.premium_get_comments_inbox_loads').hide();
$('.premium_get_comments_inbox_loads_success').show();
	  $('.premium_get_comments_name').text('ข้อมูลคอมเม้นโพส '+page_name);

   });





	
  $(".premium_get_comments_export").on("click", function() {
	ldb.get('comments_'+page_id, function (JSONData) {
									  
			JSONToCSVConvertor(JSONData, 'รายการข้อมูลคอมเม้นของโพส'+page_name,1)	
			
			  });

 });

}


