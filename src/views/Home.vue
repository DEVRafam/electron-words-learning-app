<template>
    <section id="home">
        <BgCricles></BgCricles>
        <Game v-if="isGameplay"></Game>
        <MainMenu v-else></MainMenu>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useGameplay from "@/composable/gameplay";

import Game from "@/components/Game.vue";
import MainMenu from "@/components/menu/MainMenu.vue";
import BgCricles from "@/components/BackgroundCircles.vue";

export default defineComponent({
    name: "Home",
    components: {
        Game,
        MainMenu,
        BgCricles,
    },
    setup() {
        const { isGameplay } = useGameplay;
        return { isGameplay };
    },
});
</script>
