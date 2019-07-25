$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    var name = getParamsByUrl(location.href, 'keyword');
    $.ajax({
        url: "http://a.fhyiii.cn/goods/selectgoods",
        type: "post",
        data: {
            goodsname:name
        },
        success:function (data) {
            if(data.status === 1) {
                var html = template("historyR",data);
                $("#seach_R").html(html);
            } else {
                var arr = "";
                arr = "<p class='none'>没有此商品信息哟</p>"
                $(".mui-content").html(arr);
            }
        }
    });
});
function getParamsByUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    var param = params.split('&');
    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        if (current[0] === name) {
            return current[1];
        }
    }
    return null;
}