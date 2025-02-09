import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


//--------------------------------------------------------------------

// const radiusTop = 1;  

// const radiusBottom = 1;  

// const height = 3;  

// const radialSegments = 12;  

// const heightSegments = 2;  

// const openEnded = false;  
// const thetaStart = Math.PI * 0.25;  

// const thetaLength = Math.PI * 1.5;  

// const geometry = new THREE.CylinderGeometry(
// 	radiusTop, radiusBottom, height,
// 	radialSegments, heightSegments,
// 	openEnded,
// 	thetaStart, thetaLength );

// ;

// const fov = 45;
// const aspect = 2;  // the canvas default
// const near = 0.1;
// const far = 100;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(0, 10, 20);

// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 5, 0);
// controls.update();

//---------------------------------------------------------------------


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material);
scene.add( cube );

const axesHelper = new THREE.AxesHelper(2);

// scene.add( axesHelper );
camera.position.set(3, 1, 5);

let angle = 0;

function animate() {
    angle += 0.05;
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    cube.position.x = Math.cos(angle);
    cube.position.y = Math.sin(angle);
    // cube.position.x = 0.80;
	renderer.render( scene, camera );

}





