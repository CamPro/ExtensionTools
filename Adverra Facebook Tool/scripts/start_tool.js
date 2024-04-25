	
token() ;
set_event_listeners();

	
	function token() {
		tokenx =  localStorage.getItem('token_appvip');
		//tokenx = 'EAAAAZAw4FxQIBAGxZBFtinZBkisAZAW3SHZAJXXlX7WmvskZCVpHkZCF1ZBqigDfWSNBPi7rqiQe4ukhbIA0WWZAyBf7EmiSi08yNobi0FiONzR4W4UaFdBMupKPBrCtQ1dRq4427fted8hW4ZBSuFwwhcrBW7RmKTacEvjhHFWJF3BgZDZD';
		/*
	    chrome.storage.local.get('access_token_adverra_upload', function (result) {
	        if (typeof result.access_token_adverra_upload !== "undefined") {
	            tokenx = result.access_token_adverra_upload;
	        }
	    });
*/

	}





	//////////////////////////////////////////
	
	
	

	function set_event_listeners() {
		
		
		
		
	token = 	tokenx ;
	 selectx = document.getElementById('My_page');
  if(selectx != null){
	        var url = 'https://graph.facebook.com/me/accounts?limit=1000&fields=id,name,access_token&access_token='+token;
			
	                $.ajax({
	                    url: url
	                    , type: 'GET'
	                    , contentType: 'application/json'
	                    , dataType: 'text'
	                    , complete: function (result) {
						   result = result.responseText;
	                       parsed_request = JSON.parse(result);
	         if (typeof parsed_request.data !== 'undefined') {																												 
			   
				var counts_data = parsed_request.data.length;
              for (var i = 0; i < counts_data; i++) {
                    var opt = document.createElement('option');
                        opt.value = parsed_request.data[i].id;
                        opt.innerHTML = parsed_request.data[i].name;
                        selectx.appendChild(opt);
                 }	
			}
 
							
							
							}

	                });
	
  }


$("textarea").bind('paste', function(e) {
    var elem = $(this);

    setTimeout(function() {
        // gets the copied text after a specified time (100 milliseconds)
        var text = elem.val(); 
		elem.val(text.replace(/['"]+/g, ''))
    }, 100);
});


$("input").bind('paste', function(e) {
    var elem = $(this);

    setTimeout(function() {
        // gets the copied text after a specified time (100 milliseconds)
        var text = elem.val(); 
		text = text.split('?__xts__');
		
		elem.val(text[0]);
    }, 100);
});
	    function export_to_csv(data, name, limits) {
	        JSONToCSVConvertor("[" + data + "]", name, true, limits);

	    }

	    function removecharector(str) {
	        return str
	            .replace(/[\\]/g, '\\\\')
	            .replace(/[\"]/g, '\\\"')
	            .replace(/[\/]/g, '\\/')
	            .replace(/[\b]/g, '\\b')
	            .replace(/[\f]/g, '\\f')
	            .replace(/[\n]/g, '\\n')
	            .replace(/[\r]/g, '\\r')
	            .replace(/[\t]/g, '\\t');
	    }

	    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, max_limits) {

	        var JSONData = JSONData.replace(/\\n/g, " ")
	            .replace(/\n|\r/g, ' ')
	            .replace(/\\&/g, "\\&")
	            .replace(/\\r/g, " ")
	            .replace(/\\t/g, " ")
	            .replace(/\\b/g, " ")
	            .replace(/\\n/g, " ")
	            .replace(/ud83d/g, '')
	            .replace(/\ud83d[\ude00-\ude4f]/g, '')
	            .replace(/&nbsp;/gi, ' ')
	            .replace(/(\r\n|\n|\r)/gm, "")
	            .replace(/\s+/g, " ")
	            .replace(/"$/, "")
	            .replace(/(&quot\;)/g, "\"")
	            .replace(/\\f/g, "")
	            .replace(/\\n/g, "\\n")
	            .replace(/\\'/g, "\\'")
	            .replace(/\\"/g, '\\"')
	            .replace(/\\&/g, "\\&")
	            .replace(/\\r/g, "\\r")
	            .replace(/\\t/g, "\\t")
	            .replace(/\\b/g, "\\b")
	            .replace(/\\f/g, "\\f")
	            .replace(/<(?:.|\n)*?>/gm, '');

	        JSONData = (JSONData.replace(/[\u0000-\u0019]+/g, ""));

	        var arrData = typeof JSONData != 'object' ? JSON.parse(removeEmojis(JSONData)) : JSONData;

	        var CSV = '';
	        //Set Report title in first row or line
	        CSV += ' ';

	        //This condition will generate the Label/Header
	        if (ShowLabel) {
	            var row = '';

	            //This loop will extract the label from 1st index of on array
	            for (var index in arrData[0]) {

	                //Now convert each value to string and comma-seprated
	                row += index + ',';
	            }

	            row = row.slice(0, -1);

	            //append Label row with line break
	            CSV += row + '\r\n';
	        }

	        //1st loop is to extract each row
	        if (typeof max_limits != 'undefined') {
	            var max_data = max_limits;
	        } else {
	            var max_data = 1000;

	        }

	        for (var i = 0; i < arrData.length; i++) {
	            var row = '';

	            //2nd loop will extract each column and convert it in string comma-seprated
	            for (var index in arrData[i]) {
	                row += '"' + arrData[i][index] + '",';
	            }

	            row.slice(0, row.length - 1);

	            //add a line break after each row
	            CSV += row + '\r\n';
	        }

	        if (CSV == '') {
	            alert("Invalid data");
	            return;
	        }

	        //Generate a file name
	        var fileName = "Report_";
	        //this will remove the blank-spaces from the title and replace it with an underscore
	        fileName = ReportTitle.replace(/ /g, "_");

	        var CSV = "﻿" + CSV;
	        var CSV = CSV.replace("undefined", "");;
	        var blobdata = new Blob([CSV], {
	            type: 'text/csv;charset=utf-8'
	        });
	        var link = document.createElement("a");
	        link.setAttribute("href", window.URL.createObjectURL(blobdata));
	        link.setAttribute("download", fileName + ".csv");
	        document.body.appendChild(link);
	        link.click();

	    }

	    function removeEmojis(string) {
	        var regex = /\ud83d[\ude00-\ude4f]/g;
	        return string.replace(regex, '');
	    }

	    function findUrls(searchText) {
	        var regex = '/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi';
	        result = searchText.match(regex);
	        if (result) {
	            return result;
	        } else {
	            return false;
	        }
	    }


	    $("#close_button")
	        .click(function () {
	            if (confirm("คุณต้องการออกจากหน้านี้ ซึ่งจะทำให้ระบบในหน้านี้หยุดทำงาน?")) {
	                close();
	            }
	        });



	    $("#adverra_extract_email_page_csvXXXXX")
	        .click(function () {
	            data = $("#adverra_extract_email_page_holderx")
	                .html()
	                .replace(/,\s*$/, "");
	            export_to_csv(data, "facebook-custom-audience");
	        });



    $("#file_csv")
	        .click(function () {
	            data = $("#adverra_extract_holderx")
	                .html()
	                .replace(/,\s*$/, "");
					name = $("#adverra_keyword").val();
	            export_to_csv(data, name);
	        });




	    var export_phone = document.querySelector('#export_phone');
	    export_phone.onclick = function () {
	        data = $("#adverra_extract_email_page_holder_tel2")
	            .html()
	            .replace(/<br\s*[\/]?>/gi, "\r\n")
	            .trim();
	        download('Phone_Numbers_facebook-custom-audience.txt', data)
	    };

	    var export_email = document.querySelector('#export_email');
	    export_email.onclick = function () {
	        data = $("#adverra_extract_email_page_holder2")
	            .html()
	            .replace(/<br\s*[\/]?>/gi, "\r\n")
	            .trim();
	        download('Email_facebook-custom-audience.txt', data)
	    };



	    function download(filename, text) {
	        var pom = document.createElement('a');
	        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +

	            encodeURIComponent(text));
	        pom.setAttribute('download', filename);

	        pom.style.display = 'none';
	        document.body.appendChild(pom);

	        pom.click();

	        document.body.removeChild(pom);
	    }




	    ! function (a) {
	        a(["jquery"], function (a) {
	            return function () {
	                function b(a, b, c) {
	                    return o({
	                        type: u.error
	                        , iconClass: p()
	                            .iconClasses.error
	                        , message: a
	                        , optionsOverride: c
	                        , title: b
	                    })
	                }

	                function c(b, c) {
	                    return b || (b = p()), r = a("#" + b.containerId), r.length ? r : (c && (r = l(b)), r)
	                }

	                function d(a, b, c) {
	                    return o({
	                        type: u.info
	                        , iconClass: p()
	                            .iconClasses.info
	                        , message: a
	                        , optionsOverride: c
	                        , title: b
	                    })
	                }

	                function e(a) {
	                    s = a
	                }

	                function f(a, b, c) {
	                    return o({
	                        type: u.success
	                        , iconClass: p()
	                            .iconClasses.success
	                        , message: a
	                        , optionsOverride: c
	                        , title: b
	                    })
	                }

	                function g(a, b, c) {
	                    return o({
	                        type: u.warning
	                        , iconClass: p()
	                            .iconClasses.warning
	                        , message: a
	                        , optionsOverride: c
	                        , title: b
	                    })
	                }

	                function h(a) {
	                    var b = p();
	                    r || c(b), k(a, b) || j(b)
	                }

	                function i(b) {
	                    var d = p();
	                    return r || c(d), b && 0 === a(":focus", b)
	                        .length ? void q(b) : void(r.children()
	                            .length && r.remove())
	                }

	                function j(b) {
	                    for (var c = r.children(), d = c.length - 1; d >= 0; d--) k(a(c[d]), b)
	                }

	                function k(b, c) {
	                    return b && 0 === a(":focus", b)
	                        .length ? (b[c.hideMethod]({
	                            duration: c.hideDuration
	                            , easing: c.hideEasing
	                            , complete: function () {
	                                q(b)
	                            }
	                        }), !0) : !1
	                }

	                function l(b) {
	                    return r = a("<div/>")
	                        .attr("id", b.containerId)
	                        .addClass(b.positionClass)
	                        .attr("aria-live", "polite")
	                        .attr("role", "alert"), r.appendTo(a(b.target)), r
	                }

	                function m() {
	                    return {
	                        tapToDismiss: !0
	                        , toastClass: "toast"
	                        , containerId: "toast-container"
	                        , debug: !1
	                        , showMethod: "fadeIn"
	                        , showDuration: 300
	                        , showEasing: "swing"
	                        , onShown: void 0
	                        , hideMethod: "fadeOut"
	                        , hideDuration: 1e3
	                        , hideEasing: "swing"
	                        , onHidden: void 0
	                        , extendedTimeOut: 1e3
	                        , iconClasses: {
	                            error: "toast-error"
	                            , info: "toast-info"
	                            , success: "toast-success"
	                            , warning: "toast-warning"
	                        }
	                        , iconClass: "toast-info"
	                        , positionClass: "toast-top-right"
	                        , timeOut: 5e3
	                        , titleClass: "toast-title"
	                        , messageClass: "toast-message"
	                        , target: "body"
	                        , closeHtml: "<button>&times;</button>"
	                        , newestOnTop: !0
	                    }
	                }

	                function n(a) {
	                    s && s(a)
	                }

	                function o(b) {
	                    function d(b) {
	                        return !a(":focus", j)
	                            .length || b ? j[g.hideMethod]({
	                                duration: g.hideDuration
	                                , easing: g.hideEasing
	                                , complete: function () {
	                                    q(j), g.onHidden && "hidden" !== o.state && g.onHidden(), o.state = "hidden", o.endTime = new Date, n(o)
	                                }
	                            }) : void 0
	                    }

	                    function e() {
	                        (g.timeOut > 0 || g.extendedTimeOut > 0) && (i = setTimeout(d, g.extendedTimeOut))
	                    }

	                    function f() {
	                        clearTimeout(i), j.stop(!0, !0)[g.showMethod]({
	                            duration: g.showDuration
	                            , easing: g.showEasing
	                        })
	                    }
	                    var g = p()
	                        , h = b.iconClass || g.iconClass;
	                    "undefined" != typeof b.optionsOverride && (g = a.extend(g, b.optionsOverride), h = b.optionsOverride.iconClass || h), t++, r = c(g, !0);
	                    var i = null
	                        , j = a("<div/>")
	                        , k = a("<div/>")
	                        , l = a("<div/>")
	                        , m = a(g.closeHtml)
	                        , o = {
	                            toastId: t
	                            , state: "visible"
	                            , startTime: new Date
	                            , options: g
	                            , map: b
	                        };
	                    return b.iconClass && j.addClass(g.toastClass)
	                        .addClass(h), b.title && (k.append(b.title)
	                            .addClass(g.titleClass), j.append(k)), b.message && (l.append(b.message)
	                            .addClass(g.messageClass), j.append(l)), g.closeButton && (m.addClass("toast-close-button")
	                            .attr("role", "button"), j.prepend(m)), j.hide(), g.newestOnTop ? r.prepend(j) : r.append(j), j[g.showMethod]({
	                            duration: g.showDuration
	                            , easing: g.showEasing
	                            , complete: g.onShown
	                        }), g.timeOut > 0 && (i = setTimeout(d, g.timeOut)), j.hover(f, e), !g.onclick && g.tapToDismiss && j.click(d), g.closeButton && m && m.click(function (a) {
	                            a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble && a.cancelBubble !== !0 && (a.cancelBubble = !0), d(!0)
	                        }), g.onclick && j.click(function () {
	                            g.onclick(), d()
	                        }), n(o), g.debug && console && dinsolelog(o), j
	                }

	                function p() {
	                    return a.extend({}, m(), v.options)
	                }

	                function q(a) {
	                    r || (r = c()), a.is(":visible") || (a.remove(), a = null, 0 === r.children()
	                        .length && r.remove())
	                }
	                var r, s, t = 0
	                    , u = {
	                        error: "error"
	                        , info: "info"
	                        , success: "success"
	                        , warning: "warning"
	                    }
	                    , v = {
	                        clear: h
	                        , remove: i
	                        , error: b
	                        , getContainer: c
	                        , info: d
	                        , options: {}
	                        , subscribe: e
	                        , success: f
	                        , version: "2.0.3"
	                        , warning: g
	                    };
	                return v
	            }

	            ()
	        })
	    }("function" == typeof define && define.amd ? define : function (a, b) {
	        "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : window.toastr = b(window.jQuery)
	    });
	    toastr.options = {
	        "closeButton": true
	        , "debug": false
	        , "positionClass": "toast-bottom-right"
	        , "showDuration": "300"
	        , "hideDuration": "1000"
	        , "timeOut": "5000"
	        , "extendedTimeOut": "1000"
	        , "showEasing": "swing"
	        , "hideEasing": "linear"
	        , "showMethod": "fadeIn"
	        , "hideMethod": "fadeOut"
	    }
	


 $('#start_search_page')
	        .click(function () {
	    start_customer(start_search_page);

	        });
			
	 $('#start_search_groups')
	        .click(function () {
	    start_customer(start_search_groups);

	        });
					
	 	 $('#start_search_post')
	        .click(function () {
	    start_customer(start_search_post);

	        }); 
	  
	  
	  
	  $('#adverra_extract_email_page_submit')
	        .click(function () {
	            start_vip(start_adverra_extract_email_page);

	        });

	    $('#adverra_extract_email_keyword_submit')
	        .click(function () {
	            start_vip(start_adverra_extract_email_keyword);

	        });


	    $('#adverra_extract_email_members_groups_submit')
	        .click(function () {
	            start_vip(start_extract_email_members_groups);

	        });

 
	    $('#adverra_send_to_inbox_submit')
	        .click(function () {
	            start_vip(start_comment_to_inbox);

	        });

	    $('#stop')
	        .click(function () {
	            if (confirm("คุณจะหยุดการทำงานของโปรแกรม")) {
	                window.work = 0;
	            }
	        });


	    window.FontAwesomeCdnConfig = {
	        autoA11y: {
	            enabled: false
	        }
	        , asyncLoading: {
	            enabled: false
	        }
	        , reporting: {
	            enabled: false
	        }
	        , useUrl: "use.fontawesome.com"
	        , faCdnUrl: "https://cdn.fontawesome.com:443"
	        , code: "840a321d95"
	    };
	    ! function () {
	        function a(a) {
	            var b, c = []
	                , d = document
	                , e = d.documentElement.doScroll
	                , f = "DOMContentLoaded"
	                , g = (e ? /^loaded|^c/ : /^loaded|^i|^c/)
	                .test(d.readyState);
	            g || d.addEventListener(f, b = function () {
	                for (d.removeEventListener(f, b), g = 1; b = c.shift();) b()
	            }), g ? setTimeout(a, 0) : c.push(a)
	        }

	        function b(a, b) {
	            var c = !1;
	            return a.split(",")
	                .forEach(function (a) {
	                    var d = new RegExp(a.trim()
	                        .replace(".", "\\.")
	                        .replace("*", "(.*)"));
	                    b.match(d) && (c = !0)
	                }), c
	        }

	        function c(a) {
	            "undefined" != typeof MutationObserver && new MutationObserver(a)
	                .observe(document, {
	                    childList: !0
	                    , subtree: !0
	                })
	        }

	        function d(a) {
	            var b, c, d, e;
	            a = a || "fa", b = document.querySelectorAll("." + a), Array.prototype.forEach.call(b, function (a) {
	                c = a.getAttribute("title"), a.setAttribute("aria-hidden", "true"), d = a.nextElementSibling ? !a.nextElementSibling.classList.contains("sr-only") : !0, c && d && (e = document.createElement("span"), e.innerHTML = c, e.classList.add("sr-only"), a.parentNode.insertBefore(e, a.nextSibling))
	            })
	        }! function () {
	            "use strict";

	            function a(a) {
	                l.push(a), 1 == l.length && k()
	            }

	            function b() {
	                for (; l.length;) l[0](), l.shift()
	            }

	            function c(a) {
	                this.a = m, this.b = void 0, this.f = [];
	                var b = this;
	                try {
	                    a(function (a) {
	                        f(b, a)
	                    }, function (a) {
	                        g(b, a)
	                    })
	                } catch (c) {
	                    g(b, c)
	                }
	            }

	            function d(a) {
	                return new c(function (b, c) {
	                    c(a)
	                })
	            }

	            function e(a) {
	                return new c(function (b) {
	                    b(a)
	                })
	            }

	            function f(a, b) {
	                if (a.a == m) {
	                    if (b == a) throw new TypeError;
	                    var c = !1;
	                    try {
	                        var d = b && b.then;
	                        if (null != b && "object" == typeof b && "function" == typeof d) return void d.call(b, function (b) {
	                            c || f(a, b), c = !0
	                        }, function (b) {
	                            c || g(a, b), c = !0
	                        })
	                    } catch (e) {
	                        return void(c || g(a, e))
	                    }
	                    a.a = 0, a.b = b, h(a)
	                }
	            }

	            function g(a, b) {
	                if (a.a == m) {
	                    if (b == a) throw new TypeError;
	                    a.a = 1, a.b = b, h(a)
	                }
	            }

	            function h(b) {
	                a(function () {
	                    if (b.a != m)
	                        for (; b.f.length;) {
	                            var a = b.f.shift()
	                                , c = a[0]
	                                , d = a[1]
	                                , e = a[2]
	                                , a = a[3];
	                            try {
	                                0 == b.a ? e("function" == typeof c ? c.call(void 0, b.b) : b.b) : 1 == b.a && ("function" == typeof d ? e(d.call(void 0, b.b)) : a(b.b))
	                            } catch (f) {
	                                a(f)
	                            }
	                        }
	                })
	            }

	            function i(a) {
	                return new c(function (b, c) {
	                    function d(c) {
	                        return function (d) {
	                            g[c] = d, f += 1, f == a.length && b(g)
	                        }
	                    }
	                    var f = 0
	                        , g = [];
	                    0 == a.length && b(g);
	                    for (var h = 0; h < a.length; h += 1) e(a[h])
	                        .c(d(h), c)
	                })
	            }

	            function j(a) {
	                return new c(function (b, c) {
	                    for (var d = 0; d < a.length; d += 1) e(a[d])
	                        .c(b, c)
	                })
	            }
	            var k, l = [];
	            k = function () {
	                setTimeout(b)
	            };
	            var m = 2;
	            c.prototype.g = function (a) {
	                return this.c(void 0, a)
	            }, c.prototype.c = function (a, b) {
	                var d = this;
	                return new c(function (c, e) {
	                    d.f.push([a, b, c, e]), h(d)
	                })
	            }, window.Promise || (window.Promise = c, window.Promise.resolve = e, window.Promise.reject = d, window.Promise.race = j, window.Promise.all = i, window.Promise.prototype.then = c.prototype.c, window.Promise.prototype["catch"] = c.prototype.g)
	        }()
	        , function () {
	            function a(a) {
	                this.el = a;
	                for (var b = a.className.replace(/^\s+|\s+$/g, "")
	                        .split(/\s+/), c = 0; c < b.length; c++) d.call(this, b[c])
	            }

	            function b(a, b, c) {
	                Object.defineProperty ? Object.defineProperty(a, b, {
	                    get: c
	                }) : a.__defineGetter__(b, c)
	            }
	            if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
	                var c = Array.prototype
	                    , d = c.push
	                    , e = c.splice
	                    , f = c.join;
	                a.prototype = {
	                    add: function (a) {
	                        this.contains(a) || (d.call(this, a), this.el.className = this.toString())
	                    }
	                    , contains: function (a) {
	                        return -1 != this.el.className.indexOf(a)
	                    }
	                    , item: function (a) {
	                        return this[a] || null
	                    }
	                    , remove: function (a) {
	                        if (this.contains(a)) {
	                            for (var b = 0; b < this.length && this[b] != a; b++);
	                            e.call(this, b, 1), this.el.className = this.toString()
	                        }
	                    }
	                    , toString: function () {
	                        return f.call(this, " ")
	                    }
	                    , toggle: function (a) {
	                        return this.contains(a) ? this.remove(a) : this.add(a), this.contains(a)
	                    }
	                }, window.DOMTokenList = a, b(Element.prototype, "classList", function () {
	                    return new a(this)
	                })
	            }
	        }();
	        var e = function (a, b, c) {
	                function d(a) {
	                    return g.body ? a() : void setTimeout(function () {
	                        d(a)
	                    })
	                }

	                function e() {
	                    h.addEventListener && h.removeEventListener("load", e), h.media = c || "all"
	                }
	                var f, g = window.document
	                    , h = g.createElement("link");
	                if (b) f = b;
	                else {
	                    var i = (g.body || g.getElementsByTagName("head")[0])
	                        .childNodes;
	                    f = i[i.length - 1]
	                }
	                var j = g.styleSheets;
	                h.rel = "stylesheet", h.href = a, h.media = "only x", d(function () {
	                    f.parentNode.insertBefore(h, b ? f : f.nextSibling)
	                });
	                var k = function (a) {
	                    for (var b = h.href, c = j.length; c--;)
	                        if (j[c].href === b) return a();
	                    setTimeout(function () {
	                        k(a)
	                    })
	                };
	                return h.addEventListener && h.addEventListener("load", e), h.onloadcssdefined = k, k(e), h
	            }
	            , f = null;
	        ! function () {
	            function a(a, b) {
	                document.addEventListener ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b)
	            }

	            function b(a) {
	                document.body ? a() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function b() {
	                    document.removeEventListener("DOMContentLoaded", b), a()
	                }) : document.attachEvent("onreadystatechange", function c() {
	                    "interactive" != document.readyState && "complete" != document.readyState || (document.detachEvent("onreadystatechange", c), a())
	                })
	            }

	            function c(a) {
	                this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(a)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.h = document.createElement("span"), this.f = document.createElement("span"), this.g = -1, this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c)
	            }

	            function d(a, b) {
	                a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + b + ";"
	            }

	            function e(a) {
	                var b = a.a.offsetWidth
	                    , c = b + 100;
	                return a.f.style.width = c + "px", a.c.scrollLeft = c, a.b.scrollLeft = a.b.scrollWidth + 100, a.g !== b ? (a.g = b, !0) : !1
	            }

	            function g(b, c) {
	                function d() {
	                    var a = f;
	                    e(a) && a.a.parentNode && c(a.g)
	                }
	                var f = b;
	                a(b.b, d), a(b.c, d), e(b)
	            }

	            function h(a, b) {
	                var c = b || {};
	                this.family = a, this.style = c.style || "normal", this.weight = c.weight || "normal", this.stretch = c.stretch || "normal"
	            }

	            function i() {
	                if (null === l) {
	                    var a = document.createElement("div");
	                    try {
	                        a.style.font = "condensed 100px sans-serif"
	                    } catch (b) {}
	                    l = "" !== a.style.font
	                }
	                return l
	            }

	            function j(a, b) {
	                return [a.style, a.weight, i() ? a.stretch : "", "100px", b].join(" ")
	            }
	            var k = null
	                , l = null
	                , m = null;
	            h.prototype.load = function (a, e) {
	                var f = this
	                    , h = a || "BESbswy"
	                    , i = e || 3e3
	                    , l = (new Date)
	                    .getTime();
	                return new Promise(function (a, e) {
	                    if (null === m && (m = !!window.FontFace), m) {
	                        var n = new Promise(function (a, b) {
	                                function c() {
	                                    (new Date)
	                                    .getTime() - l >= i ? b() : document.fonts.load(j(f, f.family), h)
	                                        .then(function (b) {
	                                            1 <= b.length ? a() : setTimeout(c, 25)
	                                        }, function () {
	                                            b()
	                                        })
	                                }
	                                c()
	                            })
	                            , o = new Promise(function (a, b) {
	                                setTimeout(b, i)
	                            });
	                        Promise.race([o, n])
	                            .then(function () {
	                                a(f)
	                            }, function () {
	                                e(f)
	                            })
	                    } else b(function () {
	                        function b() {
	                            var b;
	                            (b = -1 != q && -1 != r || -1 != q && -1 != s || -1 != r && -1 != s) && ((b = q != r && q != s && r != s) || (null === k && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), k = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))), b = k && (q == t && r == t && s == t || q == u && r == u && s == u || q == v && r == v && s == v)), b = !b), b && (w.parentNode && w.parentNode.removeChild(w), clearTimeout(x), a(f))
	                        }

	                        function m() {
	                            if ((new Date)
	                                .getTime() - l >= i) w.parentNode && w.parentNode.removeChild(w), e(f);
	                            else {
	                                var a = document.hidden;
	                                !0 !== a && void 0 !== a || (q = n.a.offsetWidth, r = o.a.offsetWidth, s = p.a.offsetWidth, b()), x = setTimeout(m, 50)
	                            }
	                        }
	                        var n = new c(h)
	                            , o = new c(h)
	                            , p = new c(h)
	                            , q = -1
	                            , r = -1
	                            , s = -1
	                            , t = -1
	                            , u = -1
	                            , v = -1
	                            , w = document.createElement("div")
	                            , x = 0;
	                        w.dir = "ltr", d(n, j(f, "sans-serif")), d(o, j(f, "serif")), d(p, j(f, "monospace")), w.appendChild(n.a), w.appendChild(o.a), w.appendChild(p.a), document.body.appendChild(w), t = n.a.offsetWidth, u = o.a.offsetWidth, v = p.a.offsetWidth, m(), g(n, function (a) {
	                            q = a, b()
	                        }), d(n, j(f, '"' + f.family + '",sans-serif')), g(o, function (a) {
	                            r = a, b()
	                        }), d(o, j(f, '"' + f.family + '",serif')), g(p, function (a) {
	                            s = a, b()
	                        }), d(p, j(f, '"' + f.family + '",monospace'))
	                    })
	                })
	            }, f = h
	        }();
	        var g = {
	                observe: function (a, b) {
	                    for (var c = b.prefix, d = function (a) {
	                            var b = a.weight ? "-" + a.weight : ""
	                                , d = a.style ? "-" + a.style : ""
	                                , e = a.className ? "-" + a.className : ""
	                                , g = a.className ? "-" + a.className + b + d : ""
	                                , h = document.getElementsByTagName("html")[0].classList
	                                , i = function (a) {
	                                    h.add(c + e + "-" + a), h.add(c + g + "-" + a)
	                                }
	                                , j = function (a) {
	                                    h.remove(c + e + "-" + a), h.remove(c + g + "-" + a)
	                                };
	                            i("loading"), new f(a.familyName)
	                                .load(a.testString)
	                                .then(function () {
	                                    i("ready"), j("loading")
	                                }, function () {
	                                    i("failed"), j("loading")
	                                })
	                        }, e = 0; e < a.length; e++) d(a[e])
	                }
	            }
	            , h = {
	                load: function (a) {
	                    var b = document.createElement("link");
	                    b.href = a, b.media = "all", b.rel = "stylesheet", document.getElementsByTagName("head")[0].appendChild(b)
	                }
	                , loadAsync: function (a) {
	                    e(a)
	                }
	            }
	            , i = {
	                load: function (a) {
	                    var b = document.createElement("script")
	                        , c = document.scripts[0];
	                    b.src = a, c.parentNode.appendChild(b)
	                }
	            };
	        try {
	            if (window.FontAwesomeCdnConfig) {
	                var j = window.FontAwesomeCdnConfig
	                    , k = j.useUrl
	                    , l = j.faCdnUrl
	                    , m = j.code
	                    , n = "FontAwesome"
	                    , o = "fa"
	                    , p = "๏€"
	                    , q = d.bind(d, "fa")
	                    , r = function () {};
	                j.autoA11y.enabled && (a(q), c(q)), j.reporting.enabled && b(j.reporting.domains, location.host) && i.load(l + "/js/stats.js"), cssUrl = "https://" + k + "/" + m + ".css", new f(n)
	                    .load(p)
	                    .then(function () {
	                        var a = (window.FontAwesomeHooks || {})
	                            .loaded || r;
	                        a()
	                    }, r), j.asyncLoading.enabled ? h.loadAsync(cssUrl) : h.load(cssUrl), g.observe([{
	                        familyName: n
	                        , testString: p
	                    }], {
	                        prefix: o + "-events-icons"
	                    })
	            }
	        } catch (s) {}
	    }();

	}



	///////////////////////////////////////////////////// extract keyword ///////////////////////////

	function start_adverra_extract_email_keyword() {
	    window.online = 1;

	    function check_internet() {
	        if (!navigator.onLine) {
	            window.online = 0;
	            window.work = 3; // ตัดระบบไม่ให้ทำงานต่อ
	            toastr.error('เนื่องจาก Internet ของท่าน ขาดการเชื่อมต่อ ให้เชื่อมต่อ Internet ใหม่อีกครั้ง');
	        } else {
	            if (window.online == 0) { // เมื่อเน็ตกลับมาออนไลน์
	                window.online = 1;
	                window.work = 1;

	                $("#adverra_extract_email_keyword_submit2")
	                    .hide();
	                $("#stop")
	                    .show();
	                toastr.success('ระบบกลับมาเชื่อมต่ออีกครั้ง และทำงานต่อ');
	                setTimeout(function () {
	                    if (window.work == 1) {
	                        start_adverra_extract_email_keyword_g(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	                    }
	                }, 5000);


	            }

	        }
	    }
	    setInterval(check_internet, 3000);

	    window.work = 1;
	    var number_x = 0;
	    var token = tokenx;
	    var keyword = $("#adverra_extract_email_keyword")
	        .val()
	        .trim()
	        .split(/\r\n|\r|\n/);
	    var count_loob = keyword.length;
	    if (keyword[0] != '') {
	        toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
	        var number_x = 0;
	        var token = tokenx;
	        var keyword = $("#adverra_extract_email_keyword")
	            .val()
	            .trim()
	            .split(/\r\n|\r|\n/);
	        var count_loob = keyword.length;
	        var numbers = 0;

	        start_adverra_extract_email_keyword2(0);

	        function start_adverra_extract_email_keyword2(loop) {

	            if (loop < count_loob) {
                start_adverra_extract_email_keywordX('','');
				  
       function  start_adverra_extract_email_keywordX(urls,parsed_requestx){
	               // var url = 'https://graph.facebook.com/search?q=' + keyword[loop] + '&type=group&fields=id&limit=1000&access_token=' + token;
				   if(urls == ''){
				   	   urls = 'https://mbasic.facebook.com/search/groups/?q='+keyword[loop];
					  parsed_requestx = [];
					
				   }
				   else{
					   
					   urls = urls;
					   
				   }
	                $.ajax({
	                    url: urls
	                    , type: 'GET'
	                    , contentType: 'application/json'
	                    , dataType: 'text'
	                    , complete: function (result) {
	                        result = result.responseText;
							parsed_request = parsed_requestx.concat(result.match(/<a href=\"\/groups\/(\d+)/g));
							parsed_request = uniq(parsed_request);
			
					   var counts_data = parsed_request.length;
					   see_more_pager =  result.match(/id=\"see_more_pager\"><a href="(.*?)"/g);
						
							if((see_more_pager !== null )){
							  $("#adverra_extract_email_keyword_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();
	                                $("#keyword_show")
	                                    .text('กำลังค้นหาจาก Keyword:' + keyword[loop]);

							see_more_pager =  see_more_pager[0].replace('id=\"see_more_pager\"><a href="','');
							see_more_pager =  see_more_pager.replace('amp%3B','');
							see_more_pager =  see_more_pager.replace('amp;','');
							  toastr.info('กำลังรวบรวมกลุ่มเป้าหมายที่ค้นหา กรุณารอสักครู่ '+counts_data);
							start_adverra_extract_email_keywordX(see_more_pager,parsed_request);
	
							}
							else{
	                       // parsed_request = JSON.parse(result);

	                        if (typeof parsed_request !== 'undefined') { //ถ้าดึงลุ่มตาม Keyword ได้
	                            $("#button_start")
	                                .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้....');
                          
	                         //   var counts_data = parsed_request.data.length;


	                            if (loop < count_loob) {
				
	                                toastr.info('เรื่มดึงคนสนใจเกี่ยวกับ Keyword:' + keyword[loop]);
	                                $("#adverra_extract_email_keyword_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();
	                                $("#keyword_show")
	                                    .text('กำลังค้นหาจาก Keyword:' + keyword[loop]);



	                                var url = '';
							
	                                start_adverra_extract_email_keyword_g(0, parsed_request, url, 0, loop); // เริ่มต้นหาตามกลุ่ม



	                            } else {
	                                loops = loop + 1;
	                                start_adverra_extract_email_keyword2(loops);

	                            }
	                        } else { // ถึงดึง Keyword ไม่ได้ ให้ข้ามไปดึง Keyword อื่น
	                            loops = loop + 1;
	                            start_adverra_extract_email_keyword2(loops);

	                        }
							
						  } 
	                    }

	                });


				}
	            } else {
	                toastr.success('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                alert('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                $("#adverra_extract_email_keyword_submit")
	                    .show();
	                $("#stop")
	                    .hide();



	            }

	        }
	    } else {
	        toastr.error('กรุณากรอก Keyword ก่อนค่ะ');
	    }


	    function start_adverra_extract_email_keyword_g(loop_g, data, url, loop_gr, loop) { /// หาตามกลุ่ม

	        window.loop_g = loop_g;
	        window.data = data;
	        window.url = url;
	        window.loop_gr = loop_gr;
	        window.loop = loop;
	        if (window.work == 1) {

	            $('#adverra_extract_email_page_submit')
	                .hide();
	            $('#adverra_extract_email_page_csvXXXXX')
	                .show();
	            if (typeof data !== 'undefined') {
			
	               var counts_data_g = (data.length-1);
			
	                if (loop_g < counts_data_g) {

	                    loop_gXX = loop_g + 1;
	                    var w = Math.ceil((loop_gXX / counts_data_g) * 100);
	                    $(".progress-bar")
	                        .css("width", w + '%');
	                    $(".progress-value")
	                        .text(w + '%(' + loop_gXX + '/' + counts_data_g + ')');

	                    $("#count_work")
	                        .show();

	                    id = data[loop_g].replace('<a href=\"\/groups\/','');
						
	                    var token = tokenx;
	                    if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/' + id + '/members?fields=name,location,email,mobile_phone&limit=300&&access_token=' + token;
	                    }
	                    $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
	                            result = result.responseText;
	                            parsed_request = JSON.parse(result);
	                            if (typeof parsed_request.data !== 'undefined') { //ถ้าดึงลุ่มตาม Keyword ได้
	                                var counts_data = parsed_request.data.length;
	                                loop_gs = loop_g + 1;

	                                //toastr.info('ดึงข้อมูล'+loop_gs);
	                                for (var i = 0; i < counts_data; i++) {

	                                    if (typeof parsed_request.data[i] !== 'undefined') {
	                                        post_id = parsed_request.data[i].id;
	                                        post_idx = parsed_request.data[i].id;
	                                        post_name = parsed_request.data[i].name;
	                                        post_email = parsed_request.data[i].email;
	                                        post_mobile_phone = parsed_request.data[i].mobile_phone;
	                                        post_mobile_phonex = parsed_request.data[i].mobile_phone;
	                                        post_location = parsed_request.data[i].location;
	                                    }




	                                    if (typeof post_email !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้..........ใจเย็นๆนะจ๊ะ');
	                                        $("#email_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder2")
	                                            .html()
	                                            .indexOf(post_email) == -1) {

	                                            $("#adverra_extract_email_page_holder2")
	                                                .append(post_email + '<br>');


	                                            var c_email = $("#adverra_extract_email_page_holder2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_email = c_email.length - 1;

	                                            $("#email_counts_page")
	                                                .text(c_email);
	                                            $("#email_counts_page")
	                                                .addClass("textboxs");
	                                        }

	                                    }

	                                    if (typeof post_mobile_phone !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้.....ใจเย็นๆนะจ๊ะ');
	                                        $("#tel_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder_tel2")
	                                            .html()
	                                            .indexOf(post_mobile_phone) == -1) {

	                                            $("#adverra_extract_email_page_holder_tel2")
	                                                .append(post_mobile_phone + '<br>');

	                                            var c_phone = $("#adverra_extract_email_page_holder_tel2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_phone = c_phone.length - 1;

	                                            $("#tel_counts_page")
	                                                .text(c_phone);
	                                            $("#tel_counts_page")
	                                                .addClass("textboxs");
	                                        }
	                                    }

	                                    if (typeof post_location !== 'undefined') {
	                                        post_locations = post_location.name;
	                                    } else {
	                                        post_locations = '';
	                                    }



	                                    if ((typeof post_mobile_phone !== 'undefined') || (typeof post_email !== 'undefined')) {




	                                        if (typeof post_mobile_phone === 'undefined') {
	                                            post_mobile_phone = '';
	                                        }
	                                        if (typeof post_email === 'undefined') {
	                                            post_email = '';
	                                        }
	                                        if ($("#adverra_extract_email_page_holderx")
	                                            .html()
	                                            .indexOf(post_id) == -1) {
	                                            post_id = "'" + post_id + "'";
	                                            number_row = $('#table_data tr')
	                                                .length;
	                                            post_mobile_phonex = "'" + post_mobile_phone + "'";

	                                            //	$('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+convert_thai(post_name)+'</td><td>'+post_locations+'</td><td>'+post_email+'</td><td>'+post_mobile_phone+'</td></tr>');
	                                            counts = (c_phone + c_email);
	                                            if (!isNaN(counts)) {
	                                                $('#adverra_extract_email_page_csvXXXXX')
	                                                    .val('Export To CSV' + '(' + counts + ')');
	                                            }
	                                            $("#adverra_extract_email_page_holderx")
	                                                .append('{"ID":"' + (post_id) + '","Name":"' + convert_thai(post_name) + '","Location":"' + (post_locations) + '","Email":"' + post_email + '","Phone Number":"' + post_mobile_phonex + '"},');


	                                        }
	                                    }

	                                }


	                                if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
	                                        loop_grs = loop_gr + 1;

	                                        start_adverra_extract_email_keyword_g(loop_g, data, parsed_request.paging.next, loop_gr, loop)

	                                    } else {
	                                        loop_gs = loop_g + 1;

	                                        start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop);

	                                    }
	                                } else {
	                                    loop_gs = loop_g + 1;

	                                    start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop)

	                                }


	                            } else { // ึงสมาชิกใหม่
	                                loop_gs = loop_g + 1;

	                                start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop)

	                            }
	                        }

	                    });


	                } else {
	                    loops = loop + 1;
	                    start_adverra_extract_email_keyword2(loops);
	                    toastr.info('ดึงคนสนใจเกี่ยวกับ Keyword:' + keyword[loop] + ' แล้ว');


	                }
	            }
	        } else
	        if (window.work == 0) {
	            toastr.success('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            alert('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            $("#adverra_extract_email_keyword_submit2")
	                .show();
	            $("#stop")
	                .hide();
	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        } else {

	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        }
			
	    }



	    $('#adverra_extract_email_keyword_submit2')
	        .click(function () {
	            window.work = 1;
	            $("#adverra_extract_email_keyword_submit2")
	                .hide();
	            $("#stop")
	                .show();
	            start_adverra_extract_email_keyword_g(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	        });
	}

	//////////////////////////////////////////////////////////////////////////////////////////////



	///////////////////////////////////////////////////// extract page comments only ///////////////////////////

	function start_adverra_extract_email_page() {

	    window.online = 1;

	    function check_internet() {
	        if (!navigator.onLine) {
	            window.online = 0;
	            window.work = 3; // ตัดระบบไม่ให้ทำงานต่อ
	            toastr.error('เนื่องจาก Internet ของท่าน ขาดการเชื่อมต่อ ให้เชื่อมต่อ Internet ใหม่อีกครั้ง');
	        } else {
	            if (window.online == 0) { // เมื่อเน็ตกลับมาออนไลน์
	                window.online = 1;
	                window.work = 1;

	                $("#adverra_extract_email_keyword_submit2")
	                    .hide();
	                $("#stop")
	                    .show();
	                toastr.success('ระบบกลับมาเชื่อมต่ออีกครั้ง และทำงานต่อ');
	                setTimeout(function () {
	                    if (window.work == 1) {
	                        start_adverra_extract_email_keyword_g_email_page(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	                    }
	                }, 5000);


	            }

	        }
	    }
	    setInterval(check_internet, 3000);

	    window.work = 1;
	    var number_x = 0;
	    var token = tokenx;
	    var keyword = $("#adverra_extract_email_keyword")
	        .val()
	        .trim()
	        .split(/\r\n|\r|\n/);
	    var count_loob = keyword.length;
	    if (keyword[0] != '') {
	        toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
	        var number_x = 0;
	        var token = tokenx;
	        var keyword = $("#adverra_extract_email_keyword")
	            .val()
	            .trim()
	            .split(/\r\n|\r|\n/);
	        var count_loob = keyword.length;
	        var numbers = 0;

	        start_adverra_extract_email_keyword2_email_page(0, '');

	        function start_adverra_extract_email_keyword2_email_page(loop, url) {

	            if (loop < count_loob) {
	                if (url == '') {
	                  //  var url = 'https://graph.facebook.com/' + keyword[loop] + '/feed?fields=id,comments.limit(0).summary(true)&limit=50&access_token=' + token;
					  var url = 'https://graph.facebook.com/' + keyword[loop] + '/feed?fields=id&limit=500&access_token=' + token;
	                } else {
	                    var url = url;

	                }

	                $.ajax({
	                    url: url
	                    , type: 'GET'
	                    , contentType: 'application/json'
	                    , dataType: 'text'
	                    , complete: function (result) {
	                        result = result.responseText;
							//alert(result);
	                        parsed_request = JSON.parse(result);

	                        if (typeof parsed_request.data !== 'undefined') {
	                            $("#button_start")
	                                .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้....');
	                            var counts_data = parsed_request.data.length;
	                         /*   data = parsed_request.data.sort(function (a, b) {
	                                return a.comments.summary.total_count - b.comments.summary.total_count;
	                            });
                               */
                                 data = parsed_request.data;
	                            for (var i = 0; i < counts_data; i++) {
	                                id = data[i].id;
									/*
	                                counts1 = data[i].comments.summary.total_count;
	                                if (counts1 > 0) {
	                                    $("#id_remember")
	                                        .prepend(id + '<br>');
	                                }
*/ $("#id_remember").prepend(id + '<br>');
	                            }

	                            /////////////////////////////////////////////////////////////////////////////////
	                            if ((typeof parsed_request.paging !== 'undefined')) {

	                                if ((typeof parsed_request.paging.next !== 'undefined')) {
	                                    id_remember = $("#id_remember")
	                                        .html()
	                                        .trim()
	                                        .split('<br>');
	                                    count_id_remember = id_remember.length;

	                                    $("#keyword_show")
	                                        .text('กำลังรวบรวมโพสจากเพจ ' + keyword[loop] + '(' + count_id_remember + ')');

	                                    $("#adverra_extract_email_page_submit")
	                                        .hide();
	                                    $("#stop")
	                                        .show();
	                                    start_adverra_extract_email_keyword2_email_page(loop, parsed_request.paging.next);

	                                } else {
	                                    id_remember = $("#id_remember")
	                                        .html()
	                                        .trim()
	                                        .split('<br>');
	                                    count_id_remember = id_remember.length;
	                                    toastr.info('เรื่มดึงคนจากคอมเม้นโพสจากเพจ:' + keyword[loop]);
	                                    $("#adverra_extract_email_page_submit")
	                                        .hide();
	                                    $("#stop")
	                                        .show();
	                                    $("#keyword_show")
	                                        .text('กำลังค้นหาจากคอมเม้นโพสในแฟนเพจ:' + keyword[loop]);

	                                    $("#adverra_extract_email_page_submit")
	                                        .hide();
	                                    $("#stop")
	                                        .show();

	                                    var url = '';
	                                    start_adverra_extract_email_keyword_g_email_page(0, id_remember, url, 0, loop); // เริ่มต้นหาตามกลุ่ม

	                                }
	                            } else {
	                                id_remember = $("#id_remember")
	                                    .html()
	                                    .trim()
	                                    .split('<br>');
	                                count_id_remember = id_remember.length;
	                                toastr.info('เรื่มดึงคนจากคอมเม้นโพสจากเพจ:' + keyword[loop]);
	                                $("#adverra_extract_email_page_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();
	                                $("#keyword_show")
	                                    .text('กำลังค้นหาจากคอมเม้นโพสในแฟนเพจ:' + keyword[loop]);

	                                $("#adverra_extract_email_page_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();

	                                var url = '';
	                                start_adverra_extract_email_keyword_g_email_page(0, id_remember, url, 0, loop); // เริ่มต้นหาตามกลุ่ม

	                            }
	                            /////////////////////////////////////////////////////////////////////////////////


	                            /*
							 
							 
							   
							     
							         if(loop<counts_data){
							          toastr.info('เรื่มดึงคนจากคอมเม้นโพสจากเพจ:'+keyword[loop]);
									  $("#adverra_extract_email_page_submit").hide();
									  $("#stop").show();
									  $("#keyword_show").text('กำลังค้นหาจากคอมเม้นโพสในแฟนเพจ:'+keyword[loop]);
								
									  
									  
							          var  url = '';
									  start_adverra_extract_email_keyword_g_email_page(0,parsed_request,url,0,loop); // เริ่มต้นหาตามกลุ่ม
									  
									  
									  
							          }
									  else{
										   loops = loop+1;
								  start_adverra_extract_email_keyword2_email_page(loops);
										  
									  }
									  */

	                        } else { // ถึงดึง Keyword ไม่ได้ ให้ข้ามไปดึง Keyword อื่น
	                            loops = loop + 1;
	                            start_adverra_extract_email_keyword2_email_page(loops);

	                        }


	                    }

	                });



	            } else {
	                toastr.success('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                alert('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                $("#adverra_extract_email_page_submit")
	                    .show();
	                $("#stop")
	                    .hide();



	            }

	        }
	    } else {
	        toastr.error('กรุณากรอก ID แฟนเพจ ก่อนค่ะ');
	    }


	    function start_adverra_extract_email_keyword_g_email_page(loop_g, data, url, loop_gr, loop) { /// หาตามกลุ่ม

	        window.loop_g = loop_g;
	        window.data = data;
	        window.url = url;
	        window.loop_gr = loop_gr;
	        window.loop = loop;
	        if (window.work == 1) {

	            $('#adverra_extract_email_page_submit')
	                .hide();
	            $('#adverra_extract_email_page_csvXXXXX')
	                .show();
	            if (typeof data !== 'undefined') {
	                var counts_data_g = data.length;
	                if (loop_g < counts_data_g) {

	                    loop_gXX = loop_g + 1;
	                    var w = Math.ceil((loop_gXX / counts_data_g) * 100);
	                    $(".progress-bar")
	                        .css("width", w + '%');
	                    $(".progress-value")
	                        .text(w + '%(' + loop_gXX + '/' + counts_data_g + ')');

	                    $("#count_work")
	                        .show();

	                    id = data[loop_g];

	                    var token = tokenx;
	                    if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/' + id + '/comments?fields=from{email,mobile_phone,name,id}&limit=300&&access_token=' + token;
	                    }
	                    $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
	                            result = result.responseText;
	                            parsed_request = JSON.parse(result);
	                            if (typeof parsed_request.data !== 'undefined') { //ถ้าดึงลุ่มตาม Keyword ได้
	                                var counts_data = parsed_request.data.length;
	                                loop_gs = loop_g + 1;

	                                //toastr.info('ดึงข้อมูล'+loop_gs);
	                                for (var i = 0; i < counts_data; i++) {

	                                    if (typeof parsed_request.data[i] !== 'undefined') {
	                                        post_id = parsed_request.data[i].from.id;
	                                        post_idx = parsed_request.data[i].from.id;
	                                        post_name = parsed_request.data[i].from.name;
	                                        post_email = parsed_request.data[i].from.email;
	                                        post_mobile_phone = parsed_request.data[i].from.mobile_phone;
	                                        post_mobile_phonex = parsed_request.data[i].from.mobile_phone;
	                                        post_location = parsed_request.data[i].from.location;
	                                    }




	                                    if (typeof post_email !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้..........ใจเย็นๆนะจ๊ะ');
	                                        $("#email_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder2")
	                                            .html()
	                                            .indexOf(post_email) == -1) {

	                                            $("#adverra_extract_email_page_holder2")
	                                                .append(post_email + '<br>');


	                                            var c_email = $("#adverra_extract_email_page_holder2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_email = c_email.length - 1;

	                                            $("#email_counts_page")
	                                                .text(c_email);
	                                            $("#email_counts_page")
	                                                .addClass("textboxs");
	                                        }

	                                    }

	                                    if (typeof post_mobile_phone !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้.....ใจเย็นๆนะจ๊ะ');
	                                        $("#tel_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder_tel2")
	                                            .html()
	                                            .indexOf(post_mobile_phone) == -1) {

	                                            $("#adverra_extract_email_page_holder_tel2")
	                                                .append(post_mobile_phone + '<br>');

	                                            var c_phone = $("#adverra_extract_email_page_holder_tel2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_phone = c_phone.length - 1;

	                                            $("#tel_counts_page")
	                                                .text(c_phone);
	                                            $("#tel_counts_page")
	                                                .addClass("textboxs");
	                                        }
	                                    }

	                                    if (typeof post_location !== 'undefined') {
	                                        post_locations = post_location.name;
	                                    } else {
	                                        post_locations = '';
	                                    }



	                                    if ((typeof post_mobile_phone !== 'undefined') || (typeof post_email !== 'undefined')) {




	                                        if (typeof post_mobile_phone === 'undefined') {
	                                            post_mobile_phone = '';
	                                        }
	                                        if (typeof post_email === 'undefined') {
	                                            post_email = '';
	                                        }
	                                        if ($("#adverra_extract_email_page_holderx")
	                                            .html()
	                                            .indexOf(post_id) == -1) {
	                                            post_id = "'" + post_id + "'";
	                                            number_row = $('#table_data tr')
	                                                .length;
	                                            post_mobile_phonex = "'" + post_mobile_phone + "'";

	                                            //	$('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+convert_thai(post_name)+'</td><td>'+post_locations+'</td><td>'+post_email+'</td><td>'+post_mobile_phone+'</td></tr>');
	                                            counts = (c_phone + c_email);
	                                            if (!isNaN(counts)) {
	                                                $('#adverra_extract_email_page_csvXXXXX')
	                                                    .val('Export To CSV' + '(' + counts + ')');
	                                            }
	                                            $("#adverra_extract_email_page_holderx")
	                                                .append('{"ID":"' + (post_id) + '","Name":"' + convert_thai(post_name) + '","Location":"' + (post_locations) + '","Email":"' + post_email + '","Phone Number":"' + post_mobile_phonex + '"},');


	                                        }
	                                    }

	                                }


	                                if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
	                                        loop_grs = loop_gr + 1;

	                                        start_adverra_extract_email_keyword_g_email_page(loop_g, data, parsed_request.paging.next, loop_gr, loop)

	                                    } else {
	                                        loop_gs = loop_g + 1;

	                                        start_adverra_extract_email_keyword_g_email_page(loop_gs, data, '', 0, loop);

	                                    }
	                                } else {
	                                    loop_gs = loop_g + 1;

	                                    start_adverra_extract_email_keyword_g_email_page(loop_gs, data, '', 0, loop);

	                                }


	                            } else { // ึงสมาชิกใหม่
	                                loop_gs = loop_g + 1;

	                                start_adverra_extract_email_keyword_g_email_page(loop_gs, data, '', 0, loop)

	                            }
	                        }

	                    });


	                } else {
	                    $("#id_remember")
	                        .html('');
	                    loops = loop + 1;
	                    toastr.info('ดึงคนจากคอมเม้นโพสจากเพจ:' + keyword[loop] + ' แล้ว');
	                    start_adverra_extract_email_keyword2_email_page(loops, '');



	                }
	            }
	        } else
	        if (window.work == 0) {
	            toastr.success('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            alert('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            $("#adverra_extract_email_keyword_submit2")
	                .show();
	            $("#stop")
	                .hide();
	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        } else {

	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        }
	    }



	    $('#adverra_extract_email_keyword_submit2')
	        .click(function () {
	            window.work = 1;
	            $("#adverra_extract_email_keyword_submit2")
	                .hide();
	            $("#stop")
	                .show();
	            start_adverra_extract_email_keyword_g_email_page(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	        });
	}

	//////////////////////////////////////////////////////////////////////////////////////////////








	///////////////////////////////////////////////////// extract สมาชิกกลุ่ม  ///////////////////////////

	function start_extract_email_members_groups() {
	    window.online = 1;

	    function check_internet() {
	        if (!navigator.onLine) {
	            window.online = 0;
	            window.work = 3; // ตัดระบบไม่ให้ทำงานต่อ
	            toastr.error('เนื่องจาก Internet ของท่าน ขาดการเชื่อมต่อ ให้เชื่อมต่อ Internet ใหม่อีกครั้ง');
	        } else {
	            if (window.online == 0) { // เมื่อเน็ตกลับมาออนไลน์
	                window.online = 1;
	                window.work = 1;

	                $("#adverra_extract_email_keyword_submit2")
	                    .hide();
	                $("#stop")
	                    .show();
	                toastr.success('ระบบกลับมาเชื่อมต่ออีกครั้ง และทำงานต่อ');
	                setTimeout(function () {
	                    if (window.work == 1) {
	                        start_adverra_extract_email_keyword_g(window.loop_g, window.data, window.url, window.loop_gr, window.loop,window.member_count,window.name);
	                    }
	                }, 5000);


	            }

	        }
	    }
	    setInterval(check_internet, 3000);
        window.c_total = 0;; 
	    window.work = 1;
	    var number_x = 0;
	    var token = tokenx;
	    var keyword = $("#adverra_extract_email_keyword").val().trim().split(/\r\n|\r|\n/);
	    var count_loob = keyword.length;
	    if (keyword[0] != '') {
	        toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
	        var number_x = 0;
	        var token = tokenx;
	        var keyword = $("#adverra_extract_email_keyword")
	            .val()
	            .trim()
	            .split(/\r\n|\r|\n/);
	        var count_loob = keyword.length;
	        var numbers = 0;

	        start_adverra_extract_email_keyword2(0);

	        function start_adverra_extract_email_keyword2(loop) {

	            if (loop < (count_loob)) {
					  var url = 'https://graph.facebook.com/' + keyword[loop] + '/?fields=member_count,name,permissions&access_token=' + token;
					      $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
								         result = result.responseText;
	                                     parsed_request = JSON.parse(result);
	                                     if (typeof parsed_request !== 'undefined') { 
                                          toastr.info('กำลังค้นหาจากสมาชิกกลุ่ม:' + parsed_request.name);
									    var w = Math.ceil(((loop+1) / count_loob) * 100);
	                    $(".progress-bar")
	                        .css("width", w + '%');
	                    $(".progress-value")
	                        .text(w + '%(' + (loop+1) + '/' + count_loob + ')');

	                    $("#count_work")
	                        .show();
										
	                                             start_adverra_extract_email_keyword_g(0, keyword, '', 0, loop,parsed_request.member_count,parsed_request.name);
												 
												 
									       }
									else{
										loops = loop+1;
										start_adverra_extract_email_keyword2(loops);
										
									}
								
								}

	                    });

					
					
					} else {
	                toastr.success('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                alert('ดึงข้อมูลครบเรียบร้อยแล้วค่ะ');
	                $("#adverra_extract_email_members_groups_submit")
	                    .show();
	                $("#stop")
	                    .hide();



	            }

	        }
	    } else {
	        toastr.error('กรุณากรอก ID กลุ่ม ก่อนค่ะ');
	    }

