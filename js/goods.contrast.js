var ContrastBar = function () {
    this.create();
    this.data = {
        barBox: $("#Contrast"),
        viewContent: $("#ViewContent"),
        viewContrast: $("#ViewContrast"),
        viewHistory: $("#ViewHistory"),
        viewCon: $("#ContrastList"),
        viewEmpty: $("#ContrastEmpty"),
        viewHis: $("#ViewHistoryList"),
        epView: $("#epView"),
        btnContrast: $("#btnContrast"),
        closeLi: $("#ContrastList .close"),
        hideContrast:$("#hideContrast"),
        smallType: null,
        choosePro: [],
        // 已经加入对比的产品id
        message: ["暂无添加任何产品，你可以添加最多四款产品进行对比。", "对不起，您最多只可以添加4款产品，请先删除对比栏的一些产品后再添加。", "暂无浏览过的产品", "该产品已加入对比栏中", "你还没有添加产品，无法进行对比，请先添加产品。", "对不起，您选择的是不同类别的产品无法加入对比，请选择同类产品或清空当前对比栏再选择。", "请选择两款产品以上进行比较", "该产品已在对比栏中，请选择其他产品", "该产品已从比栏中移除", ]
    }
    this.init();
    this.initData();
    //this.synchroLogin();
}
ContrastBar.prototype = {
    check: function () {
        var d = this.data;
        var len = d.choosePro.length;
        for (var i = 0; i < len; i++) {
            $("[name=compare_" + d.choosePro[i] + "]").each(function (i, el) {
                el.nodeName == "INPUT" ? $(el).attr("checked", true) : $(el).addClass("checked");
            });
            this.check(d.choosePro[i]);
        }
    },
    create: function () {
        var box = '';
        box += '<div class="ContrastLayer" id="Contrast" >';
        box += ' <div class="wal">';
        box += '  <div class="tab">';
        box += '	<ul >';
        box += '	    <li class="liNow" id="ViewContrast">对比栏</li><li id="ViewHistory">最近浏览</li><li  id="hideContrast" style="float:right"><a  href="javascript:;">关闭</a></li>';
        box += '	</ul>';
        box += '   </div><div class="tabContentDiv" id=\"ViewContent\"><div class="tabContent list" style="display:block;">';
        box += '      <ul id="ContrastList"></ul><ul id="ContrastEmpty"></ul><span class="clear_f"></span>';
        box += '	<div class="btnDiv"><a href="javascript:;" target="_blank"  id="btnContrast" class="a1">开始对比</a><a href="javascript:;" id="epView" class="blue">清空对比框</a>';
        box += '	</div></div><div class="tabContent list">';
        box += '	    <ul id="ViewHistoryList"></ul><span class="clear_f"></span>';
        box += '	</div>';
        box += '	</div>';
        box += '</div></div>';
        document.write(box);
    },
    init: function () {
        var self = this,
                d = this.data;
        d.viewContrast.bind("click", function () {
            $(this).siblings("li").removeClass("liNow");
            $(this).addClass("liNow");
            d.viewContent.find(".list").hide();
            d.viewContent.find(".list").eq(0).show();
        });
        d.hideContrast.bind("click",function()
        {
        d.barBox.hide();
        });
        d.viewHistory.bind("click", function () {
            $(this).siblings("li").removeClass("liNow");
            $(this).addClass("liNow");
            if (d.viewHis.html() == "") {
                d.viewHis.load("/lib/view/ViewHistory.aspx?sh=2");
            }
            d.viewContent.find(".list").hide();
            d.viewContent.find(".list").eq(1).show();
        });
        d.epView.bind("click", function () {
            self.setEmpty();
        });
        d.btnContrast.bind("click", function () {
            var url = null;
            if (d.choosePro.length <= 0) {
                alert("请选择要对比的产品!");
                return;
            }
            url = "http://" + window.location.host + "/mall/Contrast.aspx?type=compare";
            for (var i = 0; i < d.choosePro.length; i++) {
                var item = d.choosePro[i];
                url += "&id=" + d.choosePro[i];
            }
            window.open(url);
        });
        d.closeLi.live("click",
                    function (e) {
                        var uId = $(this).parent().parent().attr("id");
                        if (uId == "ContrastList") {
                            var pId = $(this).parent().find("input:hidden").val();
                            self.delContrast(pId);
                        }
                    });
    },
    initData: function () {
        d = this.data;
        var contrastGoods = $.cookie("contrastGoods");
        if (contrastGoods != "" && contrastGoods != null) {
            contrastGoods = contrastGoods.substring(0, contrastGoods.lastIndexOf(";"));
            var arrProduct = contrastGoods.split(";");
            var len = arrProduct.length > 4 ? 4 : arrProduct.length;
            var item = "";
            for (var i = 0; i < len; i++) {
                var arrParam = arrProduct[i].split("|");
                var gname = arrParam[0];
                var gurl = arrParam[1];
                var gprice = arrParam[2];
                var gpic = arrParam[3];
                var gid = arrParam[4];
                if (gname == null) gname = "";
                if (gprice == null) gprice = "";
                if ($("#cont_" + gid).length > 0) {
                    $("#cont_" + gid).addClass("ContrastA2");
                }
                d.choosePro.push(parseInt(gid));
                item += '<li><div class="imgDiv"><a href="' + gurl + '"><img   width="56" height="56"  src="' + gpic + '" alt=""></a></div>';
                item += '<div class="name"><a href="' + gurl + '">' + gname + '</a></div>';
                item += '<h2 class="red price">' + (gprice && gprice.indexOf("￥") < 0 ? "￥" : "") + gprice + '</h2>';
                item += '<a href="javascript:void(0)" class="close" title="移除">移除</a>';
                item += '<input type="hidden" id="compare_' + gid + '" value="' + gid + '" /></li>';
            }
            d.viewCon.append(item);
        }
        this.FillEmpty();
    },
    ContrastPro: function (obj, id) {
        d = this.data;
        if (!$(obj).hasClass("ContrastA2") && obj.tagName == "A") {
            d.barBox.show();
            if (d.choosePro.length >= 4) {
                alert(d.message[1]);
                return false;
            }
            for (var i = 0; i < d.choosePro.length; i++) {
                if (id == d.choosePro[i]) {
                    alert(d.message[3]);
                    return false;
                }
            }
            $("#cont_" + id).addClass("ContrastA2");
            d.viewEmpty.find("li").eq(0).remove();
            this.addContrast($("#gname_" + id).text(), $("#gname_" + id).attr("href"), $("#gprice_" + id).text(), $("#gpic_" + id).attr("src"), id);
            //d.barBox.show();
        } else {
            this.delContrast(id);
        }
    },
    addContrast: function (gname, gurl, gprice, gpic, gid) {
        var item = '<li><div class="imgDiv"><a href="' + gurl + '"><img  width="56" height="56" src="' + gpic + '" alt=""></a></div>';
        item += '<div class="name"><a href="' + gurl + '">' + gname + '</a></div>';
        item += '<h2 class="red price">' + (gprice && gprice.indexOf("￥") < 0 ? "￥" : "") + gprice + '</h2>';
        item += '<a href="javascript:void(0)" class="close" title="移除">移除</a>';
        item += '<input type="hidden" id="compare_' + gid + '" value="' + gid + '" /></li>';
        $(item).hide().appendTo(d.viewCon).fadeIn(300);
        d.choosePro.push(parseInt(gid));
        var product = gname + "|" + gurl + "|" + gprice + "|" + gpic + "|" + gid + ";";
        var compareProducts = $.cookie("contrastGoods");
        compareProducts = (compareProducts == "" || compareProducts == null) ? product : compareProducts + product;
        $.cookie("contrastGoods", compareProducts, {
            path: '/',
            expires: 1
        });
    },
    delContrast: function (id) {
        var d = this.data;
        var pos = jQuery.inArray(parseInt(id), d.choosePro);
        if (pos > -1) {
            d.choosePro.splice(pos, 1); //从数组中删除已选产品的id
        } else {
            alert("已选择产品数据出错！");
            return false;
        }
        $("#compare_" + id).parent().remove();
        $("#cont_" + id).removeClass("ContrastA2");
        this.FillEmpty();
        var compareProducts = $.cookie("contrastGoods");
        var arrProduct = compareProducts.split(";");
        var pos = -1;
        for (var i = 0; i < arrProduct.length; i++) {
            param = arrProduct[i].split("|");
            if (id == param[4]) {
                pos = i;
                break;
            }
        }
        arrProduct.splice(pos, 1);
        compareProducts = arrProduct.join(";");
        $.cookie("contrastGoods", compareProducts, {
            path: '/',
            expires: 1
        });
    },
    setEmpty: function () {
        var d = this.data;
        $("#ContrastList").empty();
        var len = d.choosePro.length;
        //清空对比数据
        for (var i = 0; i < len; i++) {
            $("#cont_" + d.choosePro[i]).removeClass("ContrastA2");
        }
        d.smallType = null;
        d.choosePro = [];
        $.cookie("contrastGoods", null, {
            path: '/'
        });
        this.FillEmpty();
        //                $.cookie("GoodsSmallType", null, {
        //                    path: '/'
        //                });
    },
    FillEmpty: function () {
        d = this.data;
        var ConCount = d.viewCon.find("li").size();
        var liempty = '';
        for (var i = 4; i > ConCount; i--) {
            liempty = '<li><div class="imgDiv">' + i + '</div><h5>您还可以继续添加</h5></li>' + liempty;
        }
        d.viewEmpty.html(liempty);
    }


}