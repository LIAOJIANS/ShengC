$(function () {
    var sl_return = document.querySelector('.return');
    sl_return.addEventListener("touchstart", function () {
        window.history.go(-1);
    });
    var name = localStorage.username;
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
        	var img = $(".imgBox").html();
        	var arr = $(".nameBox").html();
        	 img += "<img src="+data.data.logo+" class='toux' />";
        	 arr += "<span class='username'>"+data.data.u_name+"</span>";
        	// var arrs = "<span class='brith'>"+data.data.u_name+"</span>";
        	$(".imgBox").html(img);
        	$(".nameBox").html(arr);
        }
    })
});
