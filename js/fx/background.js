Streams.Effect.Background = function () {
  Streams.Effect.call(this);

  this.order = 0;
  this.group = null;
  this.opacity = 0;

  this.renderer = 'webgl';
}

Streams.Effect.Background.prototype = _.extend(new Streams.Effect(), {

  build: function (exports) {
    exports.background = this;

    var scene = exports.scene;

    var group = this.group = new THREE.Object3D();

    var geometry = this.makeGeometry();
    var material = this.material = new THREE.ShaderMaterial(Streams.SolidShader);
    var mesh = this.mesh = new THREE.Mesh(geometry, material);

    mesh.position.z = 0;
    mesh.position.y = 100;

    mesh.rotation.y = -.8;
    mesh.rotation.x = .4;
    mesh.rotation.z = .2;
    mesh.eulerOrder = "YXZ";

    mesh.renderDepth = 20000;
    group.add(mesh);

    scene.add(group);

    // mimic shader fog
    scene.fog = this.fog = new THREE.Fog(0xffffff, 1200, 2600);

    this.opacity = exports.doIntro ? -.1 : 1;
  },

  makeGeometry: function () {
    var geometry = new THREE.BufferGeometry();

    // Ranges for randoms
    var borderRadius = 50;
    var radius = [3000, 4200];
    var shift = [-2000, 2000];
    var scaleX = [17000, 20000];
    var scaleY = [80, 170];
    var scaleZ = [80, 170];

    // Boxes
    var n = 44;

    // Segments
    var nsX = 8;
    var nsY = 4;

    var nTris = nsX * (nsY + 4) * 2 * n;
    var nVerts = nTris * 3;

    // Geometry streamer
    geometry.attributes = {
      index: {
        itemSize: 1,
        array: new Uint16Array(nTris * 3),
      },
      position: {
        itemSize: 3,
        array: new Float32Array(nVerts * 3),
      },
      normal: {
        itemSize: 3,
        array: new Float32Array(nVerts * 3),
      },
      color: {
        itemSize: 3,
        array: new Float32Array(nVerts * 3),
      },
    };

    var posIndex = 0;
    var vertexIndex = 0;
    var posRefIndex = 0;

    var indexData = geometry.attributes.index.array;
    var posData = geometry.attributes.position.array;
    var normalData = geometry.attributes.normal.array;
    var colorData = geometry.attributes.color.array;

    function mark() {
      posRefIndex = posIndex;
    }

    function vertex(v, n, c) {
      var p = posIndex * 3;

      posData[p] = v.x;
      posData[p + 1] = v.y;
      posData[p + 2] = v.z;

      v3.copy(n);
      v3.multiply(v3).add(n).normalize();

      normalData[p] = v3.x;
      normalData[p + 1] = v3.y;
      normalData[p + 2] = v3.z;

      colorData[p] = c.r;
      colorData[p + 1] = c.g;
      colorData[p + 2] = c.b;

      posIndex++;
    }

    function triangle(i, j, k) {
      indexData[vertexIndex++] = posRefIndex + i;
      indexData[vertexIndex++] = posRefIndex + k;
      indexData[vertexIndex++] = posRefIndex + j;
    }

    function quad(i, j, k, l) {
      indexData[vertexIndex++] = posRefIndex + i;
      indexData[vertexIndex++] = posRefIndex + k;
      indexData[vertexIndex++] = posRefIndex + j;

      indexData[vertexIndex++] = posRefIndex + j;
      indexData[vertexIndex++] = posRefIndex + k;
      indexData[vertexIndex++] = posRefIndex + l;
    }

    var v1 = _v();
    var v2 = _v();
    var v3 = _v();

    var m1 = new THREE.Matrix4();
    var m2 = new THREE.Matrix4();

    function sign(v) {
      v.x = v.x > 0 ? 1 : -1;
      v.y = v.y > 0 ? 1 : -1;
      v.z = v.z > 0 ? 1 : -1;
    }

    function randRange(range) {
      return range[0] + rand() * (range[1] - range[0]);
    }

    var colors = Streams.Palette.red.concat(Streams.Palette.blue);

    var cc = Streams.Palette.platinum[1];

    // Seed random generator
    var seed = 773239;

    rand(seed);

    // Manual tweaks
    var offsets = {
      0: [-1300, 0, 0, .3, 0, 0, 0],
      1: [1200, 1800, 0, 0, 0, 0, 0],
      2: [930, 1100, 0, 0, 0, 0, 0],

      3: [2300, 1400, 0, .35, .1, 0, 0],
      4: [700, 300, 140, 0, 0, 0, .08],
      5: [1040, 220, 140, .2, -.05, 0, -.2],

      6: [1050, 400, 0, .4, .1, -.1, 0],
      8: [800, -240, 0, 0, 0, 0, -.2],

      24: [0, 0, -100, 0, 0, 0, 0],
      25: [-500, 0, 500, 0, 0, 0, 0],

      36: [0, -300, -.1, 0, 0, 0, 0],
    };
    geometry.offsets = [{
      start: 0,
      index: 0,
      count: vertexIndex,
    }];

    return geometry;
  },

  update: function (exports) {

    var ride = exports.ride || exports.tracks.override();

    this.mesh.visible =  0;

    this.mesh.position.x = ride ? 0 : 400;
    this.mesh.position.z = ride ? 0 : -400;

    this.mesh.rotation.y = ride ? -.8 : -.9;
    this.mesh.rotation.x = .4;
    this.mesh.rotation.z = .2;

    var sc = .9;
    this.mesh.scale.set(sc, sc, sc);

    if (exports.ride && exports.audio && exports.audio.currentTime > 276) {
      this.opacity -= .005;
    }
    else if (exports.audio) {
      this.opacity = 1;
    }
    else {
      this.opacity += .003;
    }

    var opacity = .5 - .5 * Math.cos(Math.min(1, Math.max(0, this.opacity)) * π);
    this.material.uniforms.opacity.value = opacity;
    this.material.uniforms.ambientCorrection.value = (exports.ambientCorrection || 0) + (exports.ride ? .3 : .6);

    exports.backgroundOpacity = opacity;

    var fogScale = (.85 - .15 * Math.abs(Math.cos(exports.cameraController.phi)));
    var near = exports.cameraController.perspective + 100;
    var far = exports.cameraController.perspective * 1.8 + 100;
    this.fog.near = near * fogScale;
    this.fog.far = far * fogScale;
  },

  resize: function (exports) {
  },

});

Streams.Effects.push(new Streams.Effect.Background());