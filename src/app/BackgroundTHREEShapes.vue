<template>
    <canvas id="main-menu-background-canvas"></canvas>
    <span id="screen-darker" :class="{ darker: darkerCSSClass }"></span>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from "vue";
import createTHREEBackground from "@/three/main_menu/main";
import router from "@/router/index";

const ROUTER_WITH_LIGHT_BACKGROUND = ["/menu", "/"];

export default defineComponent({
    setup() {
        const darkerCSSClass = ref<boolean>(false);
        onMounted(createTHREEBackground);
        watch(router.currentRoute, (val) => {
            darkerCSSClass.value = !ROUTER_WITH_LIGHT_BACKGROUND.includes(val.path);
        });

        return { darkerCSSClass };
    },
});
</script>
