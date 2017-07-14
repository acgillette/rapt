var $ = require('jquery');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}



AFRAME.registerComponent('planet', {
  schema: {
    moons: {type: 'int', default: 0},
    rings: {type: 'boolean', default: 'false'}

  },
  init: function() {
    // var uniforms = {
    //   u_resolution: { type: "v2", value: new THREE.Vector2() },
    //   texture: { type: "t", value: THREE.ImageUtils.loadTexture( "./src/planetTexture.png" ) }
    // };

    var uniforms = {
      "color1" : {
      type : "c",
      value : new THREE.Color(0xFF0000)
      },
      "color2" : {
        type : "c",
        value : new THREE.Color(0x008000)
      }
    };


    var fShader = $('#fragmentshader');
    var vShader = $('#vertexshader');


    var geometry = new THREE.SphereGeometry(getRandomInt(100, 250), 20, 20);

    // var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('./src/planetTextures/3.png') });
    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vShader.text(),
      fragmentShader: fShader.text()
    });

    var sphere = new THREE.Mesh(geometry, material);

    this.el.setObject3D('mesh', sphere);

  }

});
