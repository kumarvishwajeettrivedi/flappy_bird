const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const BIRD_WIDTH = 70;
const BIRD_HEIGHT = 50;
const PIPE_WIDTH = 100;
const MIN_PIPE_HEIGHT = 100;
const MAX_PIPE_HEIGHT = 300;
const PIPE_GAP = 170;
const GRAVITY = 0.5;
const LIFT = -8;
const PIPE_SPEED = 2;

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.getElementById('highScore').innerText = highScore;


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        bird.jump();
    }
});


canvas.addEventListener('touchstart', () => {
    bird.jump();
});









let birdImg = new Image();
birdImg.src = 'chuck.png'; 




let bird = {
    x: CANVAS_WIDTH / 2 - BIRD_WIDTH / 2,
    y: CANVAS_HEIGHT / 2 - BIRD_HEIGHT / 2,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    velocity: 0,
    lift: LIFT,
    gravity: GRAVITY,
    update: function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.height > CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT - this.height;
            this.velocity = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    draw: function () {
        ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
    },
    jump: function () {
        this.velocity = this.lift;
    }
};

let pipes = [];

function generatePipe() {
    let height = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT + 1)) + MIN_PIPE_HEIGHT;
    pipes.push({
        x: CANVAS_WIDTH,
        height: height,
        gap: PIPE_GAP
    });
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= PIPE_SPEED;
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.shift();
            score++;
            document.getElementById('score').innerText = score;
        }
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < CANVAS_WIDTH - 400) {
        generatePipe();
    }
}

let pipeImg = new Image();
pipeImg.src = 'tree.png'; 

function drawPipes() {
    pipes.forEach(pipe => {
        // Draw the top pipe (flipped)
        ctx.save(); 
        ctx.translate(pipe.x + PIPE_WIDTH, pipe.height); 
        ctx.scale(-1, -1); 
        ctx.drawImage(pipeImg, 0, 0, PIPE_WIDTH, pipe.height);
        ctx.restore(); 

        // Draw the bottom pipe
        ctx.drawImage(pipeImg, pipe.x, pipe.height + pipe.gap+10, PIPE_WIDTH, CANVAS_HEIGHT - pipe.height - pipe.gap+10);
    });
}

function checkCollision() {
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        if (bird.x < pipe.x + PIPE_WIDTH &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipe.gap)) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    bird.update();
    bird.draw();

    updatePipes();
    drawPipes();

    if (checkCollision()) {
        endGame();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        bird.jump();
    }
});

function endGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    document.getElementById('restartBtn').style.display = 'block';
    cancelAnimationFrame(gameLoop);
}

function restartGame() {
    document.location.reload();
}

generatePipe();
gameLoop();
