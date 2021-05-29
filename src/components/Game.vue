<template>
    <section id="test">
        <button @click="drawNewWord">Draw a word</button>
        <!--  -->
        <template v-if="isWordDrawed">
            <ExpectedWordPreview></ExpectedWordPreview>
            <UsersAnswerWrapper></UsersAnswerWrapper>
            <button>Check</button>
        </template>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGameplay from "@/composable/gameplay";

import ExpectedWordPreview from "@/components/gameplay/ExpectedWordPreview.vue";
import UsersAnswerWrapper from "@/components/gameplay/answer/UsersAnswerWrapper.vue";
//
export default defineComponent({
    components: { UsersAnswerWrapper, ExpectedWordPreview },
    setup() {
        const { drawNewWord, isWordDrawed } = useGameplay;
        return { drawNewWord, isWordDrawed };
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
