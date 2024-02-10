const player = document.querySelector('#player');
const canvas = document.querySelector('.image');
const sound = document.querySelector('#sound');
const strip = document.querySelector('.strip');

//ANCHOR - oncall system camera
function cameraShow() {
  window.navigator.mediaDevices.getUserMedia({video : true, audio : false})
  .then(userMedia => {
    //NOTE - doesn't work on modern browsers
    // player.src = window.URL.createObjectURL(userMedia);
    player.srcObject = userMedia;
    player.play();
  })
  .catch(err => {
    console.error('Ohh! No', err);
  })
}

//ANCHOR - calling image in canvas
const ctx = canvas.getContext('2d');

function getVideotoCanvas() {
  const width = player.videoWidth;
  const height = player.videoHeight;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(player, 0, 0, width, height);

    //NOTE - pulled up image data (data - r|g|b|a)
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels);
    // debugger;
    //NOTE - redEffect function calling(mess with pixels)
    // pixels = redEffect(pixels);
    //NOTE - rgbSplit function calling(mess with pixels)
    // pixels = rgbSplit(pixels);
    //NOTE - greenScreen function calling(mess with pixels)
    pixels = greenScreen(pixels);
    //NOTE - alpha channel
    // ctx.globalAlpha = 0.1;
    //NOTE - putting up image data back into canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  sound.currentTime = 0;
  sound.play(); 

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('target', '_blank');
  link.setAttribute('download', 'Snap');
  // link.textContent = 'Download the Image';

  //NOTE - doesn't manupulate
  // strip.innerHTML = link;
  // strip.innerHTML = `${link.firstChild.nodeValue}`;
  link.innerHTML = `<img src='${data}' alt='Coding Man'/>`;
  // strip.insertBefore(link, strip.firstChild);
  strip.insertBefore(link, null);
}

/* function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    // console.log(pixels.data[i]); // crashing the browser
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
    pixels.data[i + 1] = pixels.data[i + 1] - 50;  //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
    // console.log(pixels.data[i]);
  }
  return pixels;
}
function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //red
    pixels.data[i + 200] = pixels.data[i + 1];  //green
    pixels.data[i + 500] = pixels.data[i + 2]; //blue
  }
  return pixels;
} */

function greenScreen(pixels) {
  const levels = {};
  const inputs = document.querySelectorAll('input');

  inputs.forEach(input => {
    levels[input.name] = input.value;
  });
  // console.log(levels)
  // debugger;
    for(let i = 0; i < pixels.data.length; i+=4) {
      let red = pixels.data[i + 0];
      let green = pixels.data[i + 1];
      let blue = pixels.data[i + 2];
      let alpha = pixels.data[i + 3];

      if(red >= levels.redMin
        && green >= levels.greenMin
        && blue >= levels.blueMin
        && red <= levels.redMax
        && green <= levels.greenMax
        && blue <= levels.blueMax) {
          pixels.data[i + 3] = 0;
      }
    }
  return pixels;
}

cameraShow();

player.addEventListener('canplay', getVideotoCanvas);