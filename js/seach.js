$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    $(".seach").click(function () {
        var keyword = $(".seach_input").val();
        if(keyword) {
            keyArr.push(keyword);
            //将数组存储在本地
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            location.href = "seach_retuest.html?keyword=" + keyword;
        } else {
            mui.alert("请输入想要搜索内容")
        }
    });
    var keyArr = [];
    // 获取本地数据
    if(localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        var html = template("historyTpl", { result : keyArr} );
        console.log(html);
        $("#history").html(html);
    }
    $(".clear").on("click", function () {
        $("#history").html("");
        //清空本地数据
        localStorage.removeItem("keyArr");
    })
});
    

