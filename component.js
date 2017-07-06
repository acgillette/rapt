AFRAME.registerComponent('terrain', {
  schema: {
    width: {type : 'number', default: 500},
    height: {type: 'number', default:500},
    terrainHeight: {type: 'number', default: 0}
  },
  update: function() {
    var data = this.data;
    var el = this.el;
    var scl = 10;


    this.rows = data.height / scl;
    this.cols = data.width / scl;

    var geometry = new THREE.Geometry();
    var verticesCount = 0;

    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.cols; x++) {
        geometry.vertices.push(
	          new THREE.Vector3( x * scl, y * scl, data.terrainHeight ),
	          new THREE.Vector3( x * scl, (y + 1) * scl, data.terrainHeight ),
            new THREE.Vector3( (x + 1) * scl, y * scl, data.terrainHeight )
        );
        geometry.faces.push( new THREE.Face3( verticesCount, (verticesCount + 1), (verticesCount + 2) ));
        verticesCount += 3;

      }


    }

    var material = new THREE.MeshBasicMaterial( { wireframe: true } );

    console.log(geometry);
    var mesh = new THREE.Mesh( geometry, material );
    mesh.drawMode = THREE.TriangleStripDrawMode;

    el.setObject3D('mesh', mesh);


  },
  tick: function(time, timeDelta) {
    var el = this.el;
    var terrain = el.getObject3D('mesh').geometry;

    terrain.verticesNeedUpdate = true;

    for (var i = 0; i < terrain.vertices.length; i++) {
      var v = terrain.vertices[i];
      // console.log(v);
      // v.z = Math.random() * (15 - 0) + 0;
      // terrain.verticesNeedUpdate = true;


    }
  // to-do: find perlin noise library or make script, figure out how to use terrainHeight array
  //   var flying = -0.1;
  // for every vertice in the terrain model, change the z vertice
  // using perlin noise
  //   var yoff = flying;
  //
  //   for(var y = 0; y < this.rows; y++) {
  //     var xoff = 0;
  //     for(var x = 0; x < this.cols; x++) {
  //      vertices.z = map(noise(xoff, yoff), 0, 1, -100, 100);
  //       xoff += 0.2;
  //     }
  //     yoff += 0.2;
  //   }
  }

});
