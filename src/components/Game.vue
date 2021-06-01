<template>
    <section id="gameplay">
        <h1 v-html="latestAnswerMessage"></h1>
        <template v-if="isWordDrawed">
            <ExpectedWordPreview></ExpectedWordPreview>
            <UsersAnswerWrapper></UsersAnswerWrapper>
            <button @click="proccessAnswer">Check</button>
        </template>
        <!--  -->
        <br />
        <button @click="endGamplay">Exit</button>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useGameplay from "@/composable/gameplay";
import useKeydown from "@/composable/useKeydown";
import ExpectedWordPreview from "@/components/gameplay/ExpectedWordPreview.vue";
import UsersAnswerWrapper from "@/components/gameplay/answer/UsersAnswerWrapper.vue";

export default defineComponent({
    components: { UsersAnswerWrapper, ExpectedWordPreview },
    setup() {
        const { isWordDrawed, proccessAnswer, latestAnswerMessage, endGamplay } = useGameplay;

        useKeydown([
            {
                key: "Enter",
                fn: proccessAnswer,
            },
        ]);

        return { isWordDrawed, proccessAnswer, latestAnswerMessage, endGamplay };
    },
});
</script>

<style scoped lang="sass">
section#inputs
    display: flex
    justify-content: center
    div.input-wrap
        display: flex
        flex-direction: column
        align-items: center
        font-weight: bold
</style>
