function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

AFRAME.registerComponent('planet', {
  init: function() {
    var texture = new THREE.TextureLoader().load( "./planetTexture.png" );

    var geometry = new THREE.SphereGeometry(getRandomInt(50, 200), 20, 20);
    var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('./src/planetTexture.png') });
    var sphere = new THREE.Mesh(geometry, material);

    this.el.setObject3D('mesh', sphere);

  }

});
