<template>
    <template v-if="words.length">
        <tr v-for="(item, index) in words" :key="index" :class="{ predeleted: isWordInDeletingList(item) }">
            <td class="center">{{ index + 1 }}</td>
            <td class="clickable" @click="prepareWordForDeleting(item)">{{ item.expected }}</td>
            <td>{{ item.displayed }}</td>
            <!--  -->
            <SingleRowProgressStatus :word="item"></SingleRowProgressStatus>
            <!--  -->
            <td class="center">
                <button @click="prepareWordForDeleting(item)">{{ buttonMsg(item) }}</button>
            </td>
        </tr>
    </template>

    <NoResultsCommunique v-else target="current"></NoResultsCommunique>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import Word from "@/types/Word";

import SingleRowProgressStatus from "@/components/datasets_manager/modify/words/__utils/SingleRowProgressStatus.vue";
import NoResultsCommunique from "@/components/datasets_manager/modify/words/__utils/NoResultsCommunique.vue";

export default defineComponent({
    components: { SingleRowProgressStatus, NoResultsCommunique },
    setup() {
        const { datasetWordsProgress } = useModifier;
        const { wordsToDelete, tableFilters } = useModifier.useWordsManager;
        const { words } = tableFilters.current;
        //
        const isWordInDeletingList = (word: Word): boolean => wordsToDelete.value.includes(word);
        const prepareWordForDeleting = (word: Word) => {
            if (wordsToDelete.value.includes(word)) wordsToDelete.value.remove(word);
            else wordsToDelete.value.push(word);
        };
        //
        const buttonMsg = (word: Word): "Delete" | "Undo" => {
            return isWordInDeletingList(word) ? "Undo" : "Delete";
        };
        //
        return { datasetWordsProgress, isWordInDeletingList, prepareWordForDeleting, buttonMsg, wordsToDelete, words };
    },
});
</script>
