import 'whatwg-fetch';
var $ = require('jquery');

const SAMPLE_LIBRARY = {
  'Grand Piano': [
    { note: 'A',  octave: 4, file: './src/Samples/Grand Piano/piano-f-a4.wav' },
    { note: 'A',  octave: 5, file: './src/Samples/Grand Piano/piano-f-a5.wav' },
    { note: 'A',  octave: 6, file: './src/Samples/Grand Piano/piano-f-a6.wav' },
    { note: 'C',  octave: 4, file: './src/Samples/Grand Piano/piano-f-c4.wav' },
    { note: 'C',  octave: 5, file: './src/Samples/Grand Piano/piano-f-c5.wav' },
    { note: 'C',  octave: 6, file: './src/Samples/Grand Piano/piano-f-c6.wav' },
    { note: 'D#',  octave: 4, file: './src/Samples/Grand Piano/piano-f-d#4.wav' },
    { note: 'D#',  octave: 5, file: './src/Samples/Grand Piano/piano-f-d#5.wav' },
    { note: 'D#',  octave: 6, file: './src/Samples/Grand Piano/piano-f-d#6.wav' },
    { note: 'F#',  octave: 4, file: './src/Samples/Grand Piano/piano-f-f#4.wav' },
    { note: 'F#',  octave: 5, file: './src/Samples/Grand Piano/piano-f-f#5.wav' },
    { note: 'F#',  octave: 6, file: './src/Samples/Grand Piano/piano-f-f#6.wav' }
  ],
  'Chorus': [
    { note: 'A#',  octave: 4, file: './src/Samples/Chorus/chorus-female-a#4.wav' },
    { note: 'A#',  octave: 5, file: './src/Samples/Chorus/chorus-female-a#5.wav' },
    { note: 'A',  octave: 4, file: './src/Samples/Chorus/chorus-female-a4.wav' },
    { note: 'A',  octave: 5, file: './src/Samples/Chorus/chorus-female-a5.wav' },
    { note: 'C#',  octave: 5, file: './src/Samples/Chorus/chorus-female-c#4.wav' },
    { note: 'C',  octave: 5, file: './src/Samples/Chorus/chorus-female-c5.wav' },
    { note: 'C',  octave: 6, file: './src/Samples/Chorus/chorus-female-c6.wav' },
    { note: 'D#',  octave: 5, file: './src/Samples/Chorus/chorus-female-d#5.wav' },
    { note: 'D',  octave: 5, file: './src/Samples/Chorus/chorus-female-d5.wav' },
    { note: 'E',  octave: 5, file: './src/Samples/Chorus/chorus-female-e5.wav' },
    { note: 'F#',  octave: 5, file: './src/Samples/Chorus/chorus-female-f#5.wav' },
    { note: 'F',  octave: 5, file: './src/Samples/Chorus/chorus-female-f5.wav' },
    { note: 'G#',  octave: 5, file: './src/Samples/Chorus/chorus-female-g#5.wav' },
    { note: 'G#', octave: 4, file: './src/Samples/Chorus/chorus-female-g#4.wav' },
    { note: 'G',  octave: 5, file: './src/Samples/Chorus/chorus-female-g5.wav' },
    { note: 'G',  octave: 4, file: './src/Samples/Chorus/chorus-female-g5.wav' },
    { note: 'B',  octave: 4, file: './src/Samples/Chorus/chorus-female-b4.wav' },
    { note: 'B', octave: 5, file: './src/Samples/Chorus/chorus-female-b5.wav' }
  ],
  'English Horn': [
      { note: 'A#',  octave: 2, file: 'Samples/Horn/horn-a#2.wav' },
      { note: 'A#',  octave: 3, file: 'Samples/Horn/horn-a#3.wav' },
      { note: 'A#',  octave: 4, file: 'Samples/Horn/horn-a#4.wav' },
      { note: 'C#',  octave: 3, file: 'Samples/Horn/horn-c#3.wav' },
      { note: 'C#',  octave: 4, file: 'Samples/Horn/horn-c#4.wav' },
      { note: 'C#',  octave: 5, file: 'Samples/Horn/horn-c#5.wav' },
      { note: 'E',  octave: 2, file: 'Samples/Horn/horn-e2.wav' },
      { note: 'E',  octave: 3, file: 'Samples/Horn/horn-e3.wav' },
      { note: 'E',  octave: 4, file: 'Samples/Horn/horn-e4.wav' },
      { note: 'E',  octave: 5, file: 'Samples/Horn/horn-e5.wav' },
      { note: 'G',  octave: 2, file: 'Samples/Horn/horn-g2.wav' },
      { note: 'G',  octave: 3, file: 'Samples/Horn/horn-g3.wav' },
      { note: 'G',  octave: 4, file: 'Samples/Horn/horn-g4.wav' },
  ]
};

