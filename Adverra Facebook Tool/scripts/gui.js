localStorage.setItem('fanpage_all','');	

if (window.location.href.indexOf('premium_get_inbox_fanpage') > -1) {
	localStorage.setItem('fanpage_all','')
   get_fanpage();
}

if (window.location.href.indexOf('premium_broadcast') > -1) {
	localStorage.setItem('fanpage_all','')
   get_fanpage();
}

 if (window.location.href.indexOf('premium_broadcastbylabel') > -1) {
	localStorage.setItem('fanpage_all','')
   get_fanpage();
}
   
	
	
	

 var tour = {
    id: "hello-hopscotch",
    steps: [
    {
      target: 'lock-ok',
      title: 'ปุ่มปลดล็อคโปรแกรม Adverra',
      content: 'หากท่านสั่งซื้อโปรแกรม adverra แล้ว สามารถคลิกเพื่อใช้งานได้เลยครับ โปรแกรมสามารถใช้ได้ไม่จำกัดเครื่องและ facebook หากปุ่มนี้เป็นสีแดง แสดงว่ายังไม่ได้ปลดล็อค แต่หากว่าเป็นสีเขียวแสดงว่าปลดล้อคแล้ว  ระบบจะอัพเดททุกวันอัตโนมัติครับ ดูรายละเอียดต่างได้ที่หน้า แฟนเพจ Adverra',
      placement: 'right',
      arrowOffset: 60,
	   yOffset: -60,
	   xOffset: -50
    },
      {
        title: "ฟังชัน Free Tool",
        content: "สำหรับลูกค้าที่ไม่ได้ซื้อ สามารถใช้ฟังชันทุกตัวในเมนูนี้ได้ฟรี",
        target: 'free-tool',
        placement: "bottom",
		   showCloseButton: true,
      },
	    {
        title: "ฟังชัน Premium Tool",
        content: "สำหรับลูกค้ารายเดือน สามารถใช้ได้ทุกฟังชันในนี้",
        target: 'premium-tool',
        placement: "bottom"
		
      }
	  ,
	    {
        title: "ฟังชัน VIP Tool",
        content: "สำหรับลูกค้ารายปี สามารถใช้ได้ทุกฟังชันในนี้ และใช้ได้ทุกฟังชันในระบบนี้",
        target: 'vip-tool',
        placement: "bottom"
		
      },
	     {
        title: "เวอร์ชั่นของโปรแกรม ระบบจะอัพเดทให้อัตโนมัติ",
        content: "ระบบจะประกาศข่าวสารการอัพเดทโปรแกรมได้จากในเพจด้านล่างนี้",
        target: 'update_vertion',
        placement: "top"
		
      }
    ],
	showPrevButton: true,
	  scrollTopMargin: 100,
  };

  // Start the tour!









update_license_info(null);
  jQuery.noConflict();
  jQuery(document).ready(function ($) {

            jQuery("#tabbed-nav2").zozoTabs({
                position: "top-left",
                orientation: "vertical",
                multiline: true,
                style: "contained",
                theme: "flat-peter-river flat",
                spaced: true,
                rounded: false,
                animation: {
                    easing: "easeInOutExpo",
                    duration: 450,
                    effects: "slideH"
                }
            });
			
			 
        });
  

 $(".export_excel").on("click", function() {
			data_excel   = $(this).find('.data_excel').val();
			data_excel_json   = $(this).find('.data_excel_json').val();
			
			id  = data_excel.split('||')[0];
			name  = data_excel.split('||')[1];
			export_excel(name,data_excel_json);

 });







$('.content_all').hide();
idx = 	window.location.href.replace(chrome.extension.getURL("index.html"), "");	

$(idx).show();

