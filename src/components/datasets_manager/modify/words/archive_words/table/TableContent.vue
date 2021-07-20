<template>
    <table>
        <template v-if="words.length">
            <tr v-for="(word, index) in words" :key="index" :class="{ preresotred: isWordInRestoringList(word) }">
                <td class="center">{{ index + 1 }}</td>
                <td class="clickable" @click="toggleWord(word)">{{ word.expected }}</td>
                <td>{{ word.displayed }}</td>

                <SingleRowProgressStatus :word="word"></SingleRowProgressStatus>
                <ArchivedAt :word="word"></ArchivedAt>
                <ActionButton :word="word" :isWordInRestoringList="isWordInRestoringList(word)"></ActionButton>
            </tr>
        </template>
        <NoResultsCommunique v-else target="archived"></NoResultsCommunique>
    </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import { ArchivedWord } from "@/types/Word";

import SingleRowProgressStatus from "@/components/datasets_manager/modify/words/__utils/SingleRowProgressStatus.vue";
import ActionButton from "./row_cells/ActionButton.vue";
import ArchivedAt from "./row_cells/ArchivedAt.vue";
import NoResultsCommunique from "@/components/datasets_manager/modify/words/__utils/NoResultsCommunique.vue";

export default defineComponent({
    components: { NoResultsCommunique, SingleRowProgressStatus, ActionButton, ArchivedAt },
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
