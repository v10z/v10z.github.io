import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { PLYLoader } from './node_modules/three/examples/jsm/loaders/PLYLoader.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from './node_modules/three/examples/jsm/controls/TrackballControls.js';
import { PDBLoader } from './node_modules/three/examples/jsm/loaders/PDBLoader.js';
import { CSS2DRenderer, CSS2DObject } from './node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
var image1 = require('./images/earthmap1k.jpg');
var image2 = require('./images/earthspec1k.jpg');
var image3 = require('./images/earthcloudmaptrans.jpg');
var image4 = require('./images/earthbump1k.jpg');
var image5 = require('./images/earthcloudmap.jpg');

THREE.Cache.enabled = true;
var scene, renderer, camera, controls, light, textMesh, textGeo, geometry, material, t, stats, scale, path3, geometry3,
  material3, material16, mesh16, geometry16, path4, geometry4, mesh3, mesh4, path5, path6, mesh17, mesh6, geometry17, geometry6, material17, path7, path8, mesh8, mesh7, geometry7, geometry8, material6, material9, mesh9;
t = 0; var loader = new THREE.FontLoader(); scale = 0; var lod = new THREE.LOD(); lod.update = false; var plyloader = new PLYLoader(); var GLTFloader = new GLTFLoader();
var pdbloader = new PDBLoader(); var geo17copy, geo1copy, geo2copy, geo3copy, geo4copy;
init();

