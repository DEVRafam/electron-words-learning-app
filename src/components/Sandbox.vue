<template>
    <section id="test">
        <button @click="draw">LOSUJ SLOWO</button>
        <h1>{{ randomWord }}</h1>
        <!--  -->
        <section id="inputs">
            <template v-if="randomWord.isPhrase">
                <div class="input-wrap" v-for="(part, index) in randomWord.characters" :key="index">
                    <input type="text" :maxlength="part" v-model="answer[index]" />
                    <span>{{ `${answer[index] ? answer[index].length : 0}/${part}` }}</span>
                </div>
            </template>
        </section>
        <!--  -->
        <h1>{{ answer || "Brak odpowiedzi" }}</h1>
        <button>Sprawdz</button>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getRandomWord, RandomWordResponse } from "@/composable/load_data";
//
export default defineComponent({
    setup() {
        const answer = ref<string[]>([""]);
        const randomWord = ref<RandomWordResponse>({} as RandomWordResponse);
        const draw = () => {
            answer.value = [""];
            randomWord.value = getRandomWord();
        };
        return { draw, randomWord, answer };
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
