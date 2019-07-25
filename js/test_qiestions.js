$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    $(".shl_an").click(function () {
        $(this).addClass("shl_xuan");
        $(this).siblings().removeClass("shl_xuan");
    });
    var index = 1;
    var test_paper_id = localStorage.test_paper_id;
    $.ajax({
        url: "http://a.fhyiii.cn/index/Goods/getPaper",
        type: "post",
        data: {
            paper_id: test_paper_id
        },
        success: function (data) {
            if(data.success === true) {
                console.log(data)
                $(".shl_l").text(data.data.paper_name);
                $(".shl_r").text(index);
                $(".est_questions_nei").text(data.problems[index-1].problems_name);
                $(".shl_anY").text(data.problems[index-1].problems_A);
                $(".shl_anN").text(data.problems[index-1].problems_B);
                var arr = [];
                $(".shl_anN").click(function () {
                        $(this).addClass("shl_xuan");
                        $(this).siblings().removeClass("shl_xuan");
                        console.log('N' + index, $(this).text());
                        arr[index-1] =  $(this).text();
                })
                $(".shl_anY").click(function () {
                        $(this).addClass("shl_xuan");
                        $(this).siblings().removeClass("shl_xuan");
                        console.log('Y' + index, $(this).text());
                        arr[index-1] =  $(this).text();
                })
                $(".del").click(function () {
                    $(".shl_an").removeClass("shl_xuan");
                    if(index <= 1) {
                        index = 1;
                    } else {
                        index--;
                        $(".shl_r").text(index);
                        $(".est_questions_nei").text(data.problems[index-1].problems_name);
                        $(".shl_anY").text(data.problems[index-1].problems_A);
                        $(".shl_anN").text(data.problems[index-1].problems_B);
                        $(".add").text("下一题");
                    }
                });
                $(".add").click(function () {
                    $(".shl_an").removeClass("shl_xuan")
                    if(index >= 9) {
                        $(".add").text("提交");
                        // console.log(index)
                        index++;
                        console.log(index)
                        if( index === 10) {
                            $(".shl_r").text(index);
                            return
                        }
                        if( index === 11) {
                            index = 10;
                            console.log(arr);
                            if(arr.length < 10) {
                                mui.confirm("题目尚未完成是否提交？", "提示", function (e) {
                                    if(e.index === 1) {
                                        $.ajax({
                                            url: "http://a.fhyiii.cn/index/Problems/updateProblems",
                                            type: "post",
                                            data: {
                                                problems: arr
                                            },
                                            success:function (data) {
                                               if(data.sccuess === true) {
                                                   location.href = "test_result.html";
                                                   localStorage.result = data.msg;
                                               }
                                            }
                                        })
                                    }
                                })
                            } else {
                                $.ajax({
                                    url: "http://a.fhyiii.cn/index/Problems/updateProblems",
                                    type: "post",
                                    data: {
                                        problems: arr
                                    },
                                    success:function (data) {
                                        if(data.sccuess === true) {
                                            mui.confirm("是否提交？", "提示", function (e) {
                                                if(e.index === 1) {
                                                    location.href = "test_result.html";
                                                    localStorage.result = data.msg;
                                                }
                                            });
                                        }
                                    }
                                })
                            }
                        }
                    } else {
                        index++;
                        console.log(index)
                        $(".shl_r").text(index);
                        $(".est_questions_nei").text(data.problems[index-1].problems_name);
                        $(".shl_anY").text(data.problems[index-1].problems_A);
                        $(".shl_anN").text(data.problems[index-1].problems_B);
                    }
                });
            } else {
                mui.toast("获取试卷失败！");
            }
        }
    })
})