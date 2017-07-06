AFRAME.registerComponent('terrain', {
  schema: {
    width: {type : 'number', default: 500},
    height: {type: 'number', default:500},
  },
  init: function() {
    var data = this.data;
    var el = this.el;
    var scl = 10;


    var rows = data.height / scl;
    var cols = data.width / scl;

    // var geometry = new THREE.Geometry();
    //
    // geometry.vertices.push(
	  //    new THREE.Vector3( -10,  10, 0 ),
	  //    new THREE.Vector3( -10, -10, 0 ),
	  //    new THREE.Vector3(  10, -10, 0 )
    //  );
    //  geometry.faces.push( new THREE.Face3( 0, 1, 2 ));
    //
    //  var material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
    //
    //  var mesh = new THREE.Mesh( geometry, material );
    //  mesh.drawMode = THREE.TriangleStripDrawMode;
    // el.setObject3D('mesh', mesh);//default


    var geometry = new THREE.Geometry();
    var verticesCount = 0;

    for(var y = 0; y < rows; y++) {
      for(var x = 0; x < cols; x++) {
        geometry.vertices.push(
	          new THREE.Vector3( x * scl, y * scl, 0 ),
	          new THREE.Vector3( x * scl, (y + 1) * scl, 0 ),
            new THREE.Vector3( (x + 1) * scl, y * scl, 0 )
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


  }



});
