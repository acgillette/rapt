var $ = require('jquery');
var hsl = require('hsl-to-hex');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var hue = Math.floor(Math.random() * 360);
  var saturation = 100;
  var luminosity = 87.5;
  var pastel = hsl(hue, saturation, luminosity);
  return pastel;
}


AFRAME.registerComponent('planet', {
  schema: {
    moons: {type: 'int', default: 0},
    rings: {type: 'boolean', default: 'false'}

  },
  init: function() {


    var uniforms = {
      "color1" : {
      type : "c",
      value : new THREE.Color(getRandomColor())
      },
      "color2" : {
        type : "c",
        value : new THREE.Color(getRandomColor())
      }
    };


    var fShader = $('#fragmentshader');
    var vShader = $('#vertexshader');

    var radius = getRandomInt(100, 250);

    var geometry = new THREE.SphereGeometry(radius, 20, 20);

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vShader.text(),
      fragmentShader: fShader.text()
    });

    var sphere = new THREE.Mesh(geometry, material);


    this.el.setObject3D('mesh', sphere);

    console.log(this.data.rings);
    if (this.data.rings === true) {
      var ringGeometry = new THREE.RingGeometry(radius + 10, radius + getRandomInt(50, 70), 25);
      var ringMaterial = new THREE.MeshBasicMaterial( {wireframe: true});
      var ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;

      this.el.setObject3D('ring', ring);

    }


  }

});
