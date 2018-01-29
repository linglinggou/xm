+function () {
    "use strict";
    var lnglobal = {
        getNamedObject: function (name, context) {
            /// <summary>返回给定属性名或带域名的属性名的值。</summary>
            /// <param name="name" type="String">属性名名</param>
            /// <param name="context" type="object">该对象所属的上下文</param>
            /// <returns type="object">该属性的值</returns>

            var namespaces = name.split(".");
            var prop = namespaces.pop();
            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }

            return context[prop];
        },

        jiexin: {
            calculateMonthPayment: function (goodPrice, term) {
                var amount = term == 1 ? 0 : 0.01;
                var installmentAmount = Math.round((goodPrice / term) + (goodPrice * amount));
                var totalAmountPaid = installmentAmount * term;
                var totalOverpayment = totalAmountPaid - goodPrice;
                return {
                    installmentAmount: installmentAmount,
                    totalAmountPaid: totalAmountPaid,
                    totalOverpayment: totalOverpayment
                }
            }
        }
    };

    window.lnglobal = lnglobal;
} ();

+function () {
    "use strict";

    String.prototype.format = function (args) {
        /// <summary>返回格式化的字体串。"test {0} {1} {n}"</summary>
        /// <param name="args" type="String">格式化值</param>
        /// <returns type="object">格式化后的字符串</returns>

        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);

                        reg = new RegExp("(\%7B" + key + "\%7D)", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出

                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);

                        reg = new RegExp("(\%7B)" + i + "(\%7D)", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };

    String.prototype.emptyOrWhitespace = function () {
        /// <summary>判断字符串是否为空或只含有空格</summary>

        var reg = /^(\s*)$/;
        return reg.test(this);
    };

    String.prototype.testNum = function (negative) {
        /// <summary>判断字符串是否是数字</summary>
        /// <param name="negative" type="bool">是否进行负数判断</param>
        /// <returns type="bool">true：数字 false：不是数字</returns>

        if (negative) {
            return /^((\d+)|(\-\d+)|(\+\d+))$/.test(this.val());
        }
        else {
            return /^\d+$/.test(this.val());
        }
    };

    String.prototype.testMoney = function (negative) {
        /// <summary>判断字符串是否是价格数值（含两位小数点）</summary>
        /// <param name="negative" type="bool">是否进行负数判断</param>
        /// <returns type="bool">true：成功 false：失败</returns>

        if (negative) {
            return /^([\+\-]{0,1}((\d+)|(\d+\.\d{1,2})))$/.test(this.val());
        }
        else {
            return /^((\d+)|(\d+\.\d{1,2}))$/.test(this.val());
        }
    };

    Array.prototype.findObject = function (exp, val) {
        /// <summary>返回符合给定表达式值的对象位置</summary>
        /// <param name="exp" type="String">表达式</param>
        /// <param name="val" type="String">表达式值</param>
        /// <returns type="Number">该对象在数组中的位置（-1：未找到）</returns>

        for (var i = 0; i < this.length; i++) {
            if (lnglobal.getNamedObject(exp, this[i]) == val) {
                return i;
            }
        }

        return -1;
    };

    Array.prototype.getObject = function (exp, val) {
        /// <summary>返回符合给定表达式值的对象</summary>
        /// <param name="exp" type="String">表达式</param>
        /// <param name="val" type="String">表达式值</param>
        /// <returns type="Object">该对象在数组中的位置（null：未找到）</returns>

        for (var i = 0; i < this.length; i++) {
            if (lnglobal.getNamedObject(exp, this[i]) == val) {
                return this[i];
            }
        }

        return null;
    };

    Array.prototype.setObject = function (exp, val, obj) {
        /// <summary>设置符合条件的对象值</summary>
        /// <param name="exp" type="String">表达式</param>
        /// <param name="val" type="String">表达式值</param>
        /// <param name="obj" type="Object">新对象值</param>
        /// <returns type="bool">true：成功 false：失败</returns>

        for (var i = 0; i < this.length; i++) {
            if (lnglobal.getNamedObject(exp, this[i]) == val) {
                this[i] = obj;
                return true;
            }
        }

        return false;
    };

    Array.prototype.removeObject = function (exp, val) {
        /// <summary>删除符合条件的对象</summary>
        /// <param name="exp" type="String">表达式</param>
        /// <param name="val" type="String">表达式值</param>
        /// <returns type="bool">true：成功 false：失败</returns>

        for (var i = 0; i < this.length; i++) {
            if (lnglobal.getNamedObject(exp, this[i]) == val) {
                this.splice(i, 1);
                return true;
            }
        }

        return false;
    };
} ();

