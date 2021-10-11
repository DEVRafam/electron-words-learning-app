<template>
    <div>
        <Suspense>
            <template #default>
                <App></App>
            </template>
            <!--  -->
            <template #fallback>
                <LoadingScreen></LoadingScreen>
            </template>
        </Suspense>
        <canvas id="main-menu-background-canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import App from "./App.vue";
import createTHREEBackground from "@/three/main_menu/main";

export default defineComponent({
    components: { App },
    setup() {
        onMounted(createTHREEBackground);
    },
});
</script>
