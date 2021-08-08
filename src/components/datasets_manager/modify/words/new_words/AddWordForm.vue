<template>
    <section id="add-new-word">
        <div id="form-wrap">
            <div class="form-group">
                <label for="new-word-expectation">Expectation: </label>
                <input type="text" id="new-word-expectation" placeholder="Type here..." v-model="newWord.expected" :tabindex="tabindex" :maxlength="maxlength" />
                <span class="length-notification" :class="{ invalid: newWord.expected.length < 3 }">{{ newWord.expected.length }}/{{ maxlength }}</span>
            </div>
            <div class="form-group">
                <label for="new-word-displayed">Display:</label>
                <input type="text" id="new-word-displayed" placeholder="Type here..." v-model="newWord.displayed" :tabindex="tabindex" :maxlength="maxlength" />
                <span class="length-notification" :class="{ invalid: newWord.displayed.length < 3 }">{{ newWord.displayed.length }}/{{ maxlength }}</span>
            </div>
        </div>
        <button id="add-new-word-button" @click="addNewWord" :disabled="blockAddButton" :tabindex="tabindex">Add</button>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { newWord, newWords, currentWordsSection } = useModifier.useWordsManager;
        const addNewWord = () => {
            const { expected, displayed } = newWord.value;
            if (expected.length < 3 || displayed.length < 3) return;
            newWords.value.unshift({
                displayed: displayed.toLowerCase(),
                expected: expected.toLowerCase(),
                origin: "Inscribed",
            });
            newWord.value = { expected: "", displayed: "" };
            document.getElementById("new-words-list")?.scroll(0, 0);
            document.getElementById("new-word-expectation")?.focus();
        };
        const blockAddButton = computed<boolean>(() => {
            const { expected, displayed } = newWord.value;
            return expected.length < 3 || displayed.length < 3;
        });
        const tabindex = computed<1 | -1>(() => {
            return currentWordsSection.value === "new" ? 1 : -1;
        });
        const maxlength = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD;
        //
        //
        return { newWord, addNewWord, blockAddButton, tabindex, maxlength };
    },
});
</script>
