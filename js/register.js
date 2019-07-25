$(function () {
    var booluser =  $(".user");
    var boolpwd = $(".password");
    var booltel = $(".tel");
    var boolyzm = $(".yzm");
    //判断用户名是否小于6或者大于16
    booluser.blur(function () {
        if(booluser.val().length <= 6 || booluser.val().length >= 16){
            mui.toast("您输入的账户不能小于6位或者小于16位");
            var username = booluser.val();
        }
    });

    //判断用户输入密码是否小于6或者大于16
    boolpwd.blur(function () {
        if(boolpwd.val().length <= 6 || boolpwd.val().length >= 16){
            mui.toast("您输入的密码不能小于6位或者小于16位");
        }
    });

    //判断验证码是否符合规格
    boolyzm.blur(function () {
        if(boolyzm.val().length > 6 || boolyzm.val().length < 6){
            $(".SL_yzm").disabled = true;
            mui.toast("请输入正确的验证码");

        }
    })

    //设置一分钟的时间
    var countdown = 60;
    //验证码倒计时60秒
    function settime(val) {
        if (countdown === 0) {
            $(".SL_yzm").css(
                "background","-webkit-linear-gradient(left, red, yellow, green, blue, purple, pink)",
            );
            $(".SL_yzm").text("");
            val.removeAttribute("disabled");
            countdown = 60;
        } else {
            val.setAttribute("disabled", true);
            countdown--;
            $(".SL_yzm").css("background","transparent");
            $(".SL_yzm").text(countdown);
            setTimeout(function() {
                settime(val)
            },1000)
        }
    }

    //访问验证码API
    $(".SL_yzm").click(function () {
        var thiss = this;
        var tel = booltel.val();
        if(tel.length > 11 || tel.length < 11) {
            mui.toast("请输入正确的电话号");
        } else {
            var booluserval = booltel.val();
            $.ajax({
                url: "http://a.fhyiii.cn/user/checkTel",
                dataType: "json",
                type: "post",
                data: {
                    telphone: booluserval
                },
                success: function (data) {
                    console.log(data)
                    if(data.status === "false") {
                        mui.toast("手机号已被注册");
                    } else {
                        settime(thiss);
                        $.ajax({
                            url: "http://a.fhyiii.cn/user/getSms",
                            type: "post",
                            dataType: "json",
                            data: {
                                mobile: tel
                            },
                            success: function (data) {
                                mui.toast(data.message);
                            }
                        });
                    }
                }
            });
        }
    });

    //访问注册API
    $(".btn").click(function () {
        var tel = booltel.val();
        var user =  booluser.val();
        var passwd = boolpwd.val();
        var yam = boolyzm.val();
        $.ajax({
            url: "http://a.fhyiii.cn/user/register",
            type: "post",
            dataType: "json",
            data: {
                u_name: user,
                u_pwd: passwd,
                telphone : tel,
                yzm : yam
            },
            success:function (data) {
                if(data.status === "true") {
                    mui.alert(data.message);
                    setTimeout(function () {
                        location.href = "login.html";
                    },1500);
                }else {
                    mui.alert(data.message);
                }
            }
        });
    });
    
    //返回上一层
    var sl_return = document.getElementsByClassName('return')[0];
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
    })
})