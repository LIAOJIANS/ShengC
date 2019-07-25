mui.init({
    swipeBack: false
});
$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    mui('.mui-scroll-wrapper').scroll({
        indicators: true, //是否显示滚动条
        deceleration: 0.0005
    });
    $(".del").click(function () {
        mui.confirm("测试未完成，是否删除？", "提示", function (e) {
            if(e.index === 1) {
                mui.toast("删除成功！");
            }
        })
    })
});
