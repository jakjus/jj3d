import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, controls, scene, renderer, effect;

const loader = new GLTFLoader()

const start = Date.now();

let logo;

init();

function init() {
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 500;
	camera.position.z = 200;

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0, 0, 0 );

	loader.load('./jj.glb', glb => {
		glb.scene.scale.set(10,10,10)
		scene.add(glb.scene)
		logo = glb
	}, undefined, err => console.error(err))

	const pointLight1 = new THREE.PointLight( 0xffffff, 15, 0, 0 );
	pointLight1.position.set( 500, 700, 1000 );
	scene.add( pointLight1 );

	const pointLight2 = new THREE.PointLight( 0xffffff, 10, 0, 0 );
	pointLight2.position.set( - 1500, -300, -300 );
	scene.add( pointLight2 );


	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );

	effect = new AsciiEffect( renderer, ' .:jusak@#', { invert: true } );
	effect.setSize( window.innerWidth, window.innerHeight );
	effect.domElement.style.color = 'red';
	effect.domElement.style.backgroundColor = 'black';

	document.body.appendChild( effect.domElement );
	controls = new TrackballControls( camera, effect.domElement );
	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	effect.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	const timer = Date.now() - start;
	if (logo) {
		logo.scene.rotation.z = timer * 0.0002-0.9;
	}
	controls.update();
	effect.render( scene, camera );
}
