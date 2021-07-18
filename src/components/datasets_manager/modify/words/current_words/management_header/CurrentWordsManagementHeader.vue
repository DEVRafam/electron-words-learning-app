<template>
    <header id="current-words-management">
        <h3>
            <span>Delete current words </span>
            <strong v-if="datasetCurrentWords !== null">({{ wordsToDelete.length }} of {{ datasetCurrentWords.length }})</strong>
            <span v-else>Loading words...</span>
        </h3>
        <div class="right-side">
            <SelectProgressFilter></SelectProgressFilter>
            <button :disabled="wordsToDelete.length === 0" @click="onlySelected = !onlySelected">
                {{ onlySelected ? "Show all" : "Show selected" }}
            </button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import SelectProgressFilter from "./SelectProgressFilter.vue";

export default defineComponent({
    components: { SelectProgressFilter },
    setup() {
        const { datasetCurrentWords } = useModifier;
        const { wordsToDelete, tableFilters } = useModifier.useWordsManager;
        const { onlySelected } = tableFilters.current;

        return { datasetCurrentWords, wordsToDelete, onlySelected };
    },
});
</script>
