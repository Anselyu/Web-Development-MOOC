var randomNumber1 = Math.floor((Math.random() * 6) + 1);
var randomNumber2 = Math.floor((Math.random() * 6) + 1);

var image1 = document.querySelector(".img1");
image1.setAttribute("src" , "images/dice" + randomNumber1 + ".png");

var image2 = document.querySelector(".img2");
image2.setAttribute("src" , "images/dice" + randomNumber2 + ".png");

var title = document.querySelector("h1");


if (randomNumber1 > randomNumber2){
    title.innerHTML = "Player 1 Wins!";
} else if (randomNumber1 === randomNumber2) {
    title.innerHTML = "Draw";
} else {
    title.innerHTML = "Player 2 Wins!";
}