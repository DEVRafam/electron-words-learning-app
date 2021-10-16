<template>
    <section id="main-menu">
        <!--  -->
        <h1 id="title">Nagelneue</h1>
        <button @click="redirect('/gameplay')" class="menu-option" autofocus><span>Start new game</span></button>
        <button @click="redirect('/statistics')" class="menu-option"><span>Progress statistics</span></button>
        <button @click="redirect('/datasets-manager')" class="menu-option"><span>Datasets manager</span></button>
        <button class="menu-option exit" @click="exit"><span>Exit</span></button>
        <!--  -->
        <button id="fullscreen" @click="changeFullscreen" tabindex="-1" :class="{ fullscreened: fullscreen }">
            <font-awesome-icon :icon="fullscreen ? 'compress' : 'expand'"></font-awesome-icon>
        </button>
        <!--  -->
        <!--  -->
        <!--  -->
        <!-- DEV ONLY 🚀🚀 -->
        <footer>~ Kacper <strong>Ksiazek</strong>😊</footer>
        <!-- DEV ONLY 🚀🚀 -->
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useGameplay from "@/composable/gameplay/useMain";
import router from "@/router/index";
import { ipcRenderer } from "electron";
import ElectronStore from "@/ElectronStore";
//
export default defineComponent({
    setup() {
        const fullscreen = ref<boolean>(ElectronStore.get("fullscreen") as boolean);
        const { startNewGamplay } = useGameplay;
        const redirect = (path: string) => router.push({ path });
        const exit = () => ipcRenderer.invoke("quit-app");
        const changeFullscreen = () => ipcRenderer.invoke("fullscreen");

        ElectronStore.onDidChange("fullscreen", (val) => {
            fullscreen.value = val as boolean;
        });

        return { startNewGamplay, redirect, exit, changeFullscreen, fullscreen };
    },
});
</script>
