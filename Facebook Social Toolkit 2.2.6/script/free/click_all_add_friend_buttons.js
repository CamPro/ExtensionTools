/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function click_all_add_friend_buttons() {
    var to=0;
    for (counter = 0; document.getElementsByTagName("a")[counter]; counter++) {
        if (document.getElementsByTagName("a")[counter].innerText == "Add Friend") {
            document.getElementsByTagName("a")[counter].click();
        }
    }
    toastr.success("All add friend buttons are clicked");
}