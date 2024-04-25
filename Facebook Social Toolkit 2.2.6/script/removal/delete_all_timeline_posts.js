/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var dapao_title="Delete All Timeline Posts At Once";
function deleteAPost(postId){

}
function getFirstPostId(){
	var xmlhttpunfriend = new XMLHttpRequest;
	xmlhttpunfriend.open("GET","/"+user_name,true);
	xmlhttpunfriend.onreadystatechange = function ()
	{
	    if (xmlhttpunfriend.readyState == 4 && xmlhttpunfriend.status == 200){
			//get request sent, use regex to find first post ID and then pass it to delete post function
			//var firstPostId=xmlhttpunfriend.responseText.match();
	    }
	};
	xmlhttpunfriend.send();
}

