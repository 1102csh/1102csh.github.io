let deck = [];  // 실제 덱 구성
let deck_arr = [];  // 게임을 위한 덱 사본
let hand_arr = []; // 핸드에 있는 패가 실제로 구현될 배열 * 카드 객체가 들어감 *
let handIndex = 0;
let selectedCard;
let TOTAL_CARD_INDEX = 0;
let hpAnimation;
let isMyTurn;
let mana;
let EnemyDebuffIndex = 0;

let gameData = null;
let isWait;
let effectVolume = 0.5;

let enemyWeak = 0;

const gameController = () => {
    gameManager();
    EnemySprite("idle");

    const panel = document.querySelector('.enemyAbilityPanel');
    const enemyAbilityText = panel.querySelectorAll('.enemyAbilityText');
    enemyAbilityText.forEach(text => {
        text.style.filter = 'opacity(1)';
    });

    setTimeout(() => {
        enemyAbilityText.forEach(text => {
            text.style.filter = 'opacity(0)';
        });
    }, 5000);

    gameData.enemyShield += 13;
    gameData.applyHP();

    myTurn();
}

function bgmPlay() {
    let bgm = document.getElementById("backgroundMusic");
    bgm.src = './assets/sound/backgroundMusic.mp3';
    bgm.volume = 0.3;
    bgm.play();
}
const myTurn = () => {

    isMyTurn = true;
    applyMana("reset");
}
const enemyTurn = () => {

    if (gameData.curEnemy == "slime") {
        slimeFunc();
    }
}

const slimeFunc = () => {

}

const gameManager = () => {
    // gameData가 null이면 초기화
    if (gameData === null) {

        gameData = {
            playerMaxHP: 50,
            playerHP: 50,
            playerShield: 0,
            playerAtk: 10,
            playerDef: 10,
            playerSpeed: 10,
            playerCritical: 0,
            playerCriticalDamageRate: 2,
            enemyAtk: 10,
            enemyMaxHP: 1000,
            enemyHP: 1000,
            enemyShield: 0,
            curEnemy: "slime",
            applyHP
        };

        gameData.applyHP();
    }

    return gameData;
}

function applyHP() {
    let { playerMaxHP, playerHP, enemyMaxHP, enemyHP } = this;

    //console.log("player Max Hp : " + playerMaxHP + " , player Cur Hp : " + playerHP);
    //console.log("enemy Max Hp : " + enemyMaxHP + " , enemy Cur Hp : " + enemyHP);

    // player hp apply
    // const playerHPLabel = document.getElementById("playerHPLabel");
    const playerHPBar = document.getElementById("playerHP");
    const playerCurHPLabel = document.getElementById("playerCurHP");
    const playerMaxHPLabel = document.getElementById("playerMaxHP");
    const playerShieldImg = document.getElementById("playerShield");

    //playerHPLabel.innerText = playerHP;
    playerCurHPLabel.innerText = playerHP;
    playerMaxHPLabel.innerText = playerMaxHP;
    playerHPBar.style.width = ((playerHP / playerMaxHP) * 100) + '%';

    // 체력 감소 애니메이션
    const playerPreHP = document.getElementById("playerPreHP");
    clearTimeout(hpAnimation);
    hpAnimation = setTimeout(() => {
        playerPreHP.style.width = (playerHP / playerMaxHP) * 100 + '%';
        //console.log("enemyPreHP : "+(enemyHP/enemyMaxHP)*100)
    }, 700);


    if (playerHP <= 0) {
        playerHPBar.style.width = '0%';
        playerPreHP.style.width = '0%';
    }

    // 방어도가 있으면 방어도 표시
    if (gameData.playerShield > 0) {
        playerShieldImg.style.display = 'flex';

        document.getElementById("playerShieldLabel").innerText = gameData.playerShield;
        playerHPBar.style.backgroundColor = "lightgray";
    }
    else {
        playerShieldImg.style.display = 'none';
        playerHPBar.style.backgroundColor = 'red';
    }

    // enemy hp apply
    // const enemyHPLabel = document.getElementById("enemyHPLabel");
    const enemyHPBar = document.getElementById("enemyHP");
    const enemyCurHPLabel = document.getElementById("enemyCurHP");
    const enemyMaxHPLabel = document.getElementById("enemyMaxHP");
    const enemyShieldImg = document.getElementById("enemyShield");

    //enemyHPLabel.innerText = enemyHP;
    enemyCurHPLabel.innerText = enemyHP;
    enemyMaxHPLabel.innerText = enemyMaxHP;
    enemyHPBar.style.width = ((enemyHP / enemyMaxHP) * 100) + '%';

    // 체력 감소 애니메이션
    const enemyPreHP = document.getElementById("enemyPreHP");
    clearTimeout(hpAnimation);
    hpAnimation = setTimeout(() => {
        enemyPreHP.style.width = (enemyHP / enemyMaxHP) * 100 + '%';
        //console.log("enemyPreHP : "+(enemyHP/enemyMaxHP)*100)
    }, 700);

    if (enemyHP <= 0) {
        enemyHPBar.style.width = '0%';
        enemyPreHP.style.width = '0%';
    }

    // 방어도가 있으면 방어도 표시
    if (gameData.enemyShield > 0) {
        enemyShieldImg.style.display = 'flex';

        document.getElementById("enemyShieldLabel").innerText = gameData.enemyShield;
        enemyHPBar.style.backgroundColor = "lightgray";
    }
    else {
        enemyShieldImg.style.display = 'none';
        enemyHPBar.style.backgroundColor = "red";
    }
}

