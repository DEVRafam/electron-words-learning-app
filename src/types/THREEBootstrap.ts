import * as THREE from "three";

export default interface THREEBootstrap {
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
}
