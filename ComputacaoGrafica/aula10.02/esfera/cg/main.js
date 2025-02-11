import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();

let coords = [];

const rdiv = 6;
const hdiv = 4;
const R = 1.0;
const delta = 2.0 * Math.PI / rdiv;
const delta_h = 2.0 * R / hdiv;

// Calota norte
for (let i = 0; i < rdiv; i++) {
	let theta = i * delta;
	let theta_ = theta + delta;
	let h = R - delta_h;
	let r = Math.sqrt(R * R - h * h);

	let newCoords = [
		0, R, 0,
		r * Math.cos(theta), h, -r * Math.sin(theta),
		r * Math.cos(theta_), h, -r * Math.sin(theta_)
	]
	coords = coords.concat(newCoords);
}

// Anéis
for (let j = 1; j < hdiv - 1; j++) {
	let H_ = -R + j * delta_h;
	let H__ = H_ + delta_h;

	for (let i = 0; i < rdiv; i++) {
		let theta = i * delta;
		let theta_ = theta + delta;

		let r_ = Math.sqrt(R * R - H_ * H_);
		let r__ = Math.sqrt(R * R - H__ * H__);


		let newCoords = [
			r_ * Math.cos(theta), H_, -r_ * Math.sin(theta),
			r_ * Math.cos(theta_), H_, -r_ * Math.sin(theta_),
			r__ * Math.cos(theta_), H__, -r__ * Math.sin(theta_),
			r__ * Math.cos(theta_), H__, -r__ * Math.sin(theta_),
			r__ * Math.cos(theta), H__, -r__ * Math.sin(theta),
			r_ * Math.cos(theta), H_, -r_ * Math.sin(theta)
		]
		coords = coords.concat(newCoords);
	}
}

// Calota sul
for (let i = 0; i < rdiv; i++) {
	let theta = i * delta;
	let theta_ = theta + delta;
	let h = -R + delta_h;
	let r = Math.sqrt(R * R - h * h);

	let newCoords = [
		0, -R, 0,
		r * Math.cos(theta), h, -r * Math.sin(theta),
		r * Math.cos(theta_), h, -r * Math.sin(theta_)
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
