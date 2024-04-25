/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function clickAllJoinButtonsNow() {
    for (counter = 0; document.getElementsByTagName("a")[counter]; counter++) {
        if (document.getElementsByTagName("a")[counter].innerText == "Join") {
            document.getElementsByTagName("a")[counter].click();
        }
    }
    alert("All Join buttons are clicked");
}