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
  //87.5
  var luminosity = 70;
  var pastel = hsl(hue, saturation, luminosity);
  return pastel;
}


AFRAME.registerComponent('planet', {
  schema: {
    moons: {type: 'int', default: 0}

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
      },
      "texture" : {
        type : "t",
        value : new THREE.TextureLoader().load( "./src/planetTextures/" + getRandomInt(1, 5) + ".png" )
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

    var randRings = getRandomInt(0, 2);

    if (randRings === 1) {
      var ringGeometry = new THREE.RingGeometry(radius + 10, radius + getRandomInt(50, 70), 25);
      var ringMaterial = new THREE.MeshBasicMaterial( { color: getRandomColor(), wireframe: true });
      var ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + 10;

      this.el.setObject3D('ring', ring);

    }

    var moonCount = getRandomInt(-1, 5);



    if(moonCount > 0) {
      for(var i = 1; i < moonCount; i++) {
        var uniforms2 = {
          "color1" : {
          type : "c",
          value : new THREE.Color(getRandomColor())
          },
          "color2" : {
            type : "c",
            value : new THREE.Color(getRandomColor())
          },
          "texture" : {
            type : "t",
            value : new THREE.TextureLoader().load( "./src/planetTextures/" + getRandomInt(1, 5) + ".png" )
          }
        };

        var moonGeometry = new THREE.SphereGeometry(getRandomInt(10, 30), 20, 20);
        var moonMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms2,
          vertexShader: vShader.text(),
          fragmentShader: fShader.text()
        });
        var randMoonZ = getRandomInt(0, 2);

        var moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(getRandomInt(-radius, radius), 0, randMoonZ === 1 ? (radius + 70) : -(radius + 70));

        this.el.setObject3D('moon' + i, moon);

      }
    }




  },

  update: function(oldData) {

  }

});
