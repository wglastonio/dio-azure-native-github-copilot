const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let angle = 0;
let speed = 0.1;
let ballAngle = 0;
let ballSpeed = 0.2;
let ballRadius = 10;
let isSpinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // Draw the roulette wheel
    for (let i = 0; i < 36; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 200, (i * Math.PI) / 18, ((i + 1) * Math.PI) / 18);
        ctx.fillStyle = (i % 2 === 0) ? '#ff0000' : '#000000';
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(ballAngle);
    ctx.beginPath();
    ctx.arc(200, 0, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
}

function update() {
    if (isSpinning) {
        angle += speed;
        ballAngle += ballSpeed;

        // Simulate slowing down
        speed *= 0.99;
        ballSpeed *= 0.99;

        // Stop spinning after a certain condition
        if (speed < 0.01) {
            isSpinning = false;
            speed = 0.1; // Reset speed for next spin
        }
    }

    drawWheel();
    drawBall();
    requestAnimationFrame(update);
}

function startSpin() {
    isSpinning = true;
}

document.addEventListener('click', startSpin);
update();