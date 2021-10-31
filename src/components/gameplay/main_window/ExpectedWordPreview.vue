<template>
    <section id="expected-word-preview" :class="[draw.word.type]">
        <template v-if="draw.word.type !== 'image'">
            <h1 class="expected-word" :style="fontSize">{{ draw.word.displayed }}</h1>
            <span id="helper">
                {{ helper }}
            </span>
        </template>
        <!--  -->
        <template v-else>
            <div class="image-preview" :style="imageBackgroundImage"></div>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useGameplay from "@/composable/gameplay/useMain";
import { wordsImagePathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
//
export default defineComponent({
    setup() {
        const { draw, gameplayDataFile } = useGameplay;
        const helper = computed<string>(() => {
            const SPECIAL_CHARACTERS = ["'", ".", ",", " "];
            let v = draw.value.word.expected;
            if (draw.value.word.type === "irregular") v = JSON.parse(v).join(" ");
            return v
                .split("")
                .map((char: string, index: number): string => {
                    // first character of word
                    if (index === 0 || v[index - 1] === " ") return char;
                    // special characters
                    if (SPECIAL_CHARACTERS.includes(char)) return char;
                    //
                    return process.env.VUE_APP_EXPECTED_WORD_HELPER_SEPARATOR as string;
                })
                .join("");
        });
        const fontSize = computed<string>(() => {
            const { length } = draw.value.word.displayed;
            if (length < 20) return "font-size: 5rem";
            else return "font-size:4rem";
        });
        const imageBackgroundImage = computed<string>(() => {
            const datasetsName = gameplayDataFile.value.fileName;
            return `background-image: url(${wordsImagePathResolver(datasetsName, draw.value.word)})`;
        });
        return { draw, helper, fontSize, imageBackgroundImage };
    },
});
</script>
