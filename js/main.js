let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = -2;
let dy = -2;
let py = -5;
let paddleHeight = 80;
let paddleWidth = 10;
let paddlePlayerX = canvas.width-paddleWidth;
let paddlePlayerY = (canvas.height-paddleHeight)/2;
let paddleCompX = 0;
let paddleCompY = (canvas.height-paddleHeight)/2;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler (e) {
    if(e.keyCode == 40) {
        upPressed = true;
    }
    else if(e.keyCode == 38) {
        downPressed = true;
    }
}
function keyUpHandler (e) {
    if(e.keyCode == 40) {
        upPressed = false;
    }
    else if(e.keyCode == 38) {
        downPressed = false;
    }
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddlePlayerX, paddlePlayerY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

const drawCompPaddlle = () => {
	ctx.beginPath();
    ctx.rect(paddleCompX, paddleCompY, paddleWidth, paddleHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

const drawLine = () => {
	ctx.beginPath();
	ctx.moveTo((canvas.width)/2, 0);
	ctx.lineTo((canvas.width)/2, canvas.height);
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#ff0000";
	ctx.stroke();

}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawBall();
    drawPaddle();
    drawCompPaddlle();
    
    if(x + dx < ballRadius) {
    	if(y > paddleCompY && y < paddleCompY + paddleHeight) {
        	dx = -dx;
    	}
    	else {
    		alert("Game Over");
    		document.location.reload();
    	}
    }

    if(paddleCompY+paddleHeight === canvas.height || paddleCompY === 0) {
    	py = -py;
    }

    if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy;
    }
    else if(x + dx > canvas.width-ballRadius) {
    	if(y > paddlePlayerY+2 && y < paddlePlayerY + paddleHeight+2){
    		dx = -dx;
    	}
    	else{
    		alert("Game Over");
    		document.location.reload();
    	}
    }

    
    
    if(upPressed && paddlePlayerY < canvas.height-paddleHeight) {
        paddlePlayerY += 7;
    }
    else if(downPressed && paddlePlayerY > 0) {
        paddlePlayerY -= 7;
    }
        
    x += dx;
    y += dy;
    paddleCompY += py;
}

setInterval(draw, 10);