(function ($) {
    $.fn.prompt = function (options) {
        return this.each(function () {
            var s = $.extend({}, promptDefault, options || {});
            var elements = $(this);
            //$.prompt.loading(options);
            $.prompt($(this), options);
        });
    };
    $.prompt = function (elements, options) {
        if (elements.length == 0) {
            return;
        }
        var s = $.extend({}, promptDefault, options || {});
        //弹框的显示
        var WRAP = "<div class=\"tipsLayer\" id=\"wrapOut\" ><h2 id=\"wrapBar\" class=\"title\">" + s.title + "<a href=\"javascript:;\" id=\"wrapClose\" class=\"close\"></a></h2><div id=\"wrapBody\"></div></div><div id=\"Layer1\" style=\"display:block;\"></div>";
        $("body").append(WRAP);
        if (typeof (elements) === "object") {
            elements.show();
        } else {
            elements = $(elements);
        }

        //一些元素对象
        $.o = {
            s: s,
            ele: elements,
            bg: $("#Layer1"),
            bar: $("#wrapBar"),
            clo: $("#wrapClose"),
            out: $("#wrapOut"),
            bd: $("#wrapBody")
        };
        $.o.out.show();
        $.o.bd.empty().append(elements);
        if ($.isFunction(s.onshow)) {
            s.onshow();
        }
        //尺寸
        $.prompt.setSize();
        //定位
        $.prompt.setPosition();
        $.o.clo.click(function () {
            $.prompt.hide();
            return false;
        });
        if ($.o.bgclose) {
            $.o.bg.click(function () {
                $.prompt.hide();
                return false;
            });
        }
    }
    $.extend($.prompt, {
        getSize: function (o) {
            //获取任意元素的高宽
            var w_h = {}, o_new = o.clone();
            $('<div id="wrapClone" style="position:absolute;left:-6000px;"></div>').appendTo("body").append(o_new);
            w_h.w = $("#wrapClone").width();
            w_h.h = $("#wrapClone").height();
            $("#wrapClone").remove();
            return w_h;
        },
        setSize: function () {
            if (!$.o.bd.size() || !$.o.ele.size() || !$.o.bd.size()) {
                return;
            }
            //主体内容的尺寸
            var bd_w = parseInt($.o.s.width, 10), bd_h = parseInt($.o.s.height, 10);
            if (!bd_w || bd_w <= 0) {
                var x_size = $.prompt.getSize($.o.ele), w = $(window).width();
                //宽度自动
                bd_w = x_size.w;
                if (bd_w < 50) {
                    bd_w = 120;
                } else if (bd_w > w) {
                    bd_w = w - 120;
                }
            }
            $.o.bd.css("width", bd_w);
            $.o.bar.css("width", bd_w - 12);
            if (bd_h > 0) {
                $.o.bd.css("height", bd_h);
            }
            return $.o.bd;
        },
        setPosition: function (flag) {
            flag = flag || false;
            if (!$.o.bg.size() || !$.o.ele.size() || !$.o.out.size()) {
                return;
            }
            var w = $(window).width(), h = $(window).height(), st = $(window).scrollTop(), ph = $("body").height(), zs = $('body').attr('scrollHeight');
            if (ph < h) {
                ph = h;
            }
            if (ph < zs) {
                ph = zs;
            }
            $.o.bg.width(w).height(ph).css("opacity", $.o.s.opacity);
            //主体内容的位置
            //获取当前主体元素的尺寸
            var xh = $.o.out.outerHeight(), xw = $.o.out.outerWidth();
            var t = st + (h - xh) / 2, l = (w - xw) / 2;
            if ($.o.s.fix && window.XMLHttpRequest) {
                t = (h - xh) / 2;
            }
            if (flag === true) {
                $.o.out.animate({
                    top: t,
                    left: l
                });
            } else {
                $.o.out.css({
                    top: t,
                    left: l,
                    zIndex: $.o.s.index
                });
            }
            return $.o.out;
        },
        //定位
        setFixed: function () {
            if (!$.o.out || !$.o.out.size()) {
                return;
            }
            if (window.XMLHttpRequest) {
                $.prompt.setPosition().css({
                    position: "fixed"
                });
            } else {
                $(window).scroll(function () {
                    $.prompt.setPosition();
                });
            }
            return $.o.out;
        },
        //背景可点击
        bgClickable: function () {
            if ($.o.bg && $.o.bg.size()) {
                $.o.bg.click(function () {
                    $.prompt.hide();
                });
            }
        },
        //背景隐藏
        bgHide: function () {
            if ($.o.bg && $.o.bg.size()) {
                $.o.bg.hide();
            }
        },
        //背景层显示
        bgShow: function () {
            if ($.o.bg && $.o.bg.size()) {
                $.o.bg.show();
            } else {
                $('<div id="Layer1"></div>').prependTo("body");
            }
        },
        //拖拽
        drag: function () {
            if (!$.o.out.size() || !$.o.bar.size()) {
                $(document).unbind("mouseover").unbind("mouseup");
                return;
            }
            var bar = $.o.bar, out = $.o.out;
            var drag = false;
            var currentX = 0, currentY = 0, posX = out.css("left"), posY = out.css("top");
            bar.mousedown(function (e) {
                drag = true;
                currentX = e.pageX;
                currentY = e.pageY;
            }).css("cursor", "move");
            $(document).mousemove(function (e) {
                if (drag) {
                    var nowX = e.pageX, nowY = e.pageY;
                    var disX = nowX - currentX, disY = nowY - currentY;
                    out.css("left", parseInt(posX) + disX).css("top", parseInt(posY) + disY);
                }
            });
            $(document).mouseup(function () {
                drag = false;
                posX = out.css("left");
                posY = out.css("top");
            });
        },
        //弹框隐藏
        hide: function () {
            if ($.o.ele && $.o.out.css("display") !== "none") {
                if ($.o.s.protect == "auto")
                    $.o.ele.clone().hide().appendTo($("body"));

                $.o.out.fadeOut("fast", function () {
                    $(this).remove();
                    if ($.isFunction($.o.s.onclose)) {
                        $.o.s.onclose();
                    }
                });
                $.o.bg.fadeOut("fast", function () {
                    $(this).remove();
                });

            }
            return false;
        },
        //预载
        loading: function (options) {
            var element = $('<div class="wrap_remind">加载中...</div>');
            options = options || {}
            var newOptions = $.extend({}, options, { bar: false });
            $.prompt(element, newOptions);
        },
        iframe: function (content, options, height, width) {
            //$.prompt.loading(options);
            $.prompt("<iframe id=\"sdfgfer567fgh\" src=\"" + content + "\" width=\"" + parseInt(width) + "px" + "\" height=\"" + parseInt(height) + "px" + "\"   scrolling='no' frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>", options);
            var ieset = navigator.userAgent;
            if (ieset.indexOf("MSIE 6.0") > -1)//浏览器判断 如果是IE6
                setTimeout('window.parent[\'sdfgfer567fgh\'].location.reload();', 0); //执行这一方法
        }
    });
    var promptDefault = {
        title: "对话框",
        shut: "×",
        index: 3500,
        opacity: 0.2,
        width: "auto",
        height: "auto",
        bar: true, //是否显示标题栏
        bg: true, //是否显示半透明背景
        btnclose: true, //是否显示关闭按钮
        fix: false, //是否弹出框固定在页面上
        bgclose: false, //是否点击半透明背景隐藏弹出框
        drag: false, //是否可拖拽
        ajaxTagA: true, //是否a标签默认Ajax操作
        protect: "auto", //保护装载的内容
        onshow: $.noop, //弹窗显示后触发事件
        onclose: $.noop, //弹窗关闭后触发事件
        delay: 0 //弹窗打开后关闭的时间, 0和负值不触发
    };
})(jQuery);