const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function noteValue(note, octave) {
  return octave * 12 + OCTAVE.indexOf(note);
}

function getNoteDistance(note1, octave1, note2, octave2) {
  return noteValue(note1, octave1) - noteValue(note2, octave2);
}

function getNearestSample(sampleBank, note, octave) {
  let sortedBank = sampleBank.slice().sort((sampleA, sampleB) => {
    let distanceToA =
      Math.abs(getNoteDistance(note, octave, sampleA.note, sampleA.octave));
    let distanceToB =
      Math.abs(getNoteDistance(note, octave, sampleB.note, sampleB.octave));
    return distanceToA - distanceToB;
  });
  return sortedBank[0];
}

let audioContext = new AudioContext();

function fetchSample(path) {
  return fetch(encodeURIComponent(path))
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}


function flatToSharp(note) {
  switch (note) {
    case 'Bb': return 'A#';
    case 'Db': return 'C#';
    case 'Eb': return 'D#';
    case 'Gb': return 'F#';
    case 'Ab': return 'G#';
    default:   return note;
  }
}

function getSample(instrument, noteAndOctave) {
  let [, requestedNote, requestedOctave] = /^(\w[b#]?)(\d)$/.exec(noteAndOctave);
  requestedOctave = parseInt(requestedOctave, 10);
  requestedNote = flatToSharp(requestedNote);
  let sampleBank = SAMPLE_LIBRARY[instrument];
  let sample = getNearestSample(sampleBank, requestedNote, requestedOctave);
  let distance = getNoteDistance(requestedNote, requestedOctave, sample.note, sample.octave);
  return fetchSample(sample.file).then(audioBuffer => ({
    audioBuffer: audioBuffer,
    distance: distance
  }));
}

function playSample(instrument, note, destination, delaySeconds=0) {
  getSample(instrument, note).then(({audioBuffer, distance}) => {
    let playbackRate = Math.pow(2, distance/12);
    let bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.playbackRate.value = playbackRate;
    bufferSource.connect(destination);
    bufferSource.start(audioContext.currentTime + delaySeconds);
  });
}

function startLoop(instrument, note, destination, loopLength, delaySeconds) {
  playSample(instrument, note, destination, delaySeconds);
  setInterval(() => playSample(instrument, note, destination, delaySeconds),
   loopLength * 1000
  );
}

fetchSample('./src/AirportTerminal.wav').then(convolverBuffer => {
  let convolver = audioContext.createConvolver();
  convolver.buffer = convolverBuffer;
  convolver.connect(audioContext.destination);

  //
  // startLoop('Chorus', 'F4',  convolver, 19.7, 4.0);
  // startLoop('Chorus', 'Ab4', convolver, 17.8, 8.1);
  // startLoop('Chorus', 'C5',  convolver, 21.3, 5.6);
  // startLoop('Chorus', 'Db5', convolver, 22.1, 12.6);
  // startLoop('Chorus', 'Eb5', convolver, 18.4, 9.2);
  // startLoop('Chorus', 'F5',  convolver, 20.0, 14.1);
  // startLoop('Chorus', 'Ab5', convolver, 17.7, 3.1);

  startLoop('Grand Piano', 'F4',  convolver, 19.7, 4.0);
  startLoop('Grand Piano', 'Ab4', convolver, 17.8, 8.1);
  startLoop('Grand Piano', 'C5',  convolver, 21.3, 5.6);
  startLoop('Grand Piano', 'Db5', convolver, 22.1, 12.6);
  startLoop('Grand Piano', 'Eb5', convolver, 18.4, 9.2);
  startLoop('Grand Piano', 'F5',  convolver, 20.0, 14.1);
  startLoop('Grand Piano', 'Ab5', convolver, 17.7, 3.1);

  // startLoop('English Horn', 'F4',  convolver, 19.7, 4.0);
  // startLoop('English Horn', 'Ab4', convolver, 17.8, 8.1);
  // startLoop('English Horn', 'C5',  convolver, 21.3, 5.6);
  // startLoop('English Horn', 'Db5', convolver, 22.1, 12.6);
  // startLoop('English Horn', 'Eb5', convolver, 18.4, 9.2);
  // startLoop('English Horn', 'F5',  convolver, 20.0, 14.1);
  // startLoop('English Horn', 'Ab5', convolver, 17.7, 3.1);




})
