
/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value == null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//cookieName名称,加入Cookie集合的新值，N保存记录条数，expires超时天数
function AddListCookie(cookieName, newValue, N, expiresValue) {
    //判断是否存在cookie  
    if ($.cookie(cookieName) == null) {
        //创建新的cookie,保存浏览记录
        $.cookie(cookieName, newValue, { expires: expiresValue, path: '/' });
    }
    var historyp = $.cookie(cookieName);
    var pArray = historyp.split(',');
    //最新访问的cookie编号放置载最前面  
    historyp = newValue;
    //判断编号是否存在于最近访问的记录里面  
    var count = 0;
    for (var i = 0; i < pArray.length; i++) {
        if (pArray[i] != newValue) {
            historyp = historyp + "," + pArray[i];
            count++;
            if (count == N - 1) {
                break;
            }
        }
    }
    //修改cookie的值
    $.cookie(cookieName, historyp, { expires: expiresValue, path: '/' });
}

function GetListCookie(cookieName) {
    var historyp = "";
    if ($.cookie(cookieName) != null) {
        historyp = $.cookie(cookieName);
    }
    if (historyp == null && historyp == "") {
        return;
    }
    else {
        var cookieIDs = "";   //将cookieID以列表或数据的方式保存  
        var pArray = historyp.split(',');
        for (var i = 0; i < pArray.length; i++) {
            if (pArray[i] != "") {
                cookieIDs += pArray[i] + "|";
            }
        }
        if (cookieIDs != "") {
            cookieIDs = cookieIDs.substr(0, cookieIDs.length - 1);
        }
        return cookieIDs;
    }
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    $.cookie(name, null, { expires: -1, path: '/' });
}

//记录最近浏览过的商品  
function HistoryRecord(pid) {
    if (pid == null || pid == "") {
        return;
    }
    AddListCookie("PrdIDCookie", pid, 8, 7);
}

//获取最近浏览过的商品  
function BindHistory() {
    return GetListCookie("PrdIDCookie");
}

