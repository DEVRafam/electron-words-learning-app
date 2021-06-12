<template>
    <div>
        <!-- Main window -->
        <section id="gameplay" :class="latestInvalidWord ? 'hide' : ''">
            <MainGameplayHeader></MainGameplayHeader>
            <ExpectedWordPreview></ExpectedWordPreview>
            <UsersAnswerWrapper></UsersAnswerWrapper>
            <ButtonsWrapper></ButtonsWrapper>
        </section>
        <!--  -->
        <AnswersResultSummary></AnswersResultSummary>
        <EmphasizeInvalidAnswer v-if="latestInvalidWord"></EmphasizeInvalidAnswer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useGameplay from "@/composable/gameplay/main";
import useKeydown from "@/composable/useKeydown";
// Main Window
import ExpectedWordPreview from "@/components/gameplay/main_window/ExpectedWordPreview.vue";
import UsersAnswerWrapper from "@/components/gameplay/main_window/answer/UsersAnswerWrapper.vue";
import MainGameplayHeader from "@/components/gameplay/main_window/MainGameplayHeader.vue";
import ButtonsWrapper from "@/components/gameplay/main_window/ButtonsWrapper.vue";
// Other components
import EmphasizeInvalidAnswer from "@/components/gameplay/EmphasizeInvalidAnswer.vue";
import AnswersResultSummary from "@/components/gameplay/AnswersResultBackground.vue";

export default defineComponent({
    components: { UsersAnswerWrapper, ExpectedWordPreview, AnswersResultSummary, MainGameplayHeader, EmphasizeInvalidAnswer, ButtonsWrapper },
    async setup() {
        const { proccessAnswer, startNewGamplay, latestInvalidWord } = useGameplay;
        useKeydown([
            {
                key: "Enter",
                fn: proccessAnswer,
            },
        ]);
        await startNewGamplay();

        return { latestInvalidWord };
    },
});
</script>
