<template>
    <div>
        <h1 id="dataset-title">
            <span class="big"><span class="color">Gameplay</span> is starting</span>
            <span>{{ gameplayDataFile.title }}</span>
        </h1>
        <!-- Main window -->
        <section id="gameplay" :class="latestInvalidWord ? 'hide' : ''">
            <GameplayHeader></GameplayHeader>
            <ExpectedWordPreview></ExpectedWordPreview>
            <UsersAnswerWrapper></UsersAnswerWrapper>
            <ButtonsWrapper></ButtonsWrapper>
        </section>
        <!--  -->
        <EmphasizeInvalidAnswer v-if="latestInvalidWord"></EmphasizeInvalidAnswer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useGameplay from "@/composable/gameplay/useMain";
import useKeydown from "@/composable/useKeydown";
// Main Window
import ExpectedWordPreview from "@/components/gameplay/main_window/ExpectedWordPreview.vue";
import UsersAnswerWrapper from "@/components/gameplay/main_window/answer/UsersAnswerWrapper.vue";
import GameplayHeader from "@/components/gameplay/main_window/GameplayHeader.vue";
import ButtonsWrapper from "@/components/gameplay/main_window/ButtonsWrapper.vue";
// Other components
import EmphasizeInvalidAnswer from "@/components/gameplay/main_window/EmphasizeInvalidAnswer.vue";

export default defineComponent({
    components: { UsersAnswerWrapper, ExpectedWordPreview, GameplayHeader, EmphasizeInvalidAnswer, ButtonsWrapper },
    async setup() {
        const { proccessAnswer, startNewGamplay, latestInvalidWord, gameplayDataFile } = useGameplay;
        useKeydown([
            {
                key: "Enter",
                fn: proccessAnswer,
            },
        ]);
        await startNewGamplay();

        return { latestInvalidWord, gameplayDataFile };
    },
});
</script>
