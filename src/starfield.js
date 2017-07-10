const points = document.querySelector("a-point");

var stars = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

for(var i = 0; i < 1000; i++) {
  stars.push([ getRandomInt(-1000, 1000), getRandomInt(-1000, 1000), getRandomInt(-1000, 1000) ]);
}

console.log(stars);
console.log(points);
points.components.point.setPoints(stars);
