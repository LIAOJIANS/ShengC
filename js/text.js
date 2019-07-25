var page = 1;
var html = "";
var id = "";
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false,
        // bounce: false
    });
    $.ajax({
        url: "http://a.fhyiii.cn/index/Paper/showState",
        type: "post",
        success: function (data) {
            console.log(data)
            $(".free_admission").text(data.data[0].goods_type);
            $(".SHL").text(data.data[1].goods_type);
            $(".character").text(data.data[2].goods_type);
            $(".eq").text(data.data[3].goods_type);
            $(".iq").text(data.data[4].goods_type);
        }
    })
    mui.init({
        pullRefresh : {
            container: '.SL_all',
            //向下拉的时候刷新
            up : {
                height:50,
                auto:true,
                contentrefresh : "正在加载...",
                contentnomore:'没有更多数据了',
                callback : getData
            }
        }
    });

    $('.free_admission').tap(function () {
        var html = "";
        $.ajax({
            url: 'http://a.fhyiii.cn/goods/goodslist',
            type: 'post',
            data: {
                page: 1,
                num: 7,
                goods_type: 1,
                state: "收费"
            },
            success: function (data) {
                console.log(data);
                if(data.status === 1) {
                    html += template("historyR2",data);
                    $("#text2").html(html);
                    $('.xiangq').tap(function () {
                        var ids = $(this).find(".id").text()
                        location.href = "test_purchase.html"
                        localStorage.id = ids
                    })
                }
            }
        })
    });
    $('.SHL').tap(function () {
        var html = "";
        $.ajax({
            url: 'http://a.fhyiii.cn/goods/goodslist',
            type: 'post',
            data: {
                page: 1,
                num: 7,
                goods_type: 2,
                state: "收费"
            },
            success: function (data) {
                console.log(data);
                if(data.status === 1) {
                    html += template("historyR3",data);
                    $("#text3").html(html);
                    $('.xiangq').tap(function () {
                        var ids = $(this).find(".id").text()
                        location.href = "test_purchase.html"
                        localStorage.id = ids
                    })
                }
            }
        })
    });
    $('.character').tap(function () {
        var html = "";
        $.ajax({
            url: 'http://a.fhyiii.cn/goods/goodslist',
            type: 'post',
            data: {
                page: 1,
                num: 7,
                goods_type: 3,
                state: "收费"
            },
            success: function (data) {
                console.log(data);
                if(data.status === 1) {
                    html += template("historyR4",data);
                    $("#text4").html(html);
                    $('.xiangq').tap(function () {
                        var ids = $(this).find(".id").text()
                        location.href = "test_purchase.html"
                        localStorage.id = ids
                    })
                }
            }
        })
    });
    $('.eq').tap(function () {
        var html = "";
        $.ajax({
            url: 'http://a.fhyiii.cn/goods/goodslist',
            type: 'post',
            data: {
                page: 1,
                num: 7,
                goods_type: 4,
                state: "收费"
            },
            success: function (data) {
                console.log(data);
                if(data.status === 1) {
                    html += template("historyR5",data);
                    $("#text5").html(html);
                    $('.xiangq').tap(function () {
                        var ids = $(this).find(".id").text()
                        location.href = "test_purchase.html"
                        localStorage.id = ids
                    })
                }
            }
        })
    });
    $('.iq').tap(function () {
        var html = "";
        $.ajax({
            url: 'http://a.fhyiii.cn/goods/goodslist',
            type: 'post',
            data: {
                page: 1,
                num: 7,
                goods_type: 5,
                state: "免费"
            },
            success: function (data) {
                console.log(data);
                if(data.status === 1) {
                    html += template("historyR6",data);
                    $("#text6").html(html);
                    $('.xiangq').tap(function () {
                        var ids = $(this).find(".id").text()
                        location.href = "test_purchase.html"
                        localStorage.id = ids
                    })
                }
            }
        })
    })
});
function getData () {
    var Sthis = this;
    $.ajax({
        url: 'http://a.fhyiii.cn/goods/goodslist',
        type: 'post',
        data: {
            page: page++,
            num: 7,
            goods_type: "",
            state: "收费"
        },
        success: function (data) {
            if(data.status === 1) {
                html += template("historyR",data);
                $("#text1").html(html);
                //告诉上拉加载组件当前数据获取完毕
                Sthis.endPullupToRefresh(false);
                $('.xiangq').tap(function () {
                    var ids = $(this).find(".id").text();
                    location.href = "test_purchase.html"
                    localStorage.id = ids
                })
            } else {
                Sthis.endPullupToRefresh(true);
            }

        }
    });
}





// //向上拉的时候刷新
// down : {
//     height:50,//可选,默认50.触发下拉刷新拖动距离,
//     auto: true,//可选,默认false.首次加载自动下拉刷新一次
//     contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//     contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//     contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//     callback : Data //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
// }