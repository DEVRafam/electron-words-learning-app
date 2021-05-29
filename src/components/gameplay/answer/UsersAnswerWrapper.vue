<template>
    <section id="inputs">
        <!--  -->
        <!-- PHRASE CASE-->
        <!--  -->
        <template v-if="draw.isPhrase">
            <AnswerInput v-for="(part, index) in draw.characters" :key="index" :lengthLimit="part" v-model="usersAnswer[index]" :index="index"></AnswerInput>
        </template>
        <!--  -->
        <!-- SINGLE WORD CASE-->
        <!--  -->
        <template v-else>
            <AnswerInput :lengthLimit="draw.characters[0]" v-model="usersAnswer[0]"></AnswerInput>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnswerInput from "@/components/gameplay/answer/AnswerInput.vue";
//
import useGameplay from "@/composable/gameplay";
export default defineComponent({
    components: { AnswerInput },
    setup() {
        const { usersAnswer, drawNewWord, draw } = useGameplay;
        return { usersAnswer, drawNewWord, draw };
    },
});
</script>
