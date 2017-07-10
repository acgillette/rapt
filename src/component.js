var SimplexNoise = require('simplex-noise');

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

AFRAME.registerComponent('terrain', {
    schema: {
      flying: {type: 'number', default: 0},
      heightMap: {type: 'array', default: []}
  },
  init: function() {
    var loader = new THREE.OBJLoader();
    var that = this;
    loader.load(
      './src/terrain.obj',
      function ( object ) {
        var material = new THREE.MeshBasicMaterial( { wireframe: true } );
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material = material;
            child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
            var simplex = new SimplexNoise();
            for(var i = 0; i < child.geometry.vertices.length; i++) {
              var v = child.geometry.vertices[i];
              v.z = map(simplex.noise2D(v.x / 1024.0, v.y / 1024.0), 0, 1, -100, 100);
            }
          }
        } );
        that.el.setObject3D('mesh', object);
      }
    );

  },
  update: function(oldData) {

  },
  tick: function(time, timeDelta) {
        // var el = this.el;
        // if(el.getObject3D('mesh')) {
        //   var terrain = el.getObject3D('mesh').children[0].geometry;
        //   var data = this.data;
        //   var simplex = new SimplexNoise();
        //
        //   terrain.verticesNeedUpdate = true;
        //
        //   for (var i = 0; i < data.heightMap.length; i++)
        //     {
        //       var v = terrain.vertices[i];
        //       v.z = data.heightMap[i];
        //
        //     }
        // }
      }


});
