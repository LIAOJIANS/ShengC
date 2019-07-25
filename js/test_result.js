$(function () {
    var sl_return = document.querySelector('.return');
    // var seach_input = $(".seach_input");
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
        // console.log(seach_input.val());
    });
    var result = localStorage.result;
    if(result != null) {
        $(".content").text(result);
    }
})