$(window).on('hashchange', function(e){
							
									
									
idx = 	window.location.href.replace(chrome.extension.getURL("index.html"), "");
	
if(idx == '#free_facilities'){
	
// chrome.tabs.create({ url: chrome.extension.getURL("index.html#free_facilities") });
	//location.reload();

}

if(idx == '#adverra_premium_broadcast'){
	
	//append_get_fanpage();

}



if(idx == '#premium_broadcast'){
	
	  get_fanpage();

}

if(idx == '#premium_broadcastbylabel'){
	
	  get_fanpage();

}




if(idx == '#premium_get_inbox_fanpage'){
	
	  get_fanpage();

}



if(idx == '#premium_get_mygroups'){
	
	 start_ext(advera_premium_get_mygroups);

}





if(idx == '#premium_get_myfriend'){
	
	 start_ext(advera_premium_get_myfriend);

}




$('.content_all').hide();
$(idx).show();






});




	
	if (window.location.href.indexOf('premium_get_mygroups') > -1) {
		$('#premium_get_mygroups').show();
         start_ext(advera_premium_get_mygroups);
}

	

	if (window.location.href.indexOf('dashboard') > -1) {
		settinge_loginOK  = localStorage.getItem('settinge_loginOK');
		if(settinge_loginOK != 1){
		  hopscotch.startTour(tour);
		}
}

	

	if (window.location.href.indexOf('premium_get_myfriend') > -1) {
		$('#premium_get_myfriend').show();
         start_ext(advera_premium_get_myfriend);
}

	





progressbarx();
function progressbarx(){
 $('.progressbar').each(function(){
		var t = $(this),
		dataperc = t.attr('data-perc'),
		barperc = Math.round(dataperc*10);
		t.find('.bar').animate({width:dataperc+'%'}, dataperc);
		t.find('.label').html('<div class="perc"></div>');
		var length = t.find('.bar').css('width'),
		labelpos = (parseInt(length));
		t.find('.label').css('left', labelpos);
		t.find('.perc').text(dataperc+'%');
	
	});

}











