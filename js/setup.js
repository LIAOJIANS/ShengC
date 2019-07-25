$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    // 退出登录
    var name = localStorage.username;
    $(".setup").on("click",function () {
        if(name != null) {
            mui.confirm("是否退出登录？", "提示", function (e) {
                if(e.index === 1) {
                    mui.toast("退出登录成功，即将返回首页");
                    localStorage.removeItem("username");
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 1500);
                }
            })
        }
    });
    $(".replace_passwd").on("click",function () {
        if(name != null) {
            location.href = "replace_passwd.html";
        }
    });
});
