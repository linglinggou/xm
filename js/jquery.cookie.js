
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

//cookieName����,����Cookie���ϵ���ֵ��N�����¼������expires��ʱ����
function AddListCookie(cookieName, newValue, N, expiresValue) {
    //�ж��Ƿ����cookie  
    if ($.cookie(cookieName) == null) {
        //�����µ�cookie,���������¼
        $.cookie(cookieName, newValue, { expires: expiresValue, path: '/' });
    }
    var historyp = $.cookie(cookieName);
    var pArray = historyp.split(',');
    //���·��ʵ�cookie��ŷ�������ǰ��  
    historyp = newValue;
    //�жϱ���Ƿ������������ʵļ�¼����  
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
    //�޸�cookie��ֵ
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
        var cookieIDs = "";   //��cookieID���б�����ݵķ�ʽ����  
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

//��¼������������Ʒ  
function HistoryRecord(pid) {
    if (pid == null || pid == "") {
        return;
    }
    AddListCookie("PrdIDCookie", pid, 8, 7);
}

//��ȡ������������Ʒ  
function BindHistory() {
    return GetListCookie("PrdIDCookie");
}