function init() {
  renderer = new THREE.WebGLRenderer({ alpha: true });

  //this is to get the correct pixel detail on portable devices
  renderer.setPixelRatio(window.devicePixelRatio);

  //and this sets the canvas' size.
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  // scene.background = new THREE.Color("rgb(256,256,256)");
  light = new THREE.Light("rgb(256,256,256)", 1);
  light.position.set(15, 0, 35);
  light.castShadow = true;
  scene.add(light);
  const pointLight = new THREE.PointLight("rgb(256,256,256)", 0.5);
  pointLight.position.set(100, 100, 100); scene.add(pointLight);

  const ambiLight = new THREE.AmbientLight("rgb(256,256,256)", 1.); scene.add(ambiLight);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,     //aspect
    .1,                                          //near clipping plane
    1000                                         //far clipping plane
  );
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(new THREE.Vector3(-10, 1, 0));
  camera.position.x = -30;
  camera.position.y = 60;
  camera.position.z = 80;
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  controls.rotateSpeed = 1.5;
  controls.enableDamping = true;
  controls.dampingFactor = .05;
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, 800);
  }, false);
  var glowMaterial1 = new THREE.ShaderMaterial({
    reflectivity: 1,
    refractionRatio: 0.95,
    opacity: 0.95,
    uniforms: {
      'c': {
        type: 'f',
        value: .7
      },
      'p': {
        type: 'f',
        value: .4
      },
      glowColor: {
        type: 'c',
        value: new THREE.Color("rgb(255,255,255)")
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

  function CustomSinCurve(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }

  CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve.prototype.constructor = CustomSinCurve;

  CustomSinCurve.prototype.getPoint = function (t) {
    var tx = 30 * Math.sin(Math.PI * t);
    var ty = Math.sin(2 * Math.PI * t * 7);
    var tz = -18 + Math.sin(14 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path3 = new CustomSinCurve(5);
  geometry3 = new THREE.TubeBufferGeometry(path3, 1000, .5, 50, false);
  material3 = new THREE.MeshPhysicalMaterial({ color: "rgb(150,20,20)", reflectivity: 1 });
  mesh3 = new THREE.Mesh(geometry3, material3);
  scene.add(mesh3);
  geometry3.setDrawRange.needsUpdate = true;
  geometry3.setDrawRange(0, 0);

  function CustomSinCurve2(scale) {
    THREE.Curve.call(this);
    this.scale = (scale === undefined) ? 1 : scale;
  }
  CustomSinCurve2.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve2.prototype.constructor = CustomSinCurve2;

  CustomSinCurve2.prototype.getPoint = function (t) {
    var tx = 30 * Math.sin(Math.PI * t);
    var ty = Math.sin(2 * Math.PI * t * 7);
    var tz = -18 - Math.sin(14 * Math.PI * t);
    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  path4 = new CustomSinCurve2(5);
  geometry4 = new THREE.TubeBufferGeometry(path4, 1000, .5, 50, false);

  mesh4 = new THREE.Mesh(geometry4, material3);
  scene.add(mesh4);
  geometry4.setDrawRange.needsUpdate = true;
  geometry4.setDrawRange(0, 0);

  plyloader.load('./stl/spin2.ply', function (geometry9) {
    var material9 = new THREE.MeshStandardMaterial({ vertexColors: THREE.VertexColors, reflectivity: 0.1, clearcoatRoughness: 0.1 });
    var mesh9 = new THREE.Mesh(geometry9, material9);
    mesh9.position.set(0, -25, -60);
    mesh9.rotation.set(0, 0, 0);
    mesh9.scale.set(9.5, 9.5, 9.5);
    mesh9.rotateSpeed = 0.1;
    scene.add(mesh9);
  });
  plyloader.load('./stl/test2.ply', function (geometry10) {
    var material10 = new THREE.MeshStandardMaterial({ vertexColors: THREE.VertexColors, reflectivity: 0.1, clearcoatRoughness: 0.1 });
    var mesh10 = new THREE.Mesh(geometry10, material10);
    mesh10.position.set(0, -20, -5);
    mesh10.rotation.set(0, 0, 0);
    mesh10.scale.set(.03, .03, .03);
    mesh10.rotateSpeed = 0.1;
    scene.add(mesh10);
  });
  plyloader.load('./stl/ins.ply', function (geometry11) {
    var material11 = new THREE.MeshPhysicalMaterial({ opacity: 0.9, color: "rgb(120,0,170)", reflectivity: 1, clearcoatRoughness: 0.1 });
    var mesh11 = new THREE.Mesh(geometry11, material11);
    mesh11.position.set(70, -2, -60);
    mesh11.rotation.set(.5, .5, 0);
    mesh11.scale.set(1, 1, 1);
    mesh11.rotateSpeed = 0.1;
    scene.add(mesh11);
  });
  plyloader.load('./stl/planeinside.ply', function (geometry16) {
    material16 = new THREE.MeshStandardMaterial({ color: "rgb(255,10,10)", opacity: 0.5, reflectivity: 1, clearcoatRoughness: 0.7 });
    var mesh16 = new THREE.Mesh(geometry16, material16);
    mesh16.position.set(-50, -30, -650);
    mesh16.rotation.set(Math.PI / 2, 0, 0);
    mesh16.scale.set(15, 15, 15);
    scene.add(mesh16);
  }); plyloader.load('./stl/planeinside2.ply', function (geometry16) {
    material16 = new THREE.MeshStandardMaterial({ color: "rgb(5,255,120)", reflectivity: 1, clearcoatRoughness: 1 });
    var mesh16 = new THREE.Mesh(geometry16, material16);
    mesh16.position.set(-50, -30, -650);
    mesh16.rotation.set(Math.PI / 2, 0, 0);
    mesh16.scale.set(15, 15, 15);
    scene.add(mesh16);
  });
  plyloader.load('./stl/words2.ply', function (geometry17) {
    material17 = new THREE.MeshPhysicalMaterial({ vertexColors: THREE.VertexColors, opacity: 1, reflectivity: 1, clearcoatRoughness: 0.1 });
    var mesh17 = new THREE.Mesh(geometry17, material17);
    geo17copy = geometry17;
    mesh17.position.set(-90, -80, 45);
    mesh17.scale.set(200, 200, 200);
    mesh17.rotation.set(-.6, 0, 0);
    scene.add(mesh17);
  });
  var texture = new THREE.TextureLoader().load('./images/backgroundsmaller.png');
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  scene.background = texture;

  // Texture Loader
  let textureLoader = new THREE.TextureLoader();

  // Planet Proto
  let planetProto = {
    sphere: function (size) {
      let sphere = new THREE.SphereBufferGeometry(size, 20, 20);

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
        bumpScale: .0001,
        specular: new THREE.Color('white'),
        shininess: 20
      },
      textures: {
        map: image1,
        bumpMap: image4,
        specularMap: image2
      }
    },
    atmosphere: {
      size: 0.3,
      material: {
        opacity: 0.9
      },
      textures: {
        map: image5,
        alphaMap: image3
      },
      glow: {
        size: 0.1,
        intensity: 0.7,
        fade: 1,
        color: "rgb(56,200,200)"
      }
    },
  });
  earth.position.set(70, -12, 5);
  geo1copy = earth;
  scene.add(earth);
  animate();

}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  t += 1 / 60;
  if (t > 4) {
    geometry3.setDrawRange.needsUpdate = true;
    geometry3.setDrawRange(0, 50000 * (t - 4));
    geometry4.setDrawRange.needsUpdate = true;
    geometry4.setDrawRange(0, 50000 * (t - 4));
    geo1copy.needsUpdate = true;
    geo1copy.rotation.y += 0.002;
  }

  if (t < 10) {
    controls.enabled = false;
  }
  else if (t < 120) {
    controls.enabled = true;
  }
  else {
    controls.enabled = false;
    camera.position.x = -30;
    camera.position.y = 60;
    camera.position.z = 80;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
}