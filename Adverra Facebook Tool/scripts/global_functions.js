$('.content_all').hide();
var fst_version_var = "1.0";
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var d = new Date();
var date_now = d.getTime();

function worker_function() {
    var intervalIds = {};

self.onmessage = function(e) {
  switch (e.data.command) {
    case 'interval:start':
      var intvalId = setTimeout(function() {
        postMessage({
          message: 'interval:tick',
          id: e.data.id
        });
      }, e.data.interval);

      postMessage({
        message: 'interval:started',
        id: e.data.id
      });

      intervalIds[e.data.id] = intvalId;
      break;

    case 'interval:clear':
      clearTimeout(intervalIds[e.data.id]);

      postMessage({
        message: 'interval:cleared',
        id: e.data.id
      });

      delete intervalIds[e.data.id];
      break;
  }
};
}
var worker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));

var workerTimer = {
  id: 0,
  callbacks: {},

  setTimeout: function(cb, interval, context) {
    this.id++;
    var id = this.id;
    this.callbacks[id] = { fn: cb, context: context };
    worker.postMessage({ command: 'interval:start', interval: interval, id: id });
    return id;
  },

  onMessage: function(e) {
    switch (e.data.message) {
      case 'interval:tick':
        var callback = this.callbacks[e.data.id];
        if (callback && callback.fn) callback.fn.apply(callback.context);
        break;
      case 'interval:cleared':
        delete this.callbacks[e.data.id];
        break;
    }
  },

  clearTimeout: function(id) {
    worker.postMessage({ command: 'interval:clear', id: id });
  }
};

worker.onmessage = workerTimer.onMessage.bind(workerTimer);




function check_internet(){
	if (!navigator.onLine) {
	iziToast.error({title:'Internet Offline กรุณาเช็คการเชื่อมต่อ Internet ของท่าน',position: 'topCenter',timeout: 5000,message: '',});
	return false;
 }   
	else{
		return true;
		
	}
	
}


function footer_swal(){
	
	return "<span style='color:#FF0000'>*คุณสามารถย่อแท็บลงได้ เปิดแท็บอื่นได้ แต่อย่าปิดหน้านี้ เนื่องจากหากปิดแท็บนี้ระบบจะหยุดทำงาน หากต้องการให้ระบบปิดการทำงาน ให้กดปิดแท็บนี้</span>";
	
	
}






function countdown_x(time,title,name,loop,id_element,count_adverra_premium_addfriend){

	//clearInterval(interval);
	$('#'+id_element).hide();
	classx = $('#'+id_element);
	stopx = $('.'+id_element+'_stop');
	play = $('.'+id_element+'_play');
	next = $('.'+id_element+'_next');
	timeout = $('.'+id_element+'_settimeout');
	stop_text = $('.'+id_element+'_stop_text');
	time_text = $('.'+id_element+'_time');
    bittext = $('.'+id_element+'_bit');
	  timeout.attr('data-seconds-left', 0);
	timeout.attr('data-seconds-left', time);
	$(timeout).timer('remove');
	bittext.text('');
	
	
	$(timeout).timer({
    countdown: true,
    duration: time+'s',    	// This will start the countdown from 3 mins 40 seconds
    callback: function() {	// This will execute after the duration has elapsed
    	$(timeout).timer('remove');
    }
});
	
	
	
	
	/*
	
	$(timeout).startTimer({
  onComplete: function(element){
    timeout.addClass('is-complete');
    timeout.attr('data-seconds-left', 0);
	    //bittext.text('ทำต่อไป');
  },

 
});
	*/
	
	
		stop_ok = localStorage.getItem(id_element+'_stop');
console.log(stop_ok);
	if(stop_ok == 1){
		   
			stopx.hide();
	        play.hide();
			next.show();
			stop_text.show();
			time_text.hide();
		
	 clearTimeout(id_element+'_time_out');
	// alert(stop_ok);
			return false;
	}
	
	
	
	

	if(loop < count_adverra_premium_addfriend ){
	stopx.show();
	play.hide();
	next.hide();
	stop_text.hide();
	time_text.show();
	}
	else{
	stopx.hide();
	play.show();
	next.hide();
	stop_text.hide();
	time_text.hide();
		
		
	}

	

}	
	
	
	
	
	
	
	
function countdown_x_min(time,title,name,loop,id_element,count_adverra_premium_addfriend){
	

	//clearInterval(interval);
	$('#'+id_element).hide();
	classx = $('#'+id_element);
	stopx = $('.'+id_element+'_stop');
	play = $('.'+id_element+'_play');
	next = $('.'+id_element+'_next');
	timeout = $('.'+id_element+'_settimeout');
	stop_text = $('.'+id_element+'_stop_text');
	time_text = $('.'+id_element+'_time');
    bittext = $('.'+id_element+'_bit');
	  timeout.attr('data-seconds-left', 0);
	timeout.attr('data-seconds-left', time);
	$(timeout).timer('remove');
	bittext.text('');
	
	
	$(timeout).timer({
    countdown: true,
    duration: time+'s',    	// This will start the countdown from 3 mins 40 seconds
    callback: function() {	// This will execute after the duration has elapsed
	 timeout.attr('data-seconds-left', 0);
    	$(timeout).timer('remove');
    }
});
	
	
	
	
	/*
	
	$(timeout).startTimer({
  onComplete: function(element){
    timeout.addClass('is-complete');
    timeout.attr('data-seconds-left', 0);
	    //bittext.text('ทำต่อไป');
  },

 
});
	*/
	
	
		stop_ok = localStorage.getItem(id_element+'_stop');
console.log(stop_ok);
	if(stop_ok == 1){
		   
			stopx.hide();
	        play.hide();
			next.show();
			stop_text.show();
			time_text.hide();
		
	 clearTimeout(id_element+'_time_out');
	// alert(stop_ok);
			return false;
	}
	
	
	
	

	if(loop < count_adverra_premium_addfriend ){
	stopx.show();
	play.hide();
	next.hide();
	stop_text.hide();
	time_text.show();
	}
	else{
	stopx.hide();
	play.show();
	next.hide();
	stop_text.hide();
	time_text.hide();
		
		
	}

	


	
	
	}	
	
	
	
	
	
	
		
