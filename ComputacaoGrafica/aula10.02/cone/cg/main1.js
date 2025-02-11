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

// Bico
for (let i = 0; i < rdiv; i++) {
	let theta = 2.0 * Math.PI * i / rdiv;
	let r = R - R * (H - H / hdiv) / H

	let newCoords = [
		0, H, 0,
		r * Math.cos(theta), H - delta_h, -r * Math.sin(theta),
		r * Math.cos(theta + delta), H - delta_h, -r * Math.sin(theta + delta)
	]
	coords = coords.concat(newCoords);
}

// Anéis
for (let j = 0; j < hdiv - 1; j++) {
	let H_ = j * delta_h;
	let H__ = H_ + delta_h;

	for (let i = 0; i < rdiv; i++) {
		let theta = i * delta;
		let theta_ = theta + delta;

		let r_ = R - R * H_ / H;
		let r__ = R - R * H__ / H;


		let newCoords1 = [
			r_ * Math.cos(theta), H_, -r_ * Math.sin(theta),
			r_ * Math.cos(theta_), H_, -r_ * Math.sin(theta_),
			r__ * Math.cos(theta_), H__, -r__ * Math.sin(theta_),
			
		]

        let newCoords2 = [
            r__ * Math.cos(theta_), H__, -r__ * Math.sin(theta_),
			r__ * Math.cos(theta), H__, -r__ * Math.sin(theta),
			r_ * Math.cos(theta), H_, -r_ * Math.sin(theta),
        ]
        
		coords = coords.concat(newCoords1);
        coords = coords.concat(newCoords2);
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

// Função para atualizar a posição do mesh com base na posição do mouse
function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    mesh.position.x = mouseX * 5;
    mesh.position.y = mouseY * 5;
}

// Adicionar o evento de movimento do mouse
window.addEventListener('mousemove', onMouseMove);


camera.position.z = 5;

function animate() {

	//mesh.rotation.y += 0.01;
	 mesh.rotation.x += 0.01;

	renderer.render(scene, camera);

}
