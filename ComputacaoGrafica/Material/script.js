import * as THREE from 'three';


// const material = new THREE.MeshPhongMaterial({
// 	color: 0xFF0000,    // red (can also use a CSS color string here)
// 	flatShading: true,
//   });

const material = new THREE.MeshPhongMaterial();
material.color.setHSL(0, 1, .5);  // vermelho
material.flatShading = true;

material.color.set(0x00FFFF);    // igual ao estilo #RRGGBB do CSS
material.color.set(cssString);   // qualquer cor CSS, por exemplo 'roxo', '#F32',
                                 // 'rgb(255, 127, 64)',
                                 // 'hsl(180, 50%, 25%)'
material.color.set(someColor)    // alguns outros TRÊS.Cor
material.color.setHSL(h, s, l)   // onde h, s e l são 0 a 1
material.color.setRGB(r, g, b)   // onde r, g e b são 0 a 1