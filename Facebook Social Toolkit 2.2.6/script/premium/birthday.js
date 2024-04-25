/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var firstRegex=/\=\\"user_id\\" value=\\\"\d+\\\"/g;
var secondRegex=/\="user_id" value=\"\d+\"/g;
var birthdayWishesForPublicPostsTitle="Birthday Wish As A Pubic Post";
var birthdayWishesForPublicMessageTitle="Birthday Wish As A Private Message";
var emptyBirthdhdaymessageError="Blank BirthDay message.";
var noBirthdayFound="Unable to find friends whose BirthDay is today.";
/* XHR functions */
function send_birth_day_wish_as_post(target_id,message){
	var counter=0;
	var d=new XMLHttpRequest();
	url="/birthday/reminder/write/?type=singleton";
	d.open("POST",url,true);
	message=escape(message);
	var send_text='';
	send_text+="fb_dtsg="+fb_dtsg;
	send_text+="&target_id="+target_id;
	send_text+="&scheduled=";
	send_text+="&force_reload=";
	send_text+="&message_text="+message;
	send_text+="&message="+message;
	send_text+="&__user="+user_id;
	send_text+="&__a=1";
	send_text+="&__req=1k";
	d.onreadystatechange=function(){
		if(d.readyState==4&&d.status==200){
			toastr.success('BirthDay wish is shared on timeline of <a href="https://fb.com/'+target_id+'">fb.com/'+target_id+'</a>');
		}
	}
	d.send(send_text);
}
/* Loop functions */
function sendBirthDayMessageLoopAsPost(user_id_array,message){
	var counter=0;
	function birthdayLopp(){
		if(user_id_array[counter]){
			var target_id=user_id_array[counter];
			counter++;
			setTimeout(function(){
				console.log("Birthday wish is sent to <a target=\"_blank\" href=\"https://fb.com/"+target_id+"\">"+target_id+"</a>");
				send_birth_day_wish_as_post(target_id,message);
				birthdayLopp();
			},1000);
		}
	}
	birthdayLopp();
}
function sendBirthDayMessageLoopAsMessage(user_id_array,message){
	var counter=0;
	function birthdayLopp(){
		if(user_id_array[counter]){
			var target_id=user_id_array[counter];
			counter++;
			setTimeout(function(){
				console.log("Birthday wish is sent to <a target=\"_blank\" href=\"https://fb.com/"+target_id+"\">"+target_id+"</a>");
				messagefriend(target_id,message,'');
				birthdayLopp();
			},1000);
		}
	}
	birthdayLopp();
}
function passBirthDayMessageAsPost(user_id_array){
	if(document.getElementById("fst789_sbw_message_input").value){
		var birthday_message=document.getElementById("fst789_sbw_message_input").value;
		sendBirthDayMessageLoopAsPost(user_id_array,birthday_message);
	}else{
		toastr.error(emptyBirthdhdaymessageError);
	}
}
function passBirthDayMessageAsMessage(user_id_array){
	if(document.getElementById("fst789_sbw_message_input").value){
		var birthday_message=document.getElementById("fst789_sbw_message_input").value;
		sendBirthDayMessageLoopAsMessage(user_id_array,birthday_message);
	}else{
		toastr.error(emptyBirthdhdaymessageError);
	}
}
/* Removes unnecessary characters from user ID array */
function give_user_id_array(a){
	for(var b=0;a[b];b++){
		var numberPattern = /\d+/g;
		a[b]=a[b].match( numberPattern ).join('');
	}
	return a;
}
/*
Gobal birthday wishes function
*/

/* If birthday messages are already set then change the value of input field */
function appendBirthdaymessage(){
	chrome.storage.local.get([localname_birthday_wish],function(e){
		if(e){
			console.log(e);
			if(e[localname_birthday_wish]){
				if(e[localname_birthday_wish].message){
					console.log("Birthday message");
					console.log(e[localname_birthday_wish].message);
					document.getElementById("fst789_sbw_message_input").value=e[localname_birthday_wish].message;
				}else{
					document.getElementById("fst789_sbw_message_input").value="";
				}
			}else{
				document.getElementById("fst789_sbw_message_input").value="";
			}
		}else{
			document.getElementById("fst789_sbw_message_input").value="";
		}
	});
}
/* For saving birthday messages */
function saveBirthDayMessageFinal(message){
	if(message){
		birthday_post={"message":message};
		var saveJsonString='{"'+localname_birthday_wish+'":'+JSON.stringify(birthday_post)+'}';
		chrome.storage.local.set(JSON.parse(saveJsonString),function(){
			console.log("birthday message saved in storage.");
		});
	}
}
function saveBirthDayMessage(){
	var message=document.getElementById("fst789_sbw_message_input").value;
	saveBirthDayMessageFinal(message);
}

/* Starting function for sending wishes as a post*/
function startBirthDayRequestAsPost(){
	var url="https://m.facebook.com/events/birthdays";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState == 4 && xhr.status == 200){
			var a=xhr.responseText.match(firstRegex);
			if(!a){
				var a=xhr.responseText.match(secondRegex);
			}
			if(a){
				var resultUserIds=give_user_id_array(a);
				if(resultUserIds[0]){
					console.log(resultUserIds);
					passBirthDayMessageAsPost(give_user_id_array(a));
				}else{
					console.log("user ids not found for sending birthday wishes.");
					toastr.error(noBirthdayFound);
				}
			}else{
				console.log("no birthdays found.");
				toastr.error(noBirthdayFound);
			}
		}
	};
	xhr.send();
	console.log("startBirthDayRequest as post called, XHR sent");
	var message="Please wait, sending birthday wishes.";
	toastr.info(message);
	saveBirthDayMessage();
}

/* Starting function for sending wishes as a message*/
function startBirthDayRequestAsMessage(){
	var url="https://m.facebook.com/events/birthdays";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState == 4 && xhr.status == 200){
			var a=xhr.responseText.match(firstRegex);
			if(!a){
				var a=xhr.responseText.match(secondRegex);
			}
			if(a){
				var resultUserIds=give_user_id_array(a);
				if(resultUserIds[0]){
					console.log(resultUserIds);
					passBirthDayMessageAsMessage(give_user_id_array(a));
				}else{
					console.log("user ids not found for sending birthday wishes.");
					toastr.error(noBirthdayFound);
				}
			}else{
				console.log("no birthdays found.");
				toastr.error(noBirthdayFound);
			}
		}
	};
	xhr.send();
	console.log("startBirthDayRequest as message called, XHR sent");
	var message="Please wait, sending birthday wishes.";
	toastr.info(message);
	saveBirthDayMessage();
}