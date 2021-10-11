import * as THREE from "three";
import createBootstrap from "./three_bootstrap";
import createTower from "./createTower";
import createLight from "./creationDirectionalLight";
import { THREEMainColor } from "./materials";

export default () => {
    const canvas = document.querySelector("canvas#main-menu-background-canvas");
    if (canvas) {
        const { scene } = createBootstrap(canvas);
        // Towers
        scene.add(createTower(new THREE.Vector3(4, 5, 4), new THREE.Vector3(0.5, 2.5, -1)));
        scene.add(createTower(new THREE.Vector3(3, 4, 3), new THREE.Vector3(-5, 2, 0)));
        scene.add(createTower(new THREE.Vector3(4, 6, 4), new THREE.Vector3(-4.5, 3, -5)));
        scene.add(createTower(new THREE.Vector3(4, 7, 4), new THREE.Vector3(1, 3.5, -8)));
        scene.add(createTower(new THREE.Vector3(4, 7, 4), new THREE.Vector3(6, 3.5, 6)));
        scene.add(createTower(new THREE.Vector3(3, 4, 3), new THREE.Vector3(5, 2, 2)));
        scene.add(createTower(new THREE.Vector3(5, 8, 5), new THREE.Vector3(7, 4, -4)));
        scene.add(createTower(new THREE.Vector3(4, 4, 4), new THREE.Vector3(-0, 2, 5)));
        scene.add(createTower(new THREE.Vector3(3, 3, 3), new THREE.Vector3(-4.5, 1.5, 8)));
        scene.add(createTower(new THREE.Vector3(3, 5, 3), new THREE.Vector3(-4, 2.5, 4)));
        scene.add(createTower(new THREE.Vector3(3, 2, 3), new THREE.Vector3(-8, 1, 5)));
        scene.add(createTower(new THREE.Vector3(3, 2, 3), new THREE.Vector3(-9, 1, -3)));
        scene.add(createTower(new THREE.Vector3(3, 3, 3), new THREE.Vector3(-8.5, 1.5, 1.5)));
        scene.add(createTower(new THREE.Vector3(4, 6, 4), new THREE.Vector3(0, 3, 10)));
        scene.add(createTower(new THREE.Vector3(3, 4, 3), new THREE.Vector3(-7, 2, -9.5)));
        // Light
        scene.add(createLight(new THREE.Vector3(5, 5, -5)));
        scene.add(createLight(new THREE.Vector3(12, 5, -12)));
        // Fog
        scene.background = THREEMainColor;
        scene.fog = new THREE.Fog(THREEMainColor, 1, 15);
    }
};
