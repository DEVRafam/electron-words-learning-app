<template>
    <section id="gameplay" :class="latestInvalidWord ? 'hide' : ''">
        <Header></Header>
        <!--  -->
        <ExpectedWordPreview></ExpectedWordPreview>
        <UsersAnswerWrapper></UsersAnswerWrapper>
        <!--  -->
        <ButtonsWrapper></ButtonsWrapper>
    </section>
    <!--  -->
    <AnswersResultSummary></AnswersResultSummary>
    <EmphasizeInvalidAnswer v-if="latestInvalidWord"></EmphasizeInvalidAnswer>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";

import useGameplay from "@/composable/gameplay";
import useKeydown from "@/composable/useKeydown";

import ExpectedWordPreview from "@/components/gameplay/ExpectedWordPreview.vue";
import UsersAnswerWrapper from "@/components/gameplay/answer/UsersAnswerWrapper.vue";
import AnswersResultSummary from "@/components/gameplay/AnswersResultSummary.vue";
import Header from "@/components/gameplay/Header.vue";
import EmphasizeInvalidAnswer from "@/components/gameplay/EmphasizeInvalidAnswer.vue";
import ButtonsWrapper from "@/components/gameplay/ButtonsWrapper.vue";

export default defineComponent({
    components: { UsersAnswerWrapper, ExpectedWordPreview, AnswersResultSummary, Header, EmphasizeInvalidAnswer, ButtonsWrapper },
    setup() {
        const { proccessAnswer, endGamplay, startNewGamplay, latestInvalidWord } = useGameplay;

        startNewGamplay();
        onBeforeUnmount(endGamplay);
        useKeydown([
            {
                key: "Enter",
                fn: proccessAnswer,
            },
        ]);

        return { latestInvalidWord };
    },
});
</script>