function addCard() {
    //console.log("addCard requset!  current handIndex : "+handIndex);

    if (handIndex > 9) return;
    else if (deck.length <= 0) {
        console.log("덱에 남은 카드가 없습니다.");
        return;
    }

    let randNum = Math.floor(Math.random() * TOTAL_CARD_INDEX);

    //console.log("덱에 남은 카드 개수 : "+deck.length);
    // 새로운 카드를 생성합니다.
    const newCard = document.createElement('div');
    newCard.id = `card${handIndex}`;
    newCard.className = 'card';

    // 카드 정보 저장소에 가져오기
    let cardStorage = getCard_storage(deck[randNum].index);
    //console.log("뽑은 카드 정보");
    //console.log("카드 번호 : "+deck[randNum].index);
    //console.log("카드 이름 : "+deck[randNum].name);

    hand_arr.push(deck[randNum]);
    deck.splice(randNum, 1);
    deck.sort();

    // 카드 정보 기입
    const cardName = document.createElement('span');
    cardName.classList.add('cardName');
    cardName.textContent = cardStorage.name;   // 카드 이름

    const cardCost = document.createElement('span');
    cardCost.classList.add('cardCost');
    cardCost.textContent = cardStorage.cost;   // 카드 코스트 소모량

    const cardInfo = document.createElement('span');
    cardInfo.classList.add('cardInfo');
    cardInfo.textContent = cardStorage.info;   // 카드 설명

    ////////////////////////// 카드 설명 대체 란 //////////////////////////////////
    // 카드 정보에서 '공격력의 n%' 키워드를 찾아서 카드의 공격력을 적용
    const attackPattern = /공격력의 (\d+)%/;
    const attackMatch = cardStorage.info.match(attackPattern);
    const critPattern = /공격력의 (\d+)%의 치명타 피해/;
    const critMatch = cardStorage.info.match(critPattern);

    // 우선 순위가 높은 것 부터 진행
    if(critMatch){
        const percentage = parseInt(attackMatch[1]) / 100;
        const critDamage = Math.floor(gameData.playerAtk * percentage * (enemyWeak>0?1.5:1) * gameData.playerCriticalDamageRate) + " "; 
        const replacedText = cardStorage.info.replace(critPattern, `<span class="replaced-CriticalText">${critDamage}</span><span>의 치명타 피해</span>`);

        cardInfo.innerHTML = replacedText; // innerHTML 사용
    }
    else if (attackMatch) {
        const percentage = parseInt(attackMatch[1]) / 100;
        const attackValue = Math.floor(gameData.playerAtk * percentage * (enemyWeak>0?1.5:1)) + " ";
        const replacedText = cardStorage.info.replace(attackPattern, `<span class="replaced-text">${attackValue}</span>`);

        if (cardStorage.info.match(/약점을 노출/)){
            const replacedText2 = replacedText.replace(/약점을 노출/, `<span style=color:purple>약점을 노출</span>`);

            cardInfo.innerHTML = replacedText2; // innerHTML 사용
        }
        else cardInfo.innerHTML = replacedText;
    }
    else if (cardStorage.info.match(/약점을 노출/)){
        const replacedText = cardStorage.info.replace(/약점을 노출/, `<span style=color:purple>약점을 노출</span>`);
        cardInfo.innerHTML = replacedText; // innerHTML 사용
    }
    else {
        cardInfo.textContent = cardStorage.info;   // 카드 설명
    }

    /////////////////////////////////////////////////////////////////////////////

    // 카드 타입에 따라 카드 색 변경을 위한 클래스 지정
    cardName.classList.add(cardStorage.type);

    // 카드 호버링 이벤트
    // 마우스를 카드에 올렸을 때 확대 처리
    newCard.addEventListener('mouseenter', () => {
        newCard.style.transform = 'translateY(-25px) scale(1.3)'; // 카드를 확대
        newCard.style.zIndex = 11;
    });

    // 마우스가 카드에서 벗어났을 때 축소 및 원래대로 돌아가게 하기
    newCard.addEventListener('mouseleave', () => {
        newCard.style.transform = 'scale(1)'; // 카드를 원래 크기로 돌아가게 함
        spreadOut(); // 기울기 재설정을 위함
    });

    document.getElementById('hand').appendChild(newCard);
    newCard.appendChild(cardName);
    newCard.appendChild(cardCost);
    newCard.appendChild(cardInfo);

    handIndex++;
    spreadOut();
}
const refreshCard = () => {

    for (let i = 0; i < handIndex; i++) {
        //hand_arr[i].info 
        let card = document.getElementById('card' + i);
        let cardInfo = card.querySelector('.cardInfo');

        // 치명타 피해 찾아서 적용
        const critPattern = /공격력의 (\d+)%의 치명타 피해/;
        const critMatch = hand_arr[i].info.match(critPattern);

        // 카드 정보에서 '공격력의 n%' 키워드를 찾아서 카드의 공격력을 적용
        const attackPattern = /공격력의 (\d+)%/;
        const attackMatch = hand_arr[i].info.match(attackPattern);

        // 우선 순위가 높은 것 부터 진행
        if (critMatch) {
            const percentage = parseInt(attackMatch[1]) / 100;
            const critDamage = Math.floor(((gameData.playerAtk * percentage) * (enemyWeak>0 ? 1.5 : 1)) * gameData.playerCriticalDamageRate) + " ";
            const critReplacedText = hand_arr[i].info.replace(critPattern, `<span class="replaced-CriticalText">${critDamage}</span><span>의 치명타 피해</span>`);

            cardInfo.innerHTML = critReplacedText; // innerHTML 사용
        }
        else if (attackMatch) {
            const percentage = parseInt(attackMatch[1]) / 100;
            const attackValue = Math.floor((gameData.playerAtk * percentage) * (enemyWeak>0 ? 1.5 : 1)) + " ";

            //cardInfo.innerText = hand_arr[i].info;
            const replacedText = hand_arr[i].info.replace(attackPattern, `<span class="replaced-text">${attackValue}</span>`);
            cardInfo.innerHTML = replacedText; // innerHTML 사용
        } else {
            cardInfo.innerText = hand_arr[i].info;   // 카드 설명
        }
    }
}
function removeCard() {
    const container = document.querySelector('#hand');

    // 선택된 카드
    let card = document.getElementById("card" + selectedCard);

    // 삭제할 카드가 실제로 존재하는지 확인
    if (card) {
        container.removeChild(card);
        hand_arr.splice(selectedCard, 1);
        handIndex--;

        const cards = document.querySelectorAll('.card');
        const cardIndex = cards.length;

        // 카드 인덱스 재정렬
        cards.forEach((card, index) => {
            card.id = `card${index}`;
        });

        spreadOut();
    }
}

