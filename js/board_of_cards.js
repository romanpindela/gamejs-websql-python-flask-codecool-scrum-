
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
