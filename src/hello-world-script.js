import "./hello-world-style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//FIXME: lil-guiに移行する
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

const gltfLoader = new GLTFLoader();

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.hello");

// Scene
const scene = new THREE.Scene();

// let tl = gsap.timeline();

const tl1 = gsap.timeline({
  repeat: -1,
  defaults: { duration: 2, ease: "easeIn" },
});
const tl2 = gsap.timeline({
  delay: 0.3,
  repeat: -1,
  defaults: { duration: 2.5, ease: "easeIn" },
});
const tl3 = gsap.timeline({
  delay: 0.3,
  repeat: -1,
  defaults: { duration: 2.5, ease: "easeIn" },
});

const tl4 = gsap.timeline({
  repeatDelay: 0.8,
  repeat: -1,
  defaults: { duration: 2.5, ease: "easeIn" },
});

// Cube
gltfLoader.load("cube2.glb", (gltf) => {
  gltf.scene.scale.set(50, 50, 50);
  gltf.scene.position.set(300, 255, -180);
  gltf.scene.rotation.set(1.2, 6, 5);

  scene.add(gltf.scene);
  tl1.to(gltf.scene.rotation, { y: 5.5 });
  tl1.to(gltf.scene.rotation, { y: 6 });
});

gltfLoader.load("cube2.glb", (gltf) => {
  gltf.scene.scale.set(50, 50, 50);
  gltf.scene.position.set(-350, -151, -420);
  gltf.scene.rotation.set(4, 4, 4);

  scene.add(gltf.scene);
  tl2.to(gltf.scene.rotation, { x: 3 });
  tl2.to(gltf.scene.rotation, { x: 4 });
});

gltfLoader.load("circle2.glb", (gltf) => {
  gltf.scene.scale.set(70, 70, 70);
  gltf.scene.position.set(361, -72, 0);

  scene.add(gltf.scene);
  tl3.to(gltf.scene.position, { x: 400 });
  tl3.to(gltf.scene.position, { x: 361 });
});

gltfLoader.load("circle2.glb", (gltf) => {
  gltf.scene.scale.set(70, 70, 70);
  gltf.scene.position.set(-361, 206, 0);

  scene.add(gltf.scene);
  tl4.to(gltf.scene.position, { x: -320, y: 230 });
  tl4.to(gltf.scene.position, { x: -361, y: 206 });
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight1.position.set(-246, 36, 580);
scene.add(directionalLight1);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(
  sizes.width / -2,
  sizes.width / 2,
  sizes.height / 2,
  sizes.height / -2,
  0.1,
  1000
);
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