const spreadOut = () => {
    const cards = document.querySelectorAll('.card');
    const cardIndex = document.getElementById("cardIndex");

    cards.forEach((card, index) => {
        const distanceFromCenter = (cards.length - 1) / 2 - index;
        const angle = distanceFromCenter * -5; // 조절 가능한 각도
        card.style.transform = `rotate(${angle}deg) translateY(${Math.abs(distanceFromCenter) * (3 + Math.abs(distanceFromCenter) * 4) + 70}px)`;
        card.style.zIndex = index;
        //console.log("index : "+index+ " , 떨어져있는 정도 : "+distanceFromCenter+" posY : "+ (Math.abs(distanceFromCenter) * 20));

        if (isMyTurn === true) {
            // 카드가 현재 마나보다 많으면 사용 가능한 카드임을 알림
            let cardActive = document.getElementById("card" + index);
            if (hand_arr[index].cost <= mana) {
                //console.log("on trigger");
                cardActive.style.border = '5px solid yellow';
            }
            else {
                cardActive.style.border = '1px solid gray';
            }
        }
    });

    cardIndex.innerText = handIndex + " / 10";
}

/* 카드 사용 이벤트 */
// 마우스를 누를 때 카드를 드래그합니다.

let isDragging = false;
let dragOffsetX, dragOffsetY;
let draggedCard;

document.addEventListener('mousedown', (event) => {

    if (isMyTurn === true) {
        let flag = 0;

        if (event.target.classList.contains('card')) {
            draggedCard = event.target;
            flag++;
        }
        else if (
            event.target.classList.contains('cardName') ||
            event.target.classList.contains('cardCost') ||
            event.target.classList.contains('cardInfo')) {
            draggedCard = event.target.parentElement;
            flag++;
        }

        if (flag != 0) {
            isDragging = true;
            // 클릭된 카드의 인덱스를 추출합니다.
            selectedCard = Array.from(draggedCard.parentNode.children).indexOf(draggedCard) - 1;

            // 선택된 카드의 코스트가 현재 마나보다 적거나 같아야 사용 가능
            if (hand_arr[selectedCard].cost <= mana) {
                //console.log("선택된 카드 : " + selectedCard);

                const rect = draggedCard.getBoundingClientRect();
                dragOffsetX = event.clientX;
                dragOffsetY = event.clientY;

                // 드래그 시작 시 카드의 상대적인 위치 계산
                const offsetX = event.clientX;
                const offsetY = event.clientY;

                // 카드 위치 재조정
                draggedCard.style.left = `${event.clientX - offsetX}px`;
                draggedCard.style.top = `${event.clientY - offsetY}px`;

                // 드래그 중인 카드를 최상위로 올립니다.
                draggedCard.style.zIndex = 1000;

                // 카드의 움직임을 부드럽게 만들기 위해 이벤트 기본 동작을 막습니다.
                event.preventDefault();
            }
            else {
                const systemNotice = document.getElementById("systemNotice");
                systemNotice.style.filter = 'opacity(1)';
                setTimeout(() => {
                    systemNotice.style.filter = 'opacity(0)';
                }, 700);

                isDragging = false;
                draggedCard = null;
                selectedCard = null;
            }
        }
    }
});