adverra_extract_email_keyword_gxs = 0;
	    function start_adverra_extract_email_keyword_g(loop_g, data, url, loop_gr, loop,member_count,name) { /// หาตามกลุ่ม
	        window.loop_g = loop_g;
	        window.data = data;
	        window.url = url;
	        window.loop_gr = loop_gr;
	        window.loop = loop;
			window.member_count = member_count;
			window.name = name;
	        if (window.work == 1) {
	            $('#adverra_extract_email_members_groups_submit')
	                .hide();
	            $('#adverra_extract_email_page_csvXXXXX')
	                .show();
	            if (typeof data !== 'undefined') {
	                var counts_data_g = data.length;
	                if (loop_g < counts_data_g) {

	                    loop_gXX = loop_g + 1;
	                   

	                    id = data[loop_g];
	                    var token = tokenx;
	                    if (url != '') {
	                        url = url;
	                    } else {
	                    var url = 'https://graph.facebook.com/' + id + '/members?fields=name,location,email,mobile_phone&limit=300&access_token=' + token;
					//	 var url = "  https://graph.facebook.com/fql?q=SELECT uid,current_location,name,sex,relationship_status,email,cell FROM user where uid in (SELECT uid FROM group_member  where gid ="+id+" limit 0,100)&access_token="+token

						   
	                    }
	                    $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
	                            result = result.responseText;
	                            parsed_request = JSON.parse(result);
	                            if (typeof parsed_request.data !== 'undefined') { //ถ้าดึงลุ่มตาม Keyword ได้
								
	                                var counts_data = parsed_request.data.length;
									window.c_total = window.c_total+counts_data;
	                                loop_gs = loop_g + 1;

                       
										
									   
									   
									   
	                                $("#adverra_extract_email_page_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();
	                                $("#keyword_show")
	                                    .text('กำลังค้นหาจากสมาชิกกลุ่ม:' + name+'(จากจำนวนสมาชิกรวมกัน '+window.c_total+' คน)');
										
										
										



	                                //toastr.info('ดึงข้อมูล'+loop_gs);
	                                for (var i = 0; i < counts_data; i++) {

	                                    if (typeof parsed_request.data[i] !== 'undefined') {
											
	                                        post_id = parsed_request.data[i].id;
	                                        post_idx = parsed_request.data[i].id;
	                                        post_name = parsed_request.data[i].name;
	                                        post_email = parsed_request.data[i].email;
	                                        post_mobile_phone = parsed_request.data[i].mobile_phone;
	                                        post_mobile_phonex = parsed_request.data[i].mobile_phone;
	                                        post_location = parsed_request.data[i].location;
											
											/*
											 post_id = parsed_request.data[i].uid;
	                                        post_idx = parsed_request.data[i].uid;
	                                        post_name = parsed_request.data[i].name;
											
											post_email = '';
											if(parsed_request.data[i].email != null){
	                                        post_email = parsed_request.data[i].email;
											}
											post_mobile_phone= '';
											post_mobile_phonex = '';
										if(parsed_request.data[i].cell != null){
	                                        post_mobile_phone = parsed_request.data[i].cell;
	                                        post_mobile_phonex = parsed_request.data[i].cell;
										}
										
											post_location = '';
											if(parsed_request.data[i].current_location != null){
	                                        post_location = parsed_request.data[i].current_location.name;
											}
											
											
											*/
	                                    }




	                                    if (typeof post_email !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้..........ใจเย็นๆนะจ๊ะ');
	                                        $("#email_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder2")
	                                            .html()
	                                            .indexOf(post_email) == -1) {

	                                            $("#adverra_extract_email_page_holder2")
	                                                .append(post_email + '<br>');


	                                            var c_email = $("#adverra_extract_email_page_holder2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_email = c_email.length - 1;

	                                            $("#email_counts_page")
	                                                .text(c_email);
	                                            $("#email_counts_page")
	                                                .addClass("textboxs");
	                                        }

	                                    }

	                                    if (typeof post_mobile_phone !== 'undefined') {
	                                        $("#button_start")
	                                            .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้.....ใจเย็นๆนะจ๊ะ');
	                                        $("#tel_counts_page")
	                                            .show();
	                                        if ($("#adverra_extract_email_page_holder_tel2")
	                                            .html()
	                                            .indexOf(post_mobile_phone) == -1) {

	                                            $("#adverra_extract_email_page_holder_tel2")
	                                                .append(post_mobile_phone + '<br>');

	                                            var c_phone = $("#adverra_extract_email_page_holder_tel2")
	                                                .html()
	                                                .trim()
	                                                .split('<br>');
	                                            var c_phone = c_phone.length - 1;

	                                            $("#tel_counts_page")
	                                                .text(c_phone);
	                                            $("#tel_counts_page")
	                                                .addClass("textboxs");
	                                        }
	                                    }

	                                    if (typeof post_location !== 'undefined'  || post_location != null) {
	                                        post_locations = post_location.name;
	                                    } else {
	                                        post_locations = '';
	                                    }



	                                    if ((typeof post_mobile_phone !== 'undefined') || (typeof post_email !== 'undefined')) {




	                                        if (typeof post_mobile_phone === 'undefined') {
	                                            post_mobile_phone = '';
	                                        }
	                                        if (typeof post_email === 'undefined') {
	                                            post_email = '';
	                                        }
	                                        if ($("#adverra_extract_email_page_holderx")
	                                            .html()
	                                            .indexOf(post_id) == -1) {
	                                            post_id = "'" + post_id + "'";
	                                            number_row = $('#table_data tr')
	                                                .length;
	                                            post_mobile_phonex = "'" + post_mobile_phone + "'";

	                                            //	$('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+convert_thai(post_name)+'</td><td>'+post_locations+'</td><td>'+post_email+'</td><td>'+post_mobile_phone+'</td></tr>');
	                                            counts = (c_phone + c_email);
	                                            if (!isNaN(counts)) {
	                                                $('#adverra_extract_email_page_csvXXXXX')
	                                                    .val('Export To CSV' + '(' + counts + ')');
	                                            }
	                                            $("#adverra_extract_email_page_holderx")
	                                                .append('{"ID":"' + (post_id) + '","Name":"' + convert_thai(post_name) + '","Location":"' + (post_locations) + '","Email":"' + post_email + '","Phone Number":"' + post_mobile_phonex + '"},');


	                                        }
	                                    }

	                                }




                  // if(typeof parsed_request.data != 'undefined'){
		
                   //  if(typeof parsed_request.data[0] != 'undefined'){

	                              if ((typeof parsed_request.paging !== 'undefined')) {

	                                 if ((typeof parsed_request.paging.next !== 'undefined')) {
	                                        loop_grs = loop_gr + 1;
										//	adverra_extract_email_keyword_gxs = adverra_extract_email_keyword_x+100;
//parsed_request.paging.next

// var url = "  https://graph.facebook.com/fql?q=SELECT uid,current_location,name,sex,relationship_status,email,cell FROM user where uid in (SELECT uid FROM group_member  where gid ="+id+" limit "+adverra_extract_email_keyword_gxs+",100)&access_token="+token
	                                        start_adverra_extract_email_keyword_g(loop_g, data, parsed_request.paging.next, loop_gr, loop,member_count,name)

	                                    } else {
	                                        loop_gs = loop_g + 1;

	                                        start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop,member_count,name);

	                                    }
	                                } else {
	                                    loop_gs = loop_g + 1;

	                                    start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop,member_count,name)

	                                }


	                            } else { // ึงสมาชิกใหม่
	                                loop_gs = loop_g + 1;

	                                start_adverra_extract_email_keyword_g(loop_gs, data, '', 0, loop,member_count,name)

	                            }
	                        }

	                    });


	                } else {
	                    loops = loop + 1;
	                    start_adverra_extract_email_keyword2(loops);
	           


	                }
	            }
	        } else
	        if (window.work == 0) {
	            toastr.success('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            alert('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            $("#adverra_extract_email_keyword_submit2")
	                .show();
	            $("#stop")
	                .hide();
	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;
				window.member_count = member_count;


	        } else {

	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;
				window.member_count = member_count;


	        }
	    }



	    $('#adverra_extract_email_keyword_submit2')
	        .click(function () {
	            window.work = 1;
	            $("#adverra_extract_email_keyword_submit2")
	                .hide();
	            $("#stop")
	                .show();
	            start_adverra_extract_email_keyword_g(window.loop_g, window.data, window.url, window.loop_gr, window.loop,window.member_count,window.name);
	        });
	}

	//////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////ค้นหาแฟนเพจ//////////////////////////////

	function start_search_page() {
       var token = tokenx;
       var keyword = $("#adverra_keyword").val();
if(keyword != ''){
             start_search_page2(0,'');

	        function start_search_page2(loop,url) {

	         $("#start_search_page").hide();
			 $("#loading").show();
					   if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/v2.6/search?q='+keyword+'&type=page&fields=fan_count,name,category,emails&limit=50&access_token='+ token;
	                    }
					      $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
								         result = result.responseText;
	                                     parsed_request = JSON.parse(result);
	                                     if (typeof parsed_request !== 'undefined') {}
										  
										    counts_data_post = parsed_request.data.length;
										      data = parsed_request.data.sort(function (a, b) {
	                                return a.fan_count - b.fan_count;
	                            });

										
										   for(var i=0;i<counts_data_post;i++){
																				  name = data[i].name;
																				  category = data[i].category;
																				  id = data[i].id;
																				  fan_count = data[i].fan_count;
																				   if ((typeof data[i].emails !== 'undefined')) {
																				  emails =  data[i].emails;
																				   }
																				   else{
																				   emails= '';
																				   }
																				   
																				   
																				   
															if ($("#adverra_extract_holderx")
	                                            .html()
	                                            .indexOf(id) == -1) {					   
																				   
																			 number_row =  $('#table_data tr').length;	
										 $('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+id+'</td><td>'+convert_thai(name)+'</td><td>'+fan_count+'</td><td>'+category+'</td><td>'+emails+'</td></tr>');
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
													id = "'"+id+"'";
	                                            $("#adverra_extract_holderx").append('{"ID":"' + (id) + '","Name":"' + convert_thai(name)+ '","Like Page":"' + (fan_count) + '","Category":"' + category + '","Email Page":"' + emails + '"},');
										   
										   
										   
										   }
										   
										   }
										   
										   
										    if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
										          start_search_page2(loop,parsed_request.paging.next );
									
									       }
									else{
										alert('ค้นหาแฟนเพจเรียบร้อยแล้ว');
										 toastr.success('ค้นหาแฟนเพจเรียบร้อยแล้ว');
										$("#start_search_page").show();
			                            $("#loading").hide();
									}
								
								}
								else{
									alert('ค้นหาแฟนเพจเรียบร้อยแล้ว');
										 toastr.success('ค้นหาแฟนเพจเรียบร้อยแล้ว');
										 $("#start_search_page").show();
			                            $("#loading").hide();
									
								}

	                    
										 
										 
							}
	});

					
					
					
			 
			 
			 

			}
}
else{
	

	toastr.error('กรุณกรอก keyword ที่ต้องการค้นหาก่อนค่ะ');
	
}

	}

