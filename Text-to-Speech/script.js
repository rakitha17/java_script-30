//NOTE - DOM elements
const selectVoice = document.querySelector('#selectVoice');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');
const speak = document.querySelector('#speak-btn');
const stop = document.querySelector('#stop-btn');
const clear = document.querySelector('#clear-btn');
const microphone = document.querySelector('#microphone');
const textArea = document.querySelector('#typeText');

const uttrThis = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

//NOTE - variables
let voices;
let recognizing = false;

//NOTE - operation
function loadVoiceFunction() {
  voices = synth.getVoices();
  let engVoices = voices.filter(voice => voice.lang.includes('en')).map(voice => voice); 

  for(let i = 0; i < engVoices.length; i++) {
    const option = document.createElement('option');
    option.textContent = `${engVoices[i].name} (${engVoices[i].lang})`;
    option.value = i;
    selectVoice.appendChild(option);
  }
}
function settingUpvoice() {
  uttrThis.voice = voices[selectVoice.value];
  toggleSpeaking();
}
function changevaluesFunction() {
  uttrThis[this.name] = this.value;
  toggleSpeaking();
}
function toggleSpeaking(startover = true) { //for synth.speaking
  synth.cancel();
  if(startover) {
    if(textArea.value == '') {
      alert('Nothing to Read.');
    }
    uttrThis.text = textArea.value;
    uttrThis.voice = voices[selectVoice.value];
    synth.speak(uttrThis);
  }
}
function clearTextArea() {
  if(textArea.value == ''){
    return;
  }else {
    textArea.value = '';
  }
}

recognition.onstart = function() {
  try{
    microphone.classList.add('animation');
    recognizing = true;
  }catch(error) {
    console.log('Error occured:', error);
  }
}
recognition.onresult = function(event) {
  try {
    let transcript = Array.from(event.results)
      .map(result => result)
      .map(result => result[0].transcript)
      .join('');
      
    transcript.replace(/poop|shit/i, '💩');
    if(event.results[0].isFinal) {
      textArea.value = transcript;
    }

  }catch(error) {
    console.log('Error occured:', error);
  }
}
recognition.onend = function() {
  try {
    microphone.classList.remove('animation');
    recognizing = false;
  }catch(error) {
    console.log('Error occured:', error);
  }
}

//NOTE - event handlers
speak.onclick = function() {
  toggleSpeaking();
  recognition.stop();
}
stop.onclick = () => {
  toggleSpeaking(false);
  recognition.stop();
}
if("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoiceFunction;
} else {
  loadVoiceFunction();
}
selectVoice.addEventListener('change', settingUpvoice);
rate.addEventListener('change', changevaluesFunction);
pitch.addEventListener('change', changevaluesFunction);
// textArea.addEventListener('change', changevaluesFunction);
clear.addEventListener('click', clearTextArea);
clear.addEventListener('click', () => toggleSpeaking(false));

microphone.onclick = function() {
  toggleSpeaking(false);
  if(recognizing) {
    recognition.stop();
  }else {
    recognition.start();
  }
}

