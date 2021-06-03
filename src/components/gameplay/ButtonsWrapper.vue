<template>
    <div class="buttons-wrap">
        <button @click="proccessAnswer" id="check" :disabled="latestInvalidWord"><span>Check</span></button>
        <router-link to="/" tabindex="-1" :disabled="latestInvalidWord"><span>Exit</span></router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGameplay from "@/composable/gameplay";

//
export default defineComponent({
    setup() {
        const { proccessAnswer, latestInvalidWord } = useGameplay;
        return { proccessAnswer, latestInvalidWord };
    },
});
</script>
