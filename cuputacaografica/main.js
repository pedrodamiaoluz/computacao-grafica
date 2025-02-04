import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const axesHelper = new THREE.AxesHelper(5);

scene.add( axesHelper );
camera.position.set(3, 1, 5);

let angle = 0;

function animate() {
    angle += 0.05;
	cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // cube.position.x = Math.cos(angle);
    // cube.position.y = Math.sin(angle);
    cube.position.x = 0.80;
	renderer.render( scene, camera );

}



