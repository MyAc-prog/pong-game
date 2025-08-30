const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 6;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 5, ballSpeedY = 4;

let scoreLeft = 0, scoreRight = 0;

function drawRect(x, y, w, h) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y) {
    ctx.fillStyle = '#fff';
    ctx.font = '45px Arial';
    ctx.fillText(text, x, y);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(0, leftPaddleY, paddleWidth, paddleHeight);
    drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    drawCircle(ballX, ballY, ballRadius);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Left paddle collision
    if (ballX - ballRadius < paddleWidth &&
        ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Right paddle collision
    if (ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Score left
    if (ballX + ballRadius > canvas.width) {
        scoreLeft++;
        document.getElementById('score-left').textContent = scoreLeft;
        resetBall();
    }

    // Score right
    if (ballX - ballRadius < 0) {
        scoreRight++;
        document.getElementById('score-right').textContent = scoreRight;
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function movePaddles() {
    document.onkeydown = function(e) {
        // W/S for left paddle
        if (e.key === 'w' && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
        if (e.key === 's' && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
        // Arrow up/down for right paddle
        if (e.key === 'ArrowUp' && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
        if (e.key === 'ArrowDown' && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;
    };
}

function gameLoop() {
    render();
    moveBall();
    movePaddles();
    requestAnimationFrame(gameLoop);
}

gameLoop();