function countdown_x_min_r(time,title,name,loop,id_element,count_adverra_premium_addfriend){
	

	//clearInterval(interval);
	$('#'+id_element).hide();
	$('.'+id_element+'_time').show();
	classx = $('#'+id_element);
	stopx = $('.'+id_element+'_stop');
	play = $('.'+id_element+'_play');
	next = $('.'+id_element+'_next');
	timeout = $('.'+id_element+'_settimeout');

	stop_text = $('.'+id_element+'_stop_text');
	time_text = $('.'+id_element+'_time');
    bittext = $('.'+id_element+'_bit');
	  timeout.attr('data-seconds-left', 0);
	timeout.attr('data-seconds-left', time);
	
	$(timeout).timer('remove');
	bittext.text('');
	
	
	$(timeout).timer({
    countdown: true,
    duration: time+'s',    	// This will start the countdown from 3 mins 40 seconds
    callback: function() {	// This will execute after the duration has elapsed
    	$(timeout).timer('remove');
    }
});
	
	
	
	
	/*
	
	$(timeout).startTimer({
  onComplete: function(element){
    timeout.addClass('is-complete');
    timeout.attr('data-seconds-left', 0);
	    //bittext.text('ทำต่อไป');
  },

 
});
	*/
	
	
		stop_ok = localStorage.getItem(id_element+'_stop');
console.log(stop_ok);
	if(stop_ok == 1){
		   
			stopx.hide();
	        play.hide();
			next.show();
			stop_text.show();
			time_text.hide();
		
	 clearTimeout(id_element+'_time_out');
	// alert(stop_ok);
			return false;
	}
	
	
	
	


	


	
	
	}	
	
	
	
	
	
	
	
	
	
function report_append(div,color_status,status_name,id,name,target_id){
if(target_id != ''){
		
		idx = target_id;
	}
	if(typeof idx == 'undefined' ){
if(isNaN(id) == true){
   idx = id.match(/\d+/);
}
else{	
   idx = id;	
	}
}
file = '<li class="collection-item" style="padding:10px;"> <div class="list-left"> <label> <span class="avatar-contact avatar-online"><img src="https://graph.facebook.com/'+idx+'/picture?type=small" alt="avatar"></span> <span></span> </label> </div><div class="list-content"> <div class="list-title-area"> <div class="list-title" style="font-size:16px; font-weight:bold;"><a href="https://www.facebook.com/'+id+'" target="_blank" style="color:#000000;">'+name+'</a></div></div><div class="list-desc" style="text-align:left; color:'+color_status+'"> <i class="left '+color_status+'-text material-icons small-icons mr-2">fiber_manual_record </i>'+status_name+' </div></li>';
$(div).append(file);
}







function report_appendno_pic(div,color_status,status_name,id,name,target_id){
	
/*
	chkloopx = '';

      chkloopx = name.match(/\d+/g)[0];
   
reportx = div;
exportx = div.replace('_report','_export').replace('#','');;

	if(chkloopx == 1){
	$(reportx).append('<button class="btnx btn-app export excel '+exportx+'"><i class="fa fa-file-excel-o"></i>CSV</button>');
	_array = [];
	}

_array.push({'ID': name,'status': status_name})

*/
//	ldb.set('export_'+div,JSON.stringify(_array));
file = '<li class="collection-item" style="padding:10px;"> <div class="list-left"> <label> <span class="avatar-contact avatar-online"></span> <span></span> </label> </div><div class="list-content"> <div class="list-title-area"> <div class="list-title" style="font-size:16px; font-weight:bold;"><a href="https://www.facebook.com/'+id+'" target="_blank" style="color:#000000;">'+name+'</a></div></div><div class="list-desc" style="text-align:left; color:'+color_status+'"> <i class="left '+color_status+'-text material-icons small-icons mr-2">fiber_manual_record </i>'+status_name+' </div></li>';
$(div).append(file);
/*

	 $(exportx).on("click", function() {
	ldb.get('export_'+div, function (JSONData) {
									  
			JSONToCSVConvertor(JSONData, 'รายงาน'+div,1)	
			
			  });

 });


*/




}







//var access_tokenx = localStorage.getItem('access_token');
//if(access_tokenx == ''){
	









	
	
information_fb = [];

fetch('https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed').then(function(response) {
    return response.text()
  }).then(function(e) {

localStorage.setItem('access_token', '');
localStorage.setItem('fb_dtsg', '');
localStorage.setItem('user_id', '');
localStorage.setItem('fb_name', '');
		localStorage.setItem('__rev', '');

                 at = e.match(/accessToken\\":\\"([^\\]+)/);
				 		if(at == null){
	        $('header').hide();
			$('#dashboard').hide();
						Swal.fire({
  title: 'ดูเหมือนคุณยังไม่ได้ Login Facebook',
  html: '<div style="text-align:left">เนื่องจากระบบตรวจพบว่า คุณยังไม่ได้ Login facebook หรือใช้ Internet จาก hotspot<br> ระบบจะไม่สามารถเชื่อมต่อได้ ดังนั้นทำตามคำแนะนำที่เราบอกดังนี้<br>1.กดปุ่ม Yes ระบบจะพาคุณไปที่ facebook.com <br>ให้คุณ login ระบบให้เรียบร้อย<br>2.จากนั้นให้คุณคลิกที่ไอคอนโปรแกรมอีกครั้ง 3.ใช้ internet บ้านทั่วไปที่เข้า facebook.com แล้วเป็น www</div>',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
  chrome.tabs.create({url: "https://www.facebook.com/", "selected":true}, function (e){});
  }
})		
			return false;				
						
		}
		else{
			//$('header').show();
			//$('#dashboard').show();
			
			
		}
		
		
		
                touch = at[1];
                d = e.match(/{\\"dtsg\\":{\\"token\\":\\"([^\\]+)/);
                dt = d[1];
                n = e.match(/\\"NAME\\":\\"([^"]+)/);
				ids = e.match(/\\"ACCOUNT_ID\\":\\"([^"]+)/);
				ids = ids[1].slice(0, -1).replace(/\\\\/g, "\\"), 
                n = n[1].slice(0, -1).replace(/\\\\/g, "\\"), 
				__rev =   e.match(/server_revision+\\":+(\d+)/)[1];
				//n = decodeURIComponent(JSON.parse(`"${n}"`)),
		
			name = unicodeToChar(n);
				localStorage.setItem('access_token', touch);
				localStorage.setItem('fb_dtsg', dt);
				localStorage.setItem('user_id', ids);
				localStorage.setItem('fb_name', name);
				localStorage.setItem('__rev', __rev);
	
	
				
				var access_token = localStorage.getItem('access_token');
var fb_dtsg = localStorage.getItem('fb_dtsg');
var user_id = localStorage.getItem('user_id');
var fb_name = localStorage.getItem('fb_name');
var __rev = localStorage.getItem('__rev');
				
$('#access_token').val(access_token);	
$('#facebook_email').val('');	

$('.user_imgx').attr("src","https://graph.facebook.com/"+user_id+"/picture?type=large");
$('.user_namex').text(fb_name);
$('#fst789_groupopostingaccesstoken').val(access_token);


    });
  
