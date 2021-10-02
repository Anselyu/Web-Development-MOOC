var gameStateRunning = false;
var currentLevel = 0;

var greenButton = new Audio("sounds/green.mp3");
var blueButton = new Audio("sounds/blue.mp3");
var redButton = new Audio("sounds/red.mp3");
var yellowButton = new Audio("sounds/yellow.mp3");
var wrongButton = new Audio("sounds/wrong.mp3");


var correctSequence = [];
var userSequence = [];


function nextSequence(){
    currentLevel += 1;
    $("h1").text("Level " + currentLevel);
    userSequence = [];
    var nextButton = Math.floor(Math.random() * 4);
    setTimeout(function(){
        switch(nextButton){
            case 0:
                greenButton.play();
                buttonAnimation("green");
                break;
            case 1: 
                redButton.play();
                buttonAnimation("red");
                break;
            case 2:
                yellowButton.play();
                buttonAnimation("yellow");
                break;
            default:
                blueButton.play();
                buttonAnimation("blue");
        }
    }, 700 );
    correctSequence.push(nextButton);
    console.log(correctSequence);

}
 // returns an integer from 0 to 3 inclusive

// Create an array 
// Display that array 
// Let user enter the exact same array 
// If user gets correct, append 1 more number to array and repeat to step 2. If not, then game over

$(document).keypress(function(event){
    if (gameStateRunning == false){
        correctSequence = [];
        userSequence = [];
        nextSequence();
        gameStateRunning = true;
    }
})

$(".btn").click(function(){
   
     if(gameStateRunning){
        switch(this.className){
            case "btn green":
                console.log("green");
                userSequence.push(0);
                greenButton.play();
                buttonAnimation("green");
                break;
            case "btn red":
                console.log("red");
                userSequence.push(1);
                redButton.play();
                buttonAnimation("red");
                break;
            case "btn yellow": 
                console.log("yellow");
                userSequence.push(2);
                yellowButton.play();
                buttonAnimation("yellow");
                break;
            case "btn blue":
                console.log("blue");
                userSequence.push(3);
                blueButton.play();
                buttonAnimation("blue");
                break;
            default:
        }
    
        console.log(userSequence);
       
        if (compareArrays(userSequence,correctSequence)){
            console.log("it matches!");
        } else if (!compareArrays(userSequence,correctSequence)){
            console.log("epic fail");
            gameOver();
        }
        if (arraysAreEqual(userSequence, correctSequence)){
            nextSequence();
        }
    }

})

function gameOver(){
    gameStateRunning = false;
    currentLevel = 0;
    $("h1").text("Game Over, Press Any Key to Restart");
}

function buttonAnimation(color){
    var activeButton = document.querySelector("." + color);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100 );
}

function compareArrays (a, b){ // Compares two arrays, and checks if the elements in the first array match the elements in the second array. 
    var isEqual = true;
    for (var i = 0; i < a.length; i++){
        if (a[i] != b[i]){
            isEqual = false;
        }
    }
    return isEqual;
}

function arraysAreEqual (a, b){
    var isEqual = true;
    for (var i = 0; i < a.length; i++){
        if (a[i] != b[i]){
            isEqual = false;
        }
    }
    if (a.length != b.length){
        isEqual = false;
    }
    return isEqual;
}

// Start with generating an array 
// For every element in the array, the user should enter a button that corresponds with the correct element in the array 
