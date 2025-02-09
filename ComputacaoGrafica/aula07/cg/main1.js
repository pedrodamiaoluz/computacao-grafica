import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();

let coords = [];

const H = 1.0;
const rdiv = 6;
const hdiv = 4;
const R = 1.0;
const delta = 2.0 * Math.PI / rdiv;
const delta_h = H / hdiv;

// Tampa superior
for (let i = 0; i < rdiv; i++) {
	let theta = i * delta
	let theta_ = theta + delta

	let newCoords = [
		0, H, 0,
		R * Math.cos(theta), H, -R * Math.sin(theta),
		R * Math.cos(theta_), H, -R * Math.sin(theta_)
	]
	coords = coords.concat(newCoords);
}

// Anéis
for (let j = 0; j < hdiv; j++) {
	let H_ = j * delta_h;
	let H__ = H_ + delta_h;

	for (let i = 0; i < rdiv; i++) {
		let theta = i * delta;
		let theta_ = theta + delta;

		let newCoords = [
			R * Math.cos(theta), H_, -R * Math.sin(theta),
			R * Math.cos(theta_), H_, -R * Math.sin(theta_),
			R * Math.cos(theta_), H__, -R * Math.sin(theta_),
			R * Math.cos(theta_), H__, -R * Math.sin(theta_),
			R * Math.cos(theta), H__, -R * Math.sin(theta),
			R * Math.cos(theta), H_, -R * Math.sin(theta)
		]
		coords = coords.concat(newCoords);
	}
}

// Tampa inferior
for (let i = 0; i < rdiv; i++) {
	let theta = i * delta
	let theta_ = theta + delta

	let newCoords = [
		0, 0, 0,
		R * Math.cos(theta_), 0, -R * Math.sin(theta_),
		R * Math.cos(theta), 0, -R * Math.sin(theta)
	]
	coords = coords.concat(newCoords);
}

const vertices = new Float32Array(coords);

// itemSize = 3 já que temos 3 valores (coordenadas) por vértice
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


camera.position.z = 5;

function animate() {

	//mesh.rotation.y += 0.01;
	mesh.rotation.x += 0.01;

	renderer.render(scene, camera);

}
