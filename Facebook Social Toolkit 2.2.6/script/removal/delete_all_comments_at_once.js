/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
function commentdelete(commentid) {
    commentid = commentid.split("_");
    if (commentid[0] && commentid[1] && !isNaN(commentid[0] + commentid[1])) {
        params = '&comment_id=' + commentid[0] + '_' + commentid[1];
        params += '&comment_legacyid=' + commentid[1];
        params += '&ft_ent_identifier=' + commentid[0];
        params += '&one_click=false';
        params += '&source=0';
        params += '&client_id=1411405455889:1698224656';
        params += '&__av=' + user_id;
        params += '&__user=' + user_id;
        params += '&__a=1';
        params += '&__req=9';
        params += '&fb_dtsg=' + fb_dtsg;
        var http4 = new XMLHttpRequest;
        var url4 = "https://www.facebook.com/ufi/delete/comment/";
        http4.open("POST", url4, true);
        http4.onreadystatechange = function() {
            if (http4.readyState == 4 && http4.status == 200) {
                http4.close;
            };
        };
        http4.send(params);
    } else {
        dineshstoastr("error", "Incorrect input", "Comment delete function")
    };
}
/*
commendeletum
*/
function commentdeletum() {
    var commentdeletumtitle = "Delete All Comments At Once";
    var commentRegex = /comment_id=\d+/g;
    var postRegex=/story_fbid=\d+/g;
    var secondCommentRegex = /\$comment+\d+_+\d+/g;
    if (document.documentElement.innerHTML.match(secondCommentRegex) || document.documentElement.innerHTML.match(commentRegex)) {
        if (confirm("Are you sure you want to delete all comments whos on this page\? Once it is done it can't be undone.")) {
            if (document.documentElement.innerHTML.match(secondCommentRegex)) {
                var commentids = document.documentElement.innerHTML.match(secondCommentRegex);
                var uniquecommentids = [];
                $.each(commentids, function(i, el) {
                    if ($.inArray(el, uniquecommentids) === -1) uniquecommentids.push(el);
                });
                var lengthum = uniquecommentids.length;
                lengthum = lengthum - 1;
                if (uniquecommentids) {
                    $(uniquecommentids).each(function(index) {
                        console.log(uniquecommentids[index].replace("\$comment", ""));
                        var commentid = uniquecommentids[index].replace("\$comment", "");
                        new commentdelete(commentid);
                        console.log("index=" + index + " lengthum=" + lengthum);
                    });

                    setTimeout(function() {
                        dineshstoastr("success", "All deletable comments are now deleted. Please refresh the page after few seconds.", commentdeletumtitle);
                    }, 1000);
                }
            } else if (document.documentElement.innerHTML.match(commentRegex)) {
                var matchedComments = document.documentElement.innerHTML.match(commentRegex);
                var postIds=document.documentElement.innerHTML.match(postRegex);
                console.log(matchedComments);
                for (var counter = 0; counter < matchedComments.length; counter++) {
                    var comment_id = matchedComments[counter].replace("comment_id\=", "");
                    var post_id=postIds[counter].replace("story_fbid\=", "");
                    new commentdelete(post_id+'_'+comment_id);
                    if(counter==matchedComments.length-1){
                    	setTimeout(function() {
                   		    dineshstoastr("success", "All deletable comments are now deleted. Please refresh the page after few seconds.", commentdeletumtitle);
                   		}, 1000);
                    }
                }
            }
        }
    } else {
        dineshstoastr("error", "No comments found", commentdeletumtitle);
    };
}
