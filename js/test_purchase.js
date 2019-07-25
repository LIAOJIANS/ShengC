$(function () {
    var id = localStorage.id;
    var html = $("#rongqi").html();
    console.log(id)
    $.ajax({
        url: 'http://a.fhyiii.cn/index/Goods/goodsinfo',
        type: 'post',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data)
           if(data.status === 1) {
               html += template("historyR",data);
               $("#rongqi").html(html);
               var name = localStorage.username;
               var sl_return = document.querySelector('.return');
               sl_return.addEventListener("touchstart", function () {
                   window.history.go(-1);
               });
               $("#btn").click(function () {
                   mui.confirm("是否立即测试", "提示", function (e) {
                       if(e.index === 1) {
                           if(name != null) {
                               location.href = "test_questions.html";
                               localStorage.test_paper_id = data.data.test_paper_id;
                           } else {
                               mui.toast("您还未登录，请登录！");
                               setTimeout(function () {
                                   location.href = "login.html";
                               },1500);
                           }
                       }
                   })
               });
           }
        }
    });
});
