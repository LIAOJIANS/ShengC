$(function () {
    //本地缓存
    var name = localStorage.username;
    function goLoin(url) {
        if(name!=null) {
            location.href = url;
        } else {
            mui.confirm("您还未登录是否现在登录？", "提示", function (e) {
                if(e.index === 1) {
                    location.href = "login.html";
                }
            })
        }
    }
    $(".setup").click(function (){
        goLoin("personal_imfor.html");
    });
    $(".shezhi").click(function (){
        goLoin("setup.html");
    });
    $(".collection").click(function (){
        goLoin("collection.html");
    });
    $(".notice").click(function (){
        goLoin("notice.html");
    });
    $(".sign_in").click(function (){
        goLoin("sign_in.html");
    });
    if(name != null) {
         console.log(name);
        $.ajax({
            url: "http://a.fhyiii.cn/user/searchInfo",
            type: "post",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: {
                telphone:name,
            },
            success: function (data) {
                console.log(data);
                if(data.status === "false" || data.status === 0) {
                    var arrs = "";
                    $(".tiaozhuan a").remove();
                    arrs += '<a href="login.html" class="personal_login">登录</a>';
                    arrs += '<a href="register.html" class="personal_register">注册</a>';
                    $(".tiaozhuan").html(arrs);
                } else {
                    $(".tiaozhuan a").remove();
                    var arr = "<a href='#' class='p_username'>"+data.data.u_name+"</a>";
                    var img = "<img src="+data.data.logo+" class='ueser_tx' />"
                    $(".tiaozhuan").html(arr);
                    $(".dbtn2").html(img);
                }
            }
        });
    } else {
        mui.toast("请登录！");
    }
});
function sc() {
    var data = new FormData($('#form1')[0]); 
    console.log(data);
    $.ajax({  
        url: "http://a.fhyiii.cn/user/upLogo",
        type: 'POST',  
        data: data,
        cache: false,  
        processData: false,  
        contentType: false,
        dataType: 'json', 
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            if(data.status === "false") {
                mui.toast("修改失败");
            } else {
                mui.toast("修改成功");
                setTimeout(function () {
                    location.href = "personal.html"
                },1500);
            }
        }  
    });
}