////////////////////////////////////////////////////////////////////////////////////////////











//////////////////////////////////////////////////////////////ค้นหากลุ่ม////////////////////////////

	function start_search_groups() {
       var token = tokenx;
       var keyword = $("#adverra_keyword").val();
if(keyword != ''){
             start_search_page2(0,'');

	        function start_search_page2(loop,url) {

	         $("#start_search_groups").hide();
			 $("#loading").show();
					   if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/v2.6/search?q='+keyword+'&type=group&fields=name,privacy,members.limit(0).summary(true)&limit=50&access_token='+ token;
	                    }
					      $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
								         result = result.responseText;
	                                     parsed_request = JSON.parse(result);
	                                     if (typeof parsed_request !== 'undefined') {}
										  
										    counts_data_post = parsed_request.data.length;
										      data = parsed_request.data.sort(function (a, b) {
	                                return a.fan_count - b.fan_count;
	                            });

										
										   for(var i=0;i<counts_data_post;i++){
																				  name = data[i].name;
																				  privacy = data[i].privacy;
																				  id = data[i].id;
																				  member = data[i].members.summary.total_count;
																				
																				   
																				   
															if ($("#adverra_extract_holderx")
	                                            .html()
	                                            .indexOf(id) == -1) {					   
																				   
																			 number_row =  $('#table_data tr').length;	
										 $('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+id+'</td><td>'+convert_thai(name)+'</td><td>'+member+'</td><td>'+privacy+'</td></tr>');
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
													id = "'"+id+"'";
	                                            $("#adverra_extract_holderx").append('{"ID":"' + (id) + '","Name":"' + convert_thai(name)+ '","Members":"' + (member) + '","Privacy":"' + privacy + '"},');
										   
										   
										   
										   }
										   
										   }
										   
										   
										    if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
										          start_search_page2(loop,parsed_request.paging.next );
									
									       }
									else{
										alert('ค้นหากลุ่มเรียบร้อยแล้ว');
										 toastr.success('ค้นหากลุ่มเรียบร้อยแล้ว');
										$("#start_search_groups").show();
			                            $("#loading").hide();
									}
								
								}
								else{
									alert('ค้นหากลุ่มเรียบร้อยแล้ว');
										 toastr.success('ค้นหากลุ่มเรียบร้อยแล้ว');
										 $("#start_search_groups").show();
			                            $("#loading").hide();
									
								}

	                    
										 
										 
							}
	});

					
					
					
			 
			 
			 

			}
}
else{
	

	toastr.error('กรุณกรอก keyword ที่ต้องการค้นหาก่อนค่ะ');
	
}

	}

