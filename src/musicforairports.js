var $ = require('jquery');

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
  $(".a-enter-vr-button").click(function() {
    // var source = myContext.createBufferSource();
    // source.buffer = myDecodedBuffer;
    //
    // // connect to output (your speakers)
    // source.connect(myContext.destination);
    //
    // // play the file
    // source.noteOn(0);

    let leftSynth = makeSynth();
    let rightSynth = makeSynth();

    let leftPanner = new Tone.Panner(-0.5).toMaster();
    let rightPanner = new Tone.Panner(0.5).toMaster();
    let echo = new Tone.FeedbackDelay('16n', 0.2);
    let delay = Tone.context.createDelay(6.0);
    let delayFade = Tone.context.createGain();

    delay.delayTime.value = 6.0;
    delayFade.gain.value = 0.75;

    leftSynth.connect(leftPanner);
    rightSynth.connect(rightPanner);
    leftPanner.connect(echo);
    rightPanner.connect(echo);
    echo.toMaster();
    echo.connect(delay);
    delay.connect(Tone.context.destination);
    delay.connect(delayFade);
    delayFade.connect(delay);

    new Tone.Loop(time => {
      leftSynth.triggerAttackRelease('C5', '1:2', time)

      leftSynth.setNote('D5', '+0:2');

      leftSynth.triggerAttackRelease('E4', '0:2', '+6.0');

      leftSynth.triggerAttackRelease('G4', '0:2', '+11:2');

      leftSynth.triggerAttackRelease('E5', '2:0', '+19:0');
      leftSynth.setNote('G5', '+19:1:2');
      leftSynth.setNote('A5', '+19:3:0');
      leftSynth.setNote('G5', '+19:4:2');
      }, '34m').start();



    new Tone.Loop(time => {

      rightSynth.triggerAttackRelease('D4', '1:2', '+5:0');

      rightSynth.setNote('E4', '+6.0');

      rightSynth.triggerAttackRelease('B3', '1m', '+11:2:2');

      rightSynth.setNote('G3', '+12:0:2');

      rightSynth.triggerAttackRelease('G4', '0.2', '+23.2');

    }, '37m').start();

    Tone.Transport.start();



  });
});