// 드래그가 종료되었을 때의 처리
document.addEventListener('mouseup', (event) => {
    if (!isDragging) return;

    const board = document.getElementById('hand');
    const boardRect = board.getBoundingClientRect();
    const cardRect = draggedCard.getBoundingClientRect();
    const cardCenterX = cardRect.x + cardRect.width / 2;
    const cardCenterY = cardRect.y + cardRect.height;   // 카드의 아랫면을 기준으로 함

    //console.log("대상 카드 : "+hand_arr[selectedCard].name);

    if (
        cardCenterX > boardRect.left &&
        cardCenterX < boardRect.right &&
        cardCenterY > boardRect.top &&
        cardCenterY < boardRect.bottom
    ) {
        draggedCard.style.left = '0px';
        draggedCard.style.top = '0px';
        //console.log("카드를 사용하지 않았음!");
    } else {
        document.getElementById('hand').appendChild(draggedCard);

        Active_Card(selectedCard); // 이 코드는 정의되지 않았으므로 주석 처리합니다.
        removeCard();
        //console.log("카드를 사용했음!");
        // CUR_CARD = cardInfo.index; // 이 코드와 관련된 변수도 정의되지 않았으므로 주석 처리합니다.
    }

    isDragging = false;
    draggedCard = null;
    selectedCard = null;
});

// 마우스를 이동할 때 카드를 이동시킵니다.
document.addEventListener('mousemove', (event) => {
    if (isDragging && draggedCard) {
        // 마우스의 위치
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // 드래그가 시작된 위치와의 거리 차이 계산
        const offsetX = mouseX - dragOffsetX;
        const offsetY = mouseY - dragOffsetY;

        // 카드의 위치를 마우스 위치에 따라 이동
        draggedCard.style.left = `${offsetX}px`;
        draggedCard.style.top = `${offsetY}px`;
    }
});

let enemyAnimation;

function EnemySprite(status) {

    const enemySprite = document.querySelector("#enemySprite");
    let totalFrames = 0;
    let frame = 0;

    let curEnemy = gameManager().curEnemy;
    //console.log("curEnemy : "+curEnemy);
    // 애니메이션 중지
    clearInterval(enemyAnimation);

    if (curEnemy == "slime") {
        const slimeAnimation = () => {
            //console.log("슬라임 애니메이션 실행중");

            if (status == "idle") {
                totalFrames = 8;
                enemySprite.style.backgroundImage = `url('./assets/slime/Idle_${(frame + 1)}.png')`;
            }
            else if (status == "attack") {
                totalFrames = 5;
                enemySprite.style.backgroundImage = `url('./assets/slime/Attack_3_${(frame + 1)}.png')`;
            }
            else if (status == "hurt") {
                totalFrames = 6;
                enemySprite.style.filter = 'opacity(0.5)';
                enemySprite.style.backgroundImage = `url('./assets/slime/Hurt_${(frame + 1)}.png')`;

                if (frame + 1 >= totalFrames) {
                    //console.log("idle 애니메이션 실행");
                    enemySprite.style.filter = 'opacity(1)';
                    clearInterval(enemyAnimation);
                    EnemySprite("idle");
                }
            }

            frame++;
            if (frame >= totalFrames) {
                frame = 0;
            }

            //enemyAnimation = setTimeout(slimeAnimation, 150);
        }

        enemyAnimation = setInterval(slimeAnimation, 150);
    }
}

