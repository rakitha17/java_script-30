const scorecard = document.querySelector('.normalScore');
const highscore = document.querySelector('.highScore');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

let timeUp = false;
let score = 0;
let lastHole;
let scoreArray = [];

function randomTimeFunction(minTime, maxTime) {
  let randomTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);
  return randomTime;
}

function randomHoleFunction(holesArray) {
  let idx = Math.floor(Math.random() * holesArray.length);
  let randomHole = holesArray[idx];

  if(randomHole === lastHole) {
    return randomHoleFunction(holes);
  }
  lastHole = randomHole;
  return randomHole;
}

function peepMole() {
  let randomTime = randomTimeFunction(200, 1000);
  let randomHole = randomHoleFunction(holes);
  randomHole.classList.add('up');

  setTimeout(() => {
    randomHole.classList.remove('up');
    if(!timeUp) peepMole();
  }, randomTime);
}

function startGame() {
  scorecard.textContent = '00';
  let count = parseInt(scorecard.textContent);
  score = 0;
  timeUp = false;
  peepMole();

  setTimeout(() => {
    timeUp = true;
    let record = scorecard.textContent;
    scoreArray.push(record);
    let maxScore = Math.max(...scoreArray);
    highscore.textContent = `${maxScore < 10 ? '0' : ''}${maxScore}`;
  }, 10000);
}

function bonkTheMole(e) {
  if(!e.isTrusted) return; //stop the function if the user can't fullfilled the event
  score++;
  let recordScore = score;
  scorecard.textContent = `${recordScore < 10 ? '0' : ''}${recordScore}`;
  this.parentNode.classList.remove('up');
}

moles.forEach((mole) => mole.addEventListener('click', bonkTheMole));