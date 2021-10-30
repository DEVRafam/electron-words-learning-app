<template>
    <div class="table-wrap" :class="{ empty: words.length === 0 }">
        <table>
            <template v-if="words.length">
                <tr v-for="(word, index) in words" :key="word.expected + index" :class="{ preresotred: isWordInRestoringList(word) }">
                    <td class="center">{{ index + 1 }}</td>
                    <!--  -->
                    <Expected :word="word"></Expected>
                    <Displayed :word="word"></Displayed>
                    <!--  -->
                    <SingleRowProgressStatus :word="word"></SingleRowProgressStatus>
                    <ArchivedAt :word="word"></ArchivedAt>
                    <ActionButton :word="word" :isWordInRestoringList="isWordInRestoringList(word)"></ActionButton>
                </tr>
            </template>
            <NoResultsCommunique v-else target="archived"></NoResultsCommunique>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ArchivedWord } from "@/types/Word";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import SingleRowProgressStatus from "@/components/datasets_manager/modify/words/__utils/table_cells/SingleRowProgressStatus.vue";
import NoResultsCommunique from "@/components/datasets_manager/modify/words/__utils/NoResultsCommunique.vue";
import ActionButton from "./row_cells/ActionButton.vue";
import ArchivedAt from "./row_cells/ArchivedAt.vue";
import Expected from "./row_cells/Expected.vue";
import Displayed from "./row_cells/Displayed.vue";

export default defineComponent({
    components: { NoResultsCommunique, SingleRowProgressStatus, ActionButton, ArchivedAt, Displayed, Expected },
    async setup() {
        const { wordsToRestore, tableFilters, loadDatasetArchivedWords } = useWordsManager;
        const { words } = tableFilters.archived;
        // WORDS TO RESTORE MANAGEMENT
        const isWordInRestoringList = (word: ArchivedWord): boolean => wordsToRestore.value.includes(word);

        await loadDatasetArchivedWords();
        return { wordsToRestore, words, isWordInRestoringList };
    },
});
</script>
