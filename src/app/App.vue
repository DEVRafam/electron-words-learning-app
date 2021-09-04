<template>
    <BackgroundShapes></BackgroundShapes>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <main :key="$route.fullPath">
                <component :is="Component"></component>
                <!-- for teleport purposes: -->
                <section id="modals-wrapper">
                    <section id="global-notifications"></section>
                </section>
            </main>
        </transition>
    </router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import BackgroundShapes from "@/components/BackgroundShapes.vue";
import { ensurePaths } from "@/composable/paths";

export default defineComponent({
    name: "Home",
    components: {
        BackgroundShapes,
    },
    async setup() {
        await ensurePaths();
    },
});
</script>

<style lang="sass" scoped="true">
.fade-enter-active,
.fade-leave-active
    transition: opacity 0.15s ease


.fade-enter-from,
.fade-leave-active
    opacity: 0
</style>
