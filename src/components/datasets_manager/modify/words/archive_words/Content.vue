<template>
    <header>
        <h3>
            <span>Restore deleted words </span>
            <strong>{{ wordsToRestore.length }}/{{ datasetArchivedWords.length }}</strong>
        </h3>
        <button @click="onlySelected = !onlySelected">Show selected</button>
    </header>
    <div class="table-wrap">
        <table class="archived">
            <thead>
                <th>ID</th>
                <th>Expected</th>
                <th>Displayed</th>
                <th>Deleted at</th>
                <th>Action</th>
            </thead>
            <!-- DISPLAY ONLY WORDS PREPARED FOR RESTORE -->
            <template v-if="onlySelected">
                <tr v-for="(word, index) in wordsToRestore" :key="index" class="preresotred">
                    <td class="center">{{ index + 1 }}</td>
                    <td class="clickable" @click="toggleWord(word)">{{ word.expected }}</td>
                    <td>{{ word.displayed }}</td>
                    <td class="center archivedAt" v-html="betterArchivedAt(word)"></td>
                    <td class="center">
                        <button @click="toggleWord(word)">{{ buttonMsg(word) }}</button>
                    </td>
                </tr>
            </template>
            <!-- DEFAULT BEHAVIOUR- DISPLAY ALL WORDS -->
            <template v-else>
                <tr v-for="(word, index) in datasetArchivedWords" :key="index" :class="{ preresotred: isWordInRestoringList(word) }">
                    <td class="center">{{ index + 1 }}</td>
                    <td class="clickable" @click="toggleWord(word)">{{ word.expected }}</td>
                    <td>{{ word.displayed }}</td>
                    <td class="center archivedAt" v-html="betterArchivedAt(word)"></td>
                    <td class="center">
                        <button @click="toggleWord(word)">{{ buttonMsg(word) }}</button>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import { ArchivedWord } from "@/types/Word";

export default defineComponent({
    async setup() {
        const { loadDatasetArchivedWords, datasetArchivedWords } = useModifier;
        const { wordsToRestore } = useModifier.useWordsManager;
        // WORDS TO RESTORE MANAGEMENT
        const isWordInRestoringList = (word: ArchivedWord): boolean => wordsToRestore.value.includes(word);
        const toggleWord = (word: ArchivedWord) => {
            if (wordsToRestore.value.includes(word)) wordsToRestore.value.remove(word);
            else wordsToRestore.value.push(word);
        };
        //
        const buttonMsg = (word: ArchivedWord): "Restore" | " Undo " => {
            return isWordInRestoringList(word) ? " Undo " : "Restore";
        };
        const betterArchivedAt = (word: ArchivedWord) => {
            const [date, time] = word.archivedAt.split(",");
            return `<span>${date}</span><br /><strong>${time}</strong>`;
        };
        //
        const onlySelected = ref<boolean>(false);
        watch(
            datasetArchivedWords,
            (val) => {
                if (val instanceof Array && val.length === 0) onlySelected.value = false;
            },
            { deep: true }
        );
        //
        await loadDatasetArchivedWords();
        return { wordsToRestore, datasetArchivedWords, betterArchivedAt, isWordInRestoringList, toggleWord, buttonMsg, onlySelected };
    },
});
</script>
