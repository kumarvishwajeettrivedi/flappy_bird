let pillar = document.querySelector(".pillar");
let hole = document.querySelector(".hole");
let character = document.querySelector(".character");
let scoreDisplay = document.getElementById("score");

let count = 0;
let gravity = 3;
let jumpHeight = -30;
let gameInterval;

addEventListener("animationiteration", () => {
    let randomTop = -((Math.random() * 250) + 150);
    hole.style.top = randomTop + "px";
    count++;
    scoreDisplay.innerText = Math.floor(count / 2);
});

function startGame() {
    gameInterval = setInterval(() => {
        let charactertop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        character.style.top = (charactertop + gravity) + "px";

        let pilla = parseInt(window.getComputedStyle(pillar).getPropertyValue("right"));
        let holetop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        let chole = -(500 - charactertop);

        if ((charactertop > 480) || ((pilla > 230) && (pilla < 290) && (charactertop < holetop || chole > holetop))) {
            clearInterval(gameInterval);
            alert("Game Over! Your score: " + Math.floor(count / 2));
            resetGame();
        }
    }, 20);
}

function resetGame() {
    character.style.top = "100px";
    count = 0;
    scoreDisplay.innerText = "0";
    startGame();
}

addEventListener("keyup", () => {
    let charactertop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    character.style.top = (charactertop + jumpHeight) + "px";
});

startGame();
