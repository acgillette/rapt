var SimplexNoise = require('simplex-noise');

AFRAME.registerComponent('terrain', {
  schema: {
    width: {type : 'number', default: 500},
    height: {type: 'number', default:500},
    flying: {type: 'number', default: 0}
  },

  update: function(oldData) {
    var data = this.data;
    var el = this.el;
    var scl = 10;



    this.rows = data.height / scl;
    this.cols = data.width / scl;
    if(this.terrainArray === undefined) {
      this.terrainArray = new Array();
      for(var y = 0; y < this.rows; y++) {
        this.terrainArray.push(new Array(this.cols));
        for(var x = 0; x < this.cols; x++) {
          this.terrainArray[y][x] = 0;
        }
      }
    }




    var geometry = new THREE.Geometry();
    var verticesCount = 0;

    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.cols; x++) {
        geometry.vertices.push(
	          new THREE.Vector3( x * scl, y * scl, this.terrainArray[y][x] ),
	          new THREE.Vector3( x * scl, (y + 1) * scl, this.terrainArray[y][x] ),
            new THREE.Vector3( (x + 1) * scl, y * scl, this.terrainArray[y][x] )
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
    var data = this.data;
    var simplex = new SimplexNoise();


    terrain.verticesNeedUpdate = true;

    var xoff = 0;
    var yoff = data.flying;
    data.flying -= 0.1;

    for(var y = 0; y < this.rows; y++) {
      this.terrainArray.push(new Array(this.cols));
      for(var x = 0; x < this.cols; x++) {
        this.terrainArray[y][x] = simplex.noise2D(xoff, yoff) * 10;
        xoff += 0.2;
      }
      yoff += 0.2;
    }
  }



});
