const video = document.querySelector(".player-viewer");
const player = document.querySelector(".player");
const toggle = document.querySelector(".player-toggle i");
const skip = document.querySelectorAll("[data-skip]");
const playerSlider = document.querySelectorAll(".player-slider");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress-filled");

function playVideo() {

  if(video.paused) {
    video.play();
  }else {
    video.pause();
  }

  // or we can use this code as follows
  /* const run = video.paused ? 'play' : 'pause';
  video[run](); */

}

function updateIcon() {
    
    if(this.paused) {
      toggle.setAttribute("class", "fa-solid fa-pause");
    }else {
      toggle.setAttribute("class", "fa-solid fa-play");
    }
}

function skipFunction() {
  console.log('skip');
  video.currentTime += parseFloat(this.dataset.skip);
}

function sliderFunction() {
  video[this.name] = this.value;
}

function progressFunction(e) {
  const progressLength = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressLength;

  console.log(this);
  console.log(e);
  console.log(e.offsetX);
}

function progressFillFunction() {
  const percentage  = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percentage}%`;
}

toggle.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);

video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', progressFillFunction);

skip.forEach(btn => btn.addEventListener('click', skipFunction));

playerSlider.forEach(slider => slider.addEventListener('change', sliderFunction));
playerSlider.forEach(slider => slider.addEventListener('mousemove', sliderFunction));

let mousedown = false;

progress.addEventListener('click', progressFunction);
progress.addEventListener('mousemove', (e) => mousedown && progressFunction(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

const resize = document.querySelector(".resize");

function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullscreen) { /* IE11 */
    video.mozRequestFullscreen();
  }
} 

resize.addEventListener('click', openFullscreen);



