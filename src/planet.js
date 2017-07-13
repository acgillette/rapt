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
    var fShader = $('#fragmentshader');
    var texture = new THREE.TextureLoader().load( "./planetTexture.png" );

    var geometry = new THREE.SphereGeometry(getRandomInt(100, 250), 20, 20);
    // var material = new THREE.MeshBasicMaterial( { wireframe: true } );
    // var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('./src/planetTexture.png') });

    var material = new THREE.ShaderMaterial({
      fragmentShader: fShader.text()
    });
    var sphere = new THREE.Mesh(geometry, material);

    this.el.setObject3D('mesh', sphere);

  }

});
