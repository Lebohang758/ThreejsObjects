import * as THREE from 'three';
import { Camera } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



//group
const house = new THREE.Group();
scene.add(house);

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshBasicMaterial({ color: '#b35f45' })
);
walls.position.y = 2.5 / 3;
house.add(walls);

//chomela
const geometry = new THREE.BoxGeometry(0.5, 3, 0.5);
const material = new THREE.MeshBasicMaterial({ color: '#3E2723' });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 2.25;
cube.position.y = 1.1;
house.add(cube);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshBasicMaterial({ color: "brown" })
)
roof.position.y = 2.0 + 0.5;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshBasicMaterial({ color: '#aa7b7b' })
)
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshBasicMaterial({ color: "green" })


const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.01, 2.6);

house.add(bush1, bush2, bush3, bush4);


// Stone path

const stonePath = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 1000, 1000),
    new THREE.MeshBasicMaterial({ color: "black" })
)
stonePath.position.set(0, 0.001, 5);
stonePath.scale.y = 5;
stonePath.scale.x = 0.5;
stonePath.rotation.x = -Math.PI * 0.5

scene.add(stonePath);

//floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: '#43A047' })
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor);


camera.position.set(0, 2, 5);
camera.position.z = 5;

//pointercontrolClass
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

//event listeners to handle pointer lock event
const handleKeyDown = function(event) {
    switch (event.keyCode) {
        case 38: // move forward
            controls.moveForward(0.25);
            break;
        case 40: // move backward
            controls.moveForward(-0.25);
            break;
        case 37: // strafe left
            controls.moveRight(-0.25);
            break;
        case 39: // strafe right
            controls.moveRight(0.25);
            break;
    }
}
document.addEventListener("keydown", handleKeyDown);
renderer.render(scene, camera);

const controls1 = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls1.update();
    renderer.render(scene, camera);
};
animate();
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.08)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
house.add(ambientLight);