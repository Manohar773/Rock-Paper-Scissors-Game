let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let result = '';
let playCount = 0;


updateScoreElements();



function playGame(playerMove) {
  if (playCount >= 10) {
    alert('You have played 10 times. Chances are over!');
    displayFinalResultUser();
    displayFinalResultComputer();
    return;
  }

  const computerMove = pickComputerMove();
  result = determineResult(playerMove, computerMove);

  updateScore(result);
  updateScoreElements();

  displayResult(playerMove, computerMove);

  playCount++;

  if (playCount === 10) {
    displayFinalResultUser();
    displayFinalResultComputer();
  }
}

function determineResult(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return 'Tie.';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    return 'You win.';
  } else {
    return 'You lose.';
  }
}

function updateScore(result) {
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
}

function updateScoreElements() {
  document.querySelector('.user-score').innerHTML = `Wins: ${score.wins}`;
  document.querySelector('.computer-score').innerHTML = `Wins: ${score.losses}`;
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function displayResult(playerMove, computerMove) {
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
}

function displayFinalResultUser() {
  const finalResultElement = document.querySelector('.final-result-user');
  if (score.wins > score.losses) {
    finalResultElement.innerHTML = 'Final Result: You Win!';
  } else if (score.wins < score.losses) {
    finalResultElement.innerHTML = 'Final Result: You Lose!';
  } else {
    finalResultElement.innerHTML = 'Final Result: It\'s a Tie!';
  }

  
}

function displayFinalResultComputer(){
  const finalComputerElement = document.querySelector('.final-result-computer');
  if (score.losses > score.wins) {
    finalComputerElement.innerHTML = 'Final Result: You Win!';
  } else if (score.losses < score.wins) {
    finalComputerElement.innerHTML = 'Final Result: You Lose!';
  } else {
    finalComputerElement.innerHTML = 'Final Result: It\'s a Tie!';
  }
}
function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElements();
  playCount = 0;
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
  document.querySelector('.final-result-computer').innerHTML = '';
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}
