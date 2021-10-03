<template>
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
import { ensurePaths } from "@/composable/paths";
import useKeydown from "@/composable/useKeydown";
import router from "@/router/index";
import useGameplay from "@/composable/gameplay/main";

export default defineComponent({
    name: "Home",
    async setup() {
        useKeydown([
            {
                key: "Backspace",
                fn: () => {
                    const redirect = () => router.push({ path: "/" });
                    if (router.currentRoute.value.fullPath === "/gameplay") {
                        if (!Object.keys(useGameplay.gameplayDataFile.value).length) redirect();
                    }
                    //
                    else if (router.currentRoute.value.fullPath !== "/") {
                        redirect();
                    }
                },
            },
        ]);
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
