function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

AFRAME.registerComponent('planet', {
  init: function() {
    var geometry = new THREE.SphereGeometry(getRandomInt(50, 200), 16, 16);
    var material = new THREE.MeshBasicMaterial( { wireframe: true } );
    var sphere = new THREE.Mesh(geometry, material);

    this.el.setObject3D('mesh', sphere);

  }

});
