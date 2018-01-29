s﻿var scrpage = 2;
var nowpage = 1;
var PageCount = 0;
var PageCount2 = 0;
var opts = { offset: '100%' };
//var PAGELIST = $("#CommentPage").pagination(getCommentListPage);
//var PAGELIST2 = $("#ReviewPage").pagination(getReviewListPage);
function AttentionGoods(options) {
    var ParDefault = { type: "POST", url: "", data: {}, dataType: "text", context: document.body, error: function (result, textStatus, errorThrown) {
        alert("ajax载入失败:" + result.status + result.statusText + result.responseText);
    }, success: function (result) {
        if ($.isFunction(options.callback)) { options.callback(result) }
    }
    };
    ParDefault = $.extend({}, ParDefault, options || {});
    ParDefault.data.gid = $("#hiddGoodsID").val();
    $.ajax(ParDefault);
}

function CloseFun(mid) {
    if (mid != 0 && mid != "") {
        $("#hiddMemberId").val(mid);
        $.prompt.hide();
    }
}
function CheckLogin(mode) {
    if ($("#hiddMemberId").val() == "0") {
        $.prompt.iframe("/lib/FastLogin.aspx?call=" + mode, { title: "你尚未登录", protect: "", onclose: eval(mode) }, 310, 460);
        return false;
    } else
        return true;
}
function Favorites() {//收藏机型
    if ($("#hiddMemberId").val() == "0")
    { return; }
    var mid = $("#hiddMemberId").val();
    var pid = $("#hiddGoodsID").val();
    var rv = ProductAjax.Favorites(mid, pid).value;
    if (rv != -1) {
        $("#CollectionLayer").prompt({ title: "收藏机型" });
        $("#btnCollectionLayer").click(function () {
            $.prompt.hide();
        });
    }
    else {
        alert("收藏失败");
    }
}
function ArrivalNotice(mid) {//到货通知
    if ($("#hiddMemberId").val() == "0")
        return;
    $("#ArrivalLayerGoods").text($("#litGoodsMenuName").text());
    $.ajax({ type: "POST", url: "/lib/xml-rpc/MemberAction.ashx?act=getemail&time=" + (new Date).valueOf(), dataType: "json", data: {}, error: function () { alert("123"); }, success: function (result) {
        if (result.islogin == "0") {
            alert("请先登录,登录后订阅该商品的到货通知");
            return;
        } else {
            if (result.isphone == "0") {
                $("#ArrivalIsPhone").attr("disabled", "disabled");
                $("#ArrivalPhone").attr("disabled", "disabled");
            } else
                $("#ArrivalPhone").val(result.phone);
            $("#ArrivalEmail").val(result.email);
            $("#ArrivalLayer").prompt({ title: "到货通知" });
            $("#btnArrivalLayer").click(function () {
                var Letter = $("#NoticeLetter").is(":checked") ? 1 : 0;
                var Email = $("#ArrivalEmail").val();
                var IsEmail = $("#ArrivalIsEmail").is(":checked") ? 1 : 0;
                if (IsEmail == 1) {
                    if (!ValiEmail(Email)) {
                        alert("请填写正确的邮箱地址!");
                        return;
                    }
                }
                var IsPhone = $("#ArrivalIsPhone").is(":checked") ? 1 : 0;
                var Phone = $("#ArrivalPhone").val();
                if (IsPhone == 1) {
                    if (!ValiMobile(Phone)) {
                        alert("请填写正确的手机号码!");
                        return;
                    }
                } else
                    Phone = "";
                if (Letter == 0 && IsEmail == 0 && IsPhone == 0) {
                    alert("请至少选择一项通知方式!");
                    return;
                }
                var DataPara = { letter: Letter, isemail: IsEmail, isphone: IsPhone, email: Email, phone: Phone };
                $("#ArrivalLetter").is(":checked")
                AttentionGoods({ url: "/lib/xml-rpc/GoodsAction.ashx?act=arrival", data: DataPara, callback: function (result) {
                    if (result != "0") {
                        $("#ArrivalLayer2").prompt({ title: "订阅成功" });
                        $("#btnArrivalLayer2").click(function () {
                            $.prompt.hide();
                        });
                    } else
                        alert("请选择登录,登录后订阅该商品的到货通知");
                }
                });

            });
        }
    }
    });
}

