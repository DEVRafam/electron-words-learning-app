<template>
    <section id="expected-word-preview">
        <h2>
            In polish it's: <strong>{{ draw.word.polish }}</strong>
        </h2>
        {{ helper }}
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useGameplay from "@/composable/gameplay";
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
        return { draw, helper };
    },
});
</script>
