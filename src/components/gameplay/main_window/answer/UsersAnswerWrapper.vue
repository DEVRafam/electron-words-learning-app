<template>
    <section id="inputs" :key="numberOfDraw">
        <!--  -->
        <!-- PHRASE CASE-->
        <!--  -->
        <template v-if="draw.isPhrase">
            <section class="inputs-wrap">
                <AnswerInput v-for="(part, index) in draw.characters" :key="index" :lengthLimit="part" v-model="usersAnswer[index]" :focus="index === 0"></AnswerInput>
            </section>
        </template>
        <!--  -->
        <!-- SINGLE WORD CASE-->
        <!--  -->
        <template v-else>
            <AnswerInput :lengthLimit="draw.characters[0]" v-model="usersAnswer[0]" :focus="true"></AnswerInput>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnswerInput from "@/components/gameplay/main_window/answer/AnswerInput.vue";
//
import useGameplay from "@/composable/gameplay";
import useLogger from "@/composable/logger";

export default defineComponent({
    components: { AnswerInput },
    setup() {
        const { usersAnswer, drawNewWord, draw } = useGameplay;
        const { numberOfDraw } = useLogger;
        return { usersAnswer, drawNewWord, draw, numberOfDraw };
    },
});
</script>
