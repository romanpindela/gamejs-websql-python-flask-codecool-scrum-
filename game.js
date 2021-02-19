// user data
var chosenGameLevel = "hard";
var chosenBoard = "cookies";
var userName = "";
var userCounts = 0;
var flipsDone = 0;
var timeObj = Object();




// current game parameters
var currentGameDrawnImages = [];
var currentGameDrawnImagesPairs = [];
var currentGameOpenedCards = [];
var currentGuessedPairsCards = 0;
var finishedGameState = false;
var leftCardsPair = 0;
let currentGameTime = 0;

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


    /* Phases for preparing new game
    i.e. entering new game or refreshing it while playing */
    /*
    /* Phase 1: drawing pairs of images */
    loginPopup();
};

function timeCount(){
    let time_node = document.querySelector('.time-remain');
    timeObj = setInterval(() => {
        currentGameTime++;
        time_node.innerHTML = currentGameTime.toString();
    }, 1000);

}

function set_game_board(){
    console.log(images);
    currentGameDrawnImages = drawImagesForLevel(shuffleCards(images), chosenGameLevel); // pick first shuffled cards for current level
    currentGameDrawnImagesPairs = shuffleCards(addSecondCardToCreateAPair(currentGameDrawnImages));

    /* Phase 2: drawing a board of cards */
    prepareBoard(currentGameDrawnImagesPairs);
    initClickOnCards(cards);
    initStats();

    blockUserClickingWhileCheckingPair = true; // prevent clicking on cards while cards are shown
    runAnimation();
    setTimeout(closeAllCards, timeForUserToRemember, cards);
    blockUserClickingWhileCheckingPair = false;
}

function setAfterLoginParameters(user_name, difficulty, type){
    user_name_node = document.querySelector('.get_username');
    user_name_node.innerHTML = user_name;
    chosenGameLevel = difficulty.toLowerCase();
    chosenBoard = type.toLowerCase();
}


  /*
  * Steps behind logic for creating random size board of card with random images
  * from chosen image set
  */

  /* Step 1: shuffle all available images for current images set*/
  // I use Fisher-Yates shuffle, it's very good for shuffling list
  function shuffleCards(arrayOfCards) {
    var currentIndex = arrayOfCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arrayOfCards[currentIndex];
      arrayOfCards[currentIndex] = arrayOfCards[randomIndex];
      arrayOfCards[randomIndex] = temporaryValue;
    };
    return arrayOfCards;
  };

  /* Step 2: I draw (from shuffled images),
  *  I mean I choose first images according for chosen game level
  */
  function drawImagesForLevel(arrayOfImages, gameLevel) {
      return arrayOfImages.slice(0,gameLevels[gameLevel]);
  };

  /* Step 3: I add second card for each chosen image to guess
  *  to create a pair
  */
  function addSecondCardToCreateAPair(arrayOfImages){
      arrayWithAddedSecondImage = [...arrayOfImages, ...arrayOfImages];
      return arrayWithAddedSecondImage;
  };


  function prepareBoard(imagesPairs){
     for (let imageIndex= 0; imageIndex < imagesPairs.length; imageIndex++){
         // creating newCard
         var newCard = document.createElement("div");

         newCard.classList.add('card');
         newCard.classList.add('card-box');
         newCard.id = imageIndex;

         // inserting button with image in newCard
         newCardButton = document.createElement("button");
         //newCardButton.classList.add('card-background-gray');
         newCardButtonImage = document.createElement("img");
         newCardButtonImage.classList.add('card-box');

         let newCardimageSource = "static/images/" + chosenBoard + "/" + imagesPairs[imageIndex];
         newCardButton.value = newCardimageSource;
         newCardButtonImage.src = newCardimageSource; //closedImageCardSrc;


         newCardButton.appendChild(newCardButtonImage);
         newCard.appendChild(newCardButton);

         // appending whole newCard on board
         board[0].appendChild(newCard);
     };
  };



  function initClickOnCards(cards){
      for ( let card of cards) {
          initClickOnCard(card);
      }
  }

  function initClickOnCard(card){
      cardButon = card.childNodes[0]
      console.log(cardButon);

    cardButon.addEventListener("click", openCard);
  }

  function openAllCards(){
    for (let card of cards){
        openCard(card);
    }
  };

  function closeAllCards(cards){
    for (let card of cards){
        closeCard(card);
    }
  }

  function moveUserMovesCounter(increse){
        flipsDone = flipsDone + increse;
        flipsDoneOnHTML = document.getElementById('flips');
        flipsDoneOnHTML.innerText = flipsDone;
  }

  function cardsPairMatched(){
      currentGameOpenedCards[0].disabled = 'true';
      currentGameOpenedCards[1].disabled = 'true';
      currentGameOpenedCards = [];
      currentGuessedPairsCards++;

      finishedGameState = checkEndGame();


      blockUserClickingWhileCheckingPair = false;
  }

  function changeOpenedCardsColor(color){
      if (color === "green"){
            currentGameOpenedCards[0].classList.remove('card-background-grey');
            currentGameOpenedCards[0].classList.add('card-background-green');
            currentGameOpenedCards[0].classList.remove('card-background-red');

            currentGameOpenedCards[1].classList.remove('card-background-grey');
            currentGameOpenedCards[1].classList.add('card-background-green');
            currentGameOpenedCards[1].classList.remove('card-background-red');
            
      } else if (color === "red"){
            currentGameOpenedCards[0].classList.remove('card-background-grey');
            currentGameOpenedCards[0].classList.add('card-background-red');
            currentGameOpenedCards[0].classList.remove('card-background-green');

            currentGameOpenedCards[1].classList.remove('card-background-grey');
            currentGameOpenedCards[1].classList.remove('card-background-green');
            currentGameOpenedCards[1].classList.add('card-background-red');

      } else if (color === "grey"){
            currentGameOpenedCards[0].classList.remove('card-background-red');
            currentGameOpenedCards[0].classList.remove('card-background-green');
            currentGameOpenedCards[0].classList.add('card-background-grey');

            currentGameOpenedCards[1].classList.remove('card-background-red');
            currentGameOpenedCards[1].classList.remove('card-background-green');
            currentGameOpenedCards[1].classList.add('card-background-grey');
      }

  }


  function cardsPairUnmatched(){
        closeCard(currentGameOpenedCards[0]);
        closeCard(currentGameOpenedCards[1]);
        currentGameOpenedCards = [];
        blockUserClickingWhileCheckingPair = false;
  }

  function openCard(e){

      if (blockUserClickingWhileCheckingPair === false){
        currentGameOpenedCards.push(this);

        this.removeChild(this.childNodes[0]) // delete <img> tag from button Card
          newImgForButton = document.createElement("img");
            newImgForButton.src = this.value;
            newImgForButton.classList.add('card-box');
        this.appendChild(newImgForButton) // inserting <img> tag for opened state

        let openedCardsCount = currentGameOpenedCards.length;
        if (openedCardsCount === 2){
            blockUserClickingWhileCheckingPair = true;
            moveUserMovesCounter(1);
            if(currentGameOpenedCards[0].value === currentGameOpenedCards[1].value){
                changeOpenedCardsColor("green");
                setTimeout(cardsPairMatched,1000);
                updateleftCardsPairs(1)
            } else {
                changeOpenedCardsColor("red");
                setTimeout(cardsPairUnmatched,1000);
                //changeOpenedCardsColor("grey");
            }
        }
    }
    console.log(currentGameOpenedCards);
  }


  function initStats(){
      leftCardsPair = gameLevels[chosenGameLevel];
      updateleftCardsPairs(0);
      moveUserMovesCounter(0);
  }

  function closeCard(card){
      if (card.tagName == "DIV") {
          var button = document.getElementById(card.id).childNodes[0];
          var img = document.getElementById(card.id).childNodes[0].childNodes[0];
      } else if (card.tagName == "BUTTON") {
          var button = card;
          var img = card.childNodes[0];
      }

      button.removeChild(img);
    newImgForButton = document.createElement("img");
    newImgForButton.classList.add('card-box');
    newImgForButton.src = closedImageCardSrc;
    button.appendChild(newImgForButton);
  }

