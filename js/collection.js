$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    $(".del").click(function () {
        mui.confirm("是否删除该测试？", "提示", function (e) {
            if(e.index === 1) {
                mui.toast("删除成功！");
            }
        })
    })
})