<template>
    <section id="inputs" :key="amountOfRemainingWords">
        <template v-if="draw.word.type !== 'irregular'">
            <!-- PHRASE CASE-->
            <template v-if="draw.isPhrase">
                <section class="inputs-wrap">
                    <AnswerInput v-for="(part, index) in draw.characters" :key="index" :lengthLimit="part" v-model="usersAnswer[index]" :focus="index === 0"></AnswerInput>
                </section>
            </template>
            <!-- SINGLE WORD CASE-->
            <template v-else>
                <AnswerInput :lengthLimit="draw.characters[0]" v-model="usersAnswer[0]" :focus="true"></AnswerInput>
            </template>
        </template>
        <!--  -->
        <template v-else>
            <section class="inputs-wrap">
                <AnswerInput v-for="(part, index) in JSON.parse(draw.word.expected)" :key="index" :lengthLimit="part.length" v-model="usersAnswer[index]" :focus="index === 0" :placeholder="irregularsPlaceholder[index]"></AnswerInput>
            </section>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnswerInput from "@/components/gameplay/main_window/answer/AnswerInput.vue";
//
import useGameplay from "@/composable/gameplay/useMain";
import useLogger from "@/composable/gameplay/useLogger";

export default defineComponent({
    components: { AnswerInput },
    setup() {
        const { usersAnswer, drawNewWord, draw } = useGameplay;
        const { amountOfRemainingWords } = useLogger;
        const irregularsPlaceholder = ["First form...", "Second form...", "Third form..."];

        return { usersAnswer, drawNewWord, draw, amountOfRemainingWords, irregularsPlaceholder };
    },
});
</script>
