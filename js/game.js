// user data
var chosenGameLevel = "hard";
var chosenBoard = "cookies";
var userName = "";
var userCounts = 0;
var flipsDone = 0;
var timeObj = Object();
var results = []


// current game parameters
var currentGameDrawnImages = [];
var currentGameDrawnImagesPairs = [];
var currentGameOpenedCards = [];
var currentGuessedPairsCards = 0;
var finishedGameState = false;
var leftCardsPair = 0;
let currentGameTime = 0;
var currentResult = {
          name: '', time: '', flips: '', score: '', difficulty: ''
      }

// game logic
timeForUserToRemember = 5000;

var blockUserClickingWhileCheckingPair = false; // true or false (prevent superfast clicking and cheating)

var availableBoards = ["animals", "cookies", "fruits", "minions"];
var images = [
    "image16.jpeg", "image15.jpeg", "image14.jpeg", "image13.jpeg",
    "image12.jpeg", "image11.jpeg", "image10.jpeg", "image9.jpeg",
    "image8.jpeg", "image7.jpeg", "image6.jpeg",
    "image5.jpeg", "image4.jpeg", "image3.jpeg",
    "image2.jpeg", "image1.jpeg"
];
var closedImageCardSrc = "static/images/hidden.jpg"

var gameLevels = {
    "easy":4,
    "medium":6,
    "hard":8
};

var board = document.getElementsByClassName("cards-container"); // [0] because there is only 1 board ( I mean tag with such class name);
var cards = document.getElementsByClassName("card")


function initGame() {
    loginPopup();
};

function checkEndGame(){
      if (currentGuessedPairsCards === gameLevels[chosenGameLevel]){
          finishedGameState = true;
          clearInterval(timeObj);
          showResults();
      } else {
          false;
      }
}

function set_cookie(key, value){
      document.cookie = `${key}=${value}`;
}

initGame();

