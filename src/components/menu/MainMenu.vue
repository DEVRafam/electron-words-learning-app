<template>
    <section id="main-menu">
        <!--  -->
        <div id="menu-content">
            <h1 id="title">Jeszcze bez nazwy</h1>
            <button class="menu-option" @click="startNewGamplay"><span>Start new game</span></button>
            <button class="menu-option"><span>Progress statistics</span></button>
            <button class="menu-option"><span>Words manager</span></button>
            <footer>~ Kacper <strong>Ksiazek</strong>😊</footer>
        </div>
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
