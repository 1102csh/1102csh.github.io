const img = document.querySelector('.enemyAbilityImg');
const panel = document.querySelector('.enemyAbilityPanel');

// 이미지에 마우스를 올렸을 때 이벤트를 추가합니다.
img.addEventListener('mouseover', function () {
    // 패널의 텍스트 요소를 보이게 합니다.
    const texts = panel.querySelectorAll('.enemyAbilityText');
    texts.forEach(text => {
        text.style.filter = 'opacity(1)';
    });
});

// 이미지에서 마우스가 떠났을 때 이벤트를 추가합니다.
img.addEventListener('mouseout', function () {
    // 패널의 텍스트 요소를 숨깁니다.

    setTimeout(() => {
        const texts = panel.querySelectorAll('.enemyAbilityText');
        texts.forEach(text => {
            text.style.filter = 'opacity(0)';
        });
    }, 2000);
});
