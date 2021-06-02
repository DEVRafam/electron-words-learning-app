<template>
    <section id="main-menu">
        <!--  -->
        <h1 id="title">Jeszcze bez nazwy</h1>
        <router-link to="/gameplay" class="menu-option"><span>Start new game</span></router-link>
        <router-link to="/statistics" class="menu-option"><span>Progress statistics</span></router-link>
        <router-link to="/words-manager" class="menu-option"><span>Words manager</span></router-link>
        <footer>~ Kacper <strong>Ksiazek</strong>😊</footer>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGameplay from "@/composable/gameplay";
//
export default defineComponent({
    setup() {
        const { startNewGamplay } = useGameplay;
        return { startNewGamplay };
    },
});
</script>
