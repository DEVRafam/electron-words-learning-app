<template>
    <section id="expected-word-preview">
        <h1 class="expected-word" :style="fontSize">
            {{ draw.word.polish }}
        </h1>
        <span id="helper">
            {{ helper }}
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useGameplay from "@/composable/gameplay/main";
//
export default defineComponent({
    setup() {
        const { draw } = useGameplay;
        const helper = computed<string>(() => {
            const { english } = draw.value.word;
            const SPECIAL_CHARACTERS = ["'", ".", ",", " "];

            return english
                .split("")
                .map((char: string, index: number): string => {
                    // first character of word
                    if (index === 0 || english[index - 1] === " ") return char;
                    // special characters
                    if (SPECIAL_CHARACTERS.includes(char)) return char;
                    //
                    return process.env.VUE_APP_EXPECTED_WORD_HELPER_SEPARATOR as string;
                })
                .join("");
        });
        const fontSize = computed<string>(() => {
            const { length } = draw.value.word.polish;
            if (length < 20) return "font-size: 5rem";
            else return "font-size:4rem";
        });
        return { draw, helper, fontSize };
    },
});
</script>
