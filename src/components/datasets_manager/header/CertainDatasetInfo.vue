<template>
    <section v-if="isDatasetSelected && datasetWords">
        <h2>{{ datasetToModify.title }}</h2>
        <div class="content">
            <ul>
                <li>
                    <span>Current words amount: </span>
                    <strong>{{ datasetWords.length }}</strong>
                </li>
                <li>
                    <span>New words amount: </span>
                    <strong>{{ newWords.length }}</strong>
                </li>
                <li>
                    <span>Deleted words amount: </span>
                    <strong>{{ wordsToDelete.length }}</strong>
                </li>
            </ul>
            <div class="buttons-wrap"></div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
export default defineComponent({
    setup() {
        const { datasetToModify, isDatasetSelected, datasetWords } = useModifier;
        const { wordsToDelete, newWords } = useModifier.useWordsManager;
        //
        return { datasetToModify, isDatasetSelected, datasetWords, wordsToDelete, newWords };
    },
});
</script>