$('input,textarea').bind('paste', function(e){ 
	  var elem = $(this);

    setTimeout(function() {
        var text = elem.val();
		text = text.split('?__tn__=');
		text = text[0].split('&__xts__');
		text = text[0].split('?__xts__');
		text = text[0].replace(/'/g,"");
		elem.val(text);
    }, 100);
	
	});
$("#load_friend").on("click", function() {
	friend = [];
	if(!$('#data-table-friend').hasClass("table_friend")){
	 get_friend();							
	}
									   
 });




function load_friend_addto(){
						   
		friend_all = $.parseJSON(localStorage.getItem('friend_all'));
		data_html = '';
  $.each(friend_all, function(i,data) {
         name =  data.name.substr(0,20);	
         id   =  data.id;	
         gender =  data.gender;	
		  data_html = ' <tr id="'+id+'"> <td class="center-align"> <label> <input type="checkbox" name="foo" class="friend_invite" value="'+id+'"/> <span></span> </label> </td><td><span class="avatar-contact avatar-online"><img src="https://graph.facebook.com/'+id+'/picture?type=small" alt="avatar"></span></td><td>'+name+'</td><td>'+gender+'</td><td>'+id+'</td></tr>'+data_html;
        });
  
   datall = '<div class="content-area content-right" style="width:100%!important; margin-top:15px;"> <div class="app-wrapper"> <div class="datatable-search"> <i class="material-icons mr-2 search-icon">search</i> <input type="text" placeholder="ค้นหา" class="app-filter" id="global_filter"> </div><div id="" class="card card card-default  border-radius-6 "> <div class="card-content p-0"> <table id="data-table-friend" class="display table_friend" > <thead> <tr > <th class="background-image-none center-align"> <label> <input type="checkbox" id="chk_all"/> <span></span> </label> </th> <th>User</th> <th>ชื่อ</th> <th>เพศ</th> <th>ID Facebook</th>  </thead> <tbody>'+data_html+'</tbody> </table> </div></div></div></div>';
  $('.friend_all').html(datall);
   var calcDataTableHeight = function() {
      return  $(window).height() - 420 + "px";
   };


   var table = $("#data-table-friend").DataTable({   
          responsive: true,
    "paging": true,
    "ordering": true,
	"scrollY": calcDataTableHeight(),
	"lengthMenu":[100],
    "info": false,
 

     
   });
   
   
   
   
   
   
  
		
		   $("input#global_filter").on("keyup click", function() {
      filterGlobal();
   });

   $("input.column_filter").on("keyup click", function() {
      filterColumn(
         $(this)
            .parents("tr")
            .attr("data-column")
      );
   });
   
   
	  $("#chk_all").on("click", function() {
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
      table.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
	

}






function load_facebook_inbox(page_id,page_name){
	

$("#data-table-inbox").dataTable().fnDestroy();
    idbgetx = '';
	idbgetx = 'page_'+page_id;


	ldb.get('page_'+page_id, function (inbox_allx) {
	inbox_all = $.parseJSON((inbox_allx));


 
     var table = $("#data-table-inbox").DataTable({  
												  
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



                   /* {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i>PDF',
                        title:'pdf',
                        titleAttr: 'PDF',
						charset: 'UTF-8',
					   fieldSeparator: ';',
					   bom: true,

                        className: 'btnx btn-app export pdf',
                        exportOptions: {
                            columns: [ 0, 1 ]
                        },
						 exportOptions: {
                            columns: [2, 3 ]
                        },
                        customize:function(doc) {

                            doc.styles.title = {
                                color: '#4c8aa0',
                                fontSize: '30',
                                alignment: 'center'
                            }
                            doc.styles['td:nth-child(2)'] = { 
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor:'#4c8aa0',
                                color:'white',
                                alignment:'center'
                            },
                            doc.content[1].margin = [ 100, 0, 100, 0 ]

                        }

                    },*/

                /*    {
                        extend:    'excelHtml5',
						charset: 'UTF-8',
					   fieldSeparator: ';',
					   bom: true,
                        text:      '<i class="fa fa-file-excel-o"></i>Excel',
                        title:'รายการข้อมูลคน inbox ในแฟนเพจ'+page_name,
                        titleAttr: 'Export ข้อมูลคน inbox ในแฟนเพจ'+page_name+ ' ทั้งหมด',
                        className: 'btnx btn-app export excel',
						 exportOptions: {
                            columns: [1, 2, 3, 4, 5 ,6 ]
                        },
                      
                    },*/
                  
                /*    {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i>พิมพ์',
                      title:'',
					   titleAttr: 'พิมพ์ ข้อมูลคน inbox ในแฟนเพจ'+page_name+ ' ทั้งหมด',
						charset: 'UTF-8',
					   fieldSeparator: ';',
					   bom: true,
                        className: 'btnx btn-app export imprimir',
                        exportOptions: {
                            columns: [2, 3 ]
                        }
                    },*/
                    
                ]
          
          
        }
    

    ,
		  data:inbox_all,
		   "columns": [
			{ "data": "account_id" },
            { "data": "account_id" },
            { "data": "account_name" },
			{ "data": "updated_time" },
			{ "data": "can_reply" },
			{ "data": "unread_count" },
			{ "data": "snippet" },
		


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
   'className': 'dt-body-center',
   'render': function (data, type, full, meta){
       return ' <label> <input type="checkbox" name="foo" class="chk_inbox" value="'+data+'"/> <span></span> </label>';
   }
},

{
   'targets': 1,
   'searchable':false,
   'orderable':false,
   'render': function (data, type, full, meta){
       return '<a href="https://www.facebook.com/'+data.replace(/\'/g, '')+'" target="_blank">'+data.replace(/\'/g, '')+'</a>';
   }
},







],

	

     
   });
   

  
  
  
  		   $("input#global_filter").on("keyup click", function() {
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
      table.search($("#global_filter").val(), $("#global_regex").prop("checked"), $("#global_smart").prop("checked")).draw();
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

	
	
   $('.inbox_loads').hide();
$('.inbox_loads_success').show();
	  $('.premium_get_inbox_fanpage_name').text('ข้อมูลคน inbox ในแฟนเพจ'+page_name);
	 

   });





	


}













function  get_friend(url = 'https://graph.facebook.com/v1.0/me/friends?fields=id,name,gender&limit=1000&access_token='+access_token){

	title = 'ดึงเพื่อน';

	
	$.getJSON(url, function(results) {
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
			friend.push({'id': data.id, 'name': data.name,'gender': data.gender});
    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: title,
  position: 'topRight',
  timeout: 1000,
    message: 'กำลังดึงเพื่อน รอสักครู่',
});
			get_friend(paging.next)
		
		
		}	
		else{
				message = 'รวบรวมเพื่อนของคุณเรียบร้อยแล้ว '+friend.length+' คน';
			  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			localStorage.setItem('friend_all',JSON.stringify(friend));
				load_friend_addto();
		
			
		}
	}
	else{
			message = 'รวบรวมเพื่อนของคุณเรียบร้อยแล้ว '+friend.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
	localStorage.setItem('friend_all',JSON.stringify(friend));	
	load_friend_addto();
		 
		
		
	}
});
	
	

}




















