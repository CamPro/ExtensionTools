/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
/*
	google analytics code
*/
function start_analyzing(){
	(function() {
	  var ga = document.createElement('script');
	  ga.type = 'text/javascript';
	  ga.async = true;
	  ga.src = 'https://ssl.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(ga, s);
	})();
	(function() {
	  var ga = document.createElement('script');
	  ga.type = 'text/javascript';
	  ga.async = true;
	  ga.src = chrome.extension.getURL('script/gui/fst_box_analytics.js');
	  var s = document.getElementsByTagName('script')[0];
	  s.parentNode.insertBefore(ga, s);
	})();
}