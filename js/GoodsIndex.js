var shopPic, activeIndex = 0;
$(function () {
    //--
    if ($('.indexFlashLayer').length > 0) {
        indexFlashLayerFun();
        $(window).resize(function () {
            indexFlashLayerFun();
        })
    }
    //--
    $('.tabContentDiv').find('.tabContent:first').show();
    $('.tab').find('li:first').addClass("liNows");
    $('.tab').each(function (i) {
        $(this).find('li').each(function (ii) {
            $(this).hover(function () {
                if (!$(this).hasClass("liNows"))
                    $(this).addClass("liNow")
            }, function () {
                if (!$(this).hasClass("liNows"))
                    $(this).removeClass("liNow")
            }
               );
        })
    });
    $('.tab').each(function (i) {
        $(this).find('li').each(function (ii) {
            $(this).click(
			function () {
			    $('.tab').eq(i).find('li').removeClass('liNow');
			    $('.tab').eq(i).find('li').removeClass('liNows');
			    $(this).addClass('liNow');
			    $(this).addClass('liNows');
			    $('.tabContentDiv').eq(i).find('.tabContent').hide();
			    $('.tabContentDiv').eq(i).find('.tabContent').eq(ii).show();


			    if ($('.tabContentDiv').eq(i).find('.tabContent').eq(ii).text().trim() == "") {

			        $.ajax({
			            type: "POST",
			            url: "/lib/xml-rpc/PageGoods.ashx",
			            data: "id=" + $(this).attr("dataid"),
			            dataType: "html",
			            success: function (data) {
			                $('.tabContentDiv').eq(i).find('.tabContent').eq(ii).html(data);
			                $('.floorSide').find('.tabContent').each(function (i) {
			                    if ($(this).find('li').hasClass('liNow')) {
			                        $(this).find('li').removeClass('liNow');
			                    }
			                    $('.floorSide').find('.tabContent').find('li:first').addClass('liNow');
			                    $(this).find('li').hover(
			        		                           function () {
			        		                               $('.floorSide').find('.tabContent').eq(i).find('li').removeClass('liNow');
			        		                               $(this).addClass('liNow');
			        		                           },
			        		                           function () { }
			        		                        )
			                });
			            }
			        });
			    }
			}
		)
        })
    })

    $('.tabss').each(function (i) {
        $(this).find('li').each(function (ii) {
            $(this).hover(
			function () {
			    $('.tabss').eq(i).find('li').removeClass('liNow');
			    $(this).addClass('liNow');
			    $('.floorSide').find('.tabContent').hide();
			    $('.floorSide').find('.tabContent').eq(ii).show();
			}
		)
        })
    })
    //--
    $('.floorSide').find('.tabContent').find('li:first').css('background', 'none');
    $('.floorSide').find('.tabContent').find('li:first').addClass('liNow');
    $('.floorSide').find('.tabContent').each(function (i) {
        $(this).find('li').hover(
		   function () {
		       $('.floorSide').find('.tabContent').eq(i).find('li').removeClass('liNow');
		       $(this).addClass('liNow');
		   },
		   function () { }
		)
    })
    //--
    $('.topDiv').find('ul').find('li:last').css('background', 'none');
    $('.commentPart2').find('li:last').css('border', '0px');
    //--

    //--
    resizeFun();
    $(window).resize(function () {
        resizeFun();
    })
    //--
    var fadeFlashTime = new Array();
    $('.fadeFlash').find('li:first').fadeIn(500);
    $('.fadeFlash').each(function (i) {
        $(this).find('.btnDiv').find('span').eq(0).addClass('spanNow');
        if ($(this).find('li').size() <= 1) return;
        fadeFlashTime[i] = setInterval("fadeFlashFun(" + i + ")", 5000);

        $(this).find('.btnDiv').find('span').each(function (ii) {
            $(this).hover(
			function () {
			    clearInterval(fadeFlashTime[i]);
			    $('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
			    $(this).addClass('spanNow');
			    $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
			    fadeFlashNow[i] = ii;
			    $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
			    fadeFlashTime[i] = setInterval("fadeFlashFun(" + i + ")", 5000);
			},
			function () { }
				)
        })
        $(this).find('.rightBtn').click(function () {
            clearInterval(fadeFlashTime[i]);
            $('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
            $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
            if (fadeFlashNow[i] < $('.fadeFlash').eq(i).find('li').length - 1) {
                fadeFlashNow[i]++;
            } else {
                fadeFlashNow[i] = 0;
            }
            $('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
            $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
            fadeFlashTime[i] = setInterval("fadeFlashFun(" + i + ")", 5000);
        })
        $(this).find('.leftBtn').click(function () {
            clearInterval(fadeFlashTime[i]);
            $('.fadeFlash').eq(i).find('.btnDiv').find('span').removeClass('spanNow');
            $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeOut(500);
            if (fadeFlashNow[i] > 0) {
                fadeFlashNow[i]--;
            } else {
                fadeFlashNow[i] = $('.fadeFlash').eq(i).find('li').length - 1;
            }
            $('.fadeFlash').eq(i).find('.btnDiv').find('span').eq(fadeFlashNow[i]).addClass('spanNow');
            $('.fadeFlash').eq(i).find('li').eq(fadeFlashNow[i]).fadeIn(500);
            fadeFlashTime[i] = setInterval("fadeFlashFun(" + i + ")", 5000);
        })
    });
    //--
    $('.newsFlash').find('.list1').find('li').each(function (i) {
        $(this).hover(
		   function () {
		       clearInterval(fadeFlashTime[0]);
		       $('.fadeFlash').eq(0).find('li').eq(fadeFlashNow[0]).fadeOut(500);
		       fadeFlashNow[0] = i;
		       $('.fadeFlash').eq(0).find('li').eq(fadeFlashNow[0]).fadeIn(500);
		       fadeFlashTime[0] = setInterval("fadeFlashFun(" + 0 + ")", 5000);
		   },
		   function () { }
		)
    })

    $('.hoverList').find('li:first').addClass('liNow');
    $('.hoverList').each(function (i) {
        $(this).find('li').hover(
		   function () {
		       $('.hoverList').eq(i).find('li').removeClass('liNow');
		       $(this).addClass('liNow');
		   },
		   function () { }
		)
    })
    //--
    $('.rightBtn2').find('li').hover(
	    function () {
	        $('.rightBtn2').addClass('rightBtn2Now');
	        $(this).find('.a1').show();
	    },
		function () {
		    $(this).find('.a1').hide();
		    $('.rightBtn2').removeClass('rightBtn2Now');
		}
	)
    //--
    $('.classSearch').find('.div0').find('li').click(function () {
        $(this).remove();
        if ($('.classSearch').find('.div0').find('li').length == 0) {
            $('.classSearch').find('.div0').hide();
        }
    })
    $('.classSearch').find('.list').find('li').each(function (i) {
        if (i <= 6) {
            $(this).show();
        }
    })
    $('.classSearchMore').find('a').toggle(
	    function () {
	        $('.classSearch').find('.list').find('li').show();
	        $(this).html("隐藏部分");
	        $(this).addClass('aNow');
	    },
		function () {
		    $('.classSearch').find('.list').find('li').hide();
		    $(this).html("更多选项");
		    $(this).removeClass('aNow');
		    $('.classSearch').find('.list').find('li').each(function (i) {
		        if (i <= 6) {
		            $(this).show();
		        }
		    })
		}
	)
    //--
    $('.Sequence').find('.li_02').find('input').click(function () {
        $('.classPriceInput').css('left', $('.Sequence').find('.li_02').offset().left + 75);
        $('.classPriceInput').css('top', $('.Sequence').find('.li_02').offset().top - 15);
        $('.classPriceInput').show();
    })
    $('.classPriceInput').find('.btn1').click(function () {
        $('.classPriceInput').hide();
    })
    //--
    $('#phoneIndexPart2').find('.tabContent').each(function (i) {
        $(this).find('.rightBtn').click(function () {
            imgScrollRight2($('#phoneIndexPart2').find('.list').eq(i), $('#phoneIndexPart2').find('.list').eq(i).find('li').length - 5, 212, i);
        })
        $(this).find('.leftBtn').click(function () {
            imgScrollLeft2($('#phoneIndexPart2').find('.list').eq(i), $('#phoneIndexPart2').find('.list').eq(i).find('li').length - 5, 212, i);
        })
    })

    //--
    $('.addressSelect').click(function () {
        $('.addressSelect').addClass('addressSelectNow');
        $('.addressLayer').css('left', $(this).offset().left);
        $('.addressLayer').css('top', $(this).offset().top + 24);
        $('.addressLayer').show();
    })
    $('.addressLayer').hover(
	    function () { },
		function () {
		    $('.addressSelect').removeClass('addressSelectNow');
		    $('.addressLayer').hide();
		}
	)
    //--
    $('.showPart1').find('.rightBtn').click(function () {
        imgScrollRight2($('.showPart1').find('.list'), $('.showPart1').find('li').length - 5, 70, 1);
    })
    $('.showPart1').find('.leftBtn').click(function () {
        imgScrollLeft2($('.showPart1').find('.list'), $('.showPart1').find('li').length - 5, 70, 1);
    })
    $('.showPart1').find('.list').find('li').click(function () {
        $('.showPart1').find('.list').find('li').removeClass('liNow');
        $(this).addClass('liNow');
        $('.showPart1').find('.bigImg').find('img').attr('src', $(this).find('img').attr('src'));
    })
    //--
    $('.showPart2').find('.list1').find('li').toggle(
	    function () {
	        $(this).addClass('liNow');
	    },
		function () {
		    $(this).removeClass('liNow');
		}
	)
    $('.showPart2').find('.list2').find('li').toggle(
	    function () {
	        $(this).addClass('liNow');
	    },
		function () {
		    $(this).removeClass('liNow');
		}
	)
    //--
    $('.commentPart2').find('li').each(function (i) {
        $(this).find('.touxiang').hover(
		    function () {
		        $('.commentPart2').find('li').eq(i).find('.touxiangMsg').show();
		    },
			function () {
			    $('.commentPart2').find('li').eq(i).find('.touxiangMsg').hide();
			}
		)
        $(this).find('.touxiangMsg').hover(
		    function () {
		        $(this).show();
		    },
			function () {
			    $(this).hide();
			}
		)
    })
    //--
    $('.showPart1').find('.fx1').hover(
	    function () {
	        $(this).hide();
	        $('.showPart1').find('.fx2').show();
	    },
		function () { }
	)
    $('.showPart1').find('.fx2').hover(
	    function () { },
		function () {
		    $(this).hide();
		    $('.showPart1').find('.fx1').show();
		}
	)
    //--
    $('.cardInPart2').find('.rightBtn').click(function () {
        imgScrollRight2($('.cardInPart2').find('.list'), $('.cardInPart2').find('li').length - 5, 169, 1);
    })
    $('.cardInPart2').find('.leftBtn').click(function () {
        imgScrollLeft2($('.cardInPart2').find('.list'), $('.cardInPart2').find('li').length - 5, 169, 1);
    })
    //--
    $('.newSideComment').find('.more').click(function () {
        $('.newSideComment').find('.list').animate({ scrollTop: $('.newSideComment').find('.list').scrollTop() + 200 }, "slow");
    })
    //--
    $('.pageSelect').each(function (i) {
        $(this).click(function () {
            $('.pageSelectLayer').eq(i).css('left', $(this).offset().left - 10);
            $('.pageSelectLayer').eq(i).css('top', $(this).offset().top - 5);
            $('.pageSelectLayer').eq(i).show();
        })
    })
    $('.pageSelectLayer').each(function (i) {
        $(this).hover(
		   function () { },
		   function () {
		       $(this).hide();
		   }
		)
    })
    //--
    $('.giftRecommend').find('.tabContent').each(function (i) {
        $(this).find('.rightBtn').click(function () {
            imgScrollRight2($('.giftRecommend').find('.list').eq(i), $('.giftRecommend').find('.list').eq(i).find('li').length - 6, 172, i);
        })
        $(this).find('.leftBtn').click(function () {
            imgScrollLeft2($('.giftRecommend').find('.list').eq(i), $('.giftRecommend').find('.list').eq(i).find('li').length - 6, 172, i);
        })
    })
    if ($("#show_pic>li").size() > 1) {
        shopPic = setInterval("fadeFlash(0)", 5000);
        $('#icon_num').find('li').each(function (ii) {
            $(this).hover(
            function () {
                clearInterval(shopPic, true);
                $('#icon_num>li').removeClass('active');
                $("#show_pic>li").eq(activeIndex).fadeOut(500);
                activeIndex = ii;
                $("#show_pic>li").eq(ii).fadeIn(500);
                $('#icon_num>li').eq(ii).addClass('active');
            },
            function () {
                shopPic = setInterval("fadeFlash(" + ii + ")", 5000);
            })
        });
    };
    calcCart();
})
function fadeFlash(i) {
    $('#icon_num').find('li').removeClass('active');
    $("#show_pic").find('li').eq(activeIndex).fadeOut(500);
    if (activeIndex < $('#show_pic>li').length - 1) {
        activeIndex++;
    } else {
        activeIndex = 0;
    }
    $("#show_pic").find('li').eq(activeIndex).fadeIn(500);
    $('#icon_num').find('li').eq(activeIndex).addClass('active');
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
function calcCart() {   
    var YimaiCart = getcookie("cart");
    if (YimaiCart != "") {
        var pArray = YimaiCart.split(',');
        $(".Cart_Count").text(pArray.length);
    }
}
