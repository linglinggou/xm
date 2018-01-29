(function ($) {
    $.fn.ratestar = function (options) {
        $(this).each(function () {
            $.ratestar($(this), options);
        });
    };
    $.ratestar = function (element, options) {
        if (element.length == 0) {
            return;
        }
        var intArg = 0;
        var s = $.extend({}, settings, options || {});
        element.find("li").each(function () {
            $(this).hover(function () {
                s.curr = $(this).index();
                $.ratestar.floatStar(s, element, $(this).index());
            }, function () {
                $.ratestar.floatStar(s, element);
            });
            $(this).click(function () {
                if (s.Enabled) {
                    element.find("li").unbind("hover");
                    element.find("li").unbind("click");
                }
            });
        });
    }
    $.extend($.ratestar, {
        floatStar: function (options, element, index) {
            var idx = index || options.curr;
            for (var i = 1; i < element.find("li").size(); i++) {
                if (i <= idx) {
                    element.find("li").eq(i).addClass("on");
                } else
                    element.find("li").eq(i).removeClass("on");
            }
        }
    });
    var settings = { curr: 0, MaxStar: 20, StarWidth: 23, CurrentStar: 5, Enabled: true };
})(jQuery);