
function checkEndGame(){
      if (currentGuessedPairsCards === gameLevels[chosenGameLevel]){
          finishedGameState = true;
          clearInterval(timeObj);
          showResults();
      } else {
          false;
      }
}

function showResults(){
      let popupResult = document.querySelector('.popup_result');
      popupResult.hidden = false;
      setCurrentResults();
      setAllResults();
}

function setCurrentResults(){
      currentResult = {
          name: '',
          time: currentGameTime,
          flips: flipsDone,
          score: parseInt(flipsDone) + parseInt(currentGameTime),
          difficulty: actual_Cookies()['difficulty']
      }
      let currentResultObj = document.querySelectorAll('.popup_current_result .value');
      let countForResultObj = 0;
      for (let el in currentResult){
          if (el != 'name'){
              currentResultObj[countForResultObj].innerHTML = currentResult[el];
          }
          countForResultObj++;
      }
      document.querySelector('.save .btn_save_result').addEventListener('click', event_SaveButton);
}

function event_SaveButton(){
      let userName = document.querySelector('.popup_result_content .input_name').value;
      if (userName.length > 0) {
          currentResult.name = userName;
          results.push(currentResult);
          create_results();
          document.querySelector('.save .btn_save_result').removeEventListener('click', event_SaveButton);
      }
      else alert('Input your name Please :)');
}

function setAllResults(){
    sortResultByScore();

}

function sortResultByScore(){
      for (let i = 0; i < results.length; i++)
      for (let j = 0; j < results.length - 1; j++){
          if (results[j]['score'] < results[j+1]['score']){
              let tmp = results[j];
              results[j] = results[j+1];
              results[j+1] = tmp;
          }
      }
}

function create_results(){
      for (let i = 0; i < results.length; i++){
          let parent = document.querySelector('.result_statistic_pos_easy .result_results');
          let low_result = document.createElement('div');
          low_result.classList.add('low_result');
          let pos = document.createElement('div');
          pos.classList.add('pos');
          pos.innerHTML = i + 1;
          let name = document.createElement('div');
          name.classList.add('name');
          name.innerHTML = results[i].name;
          let xp = document.createElement('div');
          xp.classList.add('xp');
          xp.innerHTML = results[i].score;
          low_result.appendChild(pos);
          low_result.appendChild(name);
          low_result.appendChild(xp);
          parent.appendChild(low_result);
      }
}
