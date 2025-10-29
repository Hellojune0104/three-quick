import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0x222244, 0.8));
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(3, 4, 2);
scene.add(dir);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0xFF6B2B, metalness: 0.2, roughness: 0.35 })
);
scene.add(mesh);

const axes = new THREE.AxesHelper(2);
scene.add(axes);

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

function tick(){
  mesh.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

console.log('✅ three ok:', THREE.REVISION);
