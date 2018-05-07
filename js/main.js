const ballRadius = 10;
const py = 6;
const paddleHeight = 80;
const paddleWidth = 10;
const UP_KEY = 40;
const DOWN_KEY = 38;
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = '28px Verdana bold';
let x = canvas.width/2;
let y = canvas.height/2;
let dx = -2;
let dy = -2;
let paddlePlayerX = canvas.width-paddleWidth;
let paddlePlayerY = paddleCompY = (canvas.height-paddleHeight)/2;
let paddleCompX = 0;
let downLimit = canvas.height - paddleHeight;
let scorePlayer = scoreComp = 0;
let upPressed = false;
let downPressed = false;

const keyDownHandler = (e) => {
    if(e.keyCode === UP_KEY) {
        upPressed = true;
    }
    else if(e.keyCode === DOWN_KEY) {
        downPressed = true;
    }
}
const keyUpHandler = (e) => {
    if(e.keyCode === UP_KEY) {
        upPressed = false;
    }
    else if(e.keyCode === DOWN_KEY) {
        downPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f31d2f";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddlePlayerX, paddlePlayerY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#2c82c9";
    ctx.fill();
    ctx.closePath();
}

const drawCompPaddlle = () => {
    ctx.beginPath();
    ctx.rect(paddleCompX, paddleCompY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#eee657";
    ctx.fill();
    ctx.closePath();
}

const drawLine = () => {
	ctx.beginPath();
	ctx.moveTo((canvas.width)/2, 0);
	ctx.lineTo((canvas.width)/2, canvas.height);
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#785edd";
	ctx.stroke();

}

const reset = () => {
    if(scoreComp === 5) {
        alert(`Поздравляем! Вы выиграли со счетом ${scoreComp} : ${scorePlayer}`);
        document.location.reload();
    }
    else if(scorePlayer === 5){
        alert(`Вы проиграли со счетом ${scoreComp} : ${scorePlayer}`);
        document.location.reload();
    }
    else {
        alert(`Счет ${scoreComp} : ${scorePlayer}. Продолжаем!`);
    }

    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = -dx;
    dy = 3;
    paddlePlayerY = paddleCompY = (downLimit)/2;
}

const draw = () => {
     let upBall = y - ballRadius;
    let downBall = y + ballRadius;
    let leftBall = x - ballRadius;
    let rightBall = x + ballRadius;
    let sizePaddleC = paddleCompY + paddleHeight;
    let sizePaddleP = paddlePlayerY + paddleHeight;
    let centerPaddleC = paddleCompY + (paddleHeight / 2);
    let centerPaddleP = paddlePlayerY + (paddleHeight / 2);
    const centerPaddleCheckDown = centerPaddleC < y || centerPaddleC < y + 10; 
    const centerPaddleCheckUp = centerPaddleC > y || centerPaddleC > y - 10;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawBall();
    drawPaddle();
    ctx.fillText(scoreComp, canvas.width / 2 - 50, 50);
    drawCompPaddlle();
    ctx.fillText(scorePlayer, canvas.width / 2 + 50, 50);
    
    if((upBall < 0 && dy < 0)||(downBall > canvas.height && dy > 0)) {
        dy = -dy;
    }

    //Попадание мяча в ворота компьютера
    if(leftBall < 0) {
        if(downBall > paddleCompY && upBall < sizePaddleC) {
            dx = -dx;
            const deltaY = y - (centerPaddleC);
            dy = deltaY * 0.3;
        } 
        else {
            scoreComp++;
            reset();            
        }
    }

    //Попадание мяча в ворота игрока
    if(rightBall > canvas.width) {
        if(downBall > paddlePlayerY && upBall < sizePaddleP) {
            dx = -dx;
            const deltaY = y - (centerPaddleP);
            dy = deltaY * 0.3;
        } 
        else {
            scorePlayer++;
            reset();
        }
    }    

    //Игра компьютера
    if(centerPaddleCheckDown && paddleCompY < downLimit) {
        paddleCompY += py;
    }
    if(centerPaddleCheckUp && paddleCompY > 0) {
        paddleCompY -= py;
    }
    
    if(upPressed && paddlePlayerY < downLimit) {
        paddlePlayerY += py;
    }
    else if(downPressed && paddlePlayerY > 0) {
        paddlePlayerY -= py;
    }
        
    x += dx;
    y += dy;
}

setInterval(draw, 10);