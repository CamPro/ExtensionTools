/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function click_all_like_buttons() {
    for (var tempIndex = 0; document.getElementsByClassName('UFILikeLink')[tempIndex]; tempIndex++) {
        if (document.getElementsByClassName('UFILikeLink')[tempIndex].innerHtml != "Unike") {
            document.getElementsByClassName('UFILikeLink')[tempIndex].click();
        }
    }
    for (counter = 0; document.getElementsByTagName("button")[counter]; counter++) {
        if (document.getElementsByTagName("button")[counter].innerText == "Like") {
            document.getElementsByTagName("button")[counter].click();
        }
    }
    for (counter = 0; document.getElementsByTagName("button")[counter]; counter++) {
        if (document.getElementsByTagName("button")[counter].innerText == "Like Page") {
            document.getElementsByTagName("button")[counter].click();
        }
    }
    toastr.success("All like buttons are clicked");
}