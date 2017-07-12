AFRAME.registerComponent('planet', {
  init: function() {
    var geometry = new THREE.SphereGeometry(50, 16, 16);
    var material = new THREE.MeshBasicMaterial( { wireframe: true } );
    var sphere = new THREE.Mesh(geometry, material);

    this.el.setObject3D('mesh', sphere);

  }

});
