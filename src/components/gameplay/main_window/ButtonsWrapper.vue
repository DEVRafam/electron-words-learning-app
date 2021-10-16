<template>
    <div class="buttons-wrap">
        <button @click="proccessAnswer" id="check" :disabled="latestInvalidWord"><span>Check</span></button>
        <button @click="endGamplay" tabindex="-1" :disabled="latestInvalidWord"><span>Exit</span></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGameplay from "@/composable/gameplay/useMain";

//
export default defineComponent({
    setup() {
        const { proccessAnswer, latestInvalidWord, endGamplay } = useGameplay;
        return { proccessAnswer, latestInvalidWord, endGamplay };
    },
});
</script>