function Active_Card(cardIndex) {
    let card = getCard_storage(hand_arr[cardIndex].index); // 핸드에서 선택한 카드의 정보를 스토리지에서 가져옴

    applyMana(card.cost);

    // 태그는 `로 구분되어있는 하나의 문자열로 받음
    let tags = card.tag.split('`');

    if (card.type === "attack") {
        const playerEffect = document.getElementById("playerEffect");
        const enemyPreHp = document.getElementById("enemyPreHP");
        enemyPreHp.style.width = (gameData.enemyHP / gameData.enemyMaxHP) * 100 + '%';

        let Atk = gameData.playerAtk;
        let enemyHP = gameData.enemyHP;
        let enemyShield = gameData.enemyShield;

        // 적에게 피해를 입히는 로직 추가
        let damageRate = card.atk / 100;
        //console.log("damageRate : "+damageRate);

        // 입힐 데미지 계산 => 최종 데미지는 damage로 넣음
        let damage = Math.floor(Atk * damageRate);

        // 공격 횟수 처리
        let repeatCount = 1; // 기본적으로 한 번만 공격
        if (card.tag.includes("회공격")) {
            repeatCount = parseInt(card.tag.split("회공격")[0]); // 태그에서 공격 횟수를 추출
        }

        if (enemyShield <= 0) {
            // Hurt 애니메이션 재생
            EnemySprite("hurt");
        }

        // 임시적으로 증가하는 치명타 확률
        let tempCrit = 0;
        if (card.tag.includes("치명타공격"))
            tempCrit = 100;

        // 일격 필살 관련 트리거
        let ultimateFlag = false;
        if (card.tag.includes("일격필살"))
            ultimateFlag = true;
    
        let shieldAttackFlag = false;
        // 방패 밀치기 관련 트리거
        if (card.tag.includes("방어도공격")){
            damage = gameData.playerShield;
            shieldAttackFlag = true;
        }
        
        let damageRecord = damage;

        // 반복해서 공격하기
        for (let i = 0; i < repeatCount; i++) {
            // 각 반복마다 일정한 시간 간격을 두고 공격 실행
            setTimeout(() => {

                // 데미지를 원래대로 복구 => 데미지를 계산식 이전으로 복구
                damage = damageRecord;

                //////////////////////// 데미지 계산 식 ////////////////////////////
                // 약점 노출 계산
                if(enemyWeak > 0){
                    damage = damage * 1.5;
                }

                // 치명타 계산
                let playerCrit = gameData.playerCritical;
                let rand = (Math.floor(Math.random() * 100) + 1); // 1~100

                let critFlag = false;

                // 플레이어 치명타 확률 + 임시적으로 증가한 치명타 확률을 더해서 계산
                // 데미지 = 데미지 * 치명타배율
                if ((playerCrit + tempCrit) >= rand) {
                    damage = damage * gameData.playerCriticalDamageRate;
                    critFlag = true;
                }

                // 데미지는 항상 정수이기로 합시다
                damage = Math.floor(damage);

                //////////////////////////////////////////////////////////////////

                // 공격 이펙트
                let effectDeg = (Math.floor(Math.random() * 4) + 1) * 90;
                playerEffect.style.display = 'block';
                playerEffect.style.transform = 'rotate(' + effectDeg + 'deg)'

                setTimeout(() => {
                    playerEffect.style.display = 'none';
                }, 50);

                // 만약 적에게 방어도가 없으면
                if (enemyShield <= 0) {

                    // 음향 효과
                    if (ultimateFlag){
                        soundEffect("일격필살");
                    }
                    else if(shieldAttackFlag){
                        soundEffect("방패밀치기");
                    }
                    else {
                        if (critFlag)
                            soundEffect("critical");
                        else
                            soundEffect("attack");
                    }
                    enemyHP = enemyHP - damage; // 피해 입히기
                    // 변경된 데이터를 applyHP 함수에 반영
                    // 피해의 수치를 표시하는 엘리먼트 생성
                    showDamageNumber(damage, critFlag);
                }

                // 적에게 방어도가 있다면
                else if (enemyShield > 0) {

                    enemyShield = enemyShield - damage;

                    if (enemyShield < 0) {

                        enemyHP = enemyHP + enemyShield;
                        gameData.enemyShield = 0;

                        if(!ultimateFlag && !shieldAttackFlag)
                            soundEffect("shieldBreak");
                    }
                    else {
                        gameData.enemyShield = enemyShield;

                        if(!ultimateFlag && !shieldAttackFlag)
                            soundEffect("defence");
                    }

                    if(ultimateFlag){
                        soundEffect("일격필살");
                    }
                    else if(shieldAttackFlag){
                        soundEffect("방패밀치기");
                    }

                    // 변경된 데이터를 applyHP 함수에 반영
                    // 피해의 수치를 표시하는 엘리먼트 생성
                    showDamageNumber(damage, critFlag);
                }

                gameData.enemyHP = enemyHP;
                gameData.applyHP(); // applyHP 함수 호출

            }, i * 300); // 각 반복마다 1초씩 딜레이를 줌 (1000ms = 1초)
        }
    }
    else if (card.type === "defence") {

        tags.forEach(tag => {
            if (tag.includes("방어도획득")) {
                // 정규식을 사용하여 여러 자리 숫자를 추출
                let defenceAmountMatch = tag.match(/방어도획득(\d+)/);
                if (defenceAmountMatch) {
                    let defenceAmount = parseInt(defenceAmountMatch[1]);
                    gameData.playerShield += defenceAmount; // 방어도 증가

                    // 음향 효과
                    soundEffect("shield");
                    gameData.applyHP();

                    //console.log("방어도 획득: " + defenceAmount);
                }
            }
            else if (tag.includes("받는피해감소")) {
                // 정규식을 사용하여 여러 자리 숫자를 추출 
                /*
                let damageReductionMatch = tag.match(/받는피해감소(\d+)/);
                if (damageReductionMatch) {
                    let damageReductionAmount = parseInt(damageReductionMatch[1]);
                    gameData.damageReduction += damageReductionAmount; // 받는 피해 감소

                    // 음향 효과
                    soundEffect("defence");
                    gameData.applyHP();

                    console.log("받는 피해 감소: " + damageReductionAmount);
                }
                */
            }
        })
    }
    else if (card.type === "spell") {

        tags.forEach(tag => {
            if (tag.includes("증가")) {
                soundEffect("addBuff");

                if (tag.includes("공격력증가")) {
                    // 정규식을 사용하여 여러 자리 숫자를 추출
                    let atkBuffMatch = tag.match(/공격력증가(\d+)/);
                    if (atkBuffMatch) {
                        let value = parseInt(atkBuffMatch[1]);
                        gameData.playerAtk += value; // 공격력 증가

                        applyStat("player", "atk", value);
                    }
                }
                else if (tag.includes("치명타확률증가")) {
                    // 정규식을 사용하여 여러 자리 숫자를 추출
                    let critBuffMatch = tag.match(/치명타확률증가(\d+)/);
                    if (critBuffMatch) {
                        let value = parseInt(critBuffMatch[1]);
                        gameData.playerCritical += value; // 공격력 증가

                        applyStat("player", "critical", value);
                    }
                }
            }
        })
    }
    else if(card.type === "magic"){
        tags.forEach(tag => {
            soundEffect("magic");
        });
    }

    // 특수 디버프 효과 setTimeout을 걸어야 공격에 안걸림 ㅜㅜ
    tags.forEach(tag => {
        setTimeout(() => {
            if (tag.includes("약점노출")) {
            
                let debuffWrap = document.getElementById("enemyDeBuffWrap");
                debuffWrap.innerHTML += "<img class='Debuff' id='Debuff"+EnemyDebuffIndex+"' src=./assets/약점.png>";
    
                setTimeout(() => {
                    document.getElementById("Debuff"+EnemyDebuffIndex).style.filter = 'opacity(1) invert(58%) sepia(3%) saturate(0%) hue-rotate(143deg) brightness(89%) contrast(92%)';
                    EnemyDebuffIndex ++;
                }, 20);
    
                enemyWeak = 2;
                refreshCard();
            }
        }, 100);
    });
}

