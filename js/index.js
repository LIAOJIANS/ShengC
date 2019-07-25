$(function () {
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:500,
    });
    var myScroll = new IScroll('.content');
    //老师区域的宽度附加
    var teacher = $(".butoom .sl_true_teach");
    console.log(teacher);
    var adiv = teacher.find("div");
    var adivwight= 0;
    var index = 0
    adiv.each(function () {
        adivwight = adivwight + adiv.innerWidth();
        index = index + 1
    });
    console.log(index)
    var newW = adivwight * 0.61;
    teacher.width(newW);
    // 滑动区域插件的使用
    var myScrolls = new IScroll('.sl_teacher',{
        scrollX: true,scrollY: false
    });
    // 搜索页面的跳转
    var search_input = document.querySelector('.search_input');
    search_input.addEventListener("touchstart", function () {
        location.href = "./seach.html";
    });
})
