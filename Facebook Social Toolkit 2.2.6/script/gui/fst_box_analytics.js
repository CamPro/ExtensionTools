/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var _AnalyticsCode = 'UA-45183831-8';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
/**
* Track a click on a button using the asynchronous tracking API.
*
* See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
* for information on how to use the asynchronous tracking API.
*/
function trackButtonClick(e) {
	_gaq.push(['_trackEvent', e.target.text, 'clicked']);
}
function trackButtonClickhref(e) {
	_gaq.push(['_trackEvent', e.target.href, 'clicked']);
}
/**
* Now set up your event handlers for the popup's `button` elements once the
* popup's DOM has loaded.
*/
var classes = document.getElementsByClassName("fst789_ul_hrefs");
for (var i = 0; i < classes.length; i++) {
classes[i].addEventListener('click', trackButtonClick);
}

var classes = document.getElementsByClassName("fst789_href");
for (var i = 0; i < classes.length; i++) {
classes[i].addEventListener('click', trackButtonClickhref);
}

var classes = document.getElementsByClassName("fst789_dineshextensiontitle");
for (var i = 0; i < classes.length; i++) {
classes[i].addEventListener('click', trackButtonClickhref);
}