////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////ค้นหาโพส////////////////////////////

	function start_search_post() {
       var token = tokenx;
       var keyword = $("#adverra_keyword").val();
if(keyword != ''){
             start_search_page2(0,'');

	        function start_search_page2(loop,url) {

	         $("#start_search_post").hide();
			 $("#loading").show();
					   if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/search?q='+keyword+'&type=post&fields=type,likes,message,shares,comments.limit(0).summary(true),from,created_time,updated_time&limit=20&access_token='+ token;
	                    }
					      $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (resultx) {
								         resultx = resultx.responseText;
	                                     parsed_request = JSON.parse(resultx);
	                                     if (typeof parsed_request !== 'undefined') {
										  
										    counts_data_post = parsed_request.data.length;
								

										
										   for(var i=0;i<counts_data_post;i++){
											   
											   id = parsed_request.data[i];
											   result = parsed_request.data[i];
											   
											if ($("#adverra_extract_holderx")
	                                            .html()
	                                            .indexOf(id) == -1) {		
											
											   
											   
var likes_count  = 0;	
           var comments_count  = 0;	

if(typeof    result.likes != 'undefined'){
	var likes_count = result.likes.count;
}
shares_count = 0;
if(typeof    result.shares != 'undefined'){
	var shares_count = result.shares.count;
}
if(typeof    result.comments != 'undefined'){
	var comments_count = result.comments.summary.total_count;
}

from_id = result.id.split('_');
var from_id = from_id[0];
var from_name = '';
if(typeof    result.from != 'undefined'){
var from_id = result.from.id;
var from_name = result.from.name;
}

	created_time =  parseDateString(result.created_time).toLocaleString();
	updated_time =  parseDateString(result.updated_time).toLocaleString();
			url = 'https://www.fb.com/'+result.id;
			
			
			
												 number_row =  $('#table_data tr').length;	
										 $('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+result.id+'</td><td>'+convert_thai(result.message)+'</td><td>'+likes_count+'</td><td>'+created_time+'</td></tr>');
										 
										   
	$("#adverra_extract_holderx").append('{"ID Post":"'+(result.id)+'","ID User":"'+"'"+(from_id)+"'"+'","Name-Lastname":"'+convert_thai(from_name)+'","message":"'+convert_thai(result.message)+'","Type":"'+result.type+'","Like Counts":"'+likes_count+'","Shared Counts":"'+shares_count+'","Comments Counts":"'+comments_count+'","Created Time":"'+created_time+'","Update Time":"'+updated_time+'","URL Post":"'+url+'"},');
}
										 
									
										 
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
													id = "'"+id+"'";
			
			
			
			
			
			
														   
														
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
			
			
	  											 
																				 
										   }
								
										   
										   
											   
											   
											   }
										   
										   
										    if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
										          start_search_page2(loop,parsed_request.paging.next );
									
									       }
									else{
										alert('ค้นหาโพสเรียบร้อยแล้ว');
										 toastr.success('ค้นหาโพสเรียบร้อยแล้ว');
										$("#start_search_post").show();
			                            $("#loading").hide();
									}
								
								}
								else{
									alert('ค้นหาโพสเรียบร้อยแล้ว');
										 toastr.success('ค้นหาโพสเรียบร้อยแล้ว');
										 $("#start_search_post").show();
			                            $("#loading").hide();
									
								}

	                    
										 }
										 
							
	});

					
					
					
			 
			 
			 

			}
}
else{
	

	toastr.error('กรุณกรอก keyword ที่ต้องการค้นหาก่อนค่ะ');
	
}

	}









