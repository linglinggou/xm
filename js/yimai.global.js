$(function () {
    if ($('.navIco').length > 0) {
        $('#navIco6').css('left', $('.nav').find('li').eq(5).offset().left + 63);
    }
    //    var userName = getcookie("cokUserNick");
    //    var userTip = "";
    //    if (userName != "" && userName != null) {
    //        userTip = "你好，<a href=\"/member/goodsNotify.aspx\" class=\"red\"  title=\"" + userName + "\" >" + userName + "</a> 欢迎来到易卖商城！";
    //        var User = getcookie("AccountStatus", "logtag");
    //        $("#LoginName").html(userTip);
    //        if (User != "" && User != null) {
    //            $("#LoginName").append(" <a href=\"/member/logout.aspx\" class=\"red\" title=\"退出\">退出</a>");
    //        } else {
    //            $.ajax({
    //                type: "POST", url: "/lib/xml-rpc/MemberAction.ashx?act=refshuser", data: { user: userName }, dataType: "json", success: function (result) {
    //                    if (result.issucc && result.issucc == "1")
    //                        $("#LoginName").append(" <a href=\"/member/logout.aspx\" class=\"red\" title=\"退出\">退出</a>");
    //                    else
    //                        $("#LoginName").append(" <a href=\"/member/login.aspx\" class=\"red\" title=\"登录\" >[登录]</a>　<a href=\"/member/register.aspx\" class=\"green\"  title=\"快速注册\" >[快速注册]</a>");
    //                }
    //            });
    //        }
    //    }
    // TopBanner();
    calcCart();
    $("#InputSearch").keypress(function (e) {
        if (e.which == 13) {
            $("#btSearch").click();
            return false;
        }
    });
    var backTop = $("#shop_backtop");
    if (0 < backTop.length) {
        var b = document.documentElement.clientHeight || document.body.clientHeight, c = Math.min(b, 100); $(window).bind("scroll resize", function () { var d = $(this).scrollTop(); d < c ? backTop.slideUp() : backTop.slideDown(); });
        backTop.click(function () { $('body,html').animate({ scrollTop: 0 }, 500); return !1 });
    }
    $("#btSearch").click(function () {
        var text = $("#InputSearch");
        if (text.val() == "") {
            text.val("请输入您要搜索的关键字");
            return false;
        }
        if (text.val() == "请输入您要搜索的关键字") {
            return false;
        }
        window.location = "/search.aspx?key=" + text.val();
        return false;
    });
    $(".scroll_weixin").click(function () {
        $(".scroll_weixin span").toggle();
    });
    $(".scroll_online").hover(
        function () { $(this).find("bdo>a").show().stop().animate({ width: 114, marginLeft: 2 }); },
        function () { $(this).find("bdo>a").hide().stop().animate({ width: 0, marginLeft: 114 }); });
    UserMobile();

    if ($('#classA').length > 0) {
        if ($('#classA').attr("show"))
            return;
        //$('#navLayer').css('left', $('.classA').offset().left);
        $('#classA').hover(function () { $('#navLayer').show(); }, function () { $('#navLayer').hide(); });
        $('#navLayer').hover(function () { $(this).show(); }, function () { $(this).hide(); });
    }

    //--
    $('.Related').find('.rightBtn').click(function () {
        imgScrollRight2($('.Related').find('.list'), $('.Related').find('li').length - 5, 172, 0);
    })
    $('.Related').find('.leftBtn').click(function () {
        imgScrollLeft2($('.Related').find('.list'), $('.Related').find('li').length - 5, 172, 0);
    })
    $('.Related2').find('.rightBtn').click(function () {
        imgScrollRight2($('.Related2').find('.list'), $('.Related2').find('li').length - 4, 172, 0);
    })
    $('.Related2').find('.leftBtn').click(function () {
        imgScrollLeft2($('.Related2').find('.list'), $('.Related2').find('li').length - 4, 172, 0);
    })
    $('.Related3').find('.rightBtn').click(function () {
        imgScrollRight2($('.Related3').find('.list'), $('.Related3').find('li').length - 3, 225, 0);
    })
    $('.Related3').find('.leftBtn').click(function () {
        imgScrollLeft2($('.Related3').find('.list'), $('.Related3').find('li').length - 3, 225, 0);
    });

});
function calcCart() {
    var YimaiCart = getcookie("cart");
    if (YimaiCart != "") {
        var pArray = YimaiCart.split(',');
        $(".Cart_Count").text(pArray.length);
    }
}
function getcookie(name, key) {
    var cookieValue = "";
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                if (typeof key != 'undefined') {
                    if (cookieValue.indexOf(key) != -1) {
                        cookieValue = decodeURIComponent(cookieValue.substring(cookieValue.indexOf(key)));
                        if (cookieValue.indexOf("&") != -1) {
                            cookieValue = decodeURIComponent(cookieValue.substring(0, cookieValue.indexOf("&")));
                        } else
                            cookieValue = decodeURIComponent(cookieValue.substring(key.length + 1));
                    } else {
                        cookieValue = "";
                    }
                }
                break;
            }
        }
    }
    return cookieValue;
}
function addToFavorite() {
    var a = "http://www.100mai.net/";
    var b = "易卖手机";
    document.all ? window.external.AddFavorite(a, b) : window.sidebar && window.sidebar.addPanel ? window.sidebar.addPanel(b, a, "") : alert("添加失败，请手动添加");
}

var fadeFlashNow = new Array();
for (i = 0; i < 50; i++) {
    fadeFlashNow[i] = 0;
}
function fadeFlashFun(i) {
    $('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
    $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
    if (fadeFlashNow[i] < $('.fadeFlash').eq(i).find('li').length - 1) {
        fadeFlashNow[i]++;
    } else {
        fadeFlashNow[i] = 0;
    }
    $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
    $('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
}
var imgScrollNum2 = new Array();
for (i = 0; i < 50; i++) {
    imgScrollNum2[i] = 0;
}
function imgScrollRight2(a, b, c, d) {
    //a.stop();
    if (imgScrollNum2[d] < b) {
        imgScrollNum2[d]++;
        a.animate({ scrollLeft: imgScrollNum2[d] * c }, 200);
    }
}
function imgScrollLeft2(a, b, c, d) {
    //a.stop();
    if (imgScrollNum2[d] > 0) {
        imgScrollNum2[d]--;
        a.animate({ scrollLeft: imgScrollNum2[d] * c }, 200);
    }
}
function TopBanner() {
    $("#topbanner").load("/lib/view/ad_page.aspx?ty=topbanner", function (result) {
        if (result) {
            $("#topbanner").height(80); //$("#topbanner").find("img").width($("body").width());
            $(".indexFlashLayer").css("top", "272px"); $(".cardIndexLayer").css("top", "272px"); $("#navIco6").css("top", "203px");
        }
    });
}
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, "") }
function UserMobile() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || (u.indexOf('Mac') > -1 && u.indexOf('Macintosh') < 0), //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        } (),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()

    }
    if (!browser.versions.iPad) {
        if (browser.versions.android || browser.versions.iPhone || (browser.versions.android && String(navigator.platform).indexOf("Linux") > -1)) {
            $(window).bind('resize load', function () {
                $("body").css("zoom", $(window).width() / 1099);
                $("body").css("display", "block");
                $(".indexFlashLayer").css("right", "1px");
            });
        }
    }

}