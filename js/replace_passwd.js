$(function () {
    // 返回操作的设置
    // 获取return图标的DOM
    var sl_return = document.querySelector('.return');
    sl_return.addEventListener("touchstart", function () {

        window.history.go(-1);

    });
    mui('.mui-input-row input').input();
    //获取新秘密
    var pass_one = $(".pass_one");
    //获取再次新密码
    var pass_two = $(".pass_two");
    //获取验证码
    var yzm = $(".yzm");

    var pass_yzm = $(".pass_yzm");

    var ru = $(".ru");
    var arr = null;
    pass_one.blur(function () {
        if(pass_one.val().length === 0) {
            mui.toast("请输入密码");
            arr = 0;
        } else {
            arr = 1;
        }
    });

    pass_two.blur(function () {
        if(pass_two.val() === pass_one.val()) {
            arr = 1;
        } else {
            mui.toast("两次密码不相等");
            arr = 0;
        }
    })

    //设置一分钟的时间
    var countdown = 60;
    //验证码倒计时60秒
    function settime(val) {
        if (countdown === 0) {
            $(".yzm").text("获取验证码");
            val.removeAttribute("disabled");
            countdown = 60;
        } else {
            val.setAttribute("disabled", true);
            countdown--;
            $(".yzm").text(countdown);
            setTimeout(function() {
                settime(val);
            },1000);
        }
    }

    //获取验证码
    var name = localStorage.username;
    $(".yzm").click(function () {
        settime(this);
        $.ajax({
            url: "http://a.fhyiii.cn/user/getSms",
            type: "post",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: {
                mobile: name
            },
            success: function (data) {
                mui.toast("以发送至绑定手机");
            }
        });
    });
    
    $(".ru").click(function () {
        var pass_ones = pass_one.val();
        var pass_yzms = pass_yzm.val();
        console.log(pass_yzms)
        console.log(arr)
        if(arr === 1) {
           $.ajax({
               url: "http://a.fhyiii.cn/user/changeKey",
               type: "post",
               dataType: "json",
               xhrFields: {
                   withCredentials: true
               },
               data: {
                   telphone: name,
                   u_pwd: pass_ones,
                   yzm: pass_yzms
               },
               success:function (data) {
                   if(data.status === "true") {
                       mui.toast("修改成功，即将返回登录页");
                       setTimeout(function () {
                           location.href = "login.html"
                       },1500);
                   } else {
                       mui.toast("修改失败");
                   }
               }
           });
       } else {
            mui.alert("请输入正确的格式");
        }
    })
})