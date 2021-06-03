<template>
    <section id="answers-result-summary" :class="answersResult"></section>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import useGameplay from "@/composable/gameplay/main";
//
export default defineComponent({
    setup() {
        const { answersResult } = useGameplay;
        watch(answersResult, (val) => {
            if (val) {
                setTimeout(() => {
                    answersResult.value = null;
                }, 500);
            }
        });
        //
        return { answersResult };
    },
});
</script>
