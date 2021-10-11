import * as THREE from "three";
import { TowerMaterial } from "./materials";

class CreateTower {
    constructor(protected sizes: THREE.Vector3, protected positions: THREE.Vector3) {}

    main() {
        const geometry = new THREE.BoxBufferGeometry(this.sizes.x, this.sizes.y, this.sizes.z);
        const mesh = new THREE.Mesh(geometry, TowerMaterial);
        mesh.position.set(this.positions.x, this.positions.y, this.positions.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
    }
}

export default (sizes: THREE.Vector3, positions: THREE.Vector3) => new CreateTower(sizes, positions).main();