function PriceCutsNotice(mid) {//降价通知
    if ($("#hiddMemberId").val() == "0")
        return;
    $("#NoticeLayerGoods").text($("#litGoodsMenuName").text());
    $("#NoticeLayerPrice").text("￥" + $("#hiddGoodsPrice").val());
    $.ajax({ url: "/lib/xml-rpc/MemberAction.ashx?act=getemail&time=" + (new Date).valueOf(), dataType: "json", data: {}, error: function () {
        alert("ajax.error");
    }, success: function (result) {
        if (result.islogin == "0") {
            alert("请选择登录,登录后订阅该商品的到货通知");
            return;
        } else {
            if (result.isphone == "0") {
                $("#NoticeIsPhone").attr("disabled", "disabled");
                $("#NoticePhone").attr("disabled", "disabled");
            } else
                $("#NoticePhone").val(result.phone);
            $("#NoticeEmail").val(result.email);
            $("#showNoticeLayer").prompt({ title: "降价通知" });
            $("#btnNoticeLayer").click(function () {
                var Price = $("#NoticePrice").val();
                var GoodsPrice = $("#hiddGoodsPrice").val();
                var Letter = $("#NoticeLetter").is(":checked") ? 1 : 0;
                if (Price == "" || Price == "0") {
                    alert("请填写提醒价格,提醒价格不能大于或等于当前的价格!");
                    return;
                }
                if (parseFloat(GoodsPrice) <= parseFloat(Price)) {
                    alert("提醒价格不能大于或等于当前的价格!");
                    return;
                }
                var Email = $("#NoticeEmail").val();
                var IsEmail = $("#NoticeIsEmail").is(":checked") ? 1 : 0;
                if (IsEmail == 1) {
                    if (!ValiEmail(Email)) {
                        alert("请填写正确的邮箱地址!");
                        return;
                    }
                }
                var IsPhone = $("#NoticeIsPhone").is(":checked") ? 1 : 0;
                var Phone = $("#NoticePhone").val();
                if (IsPhone == 1) {
                    if (!ValiMobile(Phone)) {
                        alert("请填写正确的手机号码!");
                        return;
                    }
                } else
                    Phone = "";
                if (Letter == 0 && IsEmail == 0 && IsPhone == 0) {
                    alert("请至少选择一项通知方式!");
                    return;
                }
                var DataPara = { price: Price, letter: Letter, isemail: IsEmail, isphone: IsPhone, email: Email, phone: Phone };
                AttentionGoods({ url: "/lib/xml-rpc/GoodsAction.ashx?act=pricecuts", data: DataPara, callback: function (result) {
                    if (result != "0") {
                        //$.prompt.hide();
                        $("#showNoticeLayer2").prompt({ title: "订阅成功" });
                        $("#btnNoticeLayer2").click(function () {
                            $.prompt.hide();
                        });
                    } else
                        alert("请选择登录,登录后订阅该商品的降价通知");
                }
                });
            });
        }
    }
    });
}
function SendComment() {
    if ($("#hiddMemberId").val() == "0")
        return;
    var pid=$("#hiddGoodsID").val();
    var Exterior = $("#Rate_Style").find(".on").size();
    var Func = $("#Rate_Func").find(".on").size();
    var Price = $("#Rate_Price").find(".on").size();
    if (Exterior == 0 || Func == 0 || Price == 0) {
        alert("请选择您对该商品的评分！");
        return;
    }
    var Contents = $("#txtComment").val() == "" ? $("#txtComment").text() : $("#txtComment").val();
    if (Contents == "") {
        alert("请输入您对该商品的评价的内容！");
        return;
    }
    var rv = ProductAjax.SendComment($("#hiddMemberId").val(), pid, Contents);
    if (rv.value == 1) {
        alert("发表成功！");
        $("#txtComment").val('');
        window.location = window.location;
    }
    else { 
     alert("发表失败！");
    }
}

$("#RelatedList").waypoint(function (event, direction) {
    if (direction === 'down') {
        $("#RelatedList").waypoint('remove');
        $.ajax({
            type: "POST",
            url: "/lib/xml-rpc/GoodsAction.ashx?act=relateitem",
            data: { "gid": $("#hiddGoodsID").val(), "cid": $("#hiddGoodsClass").val() },
            dataType: "html",
            error: function () {
                alert("ajax载入失败！");
            },
            success: function (data) {
                $("#RelatedContent").html(data);
            }
        });
    }
}, opts);

