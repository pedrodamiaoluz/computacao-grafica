import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

let cubos = []

for (let i = 0; i < 10000; i++) {
	const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	cubos.push(cube);
}



// const geometry1 = new THREE.BoxGeometry(1, 1, 1);
// const material1 = new THREE.MeshBasicMaterial({ color: 0xff });
// const cube1 = new THREE.Mesh(geometry1, material1);
// scene.add(cube1);
// cubos.push(cube1);

camera.position.z = 15;

// let vx = 0.04;
// let vy = 0.05;
// let vz = 0.06;

let velocidades = [];

for (let i = 0; i < cubos.length; i++) {
	let velocidade = [5.0 * (2.0 * Math.random() - 1.0) / 100, 5.0 * (2.0 * Math.random() - 1.0) / 100,5.0 * (2.0 * Math.random() - 1.0) / 100];
	velocidades.push(velocidade);
}

// let v1 = [5.0 * (2.0 * Math.random() - 1.0) / 100, 5.0 * (2.0 * Math.random() - 1.0) / 100, 5.0 * (2.0 * Math.random() - 1.0) / 100];
// velocidades.push(v1);

// let v2 = [0.4, 0.5, 0.6];
// velocidades.push(v2);


function animate() {


	cubos[0].rotation.x += 0.01;
	cubos[0].rotation.y += 0.01;
	for (let i = 0; i < cubos.length; i++) {


		cubos[i].position.x += velocidades[i][0];
		cubos[i].position.y += velocidades[i][1];
		cubos[i].position.z += velocidades[i][2];


		if (cubos[i].position.x >= 5 || cubos[i].position.x <= -5) {
			velocidades[i][0] = -velocidades[i][0];
		}

		if (cubos[i].position.y >= 4 || cubos[i].position.y <= -4) {
			velocidades[i][1] = -velocidades[i][1];
		}

		if (cubos[i].position.z >= 3 || cubos[i].position.z <= -3) {
			velocidades[i][2] = -velocidades[i][2];
		}

	}

	renderer.render(scene, camera);

}
