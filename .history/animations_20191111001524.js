import * as THREE from "./node_modules/three/build/three.module.js";
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';
import { GeometryUtils } from './node_modules/three/examples/jsm/utils/GeometryUtils.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from './node_modules/three/examples/jsm/loaders/STLLoader.js';
THREE.Cache.enabled = true;
var scene, renderer, camera, controls, cube, lines, light, textMesh, textGeo, geometry, material, t, stats, scale, path3, geometry3,
  material3, path4, geometry4, mesh3, mesh4, path5, path6, mesh5, mesh6, geometry5, geometry6, material5, path7, path8, mesh8, mesh7, geometry7, geometry8, material6, material9, mesh9;
t = 0; var loader = new THREE.FontLoader(); scale = 0; var lod = new THREE.LOD(); lod.update = false; var stlloader = new STLLoader();

init();

function init() {
  renderer = new THREE.WebGLRenderer();

  //this is to get the correct pixel detail on portable devices
  renderer.setPixelRatio(window.devicePixelRatio);

  //and this sets the canvas' size.
  renderer.setSize(window.innerWidth, 800);

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(256,256,256)");
  light = new THREE.Light("rgb(256,256,256)", 1);
  light.position.set(15, 0, 35);
  light.castShadow = false;
  scene.add(light);

  var text = "Vidyasagar, Ph.D.",
    height = .05,
    size = 5,
    hover = 10,
    curveSegments = 10,
    bevelThickness = .1,
    bevelSize = .15,
    bevelEnabled = true; // normal bold

  loader.load('./node_modules/three/examples/fonts/optimer_regular.typeface.json', function (font) {
    textGeo = new THREE.TextGeometry(text, {
      font: font,
      size: size,
      height: height,
      curveSegments: curveSegments,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled
    });
    //textGeo.rotateX = Math.PI/2;
    const pointLight = new THREE.PointLight("rgb(256,256,256)", 1.5);
    pointLight.position.set(10, 100, 900); scene.add(pointLight);
    /* pointLight.color.setHSL(Math.random(), 1, 0.5); */

    var textMaterial = new THREE.MeshPhysicalMaterial({ clearCoat: (0.5), color: "rgb(0, 100,256)", opacity: 1, transparent: false });
    var textMesh = new THREE.Mesh(textGeo, textMaterial);
    textMesh.position.set(25, -12, 8);

    scene.add(textMesh);
  });

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,     //aspect
    .1,                                          //near clipping plane
    1000                                         //far clipping plane
  );
  /*         camera.up = new THREE.Vector3(0, 1, 0);
          camera.lookAt(new THREE.Vector3(-1, 1, 0)); */

  camera.position.set(-25, 25, 50);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  controls.rotateSpeed = 1;
  controls.enableDamping = true;
  controls.dampingFactor = .05;
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / 800;
    camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, 800);
  }, false);

  function CustomSinCurve(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }

  CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve.prototype.constructor = CustomSinCurve;

  CustomSinCurve.prototype.getPoint = function (t) {
    var tx = 15 * Math.sin(Math.PI * t - Math.PI / 2);
    var ty = 4 + Math.sin(2 * Math.PI * t * 7);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path3 = new CustomSinCurve(5);
  geometry3 = new THREE.TubeBufferGeometry(path3, 1000, .5, 50, false);
  material3 = new THREE.MeshPhysicalMaterial({ color: "rgb(256,0,0)" });
  mesh3 = new THREE.Mesh(geometry3, material3);
  scene.add(mesh3);

  function CustomSinCurve2(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }
  CustomSinCurve2.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve2.prototype.constructor = CustomSinCurve2;

  CustomSinCurve2.prototype.getPoint = function (t) {
    var tx = -(15 * Math.sin(Math.PI * t - Math.PI / 2));
    var ty = 4 + Math.sin(2 * Math.PI * t * 7);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path4 = new CustomSinCurve2(5);
  geometry4 = new THREE.TubeBufferGeometry(path4, 1000, .5, 50, false);

  mesh4 = new THREE.Mesh(geometry4, material3);
  scene.add(mesh4);

  function CustomSinCurve3(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }

  CustomSinCurve3.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve3.prototype.constructor = CustomSinCurve3;

  CustomSinCurve3.prototype.getPoint = function (t) {
    var tx = 15 * Math.sin(Math.PI * t - Math.PI / 2)/* -((t)*10 * 3 + 1.5) */;
    var ty = 8 + Math.sin(2 * Math.PI * t * 4);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path5 = new CustomSinCurve3(5);
  geometry5 = new THREE.TubeBufferGeometry(path5, 1000, .5, 50, false);
  material5 = new THREE.MeshPhysicalMaterial({ color: "rgb(80,245,20)" });
  mesh5 = new THREE.Mesh(geometry5, material5);
  scene.add(mesh5);

  function CustomSinCurve6(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }
  CustomSinCurve6.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve6.prototype.constructor = CustomSinCurve6;

  CustomSinCurve6.prototype.getPoint = function (t) {
    var tx = -(15 * Math.sin(Math.PI * t - Math.PI / 2));
    var ty = 8 + Math.sin(2 * Math.PI * t * 4);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path6 = new CustomSinCurve6(5);
  geometry6 = new THREE.TubeBufferGeometry(path6, 1000, .5, 50, false);

  mesh6 = new THREE.Mesh(geometry6, material5);
  scene.add(mesh6);

  material6 = new THREE.MeshPhysicalMaterial({ color: "rgb(156,100,30)" });

  function CustomSinCurve8(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }

  CustomSinCurve8.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve8.prototype.constructor = CustomSinCurve8;

  CustomSinCurve8.prototype.getPoint = function (t) {
    var tx = -(15 * Math.sin(Math.PI * t - Math.PI / 2));
    var ty = 0 + Math.sin(2 * Math.PI * t * 10);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path8 = new CustomSinCurve8(5);
  geometry8 = new THREE.TubeBufferGeometry(path8, 1000, .5, 50, false);

  mesh8 = new THREE.Mesh(geometry8, material6);
  scene.add(mesh8);

  function CustomSinCurve7(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }
  CustomSinCurve7.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve7.prototype.constructor = CustomSinCurve7;

  CustomSinCurve7.prototype.getPoint = function (t) {
    var tx = (15 * Math.sin(Math.PI * t - Math.PI / 2));
    var ty = 0 + Math.sin(2 * Math.PI * t * 10);
    var tz = -6 + 5 * Math.cos(2 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path7 = new CustomSinCurve7(5);
  geometry7 = new THREE.TubeBufferGeometry(path7, 1000, .5, 50, false);

  mesh7 = new THREE.Mesh(geometry7, material6);
  scene.add(mesh7);


  stlloader.load('./stl/spin.stl', function (geometry9) {
    var material9 = new THREE.MeshPhysicalMaterial({ reflectivity: 0.1, clearcoatRoughness: 0.1, color: "rgb(255,215,0)", specular: "rgb(256,256,256)", shininess: 0 });
    var mesh9 = new THREE.Mesh(geometry9, material9);
    mesh9.position.set(28, 15, -30);
    mesh9.rotation.set(0, 0, 0);
    mesh9.scale.set(6.5, 6.5, 6.5);
    mesh9.rotateSpeed = 0.1;
    scene.add(mesh9);
  });





  // Texture Loader
  let textureLoader = new THREE.TextureLoader();

  // Planet Proto
  let planetProto = {
    sphere: function (size) {
      let sphere = new THREE.SphereBufferGeometry(size, 32, 32);

      return sphere;
    },
    material: function (options) {
      let material = new THREE.MeshPhongMaterial();
      if (options) {
        for (var property in options) {
          material[property] = options[property];
        }
      }

      return material;
    },
    glowMaterial: function (intensity, fade, color) {
      let glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          'c': {
            type: 'f',
            value: intensity
          },
          'p': {
            type: 'f',
            value: fade
          },
          glowColor: {
            type: 'c',
            value: new THREE.Color(color)
          },
          viewVector: {
            type: 'v3',
            value: camera.position
          }
        },
        vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
        ,
        fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main()
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`
        ,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      return glowMaterial;
    },
    texture: function (material, property, uri) {
      let textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = true;
      textureLoader.load(
        uri,
        function (texture) {
          material[property] = texture;
          material.needsUpdate = true;
        }
      );
    }
  };

  let createPlanet = function (options) {
    // Create the planet's Surface
    let surfaceGeometry = planetProto.sphere(options.surface.size);
    let surfaceMaterial = planetProto.material(options.surface.material);
    let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

    // Create the planet's Atmosphere
    let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
    let atmosphereMaterialDefaults = {
      side: THREE.DoubleSide,
      transparent: true
    }
    let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
    let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
    let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

    // Create the planet's Atmospheric glow
    let atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
    let atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
    let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

    // Nest the planet's Surface and Atmosphere into a planet object
    let planet = new THREE.Object3D();
    surface.name = 'surface';
    atmosphere.name = 'atmosphere';
    atmosphericGlow.name = 'atmosphericGlow';
    planet.add(surface);
    planet.add(atmosphere);
    planet.add(atmosphericGlow);

    // Load the Surface's textures
    for (let textureProperty in options.surface.textures) {
      planetProto.texture(
        surfaceMaterial,
        textureProperty,
        options.surface.textures[textureProperty]
      );
    }

    // Load the Atmosphere's texture
    for (let textureProperty in options.atmosphere.textures) {
      planetProto.texture(
        atmosphereMaterial,
        textureProperty,
        options.atmosphere.textures[textureProperty]
      );
    }

    return planet;
  };

  let earth = createPlanet({
    surface: {
      size: 15,
      material: {
        bumpScale: .01,
        specular: new THREE.Color('white'),
        shininess: 200
      },
      textures: {
        map: './images/earthmap1k.jpg',
        bumpMap: './images/earthbump1k.jpg',
        specularMap: './images/earthspec1k.jpg'
      }
    },
    atmosphere: {
      size: 0.3,
      material: {
        opacity: 0.9
      },
      textures: {
        map: './images/earthcloudmap.jpg',
        alphaMap: './images/earthcloudmaptrans.jpg'
      },
      glow: {
        size: 0.1,
        intensity: 0.7,
        fade: 1,
        color: "rgb(56,200,200)"
      }
    },
  });

  scene.add(earth);

















  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  t += 1 / 60;
  geometry3.needsUpdate = true;
  geometry3.setDrawRange.needsUpdate = true;
  geometry3.setDrawRange(0, 50000 * t);
  geometry4.needsUpdate = true;
  geometry4.setDrawRange.needsUpdate = true;
  geometry4.setDrawRange(0, 50000 * t);
  geometry5.needsUpdate = true;
  geometry5.setDrawRange.needsUpdate = true;
  geometry5.setDrawRange(0, 50000 * t);
  geometry6.needsUpdate = true;
  geometry6.setDrawRange.needsUpdate = true;
  geometry6.setDrawRange(0, 50000 * t);
  geometry7.needsUpdate = true;
  geometry7.setDrawRange.needsUpdate = true;
  geometry7.setDrawRange(0, 50000 * t);
  geometry8.needsUpdate = true;
  geometry8.setDrawRange.needsUpdate = true;
  geometry8.setDrawRange(0, 50000 * t);
  renderer.render(scene, camera);
  if (t < 16) {
    camera.position.x -= Math.cos(t / 2);
    camera.position.y -= t * t * Math.cos(t / 2) / 400;
    camera.position.z -= t * Math.sin(t / 2) / 20;
  }
  else if (t < 7.5) {
    camera.position.x += Math.cos(t) / 2;
    camera.position.z += Math.cos(t) / 2;
  }
  stats.update();
}