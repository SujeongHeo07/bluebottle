

// pc 사이즈 fullpage screen
if($(window).width() > 1024) {
    
    const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'),
    $section = $('.section');
        
    $(function() {
        // 기존 스크롤 제거
        window.addEventListener("wheel", function(e){
            e.preventDefault();
        },{passive : false});
        
        // 새로고침시 맨 위로
        $body.scrollTop(0);
        
        // 메인 페이지 스크롤
        scrollPage();
    });


    $("#fullpage_up_move").on("click", function() {
        navigateUp();
        scrollCount();
    });

    $("#fullpage_down_move").on("click", function() {
        navigateDown();
        scrollCount();
    });

    var numOfPages = $section.length - 1,
        curPage = 0,
        scrollLock = false;
    
    // 스크롤, 키보드 위아래 클릭시 페이지 이동
    function scrollPage() {
        $(window).on("wheel", function(e) {
            if (scrollLock) return;
            if (e.originalEvent.deltaY < 0) {
               navigateUp();
            } else {
               navigateDown();
            }
            scrollCount();
        });

        $(window).on("keydown", function(e) {
            if (scrollLock) return;
            if (e.which === 38) {
                navigateUp();
            }
            else if (e.which === 40) {
                navigateDown();
            }
            scrollCount();   
        });
    }
    
    // 페이지 이동
    function pagination() {
        scrollLock = true;
        $body.stop().animate({
            scrollTop: $section.eq(curPage).offset().top
            }, 500, 'swing', function(){
            scrollLock = false;
        });
    };
        
    // 위로 이동
    function navigateUp () {
        if (curPage === 0) return;
        curPage--;
        pagination();
    };
        
    //아래로 이동
    function navigateDown() {
        if (curPage === numOfPages) return;
        curPage++;
        pagination();
    };
    
    // section 숫자
    function scrollCount() {
        var sectionId = $section.eq(curPage).attr("id"); // 아이디 가져옴
        var sectionIdNum = sectionId.replace(/[^0-9]/g,''); // 아이디 숫자 추출
        var lastSection = $section.length; // 마지막 숫자
        
        if (sectionIdNum == lastSection) {
            $(".fullpage_current").html(lastSection - 1);
        } else {
            $(".fullpage_current").html(sectionIdNum);
        }
    }

        
}

// 슬라이드
var slideCount = $('.slide').length;
var currentIndex = 0;
var slidesPerPage;
if ($(window).width() > 768) {
    slidesPerPage = 3;
} else {
    slidesPerPage = 1;
}
var totalSlides = Math.ceil(slideCount / slidesPerPage + 1);
updateActiveClass();

// 이전버튼 클릭시
$('.prev').click(function() {
    if (currentIndex > 0) {
        currentIndex--;
        $('.slider_wrapper').css('transform', 'translateX(' + (currentIndex * (-100 / slidesPerPage)) + '%)');
        
        updateActiveClass();
        arrowDisable()
    }
});

// 다음버튼 클릭시
$('.next').click(function() {
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        $('.slider_wrapper').css('transform', 'translateX(' + (currentIndex * (-100 / slidesPerPage)) + '%)');
        
        updateActiveClass();
        arrowDisable()
    }
});
    
// 화살표 비활성화
function arrowDisable() {
    if (currentIndex === 2) {
        $('.next').prop('disabled', true);
        $('.next').addClass("disabled");
    } else {
        $('.next').prop('disabled', false);
        $('.next').removeClass("disabled");
    }

    if (currentIndex === 0) {
        $('.prev').prop('disabled', true);
        $('.prev').addClass("disabled");
    } else {
        $('.prev').prop('disabled', false);
        $('.prev').removeClass("disabled");
    }
}

function updateActiveClass() {
    $('.slide').removeClass('active');
    $('.slide:nth-child(' + (currentIndex + 2) + ')').addClass('active');
}


