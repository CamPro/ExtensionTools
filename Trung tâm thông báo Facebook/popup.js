var notificationNum = 1
var messagesNum = 1
$(document).ready(function() {
    notificationNum = localStorage.getItem('count')
    messagesNum = localStorage.getItem('MCount')
    if (notificationNum > 0) {
        $('.notification').html(notificationNum)
    } else {
        $('.notification').hide()
    }
    if (messagesNum > 0) {
        $('.messages').html(messagesNum)
    } else {
        $('.messages').hide()
    }
    var linksArray = [
        "https://www.facebook.com/?sk=h_chr",
        "https://www.facebook.com/messages/",
        "https://www.facebook.com/pages/feed?ref=bookmarks",
        "https://www.facebook.com/search/me/friends/photos-by/this-month/date/photos/intersect",
        "https://www.facebook.com/me",
        "https://www.facebook.com/bookmarks/groups",
        "https://www.facebook.com/notifications",
        "https://www.facebook.com/events/calendar",
        "https://www.facebook.com/search/me/friends/videos-by/this-month/date/videos/intersect",
        "http://sociotrope.com/?extension_link=1&nNum=" + notificationNum + "&mNum=" + messagesNum
    ];

    var imgArray = [
        "img/01.png",
        "img/02.png",
        "img/03.png",
        "img/04.png",
        "img/05.png",
        "img/06.png",
        "img/07.png",
        "img/08.png",
        "img/09.png",
        "img/10.png"
    ];

    var titleArray = [
        "News Feed",
        "Messages",
        "Pages",
        "Photos",
        "My Profile",
        "Groups",
        "Notifications",
        "Calendar",
        "Search",
        "Social News"
    ];


    function getItems(exampleNr) {
        var columns = [];

        $(exampleNr + ' div.sortable-list').each(function() {
            columns.push($(this).sortable('toArray').join(','));
        });

        return columns.join('|');
    }

    function loadItemsFromCookie(name) {
        if ($.cookie(name) != null) {
            renderItems($.cookie(name));
        }

    }

    function renderItems(items) {
        var html = '';

        var columns = items.split('|');

        for (var c in columns) {




            html += '<div class="sortable-list ui-sortable">';

            if (columns[c] != '') {
                var items = columns[c].split(',');

                for (var i in items) {
                    var currNum = parseInt(items[i]);
                    html += '<div class="sortable-item" id="' + currNum + '"><a href="' + linksArray[currNum] + '" target="_blank">';
                    if (currNum == 1 && messagesNum > 0) {
                        html += '<span class="messages">' + localStorage.getItem('MCount') + '</span>'
                    }
                    if (currNum == 6 && notificationNum > 0) {
                        html += '<span class="notification">' + localStorage.getItem('count') + '</span>'
                    }
                    html += '<img src="' + imgArray[currNum] + '" />' + titleArray[currNum] + '</a></div>';
                }
            }

            html += '</div>';
        }
        $('#ql_bg').html(html);
        makeSortable();
        $('#message').hide();
        $('.footer').removeClass('posBottom');



    }

    function makeSortable() {
        $('#ql_bg .sortable-list').sortable({
            connectWith: '#ql_bg .sortable-list',
            forceHelperSize: true,
            forcePlaceholderSize: true,
            placeholder: 'placeholder',
            opacity: 0.7,
            update: function() {
                $.cookie('cookie-fb-ql-v7011', getItems('#ql_bg'), { expires: 365 });
            }
        });
        $("#ql_bg .sortable-list").disableSelection();
    }
    makeSortable();
    loadItemsFromCookie('cookie-fb-ql-v7011');



});