<template>
    <section id="emphasize-invalid-answer">
        <section class="content">
            <span class="exclamation">STOP!</span>
            <h1>You have to write this word <span>correctly</span></h1>
            <h3>{{ latestInvalidWord.displayed }}</h3>
            <h3>is</h3>
            <h3 class="correct">{{ latestInvalidWord.expected }}</h3>
            <input type="text" v-model="correction" ref="inp" placeholder="Write your answer here..." />
            <button @click="check"><span>Confirm</span></button>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import useGameplay from "@/composable/gameplay/useMain";
import useKeydown from "@/composable/useKeydown";

export default defineComponent({
    mounted() {
        (this.$refs.inp as HTMLInputElement).focus();
    },
    setup() {
        const { latestInvalidWord, drawNewWord, answersResult } = useGameplay;
        const correction = ref<string>("");
        const check = () => {
            if (correction.value.toLowerCase() == latestInvalidWord.value?.expected) {
                drawNewWord();
                latestInvalidWord.value = null;
                answersResult.value = "VALID";
            } else {
                answersResult.value = "INVALID";
                correction.value = "";
            }
        };
        //
        useKeydown([
            {
                key: "Enter",
                fn: check,
            },
        ]);
        //
        return { latestInvalidWord, correction, check };
    },
});
</script>