+function () {
    "use strict";
    var radio = function (selector) {
        var radioObj = function (selector) {
            var self = this;
            var radio = $(selector).first();
            var radio_items = null;
            var isinit = false;
            var find_select = false;

            // 选中项的 CSS 类名为：ln-radio-selected
            // 禁用项的 CSS 类名为：ln-radio-disabled
            var sltcls = "ln-radio-selected";
            var disablecls = "ln-radio-disabled";

            // 值属性名称
            var valuedata = "data-lnr-value";

            // 当前选中的项索引（-1为未选中任何项）
            var _selectedIndex = -1;

            // 当前选中的项值
            var _selectedValue = null;

            var itemclk = function (evt) {
                var nnn = ["1", "3", "9", "12"];

                for (var i = 0; i < radio_items.length; i++) {
                    if (radio_items[i] == this) {
                        //_hmt.push(['_trackEvent','e-loan','choose', nnn[i] + ' month']);
                        _czc.push(['_trackEvent', 'e-loan', 'choose', nnn[i] + ' month']);
                        _paq.push(['trackEvent', 'e-loan', 'choose', nnn[i] + ' month']);
                        ga('send', 'event', 'e-loan', 'choose', nnn[i] + ' month');
                        self.selectedIndex(i);
                    }
                }
            };

            var toggleClick = function (elm, add) {
                if (add) {
                    $(elm).on("click", itemclk);
                }
                else {
                    $(elm).off("click", itemclk);
                }
            };

            this.selectedIndex = function (idx) {
                if (idx == undefined || isNaN(idx)) {
                    return _selectedIndex;
                }

                // 超出总数量
                if (idx >= radio_items.length) {
                    return
                }

                if (idx === _selectedIndex) {
                    return;
                }

                if (_selectedIndex !== -1) {
                    // 还原上一个选择项
                    $(".{0}".format(sltcls), radio).removeClass(sltcls);
                }

                if (idx === -1) {
                    // 清空选择项
                    $(radio_items).removeClass(sltcls);
                    _selectedIndex = -1;
                    _selectedValue = null;
                }
                else {
                    // 选择当前项
                    $($(radio_items).get(idx)).addClass(sltcls);
                    _selectedIndex = idx;
                    _selectedValue = $($(radio_items).get(idx)).attr(valuedata);
                }
            };

            this.selectedValue = function (val) {
                if (val == undefined || val == null || $.type(val) != "string") {
                    return _selectedValue;
                }

                if (val === _selectedValue) {
                    return;
                }

                for (var i = 0; i < radio_items.length; i++) {
                    if ($(radio_items[i]).attr(valuedata) === val) {
                        this.selectedIndex(i);
                        break;
                    }
                }
            };

            this.disabledByValue = function (val, disabled) {
                if (val == undefined || val == null || $.type(val) != "string") {
                    return;
                }

                for (var i = 0; i < radio_items.length; i++) {
                    if ($(radio_items[i]).attr(valuedata) === val) {
                        if (disabled) {
                            if (i == _selectedIndex) {
                                this.selectedIndex(-1);
                            }

                            if (!$(radio_items[i]).hasClass(disablecls)) {
                                $(radio_items[i]).addClass(disablecls);
                                toggleClick(radio_items[i], false);
                            }
                        }
                        else {
                            if ($(radio_items[i]).hasClass(disablecls)) {
                                $(radio_items[i]).removeClass(disablecls);
                                toggleClick(radio_items[i], true);
                            }
                        }

                        break;
                    }
                }
            };

            this.disabled = function (disabled) {
                for (var i = 0; i < radio_items.length; i++) {
                    if (disabled) {
                        if (!$(radio_items[i]).hasClass(disablecls)) {
                            $(radio_items[i]).addClass(disablecls);
                            toggleClick(radio_items[i], false);
                        }

                        this.selectedIndex(-1);
                    }
                    else {
                        if ($(radio_items[i]).hasClass(disablecls)) {
                            $(radio_items[i]).removeClass(disablecls);
                            toggleClick(radio_items[i], true);
                        }
                    }
                }
            }

            // 判断对象是否为空
            if (radio.length == 0) {
                return;
            }

            // 判断是否有单选项
            radio_items = radio.children();
            if (radio_items.length == 0) {
                return;
            }

            // 筛选选中或禁用的项（如果有多个选择，选择第一个），并添加点击映射
            radio_items.each(function (index, item) {
                item = $(item);

                if (item.hasClass(disablecls)) {
                    toggleClick(item, false);
                    return;
                }

                if (item.hasClass(sltcls)) {
                    if (!find_select) {
                        _selectedIndex = index;
                        find_select = true;
                    }
                }

                toggleClick(item, true);
            });

            this.selectedIndex(_selectedIndex);
            isinit = true;
        };

        return new radioObj(selector);
    };

    window.lnradio = radio;
} ();