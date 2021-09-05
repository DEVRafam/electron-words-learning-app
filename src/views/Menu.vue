<template>
    <section id="main-menu">
        <!--  -->
        <h1 id="title">Jeszcze bez nazwy</h1>
        <button @click="redirect('/gameplay')" class="menu-option"><span>Start new game</span></button>
        <button @click="redirect('/statistics')" class="menu-option"><span>Progress statistics</span></button>
        <button @click="redirect('/datasets-manager')" class="menu-option"><span>Datasets manager</span></button>
        <br />
        <button class="menu-option" @click="exit"><span>Exit</span></button>
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
import { defineComponent } from "vue";
import useGameplay from "@/composable/gameplay/main";
import router from "@/router/index";
import { ipcRenderer } from "electron";

//
export default defineComponent({
    setup() {
        const { startNewGamplay } = useGameplay;
        const redirect = (path: string) => router.push({ path });
        const exit = () => ipcRenderer.invoke("quit-app");

        return { startNewGamplay, redirect, exit };
    },
});
</script>