function applyStat(target, option, val) {

    if (target === "player") {
        let playerFovLabel;
        let playerFov;

        switch (option) {
            case "atk":
                playerFovLabel = document.getElementById("playerAtk");
                playerFov = gameData.playerAtk;
                break;
            case "def":
                playerFovLabel = document.getElementById("playerDef");
                playerFov = gameData.playerDef;
                break;
            case "speed":
                playerFovLabel = document.getElementById("playerSp");
                playerFov = gameData.playerSpeed;
                break;
            case "critical":
                playerFovLabel = document.getElementById("playerCt");
                playerFov = gameData.playerCritical;
                break;
        }

        if (val > 0) {
            playerFovLabel.style.color = 'greenyellow';

            for (let i = playerFovLabel.textContent; i <= playerFov; i++) {
                setTimeout(() => {
                    playerFovLabel.innerText = i;
                }, 10 * i);

                if (i == playerFov) {
                    setTimeout(() => {
                        playerFovLabel.style.color = 'white';
                    }, 10 * i + 500);
                }
            }
        }
        else if (val < 0) {
            playerFovLabel.style.color = 'red';

            for (let i = playerFovLabel.textContent; i >= playerFov; i--) {
                setTimeout(() => {
                    playerFovLabel.innerText = i;
                }, 10 * i);

                if (i == playerFov) {
                    setTimeout(() => {
                        playerFovLabel.style.color = 'white';
                    }, 10 * i + 500);
                }
            }
        }
    }
    else if (target === "enemy") {
        /*
        let enemyAtkLabel = document.getElementById("enemyAtk");
        enemyAtkLabel.innerText = gameData.enemyAtk;
        */
    }

    refreshCard();
}
function applyMana(useCost) {

    let manaIndex = document.getElementById("manaIndex");

    // 코스트 사용 적용
    if (useCost > 0) {
        mana = mana - useCost;

        if (mana <= 5) {
            for (let i = 5; i > mana; i--) {
                document.getElementById("mana" + i).style.backgroundColor = 'gray';
            }
        }
    }
    // 코스트 초기화 적용
    else if (useCost === "reset") {
        mana = 555;
        for (let i = 1; i <= 5; i++) {
            document.getElementById("mana" + i).style.backgroundColor = 'aquamarine';
        }
    }
    // 코스트 추가 적용
    else {
        mana = mana + useCost;

        for (let i = 1; i <= 5; i++) {
            document.getElementById("mana" + i).style.backgroundColor = 'aquamarine';
        }
    }

    manaIndex.innerText = mana + "/5";
}

document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById("volumeSlider");

    volumeSlider.addEventListener('input', () => {
        effectVolume = volumeSlider.value / 100;
    });
});

