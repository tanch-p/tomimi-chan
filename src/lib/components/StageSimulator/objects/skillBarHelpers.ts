import * as THREE from 'three';
import { GameConfig } from './GameConfig.svelte.js';

export function createSkillBarMesh(progress: number) {
	const fillColorVector = new THREE.Color(0x74b72e);
	const bgColorVector = new THREE.Color(0x000000);

	// Create shader material
	const shaderMaterial = new THREE.ShaderMaterial({
		uniforms: {
			progress: { value: progress },
			fillColor: {
				value: new THREE.Vector4(fillColorVector.r, fillColorVector.g, fillColorVector.b, 1.0) // full opacity
			},
			backgroundColor: {
				value: new THREE.Vector4(bgColorVector.r, bgColorVector.g, bgColorVector.b, 0.5) // 0.5 opacity
			}
		},
		vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
		fragmentShader: `
            uniform float progress;
            uniform vec4 fillColor;
            uniform vec4 backgroundColor;
            varying vec2 vUv;
            
            void main() {
                vec4 color = vUv.x < progress ? fillColor : backgroundColor;
                gl_FragColor = color;
            }
        `,
		transparent: true // Enable transparency
	});

	// Create plane geometry
	const geometry = new THREE.PlaneGeometry(GameConfig.gridSize * 1.1, 15);
	const mesh = new THREE.Mesh(geometry, shaderMaterial);

	// Make it always face the camera
	mesh.onBeforeRender = (renderer, scene, camera) => {
		mesh.quaternion.copy(camera.quaternion);
	};
	return mesh;
}