function updateleftCardsPairs(decrese){
      leftCardsPair = leftCardsPair - decrese;
      leftCardsPairHtml = document.getElementById('leftCardsPairs');
      leftCardsPairHtml.innerText = leftCardsPair;
}
  function checkOpenedCardsIfMatched(){

  }


  function updateTimer(){

  }


  function getAHint(){


  }
  function loginPopup(){
    var lvl_buttons = document.body.getElementsByClassName('btn_lvl');
    var type_buttons = document.body.getElementsByClassName('btn_type');
    let user_name_box = document.body.querySelectorAll('input.login_box')[0];
    let play_btn = document.body.querySelectorAll('.play_btn')[0];
    let popup_login = document.body.getElementsByClassName('popup_login')[0];
    let page_content = document.body.querySelector('body .page');
    Object(play_btn).addEventListener('click', () => {
        let cookies = actual_Cookies();
        if (cookies['difficulty'].length > 0 && user_name_box.value.length > 0 && cookies['type'].length > 0){
            set_cookie('user_name', user_name_box.value);
            setAfterLoginParameters(actual_Cookies()['user_name'], actual_Cookies()['difficulty'], actual_Cookies()['type']);
            setTimeout(() => {
                Object(popup_login).hidden = true;
                Object(page_content).hidden = false;
                set_game_board();
            }, 1000);
        }
        else{
            alert('Please input/select all parameters');
        };
    });
    set_onClick_login_buttons(lvl_buttons, 'difficulty');
    set_onClick_login_buttons(type_buttons, 'type');
}

function set_cookie(key, value){
      document.cookie = `${key}=${value}`;
}


function set_onClick_login_buttons(buttons, cookie_name){
    for (let button of buttons) {
        Object(button).addEventListener('click', () => {
            if (button.style.backgroundColor != 'blue'){
                for (let old_button of buttons){
                    if (old_button != buttons){
                        old_button.style.backgroundColor = 'white';
                        old_button.style.color = 'black';
                    }
                }
                button.style.backgroundColor = 'blue';
                button.style.color = 'white';
                set_cookie(cookie_name, Object(button).childNodes[1].innerHTML);
            }
            else{
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
            }
        });
    }
}


function actual_Cookies(){
    let cookies = {

    }
    for (let cookie of document.cookie.split('; ')){
        cookies[cookie.split('=')[0]] = cookie.split('=')[1];
    }
    return cookies;

}

function get_user_name(){
    return  actual_Cookies()['user_name'];
}


function checkEndGame(){
      if (currentGuessedPairsCards === gameLevels[chosenGameLevel]){
          finishedGameState = true;
          clearInterval(timeObj);
      } else {
          false;
      }
}


initGame();

function game(){
    initGame();

}
