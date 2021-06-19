<template>
    <section id="add-new-word">
        <div id="form-wrap">
            <div class="form-group">
                <label for="expectation">Expectation: </label>
                <input type="text" id="expectation" placeholder="Type here..." v-model="newWord.expected" />
            </div>
            <div class="form-group">
                <label for="display">Display:</label>
                <input type="text" id="display" placeholder="Type here..." v-model="newWord.displayed" />
            </div>
        </div>
        <button @click="addNewWord" :disabled="blockAddButton">Add</button>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { newWord, newWords } = useModifier;
        const addNewWord = () => {
            const { expected, displayed } = newWord.value;
            if (expected.length < 3 || displayed.length < 3) return;
            newWords.value.push({
                displayed: displayed.toLowerCase(),
                expected: expected.toLowerCase(),
            });
            newWord.value = { expected: "", displayed: "" };
        };
        const blockAddButton = computed<boolean>(() => {
            const { expected, displayed } = newWord.value;
            return expected.length < 3 || displayed.length < 3;
        });

        //
        return { newWord, addNewWord, blockAddButton };
    },
});
</script>