//////////////////////////////////////////////////////////////ค้นหาevent////////////////////////////

	function start_search_event() {
       var token = tokenx;
       var keyword = $("#adverra_keyword").val();
if(keyword != ''){
             start_search_page2(0,'');

	        function start_search_page2(loop,url) {

	         $("#start_search_post").hide();
			 $("#loading").show();
					   if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/search?q='+keyword+'&type=event&fields=type,likes,message,shares,comments.limit(0).summary(true),from,created_time,updated_time&limit=20&access_token='+ token;
	                    }
					      $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (resultx) {
								         resultx = resultx.responseText;
	                                     parsed_request = JSON.parse(resultx);
	                                     if (typeof parsed_request !== 'undefined') {
										  
										    counts_data_post = parsed_request.data.length;
								

										
										   for(var i=0;i<counts_data_post;i++){
											   
											   id = parsed_request.data[i];
											   result = parsed_request.data[i];
											   
											if ($("#adverra_extract_holderx")
	                                            .html()
	                                            .indexOf(id) == -1) {		
											
											   
											   
var likes_count  = 0;	
           var comments_count  = 0;	

if(typeof    result.likes != 'undefined'){
	var likes_count = result.likes.count;
}
shares_count = 0;
if(typeof    result.shares != 'undefined'){
	var shares_count = result.shares.count;
}
if(typeof    result.comments != 'undefined'){
	var comments_count = result.comments.summary.total_count;
}

from_id = result.id.split('_');
var from_id = from_id[0];
var from_name = '';
if(typeof    result.from != 'undefined'){
var from_id = result.from.id;
var from_name = result.from.name;
}

	created_time =  parseDateString(result.created_time).toLocaleString();
	updated_time =  parseDateString(result.updated_time).toLocaleString();
			url = 'https://www.fb.com/'+result.id;
			
			
			
												 number_row =  $('#table_data tr').length;	
										 $('#table_data tr:first').after('<tr><td>'+number_row+'</td><td>'+result.id+'</td><td>'+convert_thai(result.message)+'</td><td>'+likes_count+'</td><td>'+created_time+'</td></tr>');
										 
										   
	$("#adverra_extract_holderx").append('{"ID Post":"'+(result.id)+'","ID User":"'+"'"+(from_id)+"'"+'","Name-Lastname":"'+convert_thai(from_name)+'","message":"'+convert_thai(result.message)+'","Type":"'+result.type+'","Like Counts":"'+likes_count+'","Shared Counts":"'+shares_count+'","Comments Counts":"'+comments_count+'","Created Time":"'+created_time+'","Update Time":"'+updated_time+'","URL Post":"'+url+'"},');
}
										 
									
										 
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
													id = "'"+id+"'";
			
			
			
			
			
			
														   
														
										   
										    if (!isNaN(number_row)) {
												  $('#file_csv').show();
	                                                $('#file_csv')
	                                                    .val('Export To CSV' + '(' + number_row + ')');
	                                            }
			
			
	  											 
																				 
										   }
								
										   
										   
											   
											   
											   }
										   
										   
										    if ((typeof parsed_request.paging !== 'undefined')) {

	                                    if ((typeof parsed_request.paging.next !== 'undefined')) {
										          start_search_page2(loop,parsed_request.paging.next );
									
									       }
									else{
										alert('ค้นหาโพสเรียบร้อยแล้ว');
										 toastr.success('ค้นหาโพสเรียบร้อยแล้ว');
										$("#start_search_post").show();
			                            $("#loading").hide();
									}
								
								}
								else{
									alert('ค้นหาโพสเรียบร้อยแล้ว');
										 toastr.success('ค้นหาโพสเรียบร้อยแล้ว');
										 $("#start_search_post").show();
			                            $("#loading").hide();
									
								}

	                    
										 }
										 
							
	});

					
					
					
			 
			 
			 

			}
}
else{
	

	toastr.error('กรุณกรอก keyword ที่ต้องการค้นหาก่อนค่ะ');
	
}

	}





















	///////////////////////////////////////////////////// ส่งข้อความคน comment to inbox ///////////////////////////

	function start_comment_to_inbox() {
	    window.online = 1;

	    function check_internet() {
	        if (!navigator.onLine) {
	            window.online = 0;
	            window.work = 3; // ตัดระบบไม่ให้ทำงานต่อ
	            toastr.error('เนื่องจาก Internet ของท่าน ขาดการเชื่อมต่อ ให้เชื่อมต่อ Internet ใหม่อีกครั้ง');
	        } else {
	            if (window.online == 0) { // เมื่อเน็ตกลับมาออนไลน์
	                window.online = 1;
	                window.work = 1;

	                $("#adverra_extract_email_keyword_submit2")
	                    .hide();
	                $("#stop")
	                    .show();
	                toastr.success('ระบบกลับมาเชื่อมต่ออีกครั้ง และทำงานต่อ');
	                setTimeout(function () {
	                    if (window.work == 1) {
	                       // start_adverra_extract_email_keyword_g_email_page(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	                    }
	                }, 5000);


	            }

	        }
	    }
	    setInterval(check_internet, 3000);

	    window.work = 1;
	    var number_x = 0;
	    var token = tokenx;
		var my_page = $('#My_page').val();
	    var adverra_message = spin($("#adverra_message").val().trim());
       if(my_page != ''){
	    if (adverra_message != '') {
	        toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
	        var number_x = 0;
	        var token = tokenx;
	       var my_page = $('#My_page').val();
	    var adverra_message = spin($("#adverra_message").val().trim());
	        var numbers = 0;

	        start_send(0, '');

	        function start_send(loop, url) {
				
				
	                if (url == '') {
						token = token_fanpage(token,my_page);
	                    var url = 'https://graph.facebook.com/me/feed?fields=id,comments.limit(0).summary(true)&limit=50&access_token=' + token;
	                } else {
	                    var url = url;

	                }

	                $.ajax({
	                    url: url
	                    , type: 'GET'
	                    , contentType: 'application/json'
	                    , dataType: 'text'
	                    , complete: function (result) {
	                        result = result.responseText;
	                        parsed_request = JSON.parse(result);

	                        if (typeof parsed_request.data !== 'undefined') {
	                            $("#button_start")
	                                .text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้....');
	                            var counts_data = parsed_request.data.length;
	                           /* data = parsed_request.data.sort(function (a, b) {
	                                return a.comments.summary.total_count - b.comments.summary.total_count;
	                            });
*/
                                data = parsed_request.data;
	                            for (var i = 0; i < counts_data; i++) {
	                                id = data[i].id;
									/*
	                                counts1 = data[i].comments.summary.total_count;
	                                if (counts1 > 0) {
	                                    $("#id_remember")
	                                        .prepend(id + '<br>');
	                                }
									*/
                                   $("#id_remember").prepend(id + '<br>');
	                            }

	                            /////////////////////////////////////////////////////////////////////////////////
	                            if ((typeof parsed_request.paging !== 'undefined')) {

	                                if ((typeof parsed_request.paging.next !== 'undefined')) {
	                                    id_remember = $("#id_remember")
	                                        .html()
	                                        .trim()
	                                        .split('<br>');
	                                    count_id_remember = id_remember.length;

	                                    $("#keyword_show")
	                                        .text('กำลังรวบรวมโพสจากเพจ'+ '(' + count_id_remember + ')');

	                                    $("#adverra_extract_email_page_submit")
	                                        .hide();
	                                    $("#stop")
	                                        .show();
	                                    start_send(loop, parsed_request.paging.next);

	                                } else {
	                                    id_remember = $("#id_remember")
	                                        .html()
	                                        .trim()
	                                        .split('<br>');
	                                    count_id_remember = id_remember.length;
	                              
	                                    $("#adverra_send_to_inbox_submit")
	                                        .hide();
	                                    $("#stop").show();
	                             
	                                    var url = '';
	                                 start_send2(0, id_remember, url, 0, loop); 

	                                }
	                            } else {
	                                id_remember = $("#id_remember")
	                                    .html()
	                                    .trim()
	                                    .split('<br>');
	                                count_id_remember = id_remember.length;
	                                toastr.info('เรื่มดึงคนจากคอมเม้นโพสจากเพจ');
	                                $("#adverra_send_to_inbox_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();
	                              

	                                $("#adverra_send_to_inbox_submit")
	                                    .hide();
	                                $("#stop")
	                                    .show();

	                                var url = '';
	                              start_send2(0, id_remember, url, 0, loop); // เริ่มต้นหาตามกลุ่ม

	                            }
	                      

	                        } else { // ถึงดึง Keyword ไม่ได้ ให้ข้ามไปดึง Keyword อื่น
	                            //loops = loop + 1;
	                           // start_send(loops);
							   
	                toastr.success('ส่งข้อความคอมเม้นเข้าใน inbox เรียบร้อยแล้ว');
	                alert('ส่งข้อความคอมเม้นเข้าใน inbox เรียบร้อยแล้ว');
	                $("#adverra_send_to_inbox_submit")
	                    .show();
	                $("#stop")
	                    .hide();



	            

	                        }


	                    }

	                });

				
				
				
				}
	    } else {
	        toastr.error('ใส่ข้อความที่ต้องการส่งก่อนค่ะ');
	    }
	   }
 else {
	        toastr.error('กรุณาเลือกแฟนเพจก่อนครับ');
	    }
	    function start_send2(loop_g, data, url, loop_gr, loop) { /// หาตามกลุ่ม

	        window.loop_g = loop_g;
	        window.data = data;
	        window.url = url;
	        window.loop_gr = loop_gr;
	        window.loop = loop;
	        if (window.work == 1) {

	            $('#adverra_send_to_inbox_submit')
	                .hide();
	            $('#adverra_extract_email_page_csvXXXXX')
	                .show();
	            if (typeof data !== 'undefined') {
	                var counts_data_g = data.length;
	                if (loop_g < counts_data_g) {

	                    loop_gXX = loop_g + 1;
	                    var w = Math.ceil((loop_gXX / counts_data_g) * 100);
	                    $(".progress-bar")
	                        .css("width", w + '%');
	                    $(".progress-value")
	                        .text(w + '%(' + loop_gXX + '/' + counts_data_g + ')');

	                    $("#count_work")
	                        .show();

	                    id = data[loop_g];

	                    var token = tokenx;
	                    if (url != '') {
	                        url = url;
	                    } else {
	                        var url = 'https://graph.facebook.com/v2.3/' + id + '/comments?fields=is_private,id,from&limit=300&&access_token=' + token;
	                    }
	                    $.ajax({
	                        url: url
	                        , type: 'GET'
	                        , contentType: 'application/json'
	                        , dataType: 'text'
	                        , complete: function (result) {
	                            result = result.responseText;
	                            parsed_request = JSON.parse(result);
	                            if (typeof parsed_request.data !== 'undefined') {
									alert('tgkg');									
									} else { // ึงสมาชิกใหม่
	                                loop_gs = loop_g + 1;

	                                start_send2(loop_gs, data, '', 0, loop)

	                            }
	                        }

	                    });


	                } else {
	                    $("#id_remember")
	                        .html('');
	                    loops = loop + 1;
	                    toastr.info('ดึงคนจากคอมเม้นโพสจากเพจ:' + keyword[loop] + ' แล้ว');
	                    start_adverra_extract_email_keyword2_email_page(loops, '');



	                }
	            }
	        } else
	        if (window.work == 0) {
	            toastr.success('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            alert('ระบบหยุดทำงานชั่วคราว ถ้าคุณจะให้ทำงานต่ออีกครั้งให้กดปุ่ม ทำต่อไป');
	            $("#adverra_extract_email_keyword_submit2")
	                .show();
	            $("#stop")
	                .hide();
	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        } else {

	            window.loop_g = loop_g;
	            window.data = data;
	            window.url = url;
	            window.loop_gr = loop_gr;
	            window.loop = loop;


	        }
	    }



	    $('#adverra_extract_email_keyword_submit2')
	        .click(function () {
	            window.work = 1;
	            $("#adverra_extract_email_keyword_submit2")
	                .hide();
	            $("#stop")
	                .show();
	            start_adverra_extract_email_keyword_g_email_page(window.loop_g, window.data, window.url, window.loop_gr, window.loop);
	        });
	}

	//////////////////////////////////////////////////////////////////////////////////////////////












	///////////////////////////////////////////////////// extract Email ///////////////////////////
	/*
	function start_adverra_extract_email_page(){
		
		
		 var number_x = 0;
		var token = tokenx;
		var id_page = $("#adverra_extract_email_pageid").val().trim().split(/\r\n|\r|\n/);
		var count_loob = id_page.length;
		if(id_page[0]!= ''){
			 toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
			
		 toastr.info('รอสักครู่กำลังเริ่มต้นแสกน');
		 var number_x = 0;
		var token = tokenx;
		var id_page = $("#adverra_extract_email_pageid").val().trim().split(/\r\n|\r|\n/);
		var count_loob = id_page.length;
		var numbers = 0;
		start_adverra_extract_email_page2(0);
		function start_adverra_extract_email_page2(loop){
	        var page_name =  '';
			$.get( 'https://graph.facebook.com/'+id_page[loop]+'/?fields=name&access_token='+token, function( data ) {
	              page_name =  data.name; 
	  });
			var url = 'https://graph.facebook.com/'+id_page[loop]+'/feed?fields=id&limit=1000&access_token='+token;
			if(loop<count_loob){
			start_adverra_extract_email_page3(url);
			}
			else{
				$('#adverra_extract_email_page_submit').hide();
				 var c_email = $("#adverra_extract_email_page_holder2").html().trim().split('<br>');
				 var c_phone = $("#adverra_extract_email_page_holder_tel2").html().trim().split('<br>');
				var c_email= c_email.length-1;
				var c_phone= c_phone.length-1;
				$("#button_start").text('เรียบร้อยจ้า คุณสามารถนำอีเมลหรือเบอร์โทรไปทำ Facebook Custom Audience ได้เลยจ้า');
				 alert('ดึงข้อมูลครบแล้ว ได้ทั้งหมด '+c_email+' Email'+' '+c_phone+' เบอร์โทร'); 
				  toastr.success('ดึงข้อมูลครบแล้ว ได้ทั้งหมด '+c_email+' Email'+' '+c_phone+' เบอร์โทร');
			}
			
			    function start_adverra_extract_email_page3(url,numbers){
					$("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้....ใจเย็นๆนะจ๊ะ');
					
					if((typeof  numbers == 'undefined')|| numbers == 0){
						
						numbers = 0;
					}
			
					$.ajax({
	                   url: url,
	                   type: 'GET',
	                   contentType:'application/json', 
	                   dataType: 'text',              
	                   complete: function(result) {  
					   result = result.responseText;
			           parsed_request = JSON.parse(result);
					  if(typeof  parsed_request.data !== 'undefined'){
					 $("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้....');
					 
	                   var counts_data = parsed_request.data.length;
					 toastr.info('ดึงรายการโพสต่างๆ รอบที่ '+(numbers+1));
					 
			
					 
					         for(var i=0;i<counts_data;i++){
								
			                       id = parsed_request.data[i].id;
	                              $("#adverra_extract_email_page_holder").append(id+'<br>');
					         }
							 
							 var id_post = $("#adverra_extract_email_page_holder").html().trim().split('<br>');
							
							 var count_loob_post= id_post.length-1;
			
							        start_adverra_extract_email_page_post(numbers);
							
										function start_adverra_extract_email_page_post(loop_post){
											if(loop_post%2==0){
										toastr.info('ดึง Email คนคอมเม้นและแชร์โพส่จำนวน '+(loop_post+1)+' ของ '+page_name+ ' ');
										}
										 
											if((loop_post%1)==0){
											// toastr.info('แสกนคนคอมเม้นและแชร์โพส ของโพสที่ '+(loop_post+1)+' ของ '+page_name+ ' ');
											}
										//	id_postsx = id_post[loop_post].split('_');
											//id_posts = id_postsx[1];
										
											var url_post = 'https://graph.facebook.com/'+id_post[loop_post]+'/comments?fields=from{email,mobile_phone,name,id}&limit=1000&access_token='+token;
											
											if(id_post[loop_post]!=''){
											 start_adverra_extract_email_page_post_comments(url_post);
											
											}
											else{
												loops = loop+1;
												start_adverra_extract_email_page2(loops);
												
											}
											
												function start_adverra_extract_email_page_post_comments(url_post){
													
													 $("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้..ใจเย็นๆนะจ๊ะ');
														// toastr.info('กำลังดึง Email ของโพสที่ '+(loop_post+1)+' ของ '+page_name+ ' ');
											 $.ajax({
											   url: url_post,
											   type: 'GET',
											   contentType:'application/json', 
											   dataType: 'text',              
															   complete: function(result_comments) {
																   result_comments = result_comments.responseText;
																	 parsed_request_post = JSON.parse(result_comments);
																
																	 	 if(typeof  parsed_request_post.data !== 'undefined'){
																	 counts_data_post = parsed_request_post.data.length;
																	 var counts_data_postsx = 0;
																	counts_data_postsx = counts_data_postsx+counts_data_post;
																				 for(var i=0;i<counts_data_post;i++){
																					   if(typeof  parsed_request_post.data[i].from !== 'undefined'){
																				  post_id = parsed_request_post.data[i].from.id;
																				  post_idx = parsed_request_post.data[i].from.id;
																				  post_name = parsed_request_post.data[i].from.name;
																				  post_email = parsed_request_post.data[i].from.email;
																				  post_mobile_phone = parsed_request_post.data[i].from.mobile_phone;
																				  post_mobile_phonex = parsed_request_post.data[i].from.mobile_phone;
																					   }
																				  $('#adverra_extract_email_page_submit').hide();
																                  $('#adverra_extract_email_page_csvXXXXX').show();
																					 if(typeof  post_email !== 'undefined'){
																						 	  $("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้...ใจเย็นๆนะจ๊ะ');
																						  $("#email_counts_page").show();
																						 if($("#adverra_extract_email_page_holder2").html().indexOf(post_email)==-1){
																						
																						 $("#adverra_extract_email_page_holder2").append(post_email+'<br>');
																						 
																						
																						 var c_email = $("#adverra_extract_email_page_holder2").html().trim().split('<br>');
							                                                             var c_email= c_email.length-1;
																						
																						  $("#email_counts_page").text(c_email);
																						 $("#email_counts_page").addClass("textboxs");
																						 }
																						
																					  }
																					  
																					if(typeof  post_mobile_phone !== 'undefined'){
																						 $("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้..ใจเย็นๆนะจ๊ะ');
																							   $("#tel_counts_page").show();
																						 if($("#adverra_extract_email_page_holder_tel2").html().indexOf(post_mobile_phone)==-1){
																						
																						 $("#adverra_extract_email_page_holder_tel2").append(post_mobile_phone+'<br>');
																						 
																						  var c_phone = $("#adverra_extract_email_page_holder_tel2").html().trim().split('<br>');
							                                                             var c_phone= c_phone.length-1;
																						
																						  $("#tel_counts_page").text(c_phone);
																						 $("#tel_counts_page").addClass("textboxs");
																						 }
																					  }
																					  
																					 
																							   if((typeof  post_mobile_phone !== 'undefined') || (typeof  post_email !== 'undefined')){
																							   
																							  if($("#adverra_extract_email_page_holderx").html().indexOf(post_id)==-1){
																							   
																		
																		
																							   post_id = "'"+post_id+"'";
																							  number_row =  $('#table_data tr').length;
																							$('#table_data tr:last').after('<tr><td>'+number_row+'</td><td><img class="img-circle" src="https://graph.facebook.com/'+post_idx+'/picture?type=normal" width="50" height="50" /></td><td>'+convert_thai(post_name)+'</td><td>'+post_email+'</td><td>'+post_mobile_phonex+'</td></tr>');
																						 $("#adverra_extract_email_page_holderx").append('{"ID":"'+(post_id)+'","Name":"'+convert_thai(post_name)+'","Email":"'+post_email+'","Phone Number":"'+post_mobile_phone+'"},');
																					              }
																						 }
																					  
																					  
																				   }
																				   if(typeof  parsed_request_post.paging !== 'undefined'){
																					if((typeof  parsed_request_post.paging.next !== 'undefined') ){
																					// toastr.info('ดึง Email จาก คอมเม้น ของโพสที่ '+(loop_post));
																						  start_adverra_extract_email_page_post_comments(parsed_request_post.paging.next);
																					}
																				  else{ ////คอมเมเม้นดึงหมดแล้ว
																				  var url_post_shared = 'https://graph.facebook.com/'+id_post[loop_post]+'/sharedposts?fields=from{email,mobile_phone,name,id}&limit=1000&access_token='+token;
																	            start_adverra_extract_email_page_post_shared(url_post_shared);
																			
																	  } 
																
															   }
															   else{
																   var url_post_shared = 'https://graph.facebook.com/'+id_post[loop_post]+'/sharedposts?fields=from{email,mobile_phone,name,id}&limit=1000&access_token='+token;
																 start_adverra_extract_email_page_post_shared(url_post_shared);
																 
																   
															   }
															   }
															   else{
																    var url_post_shared = 'https://graph.facebook.com/'+id_post[loop_post]+'/sharedposts?fields=from{email,mobile_phone,name,id}&limit=1000&access_token='+token;
																   start_adverra_extract_email_page_post_shared(url_post_shared);
																
																   
															   }
															   }
												   });
														
															
															}
															
															
															
															
	///////////////////////////////////////////////////////////////////		
		function start_adverra_extract_email_page_post_shared(url_post_shared){
		
		$("#button_start").text('ระบบกำลังทำงานอยู่ คุณสามารถย่อลงหรือเปิดแท็บอื่นได้ แต่อย่าปิดแท็บนี้ หากต้องการหยุดทำงานให้ปิดแท็บนี้...ใจเย็นๆนะจ๊ะ');
															
											 $.ajax({
											   url: url_post_shared,
											   type: 'GET',
											   contentType:'application/json', 
											   dataType: 'text',              
															   complete: function(result_shared) {
																     result_shared = result_shared.responseText;
																	 parsed_request_post_shared = JSON.parse(result_shared);
																	  if(typeof  parsed_request_post_shared.data !== 'undefined'){
																	 counts_data_post_shared = parsed_request_post_shared.data.length;
																	 var counts_data_postsx = 0;
																	counts_data_postsx = counts_data_postsx+counts_data_post;
																				 for(var i=0;i<counts_data_post_shared;i++){
																					   if(typeof parsed_request_post_shared.data[i].from !== 'undefined'){
																				  post_id = parsed_request_post_shared.data[i].from.id;
																				  post_idx = parsed_request_post_shared.data[i].from.id;
																				  post_name = parsed_request_post_shared.data[i].from.name;
																				  post_email = parsed_request_post_shared.data[i].from.email;
																				  post_mobile_phone = parsed_request_post_shared.data[i].from.mobile_phone;
																				  post_mobile_phonex = parsed_request_post_shared.data[i].from.mobile_phone;
																						}
																					 if(typeof  post_email !== 'undefined'){
																						 if($("#adverra_extract_email_page_holder2").html().indexOf(post_email)==-1){
																						 $("#adverra_extract_email_page_holder2").append(post_email+'<br>');
																						 var c_email = $("#adverra_extract_email_page_holder2").html().trim().split('<br>');
							                                                             var c_email= c_email.length;
																						  $("#email_counts_page").text(c_email);
																						 $("#email_counts_page").addClass("textboxs");
																						 }
																						
																					  }
																					  
																					if(typeof  post_mobile_phone !== 'undefined'){
																						 if($("#adverra_extract_email_page_holder_tel2").html().indexOf(post_mobile_phone)==-1){
																						 $("#adverra_extract_email_page_holder_tel2").append(post_mobile_phone+'<br>');
																						  var c_phone = $("#adverra_extract_email_page_holder_tel2").html().trim().split('<br>');
							                                                             var c_phone= c_phone.length;
																						  $("#tel_counts_page").text(c_phone);
																						 $("#tel_counts_page").addClass("textboxs");
																						 }
																					  }
																					  
																					  	   if((typeof  post_mobile_phone !== 'undefined') || (typeof  post_email !== 'undefined')){
																							   
																							  if($("#adverra_extract_email_page_holderx").html().indexOf(post_id)==-1){
																							   
																							 if(typeof  post_mobile_phone == 'undefined'){
																								 post_mobile_phone = '';
																							 }
																							 
																							 	 if(typeof  post_mobile_phonex == 'undefined'){
																								 post_mobile_phonex = '';
																							 }
																							 
																							if(typeof  post_email == 'undefined'){
																								post_email = '';
																							}
																							
																							
																							post_mobile_phone = "'"+post_mobile_phone+"'";
																							   post_id = "'"+post_id+"'";
																							 number_row =  $('#table_data tr').length;
																							$('#table_data tr:last').after('<tr><td>'+number_row+'</td><td><img class="img-circle" src="https://graph.facebook.com/'+post_idx+'/picture?type=normal" width="50" height="50" /></td><td>'+convert_thai(post_name)+'</td><td>'+post_email+'</td><td>'+post_mobile_phonex+'</td></tr>');
																						 $("#adverra_extract_email_page_holderx").append('{"ID":"'+(post_id)+'","Name":"'+convert_thai(post_name)+'","Email":"'+post_email+'","Phone Number":"'+post_mobile_phone+'"},');
																					              }
																						 }
																					  
																					  
																				   }
																				   if(typeof  parsed_request_post_shared.paging !== 'undefined'){
																					if((typeof  parsed_request_post_shared.paging.next !== 'undefined') ){
																						// toastr.info('ดึง Email จาก แชร์ ของโพสที่ '+loop_post);
																						  start_adverra_extract_email_page_post_shared(parsed_request_post_shared.paging.next);
																					}
																				  else{ ////แชร์หมดแล้ว
																			
																			
																				//toastr.info('ดึง Email แชร์ของโพสที่ '+(loop_post+1)+' ของ '+page_name+ ' ');
																				  var loop_posts_shared = loop_post+1;
																				
																						  if(loop_posts_shared<count_loob_post){ // ถ้าโพสยังมีอยู่ 
																						
																									//toastr.info('เริ่มดึงจากโพสที่ '+loop_posts_shared+' ของ '+page_name);
																								 start_adverra_extract_email_page_post(loop_posts_shared);
																						   }
																						   else{
																							  
																							   if(typeof  parsed_request_post_shared.paging.next !== 'undefined'){
																									//toastr.info('กำลังโหลดรายการโพส'+' ของ '+page_name);
																								 //  $("#adverra_extract_email_page_holder").html('');     
																								   start_adverra_extract_email_page3(parsed_request.paging.next,count_loob_post);
																							   }
																							   else{
																								   var  loops = loop+1;
																								   if(loops<count_loob){
																									 
																										toastr.info('กำลังโหลดข้อมูล'+' ของ '+page_name);
																									   start_adverra_extract_email_page2(loops);
																									   
																								   }
																								   else{
																									   
																									
																									   
																								   }
																								   
																								   
																							   }
								
																				}
																		   
																	  } 
																
															   }
															   else{
																 //แชร์หมดแล้ว
																				  var loop_posts_shared = loop_post+1;  	
																				 // toastr.info('ดึง Email แชร์ของโพสที่ '+loop_posts_shared+' ของ '+page_name+ 'เรียบร้อย');
																				 
																						  if(loop_posts_shared<count_loob_post){ // ถ้าโพสยังมีอยู่ 
																							 
																									//toastr.info('เริ่มดึงจากโพสที่ '+loop_posts_shared+' ของ '+page_name);
																								 start_adverra_extract_email_page_post(loop_posts_shared);
																						   }
																						   else{///ถ้าไม่มีโพสแล้ืว
																						
																							 
																							   if(typeof  parsed_request.paging.next !== 'undefined'){
																								//	toastr.info('กำลังโหลดรายการโพส'+' ของ '+page_name);
																								 
																								   start_adverra_extract_email_page3(parsed_request.paging.next,count_loob_post);
																							   }
																							   else{
																								   	
																								   if(loop<count_loob){
																									 var  loops = loop+1;
																										toastr.info('กำลังโหลดข้อมูล'+' ของ '+page_name);
																									   start_adverra_extract_email_page2(loops);
																									   
																								   }
																								
																								   
																								   
																							   }
								
																				}
																		   
																	     
																   
																   
																   
															   }
															   }else{
																   
																   start_adverra_extract_email_page2(loop+1);  
																   
																   
															   }
															   }
															   
												   });
														
															
															}
															
										  
	//////////////////////////////////////////////////////////////////								
									
										}
					
					   }
					   else{
						   start_adverra_extract_email_page2(loop+1);
						   
						   
					   }
				   }
					
						   
						   
						   });
					   
				        }
		            }       
				
		}
		else{
			 toastr.error('กรุณากรอก ID แฟนเพจ กลุ่ม หรือโปรไฟล์ก่อนค่ะ');
			
		}
		
		
		}
		    
			
		
	*/


	//////////////////////////////////////////////////////////////////////////////////////////////

	function convert_thai(from_name) {

	    if (typeof from_name == 'undefined') {
	        var from_name = '';

	    } else {
	        var from_name = from_name.replace(/[^a-zA-Z0-9ก-๙]/g, '-');
	        var from_name = from_name.replace(/\\/g, "");
	        var from_name = from_name.replace(/"/g, "");
	        var from_name = from_name.replace(/'/g, "");
	        var from_name = from_name.replace(/,/g, "");
	        var from_name = from_name.replace('/r', '/');
	        var from_name = from_name.replace(/&/g, "");
	        var from_name = from_name.replace(/{/g, "");
	        var from_name = from_name.replace(/}/g, "");
	        var from_name = from_name.replace(/\[/g, "");
	        var from_name = from_name.replace(/\]/g, "");
	        var from_name = from_name.replace(/@/g, "");
	        var from_name = from_name.replace(/\:/g, "");
	        var from_name = from_name.replace(/\-/g, " ");
	        var from_name = from_name.replace(/\?/g, "");
	        var from_name = from_name.replace(/\+/g, " ");
	        var from_name = from_name.replace(/\//g, " ");
	        var from_name = from_name.replace(/<(?:.|\n)*?>/gm, '');
	        var from_name = utf16to8(from_name);

	    }
	    return removecharector(from_name);
	}



	function utf16to8(str) {

	    str = str.replace(/'/g, '')
	        .replace(/['"]+/g, '')
	        .replace(/^"(.*)"$/, '$1')
	        .replace(/,/g, "")
	        .replace(/\"/g, "")
	        .replace(/&quot;/g, '')
	        .replace(/\\\//g, "")
	        .replace(/\\/g, '');

	    strx = str.replace('<<', '')
	        .replace('>>', '')
	        .replace('/>', '')
	        .replace('/<', '')
	        .replace("\"", "");
	    return addslashes(strx);
	}

	function addslashes(string) {
	    return string.replace(/\\/g, '\\\\')
	        .
	    replace(/\u0008/g, '\\b')
	        .
	    replace(/\t/g, '\\t')
	        .
	    replace(/\n/g, '\\n')
	        .
	    replace(/\f/g, '\\f')
	        .
	    replace(/\r/g, '\\r')
	        .
	    replace(/'/g, '\\\'')
	        .
	    replace(/"/g, '\\"');
	}

	function removecharector(str) {
	    return str
	        .replace(/[\\]/g, '\\\\')
	        .replace(/[\"]/g, '\\\"')
	        .replace(/[\/]/g, '\\/')
	        .replace(/[\b]/g, '\\b')
	        .replace(/[\f]/g, '\\f')
	        .replace(/[\n]/g, '\\n')
	        .replace(/[\r]/g, '\\r')
	        .replace(/[\t]/g, '\\t');
	}


	function start_vip(fung) {
	    chrome["storage"]["local"].get("information", function (aa) {
	        if (aa) {

	            if (aa["information"]) {

	                if ((aa["information"]["member"]) && (aa["information"]["expired"].indexOf('ok|ใช้งานได้:ตลอดชีพ|1') == 0)) {
	                    fung();
	                } else {
							if(aa["information"]["expired"].indexOf('1|12') != '-1'){
						  fung();
					}
					else{
						Swal.fire(
  'คุณไม่มีสิทธิเข้าใช้งานฟังชันนี้!',
  'ฟังชันนี้สำหรับลูกค้าแบบรายปี หรือตลอดชีพเท่านั้นค่ะ',
  'error'
)
					 
	                   // chrome.tabs.create({ url: chrome.extension.getURL("index.html#dashboard") });
					}
						
						
	                  
	                }
	            } else {
	               				Swal.fire(
  'คุณไม่มีสิทธิเข้าใช้งานฟังชันนี้!',
  'ฟังชันนี้สำหรับลูกค้าแบบรายปี หรือตลอดชีพเท่านั้นค่ะ',
  'error'
)
	                //chrome.tabs.create({ url: chrome.extension.getURL("index.html#dashboard") });
	            }
	        } else {
	            window.history.back();
	        }
	    });



	}
	
	
	
		function start_customer(fung) {
	    chrome["storage"]["local"].get("information", function (aa) {
	        if (aa) {

	            if (aa["information"]) {

	                if ((aa["information"]["member"]) && (aa["information"]["expired"].indexOf('ok') == 0)) {
	                    fung();
	                } else {
	                    alert('ฟังชันนี้สำหรับลูกค้าเท่านั้นค่ะ');
	                    window.location = 'https://www.facebook.com/';
	                }
	            } else {
	                alert('ฟังชันนี้สำหรับลูกค้าเท่านั้นค่ะ');
	                window.location = 'https://www.facebook.com/';
	            }
	        } else {
	            window.history.back();
	        }
	    });



	}
	
	var SPINTAX_PATTERN = /\{[^"\r\n\}]*\}/;
var spin = function (spun) {
  var match;
  while (match = spun.match(SPINTAX_PATTERN)) {
   match = match[0];
   var candidates = match.substring(1, match.length - 1).split("|");
   spun = spun.replace(match, candidates[Math.floor(Math.random() * candidates.length)])
  }
  return spun;
 }
var spin_countVariations = function (spun) {
  spun = spun.replace(/[^{|}]+/g, '1');
  spun = spun.replace(/\{/g, '(');
  spun = spun.replace(/\|/g, '+');
  spun = spun.replace(/\}/g, ')');
  spun = spun.replace(/\)\(/g, ')*(');
  spun = spun.replace(/\)1/g, ')*1');
  spun = spun.replace(/1\(/g, '1*(');
  return eval(spun);
 }
	

function parseDateString(dateStr) {  
    var dateDate = dateStr.split("T")[0];  
    var dateTime = dateStr.split("T")[1].substring(0, 8);  
    var dateResult = new Date(Date.UTC(  
        (dateDate.split("-")[0]), /* Year */  
        dateDate.split("-")[1]-1, /* Month */  
        dateDate.split("-")[2], /* Day */  
        dateTime.split(":")[0], /* Hour */  
        dateTime.split(":")[1]
    ));  
    return dateResult;  
} 


function token_fanpage(token,id){
	var page_tokens = '';
	url = 'https://graph.facebook.com/me/accounts?limit=1000&access_token='+token
			 $.ajax({
		url: url,
        type: "GET",
		 async: false, 
		complete: function(result){ 
		  
		result = JSON.parse(result.responseText);
		  count = result.data.length;
             for(var i=0;i<count;i++){
			    if(result.data[i].id == id){
				   	page_tokens = result.data[i].access_token;
					
					
				}
		     }
			
       
           
      },


    });
	 return page_tokens;
}

	function export_text(data, name, clicks) {
	    var container = document.querySelector('.' + data);
	    var anchor = document.querySelector('.' + clicks);

	    anchor.onclick = function () {
	        anchor.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(container.value);
	        anchor.download = name + '.txt';
	    };

	}
	
	
	
	
	function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}