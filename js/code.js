const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rows = 8;
const cols = 6;
const cellWidth = canvas.width / cols;
const cellHeight = canvas.height / rows;
const scoreText = document.getElementById("score");
let score = 0;

const initialBoard = [
    [1, 1, 2, 2, 1, 1],
    [1, 1, 2, 2, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 3, 3, 5, 5, 0],
    [1, 4, 3, 5, 6, 1],
    [1, 4, 4, 6, 6, 1],
    [1, 1, 7, 7, 1, 1],
    [1, 1, 9, 9, 1, 1]
];

// 현재 보드 상태 (깊은 복사)
let board = JSON.parse(JSON.stringify(initialBoard));

// 도착지 위치 저장
const goalPositions = [];
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        if (initialBoard[r][c] === 9) {
            goalPositions.push({ row: r, col: c });
        }
    }
}

const blockColors = {
    2: '#00C2FF',
    3: '#FF6B6B',
    4: '#FFD93D',
    5: '#6BCB77',
    6: '#A66CFF',
    7: '#FFA07A',
};

function findConnectedGroup(row, col, value, visited = {}) {
    const stack = [[row, col]];
    const group = [];
    const key = (r, c) => `${r},${c}`;
    visited[key(row, col)] = true;

    while (stack.length > 0) {
        const [r, c] = stack.pop();
        group.push({ row: r, col: c });

        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0]
        ];

        for (const [dy, dx] of directions) {
            const nr = r + dy;
            const nc = c + dx;

            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                !visited[key(nr, nc)] &&
                board[nr][nc] === value
            ) {
                visited[key(nr, nc)] = true;
                stack.push([nr, nc]);
            }
        }
    }

    return group;
}

let targetGroup = null;
let targetValue = null;

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const col = Math.floor(mouseX / cellWidth);
    const row = Math.floor(mouseY / cellHeight);
    const value = board[row][col];

    if (value >= 2 && value <= 7) {
        targetGroup = findConnectedGroup(row, col, value);
        targetValue = value;
        drawBoard();
    }
});

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const margin = 4;

    // 도착지 먼저 그리기 (배경)
    for (const { row, col } of goalPositions) {
        const x = col * cellWidth;
        const y = row * cellHeight;
        ctx.fillStyle = '#D0FFD0';
        ctx.fillRect(x, y, cellWidth, cellHeight);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * cellWidth;
            const y = row * cellHeight;
            const value = board[row][col];

            // 기본 셀 테두리
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, cellWidth, cellHeight);

            if (value === 1) {
                // 벽
                ctx.fillStyle = '#444';
                ctx.fillRect(x, y, cellWidth, cellHeight);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#444';
                ctx.strokeRect(x, y, cellWidth, cellHeight);
                ctx.strokeStyle = '#ccc';
            } else if (value >= 2 && value <= 7) {
                // 블럭
                ctx.fillStyle = blockColors[value] || '#999';
                ctx.fillRect(
                    x + margin,
                    y + margin,
                    cellWidth - margin * 2,
                    cellHeight - margin * 2
                );

                if (targetGroup && targetGroup.some(p => p.row === row && p.col === col)) {
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(
                        x + margin,
                        y + margin,
                        cellWidth - margin * 2,
                        cellHeight - margin * 2
                    );
                }
            }
        }
    }

    scoreText.innerText = score;
}

window.addEventListener('keydown', (e) => {
    if (!targetGroup || !targetValue) return;

    let dx = 0, dy = 0;
    if (e.key === 'ArrowUp') dy = -1;
    else if (e.key === 'ArrowDown') dy = 1;
    else if (e.key === 'ArrowLeft') dx = -1;
    else if (e.key === 'ArrowRight') dx = 1;
    else return;

    const key = (r, c) => `${r},${c}`;
    const groupSet = new Set(targetGroup.map(p => key(p.row, p.col)));

    const nextGroup = targetGroup.map(({ row, col }) => ({
        row: row + dy,
        col: col + dx
    }));

    const canMove = nextGroup.every(({ row, col }) =>
        row >= 0 && row < rows &&
        col >= 0 && col < cols &&
        (
            board[row][col] === 0 ||
            board[row][col] === 9 ||
            groupSet.has(key(row, col))
        )
    );

    if (!canMove) return;

    score = score + 1;
    const isGoal = (r, c) =>
        goalPositions.some(p => p.row === r && p.col === c);

    for (const { row, col } of targetGroup) {
        board[row][col] = isGoal(row, col) ? 9 : 0;
    }

    targetGroup = nextGroup;

    for (const { row, col } of targetGroup) {
        board[row][col] = targetValue;
    }

    drawBoard();

    if (targetValue === 2) {
        const isClear = goalPositions.every(goal =>
            targetGroup.some(block =>
                block.row === goal.row && block.col === goal.col
            )
        );

        if (isClear) {
            setTimeout(() => {
                alert("🎉 클리어!");
            }, 100); // drawBoard 이후 alert 딜레이
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const col = Math.floor(mouseX / cellWidth);
    const row = Math.floor(mouseY / cellHeight);

    if (
        row >= 0 && row < rows &&
        col >= 0 && col < cols &&
        board[row][col] >= 2 && board[row][col] <= 7
    ) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    board = JSON.parse(JSON.stringify(initialBoard));
    targetGroup = null;
    targetValue = null;
    score = 0;
    scoreText.innerText = 0;
    drawBoard();
});

drawBoard();
