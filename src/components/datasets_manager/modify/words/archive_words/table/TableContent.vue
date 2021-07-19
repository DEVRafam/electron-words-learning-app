<template>
    <table>
        <tr v-for="(word, index) in words" :key="index" :class="{ preresotred: isWordInRestoringList(word) }">
            <td class="center">{{ index + 1 }}</td>
            <td class="clickable" @click="toggleWord(word)">{{ word.expected }}</td>
            <td>{{ word.displayed }}</td>

            <SingleRowProgressStatus :word="word"></SingleRowProgressStatus>
            <ArchivedAt :word="word"></ArchivedAt>
            <ActionButton :word="word" :isWordInRestoringList="isWordInRestoringList(word)"></ActionButton>
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import { ArchivedWord } from "@/types/Word";

import SingleRowProgressStatus from "@/components/datasets_manager/modify/words/SingleRowProgressStatus.vue";
import ActionButton from "./row_cells/ActionButton.vue";
import ArchivedAt from "./row_cells/ArchivedAt.vue";

export default defineComponent({
    components: { SingleRowProgressStatus, ActionButton, ArchivedAt },
    async setup() {
        const { loadDatasetArchivedWords } = useModifier;
        const { wordsToRestore, tableFilters } = useModifier.useWordsManager;
        const { words } = tableFilters.archived;
        // WORDS TO RESTORE MANAGEMENT
        const isWordInRestoringList = (word: ArchivedWord): boolean => wordsToRestore.value.includes(word);

        await loadDatasetArchivedWords();
        return { wordsToRestore, words, isWordInRestoringList };
    },
});
</script>
