const points = document.querySelector("a-point");

var stars = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min)) + min);
}

for(var i = 0; i < 10000; i++) {
  stars.push([ getRandomInt(-5000, 5000), getRandomInt(-5000, 5000), getRandomInt(-5000, 5000) ]);
}

setTimeout(function() {
    points.components.point.setPoints(stars);
}, 1000);
