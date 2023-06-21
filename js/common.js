$(document).ready(function() {
    
    // 메뉴
    $(".depth_1 > li:has(.depth_2)").mouseover(function() {
        if($("#header").hasClass("all") === false) {
            $(this).find(".depth_2").stop().slideDown();
            $("#header").addClass("on");
        }
    }).mouseout(function() {
        if($("#header").hasClass("all") === false) {
            $(this).find(".depth_2").stop().slideUp();
            $("#header").removeClass("on");
        }
    });
    
});

// 외부 영역 클릭시 팝업 닫기
$(document).mouseup(function (e){
    var menuLayer = $(".menu");

    if(menuLayer.has(e.target).length === 0){
        $("#header").find(".depth_2").stop().slideUp();
        $("#header").removeClass("on");
        $("#header").removeClass("all");
    }
});


// 메뉴 전체 오픈
function menuOpen() {
    $("#header").toggleClass("on");
    $("#header").toggleClass("all");
    $(".depth_2").stop().slideToggle();
}