function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}
  
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);
}




function toUTF16Pair(hex) {
  hex = hex.replace(/[&#x;]/g,'');
    var x = parseInt(hex, 16);
    if (x >= 0x10000 && x <= 0x10FFFF) {
        var first = Math.floor((x - 0x10000) / 0x400) + 0xD800;
        var second = ((x - 0x10000) % 0x400) + 0xDC00;
        return {
            first: first.toString(16).toUpperCase(),
            second: second.toString(16).toUpperCase(),
          combined: '\\u'+first.toString(16).toUpperCase() + '\\u'+second.toString(16).toUpperCase()
        };
    } else {
        return {}
    }
}


$(document).on('click','.copyto', function(){
  datashow = $(this).attr("datashow");
  classx = '.'+datashow;
  var copyText = $(classx);
  copyText.select();
  document.execCommand("copy");
  iziToast.success({			 	
  position: 'topCenter',
  timeout: 1000,
  title:'Copy ข้อความนี้แล้ว',
    message:'',
});


});


function check_tokenvip(funtion_namexs){
	tokenx =  localStorage.getItem('token_appvip');
	url ='https://graph.facebook.com/me?fields=email,id&access_token='+tokenx;
			 $.ajax({
		url: url,
        type: "get", 
		complete: function(result){ 
		  
		result = JSON.parse(result.responseText);
			if(typeof result.id != 'undefined' ){
				
				 chrome.tabs.create({ url: chrome.extension.getURL(funtion_namexs) });
				
				
				}
			else	
			{
				
				$('#overlayx3').show();
				return false;
				
			}
	
       
           
      },


    });
	
	
	
	
	
	
	
	
}













function check_tokenmember(funtion_namexs){
	tokenx =  localStorage.getItem('token_appvip');
	url ='https://graph.facebook.com/me?fields=email,id&access_token='+tokenx;
			 $.ajax({
		url: url,
        type: "get", 
		complete: function(result){ 
		  
		result = JSON.parse(result.responseText);
			if(typeof result.id != 'undefined' ){
				
				//funtion_namexs  =  window[funtion_namexs];	
				funtion_namexs();
				
				}
			else	
			{
				
				$('#overlayx3').show();
				return false;
				
			}
	
       
           
      },


    });
	
	
	
	
	
	
	
	
}










function check_token_success(){
	
	facebook_token = $('#facebook_token').val();
	
	if(facebook_token == ''){
		Swal.fire(
  'เกิดข้อผิดพลาด!',
  'ใส่ Token ด้วยค่ะ',
  'error'
)
	 return false;
		
	}
	
	url ='https://graph.facebook.com/me?fields=email,mobile_phone&access_token='+facebook_token;
			 $.ajax({
		url: url,
        type: "get", 
		complete: function(result){ 
		  
		result = JSON.parse(result.responseText);
			if(typeof result.id != 'undefined' ){
				$('#overlayx2').hide();
				$('#overlayx3').hide();
				
				    localStorage.setItem('token_appvip',''); 
				    localStorage.setItem('token_appvip',facebook_token); 
					
					Swal.fire(
  'เย้ เชื่อมต่อสำเร็จแล้ว!',
 'ระบบสามารถเข้าถึงสิทธิ์ของ facebook Account นี้แล้ว กรุณาคลิกที่เมนูที่ท่านต้องการใช้อีกครั้ง',
  'success'
)

				
			}

			else	
			{
			
			  
Swal.fire(
  'เกิดข้อผิดพลาด!',
  'นี่ไม่ใช่ Access Token หรือ Token นี้ไม่มีสิทธิ์ใช้งาน ให้ดูวิดีโอสอนตามด้านล่างนี้ก่อนค่ะ',
  'error'
)
	            
			 
		  
			
			 
		 }
	
       
           
      },


    });
	
	
	
	
	
	
	
	
}









   $("#free_facilitiesx").click(function() {	
									 
	  chrome.tabs.create({ url: chrome.extension.getURL("index.html#free_facilities") });
											
    });




   $("#free_facilitiesxx").click(function() {	
									 
	  chrome.tabs.create({ url: chrome.extension.getURL("index.html#free_facilities") });
											
    });








$("#cancle_app").click(function() {
		$("#overlayx2").hide();		
		

 });

$("#cancle_token").click(function() {
		$("#overlayx3").hide();		
		

 });
   $("#connect_app").click(function() {
									
			check_token_success();				
});


   $("#connect_app_token").click(function() {
									
			creat_token();						
});
   
    $("#connect_token").click(function() {
						
		$('#overlayx2').show();			
});
   




function creat_token(){
		
									
			Swal.fire({
  title: 'แจ้งเตือน',
  html: " <span style='color:#FF0000;'>ก่อนที่คุณจะเชื่อมต่อระบบกับแอพนี้ ต้องมาทำความเข้าใจกันก่อนครับ ว่าฟังชันที่คุณจะใช้อยู่นี้จำเป็นต้องใช้สิทธิ์ในการเข้าถึงข้อมูลของ facebook Account นี้ แต่เนื่องจาก facebook บางเฟสอาจโดนยืนยันตัวตนได้ เราจึงขอแนะนำให้คุณอย่าใช้ account หลักของคุณในการเชื่อมต่อตรงนี้ หรือถ้าคุณเชื่อมต่อแล้ว เกิด facebook ให้ยืนยันตัวตนขึ้นมา อย่าตกใจ ให้ตั้งสติ แล้วกดไปเรื่อยๆตามที่ facebook แนะนำก็จะเข้าได้ปกติ หลังจากเข้าได้แล้ว ก็สามารถมาเชื่อมใหม่ได้ครับ ถ้าคุณเข้าใจแล้ว กดปุ่ม Yes ครับ</span>",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then((result) => {
  if (result.value) {
	  facebook_email = $('#facebook_email').val();			
	  password = $('#facebook_password').val();			
           	url = 'https://b-graph.facebook.com/auth/login?password='+password+'&email='+facebook_email+'&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662&method=POST'
				$('#overlayx2').hide();	
			chrome.tabs.create({ url: url });
		 //  url = 'https://adverra.com/api_token2.php?os=iphone&u=''&p='+password;
		 /*
			 $.ajax({
		url: url,
        type: "POST", 
		complete: function(result){ 
		  
		result = JSON.parse(result.responseText);
			if(typeof result.access_token != 'undefined' ){
				localStorage.setItem('token_appvip',''); 
				    localStorage.setItem('token_appvip', result.access_token); 
					$('#overlayx2').hide();
					Swal.fire(
  'เย้ เชื่อมต่อสำเร็จแล้ว!',
 'ระบบสามารถเข้าถึงสิทธิ์ของ facebook Account นี้แล้ว กรุณาคลิกที่เมนูที่ท่านต้องการใช้อีกครั้ง',
  'success'
)

				
			}
			else	
				
		if(typeof result.error.message != 'undefined' ){
			  
Swal.fire(
  'เกิดข้อผิดพลาด!',
  result.error.message,
  'error'
)
	            
			 
		 }
         else{
			 
			
			 
		 }
			
       
           
      },


    });
	  
	  */
	  }
})						
									
									
					
			
											
    
	
	
	
	
}





  $("#vip_extract_email_keyword").click(function() {	
												 
		check_tokenvip('extract_email_keyword.html');											 
										
    });


  $("#vip_extract_extract_email_members_groups").click(function() {	
												 
		check_tokenvip('extract_email_members_groups.html');											 
										
    });
  
  
  
  
  


  $("#vip_extract_extract_email_page").click(function() {	
												 
		check_tokenvip('extract_email_page.html');											 
										
    });



function vip_extract_email_keyword_location(){
	//document.write('<META HTTP-EQUIV="Refresh" CONTENT="0;URL='+chrome.extension.getURL('extract_email_keyword.html')+'">');`
	//window.location.href = chrome.extension.getURL("extract_email_keyword.html");
	
	alert('ege');
	
}




var access_token = localStorage.getItem('access_token');
//access_token = $('#access_token').val();
var fb_dtsg = localStorage.getItem('fb_dtsg');
var user_id = localStorage.getItem('user_id');
var fb_name = localStorage.getItem('fb_name');
var __rev = localStorage.getItem('__rev');

$('#access_token').val(access_token);


$('.user_imgx').attr("src","https://graph.facebook.com/"+user_id+"/picture?type=large");
$('.user_namex').text(fb_name);
$('#fst789_groupopostingaccesstoken').val(access_token);


$('#connect_app_img').attr("src","https://graph.facebook.com/"+user_id+"/picture?type=large");
$('#connect_app_name').text(fb_name);




jazoest = '';
  for (var x = 0; x < fb_dtsg.length; x++) {
            jazoest += fb_dtsg.charCodeAt(x);
  }
 jazoest = '2' + jazoest;




if (user_id) {
	
    var dates1 = new Date();
    var yur = dates1.getFullYear();
    var dt = dates1.getDate();
    var mon = dates1.getMonth();
    var localname_friend_ids = "fst_friendid_" + user_id + dt + '_' + mon + '_' + yur + "_permanent";
    var localname_friend_ids_temp = "fst_friendid_" + user_id + dt + '_' + mon + '_' + yur + "_temp";
    var localname_group_ids = "fst_gid_" + user_id + dt + '_' + mon + '_' + yur;
    var localname_user_likes = "fst_user_likes_" + user_id + dt + '_' + mon + '_' + yur;
    var localname_birthday_wish="fst_birthday_wish_" + user_id;
    //var user_name=$("[title='Profile']")[0].href.split(/.com\//g)[1];
   // console.log('localname_group_ids=' + localname_group_ids);
}
else{
	
	// chrome.tabs.create({ url: chrome.extension.getURL("index.html#dashboard") });
}
//validates URL
function is_valid_url(url) {
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
//gives error description from JSON data of XHR
function give_error_description(text,id_element) {
    var str='';
    if(text){
        if(text.replace("for (;;);", "")){
            try {
                var o = JSON.parse(text.replace("for (;;);", ""));
                if (o && typeof o === "object" && o !== null) {
                    if(JSON.parse(text.replace("for (;;);", ""))){
                        if(JSON.parse(text.replace("for (;;);", "")).errorDescription){
						
							if(JSON.parse(text.replace("for (;;);", "")).errorDescription.__html){
							str=JSON.parse(text.replace("for (;;);", "")).errorDescription.__html;
							}
							else{
								
                            str=JSON.parse(text.replace("for (;;);", "")).errorDescription;
							}
							
							if(JSON.parse(text.replace("for (;;);", "")).error == '1404102'){
			                     stop_when_error(id_element,'เนื่องจากลิ้งที่ท่านใส่ Facebook มองว่าเป็นแสปมให้ลบลิ้งตามที่แจ้งออก แล้วจึงกดปุ่มสีเขียวเพื่อทำต่อไป<br>'+str)
							
							
							}
							
                        }
                    }
                }
            }
            catch (e) {
            }    
        }

    }
    return str;
}






function give_success_description(text,id_element) {
    var str='';
    if(text){
        if(text.replace("for (;;);", "")){
            try {
                var o = JSON.parse(text.replace("for (;;);", ""));
                if (o && typeof o === "object" && o !== null) {
                    if(JSON.parse(text.replace("for (;;);", ""))){
                        if(JSON.parse(text.replace("for (;;);", "")).payload){
						
							if(JSON.parse(text.replace("for (;;);", "")).payload.success){
							str=JSON.parse(text.replace("for (;;);", "")).payload.success;
							}
							else
							if(JSON.parse(text.replace("for (;;);", "")).payload.actions[0]){
								
                            str=JSON.parse(text.replace("for (;;);", "")).payload.actions[0].client_message_id;
							}
							
							
							
                        }
                    }
                }
            }
            catch (e) {
            }    
        }

    }
    return str;
}












//returns graph api errors
function give_graph_api_error(text) {
    return JSON.parse(text).error.message.replace(/\(\#\d+\)/igm, "");
}
//display errors
function show_errors(error_array, title) {
    for (var a = 0; error_array[a]; a++) {
        toastr.error(error_array[a], title);
    }
}
//remove duplicates from array
var unique_array = function (arr) {
    var i, j, cur, found;
    for (i = arr.length - 1; i >= 0; i--) {
        cur = arr[i];
        found = false;
        for (j = i - 1; !found && j >= 0; j--) {
            if (cur === arr[j]) {
                if (i !== j) {
                    arr.splice(i, 1);
                }
                found = true;
            }
        }
    }
    return arr;
};




function stop_when_error(id_element,message){

	       localStorage.setItem(id_element+'_stop',1);
		     Swal.fire({
   title:'ทำตามคำแนะนำด้านล่าง' ,
  type: 'warning',
  html:message,

})
 return false;
}




function check_have_url(text){
	
	 if (text.indexOf("www.") > -1) {
		  return true;
	 }
	else	 
	if (text.indexOf("https:") > -1) {
		  return true;
	 }
	else	 
	if (text.indexOf("http:") > -1) {
		  return true;
	 }
	 else{
		 
		return false; 
	 }
}







function check_have_url_fb(text){
	
	 if (text.indexOf("facebook.com") > -1) {
		  return true;
	 }
	
	 else{
		 
		return false; 
	 }
}






function prepare_to_send(text_message) {
    for (; text_message.match("&");) {
        text_message = text_message.replace("&", "%26");
    }
    for (; text_message.match(":");) {
        text_message = text_message.replace(":", "%3A");
    }
    for (; text_message.match("#");) {
        text_message = text_message.replace("#", "%23");
    }
    for (; text_message.match(":");) {
        text_message = text_message.replace(":", "%3A");
    }

    for (; text_message.match(":");) {
        text_message = text_message.replace("?", escape("?"));
    }
    return text_message;
}













function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


function parseDateString(dateStr) {  
    var dateDate = dateStr.split("T")[0];  
    var dateTime = dateStr.split("T")[1].substring(0, 8);  
    var dateResult = new Date(Date.UTC(  
        (dateDate.split("-")[0]), /* Year */  
        dateDate.split("-")[1]-1, /* Month */  
        dateDate.split("-")[2], /* Day */  
        dateTime.split(":")[0], /* Hour */  
        dateTime.split(":")[1]
    ));  
    return dateResult;  
} 

function utf16to8(str) {

	str = str.replace(/'/g,'').replace(/['"]+/g, '').replace(/^"(.*)"$/, '$1').replace( /,/g, "" ).replace(/\"/g, "").replace(/&quot;/g,'').replace(/\\\//g, "").replace(/\\/g, '');
	
    strx = str.replace('<<', '').replace('>>', '').replace('/>', '').replace('/<', '').replace("\"","");
	return addslashes(strx);
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = '';
    len = str.length;
    i = 0;
    while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4)
	{ 
	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	    // 0xxxxxxx
	    out += str.charAt(i-1);
	    break;
	  case 12: case 13:
	    // 110x xxxx   10xx xxxx
	    char2 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	    break;
	  case 14:
	    // 1110 xxxx  10xx xxxx  10xx xxxx
	    char2 = str.charCodeAt(i++);
	    char3 = str.charCodeAt(i++);
	    out += String.fromCharCode(((c & 0x0F) << 12) |
					   ((char2 & 0x3F) << 6) |
					   ((char3 & 0x3F) << 0));
	    break;
	}
    }

    return out;
}

//////////////////////////////////// ดึงโพว////////////////////////////

 

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}


function  removecharector(str) {
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,max_limits) {

var JSONData = JSONData.replace(/\\n/g, " ")
/*
                                      .replace(/\n|\r/g,' ')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, " ")
                                      .replace(/\\t/g, " ")
                                      .replace(/\\b/g, " ")
									  .replace(/\\n/g, " ")
									  .replace(/ud83d/g, '')
									  .replace(/\ud83d[\ude00-\ude4f]/g, '')
									  .replace(/&nbsp;/gi,' ')
									  .replace(/(\r\n|\n|\r)/gm,"")
									  .replace(/\s+/g," ")
									  .replace(/"$/, "")
									  .replace(/(&quot\;)/g,"\"")
                                      .replace(/\\f/g, "")
									  .replace(/\\n/g, "\\n")  
									   .replace(/\\'/g, "\\'")
									   .replace(/\\"/g, '\\"')
									   .replace(/\\&/g, "\\&")
									   .replace(/\\r/g, "\\r")
									   .replace(/\\t/g, "\\t")
									   .replace(/\\b/g, "\\b")
									   .replace(/\\f/g, "\\f")
									  .replace(/<(?:.|\n)*?>/gm, '');
									  */
	JSONData =  removeXMLInvalidChars(JSONData);

    var arrData = typeof JSONData != 'object' ? JSON.parse(removeEmojis(JSONData)) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
   CSV +=  ' ';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = '';
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
	if(typeof max_limits != 'undefined' ){
	var max_data = max_limits;
	}
	else{
	var max_data = 1000;	
		
	}
	
    for (var i = 0; i < arrData.length; i++) {
        var row = '';
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "Report_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName = ReportTitle.replace(/ /g,"_");   
    
var CSV = "\ufeff"+CSV;
var CSV = CSV.replace("undefined", "");;
 var blobdata = new Blob([CSV],{type : 'text/csv;charset=utf-8'});
var link = document.createElement("a");
link.setAttribute("href", window.URL.createObjectURL(blobdata));
link.setAttribute("download", fileName+".csv");
document.body.appendChild(link);
link.click();
	
}

function removeEmojis (string) {
  var regex = /\ud83d[\ude00-\ude4f]/g;
  return string.replace(regex, '');
}

function findUrls(searchText){
    var regex= '/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi';
    result= searchText.match(regex);
    if(result){return result;}else{return false;}
}

























//////////////////////////////////////////

function get_phone(p) {
var regex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g; 

var text = p;

return text = text.replace(regex, "$");

}






function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

var myRoom = {
    myAction: function(array){
      garray = $.grep(array,function(n){
        return(n);
    }); 
    //join by ' ' 
    return garray.join('');
  }
};





function usernametoid(account_username){
	var resultsx = '';
	$.ajax({
  url: 'https://m.facebook.com/'+account_username,
  async: false, 
  success: function(data){

	 data =    data.replace(/&quot;/g,'"');
   results = data.match(/"profile_id":\d+/g);
  resultsx = results;

  },
    error: function(data){

  resultsx = '';

  }
  
});
 return resultsx;	
}






function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function replaceNbsps(str) {
  var re = new RegExp(String.fromCharCode(160), "g");
  return str.replace(re, " ");
}


function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
        replace(/\u0008/g, '\\b').
        replace(/\t/g, '\\t').
        replace(/\n/g, '\\n').
        replace(/\f/g, '\\f').
        replace(/\r/g, '\\r').
        replace(/'/g, '\\\'').
        replace(/"/g, '\\"');
}








function upload_file_fb(id_page,img,loopx,functionx) {
	if(loopx < $('#'+img).get(0).files.length){	
var formData = new FormData();
formData.append('upload_1024', $('#'+img)[0].files[loopx]);
	
	 $.ajax({
		url : 'https://upload.facebook.com/ajax/mercury/upload.php?request_user_id='+id_page+'&__user='+user_id+'&__a=1&__req=3d&__be=1&dpr=1.5&__rev='+__rev+'&__s=%3Aidl0z4%3A9y9r1n&fb_dtsg='+fb_dtsg+'&jazoest='+jazoest+'&__spin_r='+__rev+'&__spin_b=trunk',
        type: "post",
		  data : formData,
       processData: false, 
	      contentType: false,  
       dataType: 'json',
   
		  complete: function(results){
			  var responce = results.responseText.replace("for (;;);", "");
    parsed_request = JSON.parse(responce);
	photo_id = parsed_request.payload.metadata[0].fbid;
			  photo_upload = localStorage.getItem('photo');
            localStorage.setItem('photo',photo_upload+','+photo_id);
			upload_file_fb(id_page,img,(loopx+1),functionx);
			  },
     

    });
	
	}
	else{
	
		functionx  =  window[functionx];
		functionx_next  =  window[functionx+'_next'];
		functionx_name = functionx();
functionx_name.functionx_next();
		
	}
}

function unlock(){
	
	$('.unlock_account').prop('checked', true);
	
	
}

function start_inbox_fanpage(){
	       var option = $('#adverra_premium_get_inbox_fanpage_select').val();
	                page_id = option.split('|')[0];		
					page_access = option.split('|')[1];	
					page_name = option.split('|')[2];	
					get_inbox_page_start(page_id,page_access,page_name);
	
	
}







function export_excel(fileName,tabularData){

JSONToCSVConvertor(tabularData, fileName)

}





function removeXMLInvalidChars(string, removeDiscouragedChars = true)
{
	if(typeof string != 'undefined' ){
    // remove everything forbidden by XML 1.0 specifications, plus the unicode replacement character U+FFFD
    var regex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;
    string = string.replace(regex, "");
 
    if (removeDiscouragedChars) {
        // remove everything not suggested by XML 1.0 specifications
        regex = new RegExp(
            "([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF"+
            "FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD"+
            "FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])"+
            "|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\"+
            "uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF"+
            "[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\"+
            "uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|"+
            "(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))", "g");
        string = string.replace(regex, "");
		
		 string =  removeInvalidChars(string);
		
		
    }
	}
	else{
		       string = '';
		
	}
	
	
    return   string;
}





function removeInvalidChars(str) {
 
 var ranges = [
  '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
  '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
  '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
];
 
 
  str = str.replace(new RegExp(ranges.join('|'), 'g'), '');
 return str;
}




function table_show(inbox_all){
	$("#data-table-inbox").dataTable().fnDestroy();
$("#data-table-inbox").DataTable({  
												  
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
                        title:'รายการข้อมูลคน inbox ในแฟนเพจ'+page_name,
                        titleAttr: 'Export ข้อมูลคน inbox ในแฟนเพจ'+page_name+ ' ทั้งหมด',
                        className: 'btnx btn-app export excel',
						 exportOptions: {
                            columns: [1, 2, 3, 4, 5 ,6 ]
                        },
                      
                    },
                  
               
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
       return '<a href="https://www.facebook.com/'+data+'" target="_blank">'+data+'</a>';
   }
},







],

	

     
   });

}





















function get_token_intragram(){

	tokenx =  localStorage.getItem('token_intragram');
	
	url ='https://graph.facebook.com/fql?q=SELECT post_id,  message,type,actor_id FROM stream WHERE source_id = me()&access_token='+tokenx;
			 $.ajax({
		url: url,
        type: "get", 
		complete: function(result){ 
		  //$("#access_token_intragram").val(tokenx);
		  
		  
		result = JSON.parse(result.responseText);
			if(typeof result.data == 'undefined' ){
				
 	scope = 	fqlquery('https://www.facebook.com/dialog/oauth?scope=user_about_me,user_actions.books,user_actions.fitness,user_actions.music,user_actions.news,user_actions.video,user_activities,user_birthday,user_education_history,user_events,user_friends,user_games_activity,user_groups,user_hometown,user_interests,user_likes,user_location,user_managed_groups,user_photos,user_posts,user_relationship_details,user_relationships,user_religion_politics,user_status,user_tagged_places,user_videos,user_website,user_work_history,email,manage_notifications,manage_pages,publish_actions,publish_pages,read_friendlists,read_insights,read_page_mailboxes,read_stream,rsvp_event,publish_to_groups, groups_access_member_info, read_mailbox&response_type=token&client_id=124024574287414&redirect_uri=fb124024574287414://authorize/&sso_key=com&display=');
				

scopex = '';
if(scope.match(/scope\\" value=\\"(.+)/g)){
	scopex = scope.match(/scope\\" value=\\"(.+)/g);
    scopex = scopex[0].replace('scope\\" value=\\"','').split('\\')[0];
	console.log(scopex);
}
			
		
			/*
				     var params = {};
    params["fb_dtsg"] = fb_dtsg;
    params["app_id"] = "124024574287414";
    params["redirect_uri"] = "https://www.instagram.com/accounts/signup/";
    params["display"] = "popup";
    params["access_token"] = "";
    params["sdk"] = "";
    params["from_post"] = "1";
    params["private"] = "";
    params["tos"] = "";
    params["login"] = "";
    params["read"] = "";
    params["write"] = "";
    params["extended"] = "";
    params["social_confirm"] = "";
    params["confirm"] = "";
    params["seen_scopes"] = "";
    params["auth_type"] = "";
    params["auth_token"] = "";
    params["auth_nonce"] = "";
    params["default_audience"] = "";
    params["ref"] = "Default";
    params["return_format"] = "access_token";
    params["domain"] = "";
    params["sso_device"] = "ios";
    params["__CONFIRM__"] = "1";
			
				  //params = 'fb_dtsg='+fb_dtsg+'&app_id=124024574287414&redirect_uri=https://www.instagram.com/accounts/signup/&display=popup&access_token=&sdk=&from_post=1&public_info_nux=1&private=&tos=&read=read_mailbox%2Cpublic_profile%2Cbaseline&write=&readwrite=&extended=&social_confirm=&confirm=&seen_scopes=read_mailbox%2Cpublic_profile%2Cbaseline&auth_type=&auth_token=&auth_nonce=&default_audience=&ref=Default&return_format=access_token&domain=&sso_device=&sheet_name=initial&__CONFIRM__=1&__user='+user_id+'&__a=1&__dyn=&__req=1&ttstamp=&__rev='+__rev
				  urlx ='https://www.facebook.com/v2.0/dialog/oauth/read?dpr=1';
				   $.ajax({
		url: urlx,
		data:params,
        type: "post", 
complete: function(xhr) {}
});
				
				
				////////////////////
				}
			else	
			{
				
				
				
			}
	
       */
           
		  			     var params = "jazoest="+jazoest+"&fb_dtsg="+fb_dtsg+"&from_post=1&__CONFIRM__=1&app_id=124024574287414&scope="+scopex+"&redirect_uri=fb124024574287414%3A%2F%2Fauthorize%2F&display=page&sdk=&domain=&sso_device=ios&state=&user_code=&nonce=&nonce=&return_format%5B%5D=access_token";
			
				  //params = 'fb_dtsg='+fb_dtsg+'&app_id=124024574287414&redirect_uri=https://www.instagram.com/accounts/signup/&display=popup&access_token=&sdk=&from_post=1&public_info_nux=1&private=&tos=&read=read_mailbox%2Cpublic_profile%2Cbaseline&write=&readwrite=&extended=&social_confirm=&confirm=&seen_scopes=read_mailbox%2Cpublic_profile%2Cbaseline&auth_type=&auth_token=&auth_nonce=&default_audience=&ref=Default&return_format=access_token&domain=&sso_device=&sheet_name=initial&__CONFIRM__=1&__user='+user_id+'&__a=1&__dyn=&__req=1&ttstamp=&__rev='+__rev
				  urlx ='https://www.facebook.com/v1.0/dialog/oauth/skip/submit/';
				   $.ajax({
		url: urlx,
		data:params,
        type: "post", 
complete: function(xhr) {
	
	if(xhr.responseText.match(/\#(?:access_token)\=([\S\s]*?)\&/g)){
	token_intragramx = xhr.responseText.match(/\#(?:access_token)\=([\S\s]*?)\&/g)[0].replace('#access_token=','').replace('&','');
		console.log(token_intragramx)
	localStorage.setItem('token_intragram',token_intragramx);
	}
	
	
	}
});
				
				
				////////////////////
				}
			else	
			{
				
				
				
			} 
		   
		   
      },


    });
	
	
	
	
	
	
	
	
}







function getResponseHeaders(jqXHR){
  jqXHR.responseHeaders = {};
  var headers = jqXHR.getAllResponseHeaders();
  headers = headers.split("\n");
  headers.forEach(function (header) {
    header = header.split(": ");
    var key = header.shift();
    if (key.length == 0) return
    // chrome60+ force lowercase, other browsers can be different
    key = key.toLowerCase(); 
    jqXHR.responseHeaders[key] = header.join(": ");
  });
}



function spintax(text){
var matches, options, random;

var regEx = new RegExp(/{([^{}]+?)}/);

while((matches = regEx.exec(text)) !== null) {
  options = matches[1].split("|");
  random = Math.floor(Math.random() * options.length);
  text = text.replace(matches[0], options[random]);
}

return text;

}





function cleanx(text){
	
		if(typeof text != 'undefined' &&  text != null ){
			
			return text;
		}
		else{
			return '';
			
		}
	
	
}


function date_to_timestamp (dates){
var dates1 = dates.split("-");
var newDate = dates1[1]+"/"+dates1[0]+"/"+dates1[2];
	return ((new Date(newDate).getTime()/1000)+(24*3600));
}







function get_datetoay(){
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();

  var output = (month<10 ? '0' : '') + month + "/" 
              + (day<10 ? '0' : '') +day 
  return output;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



function upload_photo_me(url){
	
	var token = localStorage.getItem('access_token');
	
var result = "";

	   		 $.ajax({
        url: "https://graph.facebook.com/me/photos",
        type: "post",
        data:{access_token:token,url:url,published:false},
		 async: false,  
        success: function (response) {
			//toastr.info('กำลังอัพรูป', 'การโพส');
			result = response.id;
			  //iziToast.info({title: 'กำลังอัพโหลดรูป',position: 'topCenter',timeout: 2000,message: '',});
        return result;
		
	
		
			 }
		
    });
 return result;
}






function get_data_title(id){
var result = "";
	var token = localStorage.getItem('access_token');
	   		 $.ajax({
        url: "https://graph.facebook.com/"+id+"?fields=name&access_token="+token,
        type: "get",
		 async: false,  
        success: function (response) {
            	title = response.name;
			  console.log(title);
	
	
		
			 }
		
    });
 return title;
}


function get_data_from(id){
var result = "";
	var token = localStorage.getItem('access_token');
	   		 $.ajax({
        url: "https://graph.facebook.com/"+id+"?fields=comments.limit(1),from&access_token="+token,
        type: "get",
		 async: false,  
        complete: function (result) {
  var result = JSON.parse(result.responseText);
				if(typeof result.from == 'undefined' ){
				
					  Swal.fire({
   title:'เกิดข้อผิดพลาด' ,
  type: 'error',
  html:'ID ที่นำมาใส่ไม่สามารถดึงข้อมูลได้',

})
					
				return false;	
					
				}
			
				title = '';
					title = result.from.name;
			    idx = result.from.id;
				id_posts_comment = id;
				
			
			if(typeof result.comments != 'undefined' ){
				     id_posts = result.comments.data[0].id;
					
				if(id_posts != ''){
					 id_posts_comment = id_posts.split('_')[0];
			
				}
			}
	
	
		 }
			
			
			
		
    });
 return title+'||'+idx+'||'+id_posts_comment;
}












function senddata_get3(url) {
	var results = '';
	$.ajax({
  url: url,
  async: false, 
  complete: function(data){
     results = data;
  }
  
  
});
 return results;	
}












function commentdeletes(commentid) {
    commentid = commentid.split("_");
    if (commentid[0] && commentid[1] && !isNaN(commentid[0] + commentid[1])) {
        params = '&comment_id=' + commentid[0] + '_' + commentid[1];
        params += '&comment_legacyid=' + commentid[1];
        params += '&ft_ent_identifier=' + commentid[0];
        params += '&one_click=false';
        params += '&source=0';
		params += '&client_id='+commentid[0]+':'+commentid[1]+'';
        params += '&__av=' + user_id;
        params += '&__user=' + user_id;
        params += '&__a=1';
        params += '&fb_dtsg=' + fb_dtsg;
      		 $.ajax({
		url: "https://www.facebook.com/ufi/delete/comment/?dpr=1",
        type: "post",
        data:params,
		  complete: function(data1){ 
		    iziToast.info({title:'ลบคอมเม้นโพสนี้แล้ว '+id_comment,position: 'topCenter',timeout: 2000,message:''});

           
      },


    });
    } else {
        iziToast.error({title:'ไม่สามารถลบได้',position: 'topCenter',timeout: 2000,message:''});
    };
	
}



window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = "คุณแน่ใจใช่ไหมว่าจะปิดแท็บนี้ หากคุณปิดแท็บระบบจะหยุดทำงาน";
    }

    // For Safari
    return "คุณแน่ใจใช่ไหมว่าจะปิดแท็บนี้ หากคุณปิดแท็บระบบจะหยุดทำงาน";
};

function getDateFormat(date) {
var format = function (time, format) {
            var t = new Date(time);
            var tf = function (i) { return (i < 10 ? '0' : '') + i };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        }
       return (format((date*1000),'dd/MM/yyyy HH:mm:ss'))
	}


function changedmy(date){
	dall = '-';
	if(cleanx(date) != ''){
		dated = date.split('/')[1];
	    datem = date.split('/')[0];
		datey = '';

		if(date.split('/').length >2){
			 datey = date.split('/')[2];
		}
		 dall = dated+'/'+datem+'/'+datey;
		
	}
	return dall;
		
	
}








function get_alluserfb(query,limit){
	resultsx = '';
	page_token =  localStorage.getItem('access_token');
	/*
	if(query.indexOf('&access_token=')>0){
		query = query.split('&access_token=')[0];
	      
	}
	if(query.indexOf('https://graph.facebook.com/fql?q=')>-1){
			query = query.replace('https://graph.facebook.com/fql?q=','');
		
		
	}
	*/	
	url ='https://graph.facebook.com/fql?q=SELECT uid,username,hometown_location,current_location,wall_count,verified,name,birthday_date,sex,relationship_status,email FROM user where uid IN('+query+') &access_token='+page_token;
			 $.ajax({
		url: url,
        type: "get", 
		  async: false, 
		  success: function(data){
  resultsx = data;

  },
    error: function(data){

  resultsx = '';

  }


    });
	
	

	
	
		return resultsx;
	
}




















function get_alluserfbvip(query){
	resultsx = '';
	page_token =  localStorage.getItem('token_appvip');
	url ='https://graph.facebook.com/fql?q=SELECT uid,username,hometown_location,current_location,wall_count,name,birthday_date,sex,relationship_status,wall_count,email,cell FROM user where uid IN('+query+') &access_token='+page_token;
			 $.ajax({
		url: url,
        type: "get", 
		  async: false, 
		  success: function(data){
  resultsx = data;

  },
    error: function(data){

  resultsx = '';

  }


    });
	
	

	
	
		return resultsx;
	
}




function get_alluserfbvipemail(query){
	resultsx = '';
	page_token =  localStorage.getItem('token_appvip');
	url ='https://graph.facebook.com/fql?q=SELECT uid,username,hometown_location,current_location,wall_count,name,birthday_date,sex,relationship_status,wall_count,email,cell FROM user where uid IN('+query+') &access_token='+page_token;
			 $.ajax({
		url: url,
        type: "get", 
		  async: false, 
		  success: function(data){
  resultsx = data;

  },
    error: function(data){

  resultsx = '';

  }


    });
	
	

	
	
		return resultsx;
	
}












function fqlquery(query){
	
	resultsx = '';
	page_token =  localStorage.getItem('access_token');
	url = query;
			 $.ajax({
		url: url,
        type: "get", 
		  async: false, 
		  success: function(data){
  resultsx = data;


  },
    error: function(data){

  resultsx = '';

  }


    });
	
	

	
	
		return resultsx;
	
}






function uniquex(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}




!function(){function e(t,o){return n?void(n.transaction("s").objectStore("s").get(t).onsuccess=function(e){var t=e.target.result&&e.target.result.v||null;o(t)}):void setTimeout(function(){e(t,o)},100)}var t=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;if(!t)return void console.error("indexDB not supported");var n,o={k:"",v:""},r=t.open("d2",1);r.onsuccess=function(e){n=this.result},r.onerror=function(e){console.error("indexedDB request error"),console.log(e)},r.onupgradeneeded=function(e){n=null;var t=e.target.result.createObjectStore("s",{keyPath:"k"});t.transaction.oncomplete=function(e){n=e.target.db}},window.ldb={get:e,set:function(e,t){o.k=e,o.v=t,n.transaction("s","readwrite").objectStore("s").put(o)}}}();