function onComReply(idx) {
    var review = $("#reply_" + idx).val();
    if (review == "") {
        alert("请输入您要回复的内容！");
        return;
    }
    var GoodsID = $("#hiddGoodsID").val();
    if (GoodsID == "" || isNaN(GoodsID)) {
        alert("信息加载失败！");
        return;
    }
    if ($("#hiddMemberId").val() == "0") {
        //alert("请先登录后，可回复评价！");
        CheckLogin('');
        return;
    }
    $.ajax({ type: "POST", url: "/lib/xml-rpc/CommentAction.ashx?act=goodsreply", dataType: "text", data: { con: review, cid: idx, nid: GoodsID }, success: function (result) {
        if (result != "0" && result != null) {
            alert("回复成功！");
            $("#reply_" + idx).val('');
        } else
            alert("回复失败！");
    }
    });
}

function selectColor(src, color) {
    var banben = document.getElementById("ctl00_ContentPlaceHolder1_hidBanben").value;
    var rvstring = ProductAjax.SelectSubProduct(ProductId, banben, color).value;
    var i = rvstring.indexOf("_");
    var pid = rvstring.substr(0, i);
    var price = rvstring.substr(i + 1);
    document.getElementById("ctl00_ContentPlaceHolder1_hidsubPid").value = pid;
    document.getElementById("ctl00_ContentPlaceHolder1_hidColor").value = color;
    if (pid == "0" || price == "0") {
        document.getElementById("currentPrice").innerText = "缺货";
    }
    else {
        document.getElementById("currentPrice").innerText = price;
    }

    var ulColor = src.parentElement;
    var liArray = ulColor.childNodes;
    for (var i = 0; i < liArray.length; i++) {
        liArray[i].className = "";
    }
    src.className = "liNow";
}
function selectBanben(src, banben) {
    var color = document.getElementById("ctl00_ContentPlaceHolder1_hidColor").value;
    var rvstring = ProductAjax.SelectSubProduct(ProductId, banben, color).value;
    var i = rvstring.indexOf("_");
    var pid = rvstring.substr(0, i);
    var price = rvstring.substr(i + 1);
    document.getElementById("ctl00_ContentPlaceHolder1_hidsubPid").value = pid;
    document.getElementById("ctl00_ContentPlaceHolder1_hidBanben").value = banben;
    if (pid == "0" || price == "0") {
        document.getElementById("currentPrice").innerText = "缺货";
    }
    else {
        document.getElementById("currentPrice").innerText = price;
    }

    var ulBanben = src.parentElement;
    var liArray = ulBanben.childNodes;
    for (var i = 0; i < liArray.length; i++) {
        liArray[i].className = "";
    }
    src.className = "liNow";
}