function append_get_fanpage(){
	
			fanpage_allx = $.parseJSON(localStorage.getItem('fanpage_all'));
			option = '';
  $.each(fanpage_allx, function(i,data) {
         name =  data.name;	
         id   =  data.id;	
         page_access_token =  data.page_access_token;	
                 option = '<option value="'+id+'|'+page_access_token+'|'+name+'" data-icon="https://graph.facebook.com/'+id+'/picture?type=small"  >'+name+'</option>'+option;
	
	
	
	});

	 $(".get_fanpage").append('<option value=""   >เลือกแฟนเพจ</option>'+option);
	 $(".get_fanpage").formSelect();
}


    fanpage_all = [];
function  get_fanpage(url = 'https://graph.facebook.com/v1.0/me/accounts?fields=access_token,id,name&limit=40&access_token='+access_token){

	title = 'ข้อมูลคน inbox ในแฟนเพจ';

	
	$.getJSON(url, function(results) {
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
			fanpage_all.push({'id': data.id, 'name': data.name,'page_access_token': data.access_token});
    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: title,
  position: 'topRight',
  timeout: 1000,
    message: 'กำลังดึง'+title+'รอสักครู่',
});
			get_fanpage(paging.next)
		
		
		}	
		else{
			
				message = 'ดึงแฟนเพจของคุณ '+fanpage_all.length+' แฟนเพจ';
			  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message: '',
});
			
			
			     
		
			localStorage.setItem('fanpage_all',JSON.stringify(fanpage_all));
				append_get_fanpage();
		
			
		}
	}
	else{
			message = 'ดึงแฟนเพจของคุณ '+fanpage_all.length+' แฟนเพจ';
				  iziToast.success({			 
    title: message,
  position: 'topRight',
  timeout: 3000,
    message:  '',
});
		
	localStorage.setItem('fanpage_all',JSON.stringify(fanpage_all));	

		 
		
		
	}
});
	
	

}















