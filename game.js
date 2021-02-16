var chosenGameLevel = "easy";
  var chosenBoard = "cookies";
  var userName = "";
  var userCounts = 0;

  // current game parameters
  var currentGameDrawnImages = [];
  var currentGameDrawnImagesPairs = [];

  // game logic
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
      console.log(images);
      currentGameDrawnImages = drawImagesForLevel(shuffleCards(images), chosenGameLevel); // pick first shuffled cards for current level
      currentGameDrawnImagesPairs = shuffleCards(addSecondCardToCreateAPair(currentGameDrawnImages));

      /* Phase 2: drawing a board of cards */
      prepareBoard(currentGameDrawnImagesPairs);
      countdown();
      closeAllCards(cards);
      initClickOnCards(cards);

  };


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
         newCard.id = imageIndex;

         // inserting button with image in newCard
         newCardButton = document.createElement("button");
         newCardButtonImage = document.createElement("img");

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

  function openCard(e){
      console.log(e);
    this.removeChild(this.childNodes[0]) // delete <img> tag from button Card
      newImgForButton = document.createElement("img");
        newImgForButton.src = this.value;
    this.appendChild(newImgForButton) // inserting <img> tag for opened state
  }

  function closeCard(card){
      let button = document.getElementById(card.id).childNodes[0];
      let img = document.getElementById(card.id).childNodes[0].childNodes[0];
    button.removeChild(img);
    newImgForButton = document.createElement("img");
    newImgForButton.src = closedImageCardSrc;
    button.appendChild(newImgForButton);
      console.log(button);
  }


  function checkOpenedCardsIfMatched(){

  }

  function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  async function countdown() {
      await sleep(3000);
  }


  function updateTimer(){

  }

  function getAHint(){

  }

  initGame();