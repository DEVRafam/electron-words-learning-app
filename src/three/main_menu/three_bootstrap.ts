import * as THREE from "three";
import THREEBootstrap from "@/types/THREEBootstrap";
import router from "@/router/index";
//
class ThreeBootstrap {
    protected scene: THREE.Scene = new THREE.Scene();
    protected sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    } as { width: number; height: number };

    public constructor(protected canvas: Element) {}

    protected createFloor(): THREE.Mesh {
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshStandardMaterial({
                color: "#222f3e",
                roughness: 0.0,
                metalness: 1,
            })
        );
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        return floor;
    }

    protected createAmbientLight(): THREE.AmbientLight {
        return new THREE.AmbientLight(0xffffff, 0.3);
    }

    protected createCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 200);
        // camera.position.set(-11.013646729373495, 7.839302355113771, 3.114357024826758);
        camera.position.set(-5.013646729373495, 10, 3.114357024826758);
        camera.lookAt(0, 0, 0);
        return camera;
    }

    protected createRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas as Element,
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(this.sizes.width, this.sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        return renderer;
    }

    protected handleResizing(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
        window.addEventListener("resize", () => {
            // Update sizes
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;

            // Update camera
            camera.aspect = this.sizes.width / this.sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(this.sizes.width, this.sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    protected handleMainLoop(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
        const clock = new THREE.Clock();
        const loop = () => {
            renderer.render(this.scene, camera);
            window.requestAnimationFrame(loop);

            if (router.currentRoute.value.name === "Menu") {
                const elapsed = clock.getElapsedTime();
                camera.lookAt(0, 0, 0);
                camera.position.x = -11 * Math.cos(elapsed / 4);
            }
        };
        loop();
    }

    public main(): THREEBootstrap {
        const floor = this.createFloor();
        const ambientLight = this.createAmbientLight();
        const camera = this.createCamera();
        const renderer = this.createRenderer();
        this.scene.add(floor, ambientLight, camera);
        this.handleResizing(camera, renderer);
        this.handleMainLoop(camera, renderer);

        return {
            camera,
            renderer,
            scene: this.scene,
        };
    }
}

export default (canvas: Element): THREEBootstrap => new ThreeBootstrap(canvas).main();
