$(function () {
    var btn = document.getElementsByClassName('btn')[0];
    btn.addEventListener("touchstart", function () {
        var user = $(".user").val();
        var pasd = $(".password").val();
        if(!user) {
            mui.toast("请输入用户名");
            return;
        }
        if(!pasd) {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            url:"http://a.fhyiii.cn/user/login",
            type:"post",
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            data:{telphone:user,u_pwd:pasd},
            success: function(data) {
                if(data.status === "true") {
                    mui.toast(data.message);
                    console.log(data);
                    setTimeout(function () {
                        // location.href = "personal.html?name=" + data.data.u_name;
                        location.href = "personal.html";
                        localStorage.username = data.data.telphone;
                    },1500);
                } else {
                    mui.alert(data.message);
                }
            }
        })
    });
    var sl_return = document.getElementsByClassName('return')[0];
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
    })
})