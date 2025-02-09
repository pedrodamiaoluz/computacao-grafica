import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();

// let cordenadas = [
// 	-1.0, -1.0, 1.0, // v0
// 	1.0, -1.0, 1.0, // v1
// 	1.0, 1.0, 1.0, // v2

// 	1.0, 1.0, 1.0, // v3
// 	-1.0, 1.0, 1.0, // v4
// 	-1.0, -1.0, 1.0  // v5

// ];

let cordenadas = [];

const R = 1.0;
const H = 1.0;
const rdiv = 6;
const hdiv = 5;
const delta = 2.0 * Math.PI / rdiv;
const deltaH = H / hdiv;

//tampa superior
for (let i = 0; i < rdiv; i++) {
	let theta = 2.0 * Math.PI * i / rdiv;

	let triangulo = [
		0, H, 0,
		R * Math.cos(theta), H, -R * Math.sin(theta),
		R * Math.cos(theta + delta), H, -R * Math.sin(theta + delta),
	];

	cordenadas = cordenadas.concat(triangulo);

}

//tampa inferior
for (let i = 0; i < rdiv; i++) {
	let theta = 2.0 * Math.PI * i / rdiv;

	let triangulo = [
		0, 0, 0,
		R * Math.cos(theta + delta), 0, -R * Math.sin(theta + delta),
		R * Math.cos(theta), 0, -R * Math.sin(theta),
	];

	cordenadas = cordenadas.concat(triangulo);

}

//aneis
for (let j = 0; j < hdiv; j++) {
	let h = H * j / hdiv;
	for (let i = 0; i < rdiv; i++) {
		let theta = 2.0 * Math.PI * i / rdiv;

		let triangulo1 = [
			R * Math.cos(theta), h, -R * Math.sin(theta),
			R * Math.cos(theta + delta), h, -R * Math.sin(theta + delta),
			R * Math.cos(theta + delta), h + deltaH, -R * Math.sin(theta + delta),

		];

		let triangulo2 = [
			R * Math.cos(theta + delta), h + deltaH, -R * Math.sin(theta + delta),
			R * Math.cos(theta), h + deltaH, -R * Math.sin(theta),
			R * Math.cos(theta), h, -R * Math.sin(theta),

		];

		cordenadas = cordenadas.concat(triangulo1);
		cordenadas = cordenadas.concat(triangulo2);

	}
}

/*
for (let i = 0; i < rdiv; i++){
	let theta = 2.0*Math.PI*i/rdiv;

	let triangulo = [
		0,0,0,
		R*Math.cos(theta + delta),0,-R*Math.sin(theta + desta),
		R*Math.cos(theta),0,-R*Math.sin(theta),
	];

	cordenadas = cordenadas.concat(triangulo);
	
}
*/


// Criação de um quadrado simples.
// Há duplicação de vértice por conta da triangularização
const vertices = new Float32Array(cordenadas);

// itemSize = 3 já que são utilizados 3 coordenadas por vértice
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

function animate() {
	mesh.rotation.x += 0.01;
	renderer.render(scene, camera);
}
