var $ = require('jquery');
var musicOn = true;

const EQUALIZER_CENTER_FREQUENCIES = [
  100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600,
  2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function makeSynth() {

let envelope = {
    attack: 0.1,
    release: 4,
    releaseCurve: 'linear'
  };

let filterEnvelope = {
  baseFrequency: 200,
  octaves: 2,
  attack: 0,
  decay: 0,
  release: 1000
};

return new Tone.DuoSynth({
  harmonicity: 1,
  volume: -20,
  voice0: {
    oscillator: {type: 'sawtooth'},
    envelope,
    filterEnvelope

},
voice1: {
  oscillator: { type: 'sine'},
  envelope,
  filterEnvelope
},
vibratoRate: 0.5,
vibratoAmount: 0.1
});
}

$(document).ready(function() {
  var musicToggle = window.location.search ? window.location.search.split('?')[1].split("=")[1] : "true";

  $(".a-enter-vr-button").click(function() {


  let leftSynth = makeSynth();
  let rightSynth = makeSynth();

  let leftPanner = new Tone.Panner(-0.5).toMaster();
  let rightPanner = new Tone.Panner(0.5).toMaster();
  let equalizer = EQUALIZER_CENTER_FREQUENCIES.map(frequency => {
    let filter = Tone.context.createBiquadFilter();
    filter.type = 'peaking';
    filter.frequency.value = frequency;
    filter.Q.value = 4.31;
    filter.gain.value = getRandomInt(-13, 12);
    return filter;
  });
  let echo = new Tone.FeedbackDelay('16n', 0.2);
  let delay = Tone.context.createDelay(6.0);
  let delayFade = Tone.context.createGain();

  delay.delayTime.value = 6.0;
  delayFade.gain.value = 0.75;

  leftSynth.connect(leftPanner);
  rightSynth.connect(rightPanner);
  leftPanner.connect(equalizer[0]);
  rightPanner.connect(equalizer[0]);
  equalizer.forEach((equalizerBand, index) => {
    if(index < equalizer.length - 1) {
      equalizerBand.connect(equalizer[index + 1]);
    } else {
      equalizerBand.connect(echo);
    }
  });
  leftPanner.connect(echo);
  rightPanner.connect(echo);
  echo.toMaster();
  echo.connect(delay);
  delay.connect(Tone.context.destination);
  delay.connect(delayFade);
  delayFade.connect(delay);

  new Tone.Loop(time => {
    leftSynth.volume.value = -40;

    leftSynth.triggerAttackRelease('C5', '1:2', time)

    leftSynth.setNote('D5', '+0:2');

    leftSynth.triggerAttackRelease('E4', '0:2', '+6.0');

    leftSynth.triggerAttackRelease('G4', '0:2', '+11:2');

    leftSynth.triggerAttackRelease('E5', '2:0', '+19:0');
    leftSynth.setNote('G5', '+19:1:2', 0.5);
    leftSynth.setNote('A5', '+19:3:0', 0.5);
    leftSynth.setNote('G5', '+19:4:2', 0.5);
    }, '34m').start();



  new Tone.Loop(time => {
    rightSynth.volume.value = -40;


    rightSynth.triggerAttackRelease('D4', '1:2', '+5:0');

    rightSynth.setNote('E4', '+6.0');

    rightSynth.triggerAttackRelease('B3', '1m', '+11:2:2');

    rightSynth.setNote('G3', '+12:0:2');

    rightSynth.triggerAttackRelease('G4', '0.2', '+23.2');

  }, '37m').start();

  if(musicToggle === "true") {
    Tone.Transport.start("+0.1");
  }

  });
});