function soundEffect(trigger) {
    const effectSound = document.getElementById("effectSound");

    /*
    else if(trigger===""){
        effectSound.src = "./assets/sound/.mp3";
    }   
    */

    if (trigger === "attack") {
        effectSound.src = "./assets/sound/slash.mp3";
    }
    else if (trigger === "shield") {
        effectSound.src = "./assets/sound/addShield.mp3";
    }
    else if (trigger === "defence") {
        effectSound.src = "./assets/sound/defence.mp3";
    }
    else if (trigger === "shieldBreak") {
        effectSound.src = "./assets/sound/shieldBreak.mp3";
    }
    else if (trigger === "addBuff") {
        effectSound.src = "./assets/sound/addBuff.mp3";
    }
    else if (trigger === "critical") {
        effectSound.src = "./assets/sound/critical.mp3";
    }
    else if(trigger==="magic"){
        effectSound.src = "./assets/sound/magic.mp3";
    } 
    else if(trigger==="일격필살"){
        effectSound.src = "./assets/sound/일필1.mp3";
        effectSound.play();

        setTimeout(() => {
            effectSound.src = "./assets/sound/일필2.mp3";
            effectSound.play();

            setTimeout(() => {
                effectSound.src = "./assets/sound/일필3.mp3";
                effectSound.play();
            }, 1300);
        }, 1000);
    }
    else if(trigger==="방패밀치기"){
        effectSound.src = "./assets/sound/shieldAttack.mp3";
    }

    effectSound.volume = effectVolume;
    effectSound.play();
}
// 피해의 수치를 표시하는 함수
function showDamageNumber(damage, critFlag) {
    // 텍스트 엘리먼트 생성
    const damageText = document.createElement('div');
    damageText.classList.add('damage-text'); // CSS 클래스 추가

    // 텍스트 내용 설정
    damageText.textContent = '-' + damage;

    // 크리티컬 여부에 따른 스타일 변경
    if (critFlag) {
        damageText.style.color = 'yellow';
    }
    else {
        damageText.style.color = 'white';
    }

    // fade in - fade out 이펙트
    setTimeout(() => {
        damageText.style.filter = 'opacity(1)';

        setTimeout(() => {
            damageText.style.filter = 'opacity(0)';
        }, 1000);
    }, 1);

    // 적절한 위치에 추가
    const container = document.querySelector('#enemy'); // 게임 컨테이너의 클래스명
    container.appendChild(damageText);

    let posY = 0;
    let damageFontEffect = setInterval(function () {
        damageText.style.transform = 'translateY(' + posY + 'px)';
        posY = posY - 2;
    }, 50);

    // 일정 시간이 지난 후에 텍스트 엘리먼트 제거
    setTimeout(() => {
        clearInterval(damageFontEffect);
        damageText.remove();
    }, 1500); // 1초 후에 제거 (1000ms = 1초)
}

