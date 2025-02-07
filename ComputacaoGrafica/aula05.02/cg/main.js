import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);



// Carregar a textura para o plano de fundo
const loader = new THREE.TextureLoader();
loader.load('src/zoro.png', function(texture) {
    scene.background = texture;
});

const textureLoader = new THREE.TextureLoader();
const textures = [
    textureLoader.load('src/zoro.png'),
    textureLoader.load('src/zoro.png'),
    textureLoader.load(''),
    // Adicione mais texturas conforme necessário
];


let cubos = [];
let colidir = new Set();

for (let i = 0; i < 30; i++) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: textures[i % textures.length] });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cubos.push(cube);

}

camera.position.z = 15;

let velocidades = [];

for (let i = 0; i < cubos.length; i++) {
  let velocidade = [
    (5.0 * (2.0 * Math.random() - 1.0)) / 100,
    (5.0 * (2.0 * Math.random() - 1.0)) / 100,
    (5.0 * (2.0 * Math.random() - 1.0)) / 100,
  ];
  velocidades.push(velocidade);
}

function getRandomColor(){
    return Math.random() * 0xffffff;
}

function colidiram(cuboA, cuboB) {
	const distancia = cuboA.position.distanceTo(cuboB.position);
	const minDistancia = 0.1;
	return distancia < minDistancia;
}

function animate() {

  cubos[0].rotation.x += 0.01;
  cubos[0].rotation.y += 0.01;

  for (let i = 0; i < cubos.length; i++) {
    cubos[i].position.x += velocidades[i][0];
    cubos[i].position.y += velocidades[i][1];
    cubos[i].position.z += velocidades[i][2];

    // Verifique se o cubo se moveu e altere a cor

    if (cubos[i].position.x >= 10 || cubos[i].position.x <= -10) {
      velocidades[i][0] = -velocidades[i][0];
    }

    if (cubos[i].position.y >= 9 || cubos[i].position.y <= -9) {
      velocidades[i][1] = -velocidades[i][1];
    }

    if (cubos[i].position.z >= 3 || cubos[i].position.z <= -3) {
      velocidades[i][2] = -velocidades[i][2];
    }

    	for(let j = i + 1; j < cubos.length; j++) {
			if(colidiram(cubos[i], cubos[j])) {
				cubos[i].material.map.set(getRandomColor());
				cubos[j].material.map.set(getRandomColor());
				colidir.add(cubos[i]);
				colidir.add(cubos[j]);
			}
			
		}
  }

  
  renderer.render(scene, camera);
}