function  get_inbox_page_start(page_id,page_token,page_name){
	      $('.inbox_loads').show();
	localStorage.setItem('fanpage_all','')
	      $('.inbox_loads_success').hide();
	      $('.inbox_loads').html('<center>รอสักครู่ กำลังโหลดข้อมูลแฟนเพจ'+page_name+'..<br><img src="loading.gif" style="width:100px;"></center> <div style="height:300px;"></div>');
		ldb.set('page_'+page_id,'');
		$('.data_excel').val('page_'+page_id+'||'+'ข้อมูลรายการ inbox แฟนเพจ'+page_name);
         inbox_all = [];
         get_inbox_page();
  function  get_inbox_page(url = 'https://graph.facebook.com/'+page_id+'/conversations?fields=id,can_reply,updated_time,senders,link,snippet,unread_count&limit=100&access_token='+page_token){

	title = 'ดึงข้อมูลinbox ในแฟนเพจ';

	
	$.getJSON(url, function(results) {
    var data = results.data;
    var paging = results.paging;
   $.each(data, function (i, data) {
						  
					//	inbox_all.push({'id': data.id,'account_id': data.senders.data[0].id, 'account_name': removeXMLInvalidChars(data.senders.data[0].name),'snippet': '','can_reply': data.can_reply,'unread_count': data.unread_count,'updated_time': parseDateString(data.updated_time).toLocaleString()});  
 iddata = "'"+data.senders.data[0].id+"'";
			inbox_all.push({'id': data.id,'account_id': iddata, 'account_name': removeXMLInvalidChars(data.senders.data[0].name),'snippet': removeXMLInvalidChars(data.snippet),'can_reply': data.can_reply,'unread_count': data.unread_count,'updated_time': parseDateString(data.updated_time).toLocaleString()});
			
		
			

    });
	
	if(typeof paging != 'undefined'){
		
		if(typeof paging.next != 'undefined'){
			
			        iziToast.info({			 
    title: '',
  position: 'topRight',
  timeout: 1000,
    message: 'กำลัง'+title+' รอสักครู่ '+inbox_all.length+' คน',
});
			get_inbox_page(paging.next)
		
		
		}	
		else{
				message = title+'เรียบร้อยแล้ว '+inbox_all.length+' คน';
			  iziToast.success({			 
    title: '',
  position: 'topRight',
  timeout: 3000,
    message: message,
});
			
			
			     
		
			ldb.set('page_'+page_id,JSON.stringify(inbox_all));
			
			 load_facebook_inbox(page_id,page_name);	
		
			
		}
	}
	else{
			message = title+'เรียบร้อยแล้ว '+inbox_all.length+' คน';
				  iziToast.success({			 
    title: title,
  position: 'topRight',
  timeout: 3000,
    message:  message,
});
		
	ldb.set('page_'+page_id,JSON.stringify(inbox_all));	

	 load_facebook_inbox(page_id,page_name);	
		
		   
		
		
	}
});
	
	

}
}

//////////////////////////////////////////





/*
$(".get_fanpage").on("change", function() {
         p_token = $(this).val();					
					
    });
   
*/

$("#adverra_premium_get_inbox_fanpage_select").on("change", function() {
			start_ext(start_inbox_fanpage);														 
																	 /*
                    page_id = $(this).val().split('|')[0];		
					page_access = $(this).val().split('|')[1];	
					page_name = $(this).val().split('|')[2];	
					start_ext(get_inbox_page_start(page_id,page_access,page_name);
					*/
    });
   


///////////////////////////////////////////

/*
  $(".unlock_account").click(function() {	
	start_ext(unlock);									
											
    });
   */


   /////////////ลบคำขอเพื่อน//////////////////
   $("#adverra_c_friend_re").click(function() {	
	start_to_remove_pending_friend_requests();									
											
    });
   
   
    /////////////ลบแฟนเพจ//////////////////
      $("#adverra_c_fanpage").click(function() {	
	unlikeallpagesfunction();								
											
    });
	  
	    $("#adverra_c_friend_add_you").click(function() {	
	start_cancel_all_friend_add_you();								
											
    });


	    $("#adverra_disable_notify_group").click(function() {	
	start_disable_notify();								
											
    });


    $("#adverra_exit_groups").click(function() {	
	start_exit_groups();								
											
    });


 $("#adverra_remove_friend").click(function() {	
	adverra_remove_friend();								
											
    });




 $("#adverra_id_extractor").click(function() {	
	adverra_id_extractor();								
											
    });




 $("#averra_invite_friend_to_fanpage").click(function() {	
	averra_invite_friend_to_fanpage();								
											
    });


 $("#adverra_add_friend_add_you").click(function() {	
	adverra_add_friend_add_you();								
											
    });



 $("#adverra_video_fb_downloader").click(function() {	
	adverra_video_fb_downloader();								
											
    });



 $("#adverra_separate").click(function() {	
	adverra_separate();								
											
    });


 $("#adverra_spintax").click(function() {	
	adverra_spintax();								
											
    });

