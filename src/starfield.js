const points = document.querySelector("a-point");

var stars = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

for(var i = 0; i < 2000; i++) {
  stars.push([ getRandomInt(-1000, 1000), getRandomInt(-1000, 1000), getRandomInt(-1000, 1000) ]);
}

console.log(stars);
console.log(points);
console.dir(points.components);
setTimeout(function() {
    points.components.point.setPoints(stars);
    console.log(points.components.point);
}, 1000);
