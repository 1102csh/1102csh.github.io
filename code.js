const board = document.getElementById("board");
const hand = document.getElementById("hand");
let animation_flag = true;
let selected_card;  // 사용하는 핸드의 인덱스 / 아래 hand_arr과 연계할때 사용할듯
let TOTAL_CARD_INDEX = 0;   // 카드 스토리지에 있는 총 카드의 개수
const YOUR_BASE = 0;
let hand_arr = [8]; // 핸드에 있는 패가 실제로 구현될 배열 // 아직 구현안함
let TEMP_CARD_INDEX = 0; // 현재 덱에 있는 개수만큼만 드로우하기 위해 일시적으로 만들어놈
let CUR_CARD; // 현재 선택된 카드
let CUR_SEL; // 현재 선택된 셀
let SPAWN_LOCK = true;

let hand_locker = document.getElementById("hand_lock");
let board_locker = document.getElementById("board_lock");

function setup(){
    
    for(let i=0;i<5;i++){
        for(let j=0;j<8;j++){

            let base = "";

            switch(j){
                case 0:
                case 1:
                    base = "blueBase";
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    base = "center";
                    break;
                case 6:
                case 7:
                    base = "redBase";
                    break;
                    
            }
            
            board.innerHTML += "<span class='"+base+" sel' id='sel"+i+","+j+
            "' onclick='selectSel("+i+","+j+")' style=top:"+((i*5)-0.05)+"em;left:"+((j*5)+4.95)+"em></span>"    
            
            const temp = document.getElementById("sel"+i+","+j);
        }
    } 
}

const maxAngle = 25; // 최대 각도를 설정

function updateCards() {
    const cards = document.querySelectorAll('.card');
    const numCards = cards.length;
    const container = document.querySelector('#hand');
    const containerWidth = container.offsetWidth;
  
    if (numCards === 0) return;
  
    const cardWidth = cards[0].offsetWidth - 90;
    const distanceFromCenter = (numCards - 1) * cardWidth / 2;
    const centerX = container.getBoundingClientRect().x + containerWidth / 2;
  
    cards.forEach((card, index) => {
        card = document.getElementById("card"+index);
        card.style.zIndex = index;
        const distanceFromMiddle = index * cardWidth - distanceFromCenter;
        const ratio = distanceFromMiddle / centerX;
        const angle = ratio * maxAngle;
        
        // 밑변 중심을 중심점으로 설정
        card.style.transformOrigin = 'center bottom';
        
        card.style.transform = `translateX(${distanceFromMiddle}px) rotate(${angle}deg)`;

        
        // hover 이벤트 추가
        card.addEventListener('mouseenter', function() {
            // 호버 시작시 처리할 내용

            // 애니메이션 중복 방지를 위한 제한
            if(animation_flag){
                card.style.transform = 'translateX('+distanceFromMiddle+'px) rotate('+
                angle+'deg) scale(1.2)';
                card.style.zIndex = 10;
            }
        });
        card.addEventListener('mouseleave', function() {
            // 호버 종료시 처리할 내용

            if(animation_flag){
                card.style.transform = 'translateX('+distanceFromMiddle+'px) rotate('+angle
                +'deg) scale(1.0)';
                card.style.zIndex = index;
            }
        });
    });
}
  
