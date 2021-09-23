var scroll = function(){
    var $nav = null,
    $cnt = null,
    moveCnt = null,
    moveIndex = 0,
    moveCntTop = 0,
    winH = 0,
    time = false; // 새로 만든 변수

    //모바일 변수
    var startY = 0,
    moveY = 0;


    $(document).ready(function(){
        init();
        initEvent();
    });
    
    var init = function(){
        $cnt = $(".contents");
        $nav = $("header a");
    };
    
    var initEvent = function(){
        $("html ,body").scrollTop(0);
        winResize();
        $(window).resize(function(){
            winResize();
        });
        $nav.on("click", function(){
            moveIndex = $(this).parent("li").index() + 1;
            console.log(moveIndex);
            if(moveIndex == 4) return; // LOGIN 메뉴 클릭 시 리턴한다. (코드 넣지 않을 시 충돌 발생)
            moving(moveIndex);
            return false; 
        });
        /**
         * 휠기능 만든것이 익스, 크롬, 오페라, 사파리에선 작동하지만 파이어폭스는 마우스휠 이벤트명이 다르다. 
         * 'mousewheel'이 아닌 'DOMMouseScroll'이라는 명칭 사용한다. 따라서 추가함
         * 스크롤 값을 활용한 코드 사용시에도 e.originalEvent.wheelDelta를 사용하였으나, 파이어폭스에선 e.originalEvent.detail를 사용한다.
         * 휠 다운시 파이어폭스를 제외한 브라우저에선 음수의 값을, 파이어폭스는 양수의 값을 돌려받는다.
         */
        $cnt.on("mousewheel DOMMouseScroll", function(e){
            if(time === false){ // time 변수가 펄스일때만 휠 이벤트 실행
                wheel(e);
            }
        });

        // 모바일 터치 - 반응형 웹 구현못함. 터치만 만들어봄
        $cnt.on("touchstart", function(e){
            // console.log("touchstart 발생! startY값 :" + e.originalEvent.touches[0].clientY);
            if(time === false){
                startY = e.originalEvent.touches[0].clientY;
                moveY = 0;
            }
        })
        $cnt.on("touchmove", function(e){
            // console.log("touchmove 발생! moveY값 :" + e.originalEvent.touches[0].clientY);
            if(time === false){
                moveY = e.originalEvent.touches[0].clientY;
            }
        })
        $cnt.on("touchend", function(e){
            // console.log("touchend발생!");
            // console.log("touchend발생 시 startY값 :" + startY);
            // console.log("touchend발생 시 moveY값 :" + moveY);
            if(time === false && moveY != 0){
                touch(e);
            }
        })
    };
    
    var winResize = function(){
        winH = $(window).height();
        $cnt.children("section").height(winH);
        $("html ,body").scrollTop(moveIndex.scrollTop);
    };
    
    var wheel = function(e){
        // console.log(e.originalEvent.detail);
        // console.log(e.originalEvent.wheelDelta);
        // wheelDelta 마우스 휠을 내리면 음수값 출력한다. 휠을 올리면 양수값 출력, detail은 이와 반대이다.
        if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0){ 
            // 휠을 내릴 시 발생
            if(moveIndex < 3){
                moveIndex += 1;
                moving(moveIndex);
            };
        }
        else{ // 휠을 올릴 시 발생
            if(moveIndex > 0){
                moveIndex -= 1;
                moving(moveIndex);
            };
        };
    };

    // 모바일 - 반응형웹 구현못함. 이후에 보완하기
    // 터치가 끝나는 시점에 발생
    var touch = function(e){
        // console.log("touch함수 실행!");
        // console.log("startY값 : " + startY);
        // console.log("moveY값 : " + moveY);

        // 처음 터치보다 이동 터치좌표가 위에 있을 때 발생 (아래에서 위로 터치방향)
        if(startY - moveY > 0){
            if(moveIndex < 3){
                moveIndex += 1;
                moving(moveIndex);
            };
        }
        else{ // 위에서 아래
            if(moveIndex > 0){
                moveIndex -= 1;
                moving(moveIndex);
            };
        }  
    }

    var moving = function(index){
        // console.log(index); // 현재 index 출력
        time = true // 휠 이벤트가 실행 동시에 true로 변경
        moveCnt = $cnt.children("section").eq(index);
        moveCntTop = moveCnt.offset().top;
        $("html ,body").stop().animate({
            scrollTop: moveCntTop
        }, 1000, function(){
            time = false; // 휠 이벤트가 끝나면 false로 변경
        });
        
        // 페이지에 따른 메뉴 색상 변화주기
        if(index == 1 || index == 3){
            $nav.animate({
                color: "black"
            }, 1000);
        }
        else {
            $nav.animate({
                color: "white"
            }, 1000);
        }
    };
};

scroll();

/**
 * 타이핑 효과
 */
const content = "안녕하세요. 개발자 염지영입니다."
const text = document.querySelector(".greeting h1")
let index = 0;
    
function typing(){
    text.textContent += content[index++]
    if(index > content.length){
        text.textContent = ""
        index = 0;
    }
    if(index == content.length){
        clearInterval(stop);
    }
}
var stop = setInterval(typing, 400);