///////////////////////////////////premium//////////////////////////////

$('button[typeaccount="premium"]').click(function() {	
	         funtion_name = $(this).attr('id');
			call_myFun  =  window[funtion_name];	
			start_ext(call_myFun);
    });



$('button[typeaccount="vip"]').click(function() {	
	         funtion_name = $(this).attr('id');
			call_myFun  =  window[funtion_name];	
			start_vip(call_myFun);
    });







$('button[typeaccount="premium_next"]').click(function() {	
	         funtion_namex = $(this).attr('id');
			call_myFunx  =  window[funtion_namex];	
		
			start_ext(call_myFunx);
    });



$('button[typeaccount="premium_stop"]').click(function() {	
													   
					           Swal.fire({
  title: 'คุณต้องการทำรายการนี้?',
  text: "คุณจะหยุดระบบนี้ไว้ชั่วคราว?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  
	  
	   names = $(this).attr('id');
			//call_myFun_stop  =  window[funtion_name];	
	
	id_element = names.replace('_stop','');
				  
				  
				classx = $('#'+id_element);
	stopx = $('.'+id_element+'_stop');
	play = $('.'+id_element+'_play');
	next = $('.'+id_element+'_next');
	timeout = $('.'+id_element+'_settimeout');
	stop_text = $('.'+id_element+'_stop_text');
	time_text = $('.'+id_element+'_time');
    bittext = $('.'+id_element+'_bit');
  
				  
				  
			localStorage.setItem(names,'1');
			
			
			
		stopx.hide();
	        play.hide();
			next.show();
			stop_text.show();
			time_text.hide();
		
	 clearTimeout(id_element+'_time_out');
	// alert(stop_ok);
			return false;
	  
	  }
})
									   
													   
													   
													   
													   
													   
													   
													   
													   
	        

			
			
    });



function close_window() {
  if (confirm("Close Window?")) {
    close();
  }
}



$('.unlock_account:checkbox').change(function() {
    // this will contain a reference to the checkbox   
    if (this.checked) {
 		$('.unlock_account').prop('checked', false);
           	start_ext(unlock);	
			
    } else {
		$('.unlock_account').prop('checked', true);
          Swal.fire({
  title: 'คุณจะออกจากระบบ Adverra?',
  text: "ถ้าคุณต้องการออกจากระบบ Adverra กดปุ่ม Yes",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  		$('.unlock_account').prop('checked', false);
			$('.all_account').hide();
			$('.free_account').show();
			$('#access_token_div').hide();
			$('#access_token_div_intragram').hide();
			
			chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});
			
			
			
    Swal.fire(
      'ออกจากระบบ Adverra เรียบร้อย',
      'หากคุณต้องการเข้าระบบ Adverra อีกครั้งให้กดที่รุปกุญแจอีกครั้ง',
      'success'
    )
  }
})
    }
});


 $("#adverra_spintax").click(function() {	
	adverra_spintax();								
											
    });



$('#fst789_log_in_cancel').click(function() {
hide_log_in_box();								  

});


$(".emojionearea1").emojioneArea({
  	  tonesStyle: 'checkbox',
		pickerPosition: "bottom",
    	searchPlaceholder: "ค้นหา"
	});


get_token_intragram();


  // Define the tour!


 $('.datepicker').duDatepicker({format: 'dd-mm-yyyy'});
 
 
 
 
 	  $(".premium_get_inbox_fanpage_export").on("click", function() {
		ldb.get(idbgetx, function (idbgetx) {	
									  
			JSONToCSVConvertor(idbgetx, 'รายการข้อมูลinbox ในแฟนเพจ'+page_name,1)	
			
			  });

 });
	
	
 

 
 