function AddCart(hr) {
    var GoodPriceId = document.getElementById("currentPrice").innerText;
    if (GoodPriceId != "缺货") {
        var GoodsSubId = $("#ctl00_ContentPlaceHolder1_hidsubPid").val();
        var acount = isNaN($("#intputCount").val()) ? "1" : $("#intputCount").val();
        if (parseInt(acount) < 1) {
            alert("请填写正确的数量！");
            return;
        }
        var cookieValue = GoodsSubId + "-" + acount;
        AddListCookie("cart", cookieValue, 100, 7);
        document.getElementById("showCartLayer");
        if (hr == 0) {
            $("#showCartLayer").show();
            $("#showCartLayer").prompt({ title: "操作成功" });
        }
        else {
            window.location = "/shopping/cart.aspx";
        }
    }
    else {
        alert("此版本暂时缺货，请选择其他版本!");
    }
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

function bindPriceClick(obj) {
    var obj_id = $(obj).attr("id"); //c_unit_1
    var mode = obj_id.substr(0, 1);
    var count = obj_id.lastIndexOf("_");
    var modeId = obj_id.substr(count + 1);
    $(obj).click(function () {
        doChangeUnit(mode, modeId)
    });
}

function SingleUnit(mode, id) {
    var DictMode = "PriceDetail"; //如果选择了c，看其它属性是否已选，未选则进行一次筛选
    if (mode == "o")
        DictMode = "Attribute";
    var unit_text = $("#" + mode + "_unit_" + id).attr("title");
    if (unit_text == "") return;
    $("#priceul_" + mode).find("li").attr("class", "");
    $("#" + mode + "_unit_" + id).attr("class", "liNow");
    $("#hiddUnit_" + mode).val(id);
    var ArrPriec = $.parseJSON($("#hiddPriceList").val());
    var PriceList = ArrPriec.PriceList;
    for (var i = 0; i < PriceList.length; i++) {
        if (PriceList[i][DictMode] == unit_text) {
            if ($("#litGoodsPrice").length > 0) {
                $("#litGoodsPrice").html("￥<b class=\"red\">" + PriceList[i].Price + "</b>");
                changeJiexinFQ(PriceList[i].Price);
            }

            $("#hiddPriceID").val(PriceList[i].ID);
            $("#hiddPrice").val(PriceList[i].Price);
            if (PriceList[i].GoodsPIC != "")
                $("#GoodsPic").attr("src", "/data/UploadPhotos/Goods/" + PriceList[i].GoodsPIC);
            break;
        }
    }
}
var doChangeUnit = function (mode, id) {
    var OtherMode = "c"; //如果选择了c，看其它属性是否已选，未选则进行一次筛选
    if (mode == "c")
        OtherMode = "o";
    if ($("#priceul_" + OtherMode).length <= 0) {
        if ($("#hiddUnit_" + mode).val() == id) {
            $("#" + mode + "_unit_" + id).attr("class", "");
            $("#hiddUnit_" + mode).val("0");
            if ($("#litGoodsPrice").length > 0) {
                $("#litGoodsPrice").html($("#litGoodsPrice").data("p_ranage"));
                changeJiexinFQ();
            }

            $("#hiddPriceID").val("0");
            return;
        }
        SingleUnit(mode, id);
        return;
    }
    if ($("#hiddUnit_" + mode).val() == id) {//选中状态下取消选中
        $("#" + mode + "_unit_" + id).attr("class", "");
        $("#hiddUnit_" + mode).val("0");
        if ($("#litGoodsPrice").length > 0) {
            $("#litGoodsPrice").html($("#litGoodsPrice").data("p_ranage"));
            changeJiexinFQ();
        }

        $("#priceul_" + OtherMode).find("li").each(function () {
            if ($(this).attr("class") == "liStop") {
                $(this).attr("class", "");
                bindPriceClick(this);
            }
            $("#hiddPriceID").val("0");
        });
        return;
    }

    var ArrPriec = $.parseJSON($("#hiddPriceList").val());
    var PriceList = ArrPriec.PriceList;
    $("#hiddUnit_" + mode).val(id);
    $("#priceul_" + mode).find("li").each(function () {
        if ($(this).attr("class") != "liStop")
            $(this).attr("class", "");
    });
    $("#" + mode + "_unit_" + id).attr("class", "liNow");

    var unit_cid = $("#hiddUnit_c").val();
    var unit_oid = $("#hiddUnit_o").val();
    if (unit_cid != "0" && unit_oid != "0") {//如果两个都有选中状态，则进行比较
        var unit_c = $("#c_unit_" + unit_cid).attr("title");
        var unit_o = $("#o_unit_" + unit_oid).attr("title");
        for (var i = 0; i < PriceList.length; i++) {
            if (PriceList[i].PriceDetail == unit_c && PriceList[i].Attribute == unit_o) {
                if ($("#litGoodsPrice").length > 0)
                    $("#litGoodsPrice").html("￥<b class=\"red\">" + PriceList[i].Price + "</b>");
                $("#hiddPriceID").val(PriceList[i].ID);
                $("#hiddPrice").val(PriceList[i].Price);
                if (PriceList[i].GoodsPIC != "")
                    $("#GoodsPic").attr("src", "/data/UploadPhotos/Goods/" + PriceList[i].GoodsPIC);

                changeJiexinFQ(PriceList[i].Price);
                break;
            }
        }
    }
    var unit_text = $("#" + mode + "_unit_" + id).attr("title");
    if (unit_text == "") return;
    var Other = $("#priceul_" + OtherMode).find("li");
    Other.each(function () {
        $(this).unbind("click");
        var IsExists = false;
        if (mode == "c") {
            for (var i = 0; i < PriceList.length; i++) {
                if (PriceList[i].PriceDetail == unit_text && PriceList[i].Attribute == $(this).attr("title")) {
                    IsExists = true; break;
                }
            }
        } else {
            for (var i = 0; i < PriceList.length; i++) {
                if (PriceList[i].Attribute == unit_text && PriceList[i].PriceDetail == $(this).attr("title")) {
                    IsExists = true;
                    break;
                }
            }
        }
        if (!IsExists) {
            if ($(this).attr("class") != "liNow") {
                $(this).attr("class", "liStop");
                //$(this).unbind("click");
            }
        } else {
            if ($(this).attr("class") != "liNow") {
                $(this).attr("class", "");
            }
            bindPriceClick(this);
        }
    });
}

function changeJiexinFQ(gp) {
    if (gp == undefined) {
        gp = parseInt($("#hiddGoodsPrice").val());
    }

    if (gp > 6000 || parseInt($("#hiddGoodsState").val()) != 1) {
        rbtnJX.disabled(true);
        $(".sz-jgd-items li[data-lnr-value=1]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>1期".format("-"));
        $(".sz-jgd-items li[data-lnr-value=3]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>3期".format("-"));
        $(".sz-jgd-items li[data-lnr-value=9]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>9期".format("-"));
        $(".sz-jgd-items li[data-lnr-value=12]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>12期".format("-"));
        $(".sz-jgd-btn").attr("disabled", "disabled");
        return;
    }
    else {
        rbtnJX.disabled(false);
        $(".sz-jgd-btn").removeAttr("disabled");
    }

    var ret = lnglobal.jiexin.calculateMonthPayment(gp, 1);
    $(".sz-jgd-items li[data-lnr-value=1]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>1期".format(ret.installmentAmount));

    ret = lnglobal.jiexin.calculateMonthPayment(gp, 3);
    $(".sz-jgd-items li[data-lnr-value=3]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>3期".format(ret.installmentAmount));

    ret = lnglobal.jiexin.calculateMonthPayment(gp, 9);
    $(".sz-jgd-items li[data-lnr-value=9]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>9期".format(ret.installmentAmount));

    ret = lnglobal.jiexin.calculateMonthPayment(gp, 12);
    $(".sz-jgd-items li[data-lnr-value=12]").find("span").first().html("￥{0}&nbsp;&nbsp;<span>X</span>12期".format(ret.installmentAmount));
}

function ValiMobile(mobile) {
    if (/^1[^1,2,4,7,9]\d{9}$/.test(mobile))
        return true;
    else
        return false;
}
function ValiEmail(email) {
    var patrn = /^[0-9a-z-A-Z]+@([0-9a-z]+.)+[a-z]{2,3}$/; //[0-9a-z-]
    if (patrn.exec(email))
        return true;
    else
        return false;
}


$(function () {
    $("#SendReview").click(function () {
        var review = $("#txtReview").val() == "" ? $("#txtReview").text() : $("#txtReview").val();
        if (review == "") {
            alert("请输入您要咨询的内容！");
            return;
        }
        var pid = $("#hiddGoodsID").val();
        var mid = $("#hiddMemberId").val();
        var rv = ProductAjax.SendReview(mid, pid, review).value;
        if (rv > 0) {
            alert("发表成功！");
            $("#txtReview").val('');
        } else {
            alert("发表失败！");
        }
    });
    $("#SendComment").click(function () {
        if (CheckLogin("SendComment"))
            SendComment();
    });
    $(".Favorites").click(function () {//收藏
        if (CheckLogin("Favorites"))
            Favorites();
    });
    $("#Arrival").click(function () {//到货通知
        if (CheckLogin("ArrivalNotice"))
            ArrivalNotice();
    });
    $("#PriceCuts").click(function () {//降价通知
        if (CheckLogin("PriceCutsNotice"))
            PriceCutsNotice();
    });
    $("#GoodsTab li").click(function () {
        $("#GoodsTab").find("li").removeClass("liNow");
        $(this).addClass("liNow");
        $(".tabContent").hide();
        //加载内容
        var idx = $(this).attr("dataid");
        $("#content" + idx).show();
    });
    $("#GoodsTab2 li").click(function () {
        $("#GoodsTab2").find("li").removeClass("liNow");
        $(this).addClass("liNow");
        $(".tabContent2").hide();
        $("#content" + $(this).attr("dataid")).show();
    });
    //FilterGoodsState();
//    $("#GoodsDetail_AD").load("/lib/view/ad_page.aspx?ty=mobile_desc");
    $("#spec-list img").bind("mouseover", function () {
        var src = $(this).attr("src");
        $("#GoodsPic").attr({
            src: src.replace("\/n5\/", "\/n1\/")
        });
        $(this).parent().addClass("liNow").siblings().removeClass("liNow");
    });
    if ($(".colllist ul").find("li").size() > 5) {
        $(".colllist").css("overflow-x", "scroll");
    }
    $(".colllist").find("ul").width(133 * $(".colllist ul").find("li").size());
});
function LoadGoodsParam() {
    $.post("/lib/xml-rpc/GoodsAction.ashx?act=tipparam", { gid: $("#hiddGoodsID").val() }, function (result) {
        if (result) {
            $("#GoodsParamTip").after(result).css({ "width": "400px" }).parent().css({ "min-height": "50px" });
        } else
            $(".p_title").removeClass("p_title");
    });
}
