let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.font = '20px Verdana';
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height/2;
let dx = -2;
let dy = -2;
let py = 6;
let paddleHeight = 80;
let paddleWidth = 10;
let paddlePlayerX = canvas.width-paddleWidth;
let paddlePlayerY = (canvas.height-paddleHeight)/2;
let paddleCompX = 0;
let paddleCompY = (canvas.height-paddleHeight)/2;
let scorePlayer = scoreComp = 0;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler (e) {
    if(e.keyCode === 40) {
        upPressed = true;
    }
    else if(e.keyCode === 38) {
        downPressed = true;
    }
}
function keyUpHandler (e) {
    if(e.keyCode === 40) {
        upPressed = false;
    }
    else if(e.keyCode === 38) {
        downPressed = false;
    }
}

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
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = -dx;
    dy = 3;
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawBall();
    drawPaddle();
    ctx.fillText(scoreComp, canvas.width / 2 - 50, 50);
    drawCompPaddlle();
    ctx.fillText(scorePlayer, canvas.width / 2 + 50, 50);
    ctx.fillText(paddlePlayerY, 30, 100);

    if((y - ballRadius < 0 && dy < 0)||(y + ballRadius > canvas.height && dy > 0)) {
        dy = -dy;
    }

    //Попадание мяча в ворота компьютера
    if(x - ballRadius < 0) {
        if(y - ballRadius > paddleCompY && y < paddleCompY+paddleHeight) {
            dx = -dx;
            let deltaY = y - (paddleCompY + paddleHeight / 2);
            dy = deltaY * 0.3;
        } else {
            scoreComp++;
            if(scoreComp === 5) {
                alert(`Поздравляем! Вы выиграли со счетом ${scoreComp} : ${scorePlayer}`);
                document.location.reload();
            } 
                alert(`Счет ${scoreComp} : ${scorePlayer}. Продолжаем!`);
                reset();
        }
    }

    //Попадание мяча в ворота игрока
    if(x + ballRadius > canvas.width) {
        if(y > paddlePlayerY && y < paddlePlayerY+paddleHeight) {
            dx = -dx;
            deltaY = y - (paddlePlayerY + paddleHeight / 2);
            dy = deltaY * 0.3;
        } else {
            scorePlayer++;
            if(scorePlayer === 5){
                alert(`Вы проиграли со счетом ${scoreComp} : ${scorePlayer}`);
                document.location.reload();
            }
            alert(`Счет ${scoreComp} : ${scorePlayer}. Продолжаем!`);
            reset();
        }
    }

    //Игра компьютера
    if((paddleCompY + paddleHeight / 2 < y || paddleCompY + paddleHeight / 2 < y + 10) && paddleCompY < canvas.height - paddleHeight) {
        paddleCompY += py;
    }
    if((paddleCompY + paddleHeight / 2 > y || paddleCompY + paddleHeight / 2 > y - 10) && paddleCompY > 0) {
        paddleCompY -= py;
    }
    
    if(upPressed && paddlePlayerY < canvas.height-paddleHeight) {
        paddlePlayerY += py;
    }
    else if(downPressed && paddlePlayerY > 0) {
        paddlePlayerY -= py;
    }
        
    x += dx;
    y += dy;
}

setInterval(draw, 10);