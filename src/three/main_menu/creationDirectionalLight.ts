import * as THREE from "three";

export default (position: THREE.Vector3): THREE.DirectionalLight => {
    const pointLight = new THREE.DirectionalLight("#fff", 5);
    pointLight.position.set(position.x, position.y, position.z);
    return pointLight;
};