function addCard() {
    const container = document.querySelector('#hand');
    const card = document.createElement('div');
    const cardLabel = document.createElement('span');
    const cardCost = document.createElement('span');

    const cardIndex = document.querySelectorAll('.card').length;
    const MAX_CARD_INDEX = 8;

    if( cardIndex >= MAX_CARD_INDEX ){
        console.log("카드가 최대개수인 "+MAX_CARD_INDEX+"장 보다 많습니다.");
        return;
    }
    else if( TOTAL_CARD_INDEX == TEMP_CARD_INDEX){
        console.log("남아있는 카드를 전부 뽑았습니다.");
        return;
    }

    ////////////////// 카드 뽑는 부분 ( 수정 필요 ) ////////////////////
    let cardInfo = getCard_storage(TEMP_CARD_INDEX);
    TEMP_CARD_INDEX++;
    ////////////////////// 카드 정보 설정 부분 ////////////////////////
    card.classList.add('card');
    cardCost.classList.add('cardBubble');
    cardCost.classList.add('cardCost');
    cardLabel.classList.add('cardLabel');

    cardLabel.textContent = cardInfo.name;  // 카드 이름
    cardCost.textContent = cardInfo.cost;   // 카드 마나 소모량
    //
    if(cardInfo.type=="minion"){
        const cardAtk = document.createElement('span');
        const cardDef = document.createElement('span');

        cardAtk.textContent = cardInfo.atk;
        cardDef.textContent = cardInfo.def;

        cardAtk.classList.add('cardBubble');
        cardDef.classList.add('cardBubble');
        cardAtk.classList.add('cardAtk');
        cardDef.classList.add('cardDef');

        card.appendChild(cardAtk);
        card.appendChild(cardDef);
    }
    card.appendChild(cardLabel);
    card.appendChild(cardCost);
    ///////////////////////////////////////////////////////////////////
  
    card.setAttribute('id', 'card'+cardIndex);

    // 카드가 생성될 때마다 가장 위에 출력되게설정
    const zIndex = cardIndex + 1;
    card.style.zIndex = zIndex;
    cardCost.style.zIndex = zIndex + 1;

    // 카드가 클릭되었을 때 실행할 내용
    card.onclick = function() {
        selected_card = cardIndex;
        console.log(cardIndex);
    };
      
    // z index 테스트를 위해 랜덤한 배경색 입히기
    const rand1 = 255//Math.floor(Math.random()*255);
    const rand2 = 255//Math.floor(Math.random()*255);
    const rand3 = 255//Math.floor(Math.random()*255);

    card.style.backgroundColor = 'RGB('+rand1+','+rand2+','+rand3+')';

    container.appendChild(card);
    updateCards();
  
    let startX, startY;
    let cardStartX, cardStartY;
    let isDragging = false;
  
    card.addEventListener('mousedown', e => {
        startX = e.clientX;
        startY = e.clientY;
        cardStartX = card.getBoundingClientRect().x;
        cardStartY = card.getBoundingClientRect().y;
        isDragging = true;
        animation_flag = false;
        card.classList.add('dragging');
    });
  
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        card.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  
    document.addEventListener('mouseup', e => {
        if (!isDragging) return;
        const board = document.querySelector('#hand');
        const boardRect = board.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.x + cardRect.width / 2;
        const cardCenterY = cardRect.y + cardRect.height / 2;
  
        if (
            cardCenterX > boardRect.left &&
            cardCenterX < boardRect.right &&
            cardCenterY > boardRect.top &&
            cardCenterY < boardRect.bottom
        ) {
            card.style.transform = '';
            card.classList.remove('dragging');

            console.log("카드를 사용하지않았음!")
        } else {
            container.appendChild(card);
            card.style.transform = '';
            card.classList.remove('dragging');
            card.classList.add('used');

            removeCard(card);

            console.log(cardLabel.textContent+"카드를 사용했음!");

            CUR_CARD = cardInfo.index;
            Active_Card();
        }
  
        isDragging = false;
        animation_flag = true;
        updateCards();

    });
}
function Active_Card(){
    let card = getCard_storage(CUR_CARD);
    
    if(card.type=="minion"){
        /*
        카드 사용을 막고 내 진영에 따라 보드를 제한함으로써 내 진영에만
        카드를 소환할 수 있도록 함

        소환 플래그를 호출하여 셀을 선택했을때 이벤트가 발생하도록 할 예정
        */
        let range;

        if(YOUR_BASE==0) range=3;
        else if(YOUR_BASE==1) range=6;

        hand_locker.style.display = 'block';
        let locker_label = document.getElementById("lock_label");
        locker_label.textContent = "생성할 셀을 선택해주세요";
        
        board_locker.style.display = 'block';
        
        if(YOUR_BASE==0) board_locker.style.left = '21em';
        else if(YOUR_BASE==1) board_locker.style.left = '11em';
        SPAWN_LOCK = true;
        
    }

}
function selectSel(i,j){

    let sel = document.getElementById("sel"+i+","+j);

    if(SPAWN_LOCK){
    
        if(YOUR_BASE==0)    sel.style.backgroundColor = 'aqua';
        else if(YOUR_BASE==1) sel.style.backgroundColor = 'pink';

        sel.innerText = getCard_storage(CUR_CARD).name;
        console.log("소환");

        hand_locker.style.display = 'none';
        board_locker.style.display = 'none';
        SPAWN_LOCK = false;
    }

}
function removeCard(card) {
    const container = document.querySelector('#hand');
    const cards = document.querySelectorAll('.card');    

    /*
    if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        container.removeChild(lastCard);
        updateCards();
    }
    */

    container.removeChild(card);
    const cardIndex = parseInt(document.querySelectorAll('.card').length)+1;

    for (let i = 0; i < cardIndex; i++) {
        if (document.getElementById("card" + i) == null) {
            if (document.getElementById("card" + (i + 1)) == null) break;
            else {
                for (let j = i + 1; j < cardIndex; j++) {
                    let temp = document.getElementById("card" + j);
                    temp.setAttribute('id', 'card' + (j - 1));
                }
            }
        }
    }

    updateCards();
}
function getCard_storage(index){
    /*
        card.name = "";
        card.index = 0;
        card.type = "none";
        card.tag = "";
        card.cost = 0;
        card.atk = 0;
        card.def = 0;
    */
    let card = {
        name : "",
        index : -1,
        type : "none",
        tag : "none",
        cost : -1,
        atk : -1,
        def : -1
    };
    switch(index){
        case 0:
            card.name = "허수아비",
            card.index = index;
            card.type = "minion";
            card.tag = "수비";
            card.cost = 0;
            card.atk = 0;
            card.def = 2;
            break;
        case 1:
            card.name = "병사";
            card.index = index;
            card.type = "minion";
            card.tag = "";
            card.cost = 1;
            card.atk = 1;
            card.def = 1;
            break;
        case 2:
            card.name = "파괴전차";
            card.index = index;
            card.type = "minion";
            card.tag = "";
            card.cost = 3;
            card.atk = 3;
            card.def = 3;
            break;
        case 3:
            card.name = "궁수";
            card.index = index;
            card.type = "minion";
            card.tag = "원거리";
            card.cost = 2;
            card.atk = 2;
            card.def = 1;
            break;
        case 4:
            card.name = "날쌘 정찰병";
            card.index = index;
            card.type = "minion";
            card.tag = "신속";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            break;
        default :
            card.index = -1;
            break;
    }

    return card;
}
function CHECK_TOTAL_CARD_INDEX(){

    let i=0;
    while(1){
        let card = getCard_storage(i);
        if(card.index==-1) break;
        
        TOTAL_CARD_INDEX++;
        i++;
    }
    console.log("총 "+TOTAL_CARD_INDEX+"개의 카드를 불러오는데 성공함!");
}
window.addEventListener('resize', updateCards);

CHECK_TOTAL_CARD_INDEX();
updateCards(); // 페이지 로드 시 한 번 실행
setup();
