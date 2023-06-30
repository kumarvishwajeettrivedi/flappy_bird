let pillar=document.querySelector(".pillar");
let hole=document.querySelector(".hole");
let character=document.querySelector(".character");
let view=document.querySelector(".view");


let count=0;
addEventListener("animationiteration",()=>{
    var quard=-((Math.random()*300)+150);
    hole.style.top=quard+"px";
    
    

  count++;

})

setInterval(()=>{
var charactertop=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
character.style.top=(charactertop+3)+"px";

var pilla=parseInt(window.getComputedStyle(pillar).getPropertyValue("left"));
var holetop=parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
var chole=-(500-charactertop)
if((charactertop>500)||((pilla<20)&&(pilla>-50)&&((holetop>chole)||(chole<holetop)))){
    alert("game over :score  ::"+count/2);
    character.style.top=100+"px";
    count=0;
}






},30);

addEventListener("keyup",()=>
{

        var push=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
character.style.top=(push+(-30))+"px";


 

})






// inside a function add evet listner and the n this property let x=clientx;
//function fun(){}        let x=fun();
//make a paralex website theme moon