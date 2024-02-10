const displayCountdown = document.querySelector('.display-TimeLeft');
const endTime = document.querySelector('.display-EndLeft');
const btns = document.querySelectorAll('[data-time]');
let countdown;

function setTimerFunction(seconds) {
  clearInterval(countdown); //stop time if it's been already started

  const nowTime = Date.now();
  const then = nowTime + (seconds * 1000);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => { 
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    
    displayTimeLeft(secondsLeft);

  }, 1000);
}

function displayTimeLeft(secondsLeft) {
  const remainingSeconds = secondsLeft % 60;
  const minutes = Math.floor(secondsLeft / 60);
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  displayCountdown.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  //here Date.now();
  //new Date(Date.now);
  const hours = end.getHours();
  const minuts = end.getMinutes();
  endTime.textContent = `Be Back At ${hours > 12 ? hours - 12 : hours}:${minuts < 10 ? 0 : ''}${minuts}`;
}

function startTimer() {
  const secs = this.dataset.time;
  setTimerFunction(secs);
}

btns.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value; //can nest eachother hirachy between parent and child (document.customForm.minutes)
  const seconds = mins * 60;
  setTimerFunction(seconds);
  this.reset();
})