function getCard_storage(index) {
    /*
        card.name = "";
        card.index = index;
        card.type = "none";
        card.tag = "";
        card.cost = 0;
        card.atk = 0;
        card.def = 0;
        card.info = "";
    */
    let card = {
        name: "",
        index: -1,
        type: "none",
        tag: "none",
        cost: -1,
        atk: -1,
        def: -1
    };
    switch (index) {
        case 0:
            card.name = "타격",
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 1;
            card.atk = 100;
            card.def = 0;
            card.info = "적에게 공격력의 100%의 물리피해를 입힙니다.";
            break;
        case 1:
            card.name = "연속 베기";
            card.index = index;
            card.type = "attack";
            card.tag = "2회공격";
            card.cost = 1;
            card.atk = 60;
            card.def = 1;
            card.info = "적에게 공격력의 60%의 물리피해를 2회 입힙니다.";
            break;
        case 2:
            card.name = "패링";
            card.index = index;
            card.type = "defence";
            card.tag = "";
            card.cost = 3;
            card.atk = 3;
            card.def = 3;
            card.info = "내 생명력이 n%보다 많다면 적의 공격을 방어합니다. 다음 사용하는 패링의 요구 체력 조건이 n%만큼 증가합니다.";
            break;
        case 3:
            card.name = "응수";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 2;
            card.atk = 2;
            card.def = 1;
            card.info = "이번 게임에서 패링으로 방어한 데미지의 50%만큼의 물리피해를 입힙니다. 패링으로 방어한 데미지 기록을 초기화합니다.";
            break;
        case 4:
            card.name = "약점 노출";
            card.index = index;
            card.type = "attack";
            card.tag = "약점노출";
            card.cost = 2;
            card.atk = 90;
            card.def = 3;
            card.info = "적에게 공격력의 90%의 데미지로 공격하고 n회 동안 적의 약점을 노출시킵니다.";
            break;
        case 5:
            card.name = "명상";
            card.index = index;
            card.type = "spell";
            card.tag = "공격력증가50";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            card.info = "이번 게임동안 공격력이 10 증가합니다.";
            break;
        case 6:
            card.name = "집중";
            card.index = index;
            card.type = "spell";
            card.tag = "치명타확률증가10";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            card.info = "이번 게임동안 치명타 확률이 10 증가합니다.";
            break;
        case 7:
            card.name = "급소 타격";
            card.index = index;
            card.type = "attack";
            card.tag = "치명타공격";
            card.cost = 2;
            card.atk = 100;
            card.def = 3;
            card.info = "적에게 공격력의 100%의 치명타 피해를 입힙니다.";
            break;
        case 8:
            card.name = "깊은 자상";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            card.info = "적에게 상처를 1회 입힙니다.";
            break;
        case 9:
            card.name = "출혈";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            card.info = "적에게 매턴 n의 피해를 입히는 출혈 디버프를 부여합니다. 다른 출혈 디버프와 중첩될 수 있습니다.";
            break;
        case 10:
            card.name = "큰거 한방";
            card.index = index;
            card.type = "magic";
            card.tag = "";
            card.cost = 2;
            card.atk = 1;
            card.def = 3;
            card.info = "다음 공격의 피해량을 n%만큼 증가시킵니다.";
            break;
        case 11:
            card.name = "일격 필살";
            card.index = index;
            card.type = "attack";
            card.tag = "치명타공격`일격필살";
            card.cost = 2;
            card.atk = 300;
            card.def = 3;
            card.info = "적에게 공격력의 300%의 치명타 피해를 입힙니다. 이 후 탈진 디버프를 얻습니다.";
            break;
        case 12:
            card.name = "방패 들기";
            card.index = index;
            card.type = "defence";
            card.tag = "방어도획득15";
            card.cost = 2;
            card.atk = 1;
            card.def = 15;
            card.info = "방어도를 n만큼 획득합니다.";
            break;
        case 13:
            card.name = "피의 맛";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 공격력의 n% 만큼의 피해를 입히고, 입힌 데미지만큼 체력을 회복합니다.";
            break;
        case 14:
            card.name = "방패 밀치기";
            card.index = index;
            card.type = "attack";
            card.tag = "방어도공격";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "내 방어도만큼 적에게 피해를 입힙니다.";
            break;
        case 15:
            card.name = "수비 태세";
            card.index = index;
            card.type = "defence";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "n턴간 적에게 입히는 피해가 줄어들지만, 받는 피해량이 n%만큼 줄어들고 n만큼의 방어도를 획득합니다.";
            break;
        case 16:
            card.name = "완벽한 밸런스";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 낮은 피해를 입히고 낮은 방어도를 획득합니다.";
            break;
        case 17:
            card.name = "천마 3검식 - 1식";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 공격력의 n%만큼의 물리피해를 입히고 받는 피해 증가 디버프를 적용시킵니다. 다음턴 시작시 '천마 3검식 - 2식'을 패에 추가합니다.";
            break;
        case 18:
            card.name = "천마 3검식 - 2식";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 n번의 상처를 입힙니다. 다음턴 시작시 '천마 3검식 - 3식'을 패에 추가합니다.";
            break;
        case 19:
            card.name = "천마 3검식 - 3식";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 큰 피해를 입히고 탈진 디버프를 얻습니다.";
            break;
        case 20:
            card.name = "정화";
            card.index = index;
            card.type = "magic";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "자신에게 걸린 모든 디버프를 해제합니다.";
            break;
        case 21:
            card.name = "칼날비";
            card.index = index;
            card.type = "attack";
            card.tag = "3회공격";
            card.cost = 0;
            card.atk = 55;
            card.def = 0;
            card.info = "적에게 공격력의 55%만큼의 피해를 3번 입힙니다.";
            break;
        case 22:
            card.name = "추가 공격";
            card.index = index;
            card.type = "spell";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "라운드 종료시 해당 턴에 적을 공격한 횟수가 n번 이상이면 적에게 n만큼의 피해를 입힙니다.";
            break;
        case 23:
            card.name = "불굴의 의지";
            card.index = index;
            card.type = "spell";
            card.tag = "";
            card.cost = 0;
            card.atk = 0;
            card.def = 0;
            card.info = "내 캐릭터가 치명적인 피해를 입었을 때, 체력 1로 생존합니다.";
            break;
        case 24:
            card.name = "동귀어진";
            card.index = index;
            card.type = "attack";
            card.tag = "";
            card.cost = 30;
            card.atk = 0;
            card.def = 0;
            card.info = "내 체력이 1 줄어들 때 마다 카드 사용 코스트가 1 줄어듭니다.";
            break;
        case 25:
            card.name = "과다출혈";
            card.index = index;
            card.type = "magic";
            card.tag = "";
            card.cost = 2;
            card.atk = 0;
            card.def = 0;
            card.info = "적에게 존재하는 출혈에 X2를 적용시킵니다.";
            break;
        default:
            card.index = -1;
            break;
    }

    return card;
}
function CHECK_TOTAL_CARD_INDEX() {
    let TOTAL_CARD_INDEX = 0;
    let i = 0;
    while (1) {
        let card = getCard_storage(i);
        if (card.index == -1) break;

        TOTAL_CARD_INDEX++;
        i++;
    }
    console.log("총 " + TOTAL_CARD_INDEX + "개의 카드를 불러오는데 성공함!");

    // 임시적인 덱 구성
    for (let i = 0; i < TOTAL_CARD_INDEX; i++) {
        deck.push(getCard_storage(i));
    }
}
CHECK_TOTAL_CARD_INDEX();
gameController();
