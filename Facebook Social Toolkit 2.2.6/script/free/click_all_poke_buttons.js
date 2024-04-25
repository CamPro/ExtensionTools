/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
/* For clicking all poke buttons */
var confirmPokeMessage="You are not running this tool on correct page press ok to navigate to correct page";
var pokeButtonClass="sp_-wv_-QYdyBY";
function clickAllPokeButtons(){
	if(window.location.pathname.match("/pokes")){
		for(var counter=0;document.getElementsByClassName(pokeButtonClass)[counter];counter++){
			if(document.getElementsByClassName(pokeButtonClass)[counter].innerText==""){
				document.getElementsByClassName(pokeButtonClass)[counter].click();
			}
		}
		for (counter = 0; document.getElementsByTagName("a")[counter]; counter++) {
    	    if (document.getElementsByTagName("a")[counter].innerText == "Poke") {
    	        document.getElementsByTagName("a")[counter].click();
    	    }
    	}
		alert("All Poke Buttons Are Clicked");
	}else{
		if(confirm(confirmPokeMessage)){
			window.location="https://www.facebook.com/pokes";
		}
	}
}