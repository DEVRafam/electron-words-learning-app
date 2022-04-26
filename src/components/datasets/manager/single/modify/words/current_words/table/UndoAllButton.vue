<template>
    <div class="btn-wrap">
        <button @click="reset" tabindex="-1">Undo all</button>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Types
import type { DatasetWordsProgress } from "@/types/compositions/datasets_manager/_useWordsManager";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { wordsToDelete, tableFilters, datasetWordsProgress } = useWordsManager;
        const { progress } = tableFilters.current;

        const reset = () => {
            if (progress.value === "all") return wordsToDelete.value.clean();
            else if (progress.value === "common") {
                wordsToDelete.value = wordsToDelete.value.filter((word) => {
                    return (datasetWordsProgress.value as DatasetWordsProgress)[word.expected];
                });
            } else {
                wordsToDelete.value = wordsToDelete.value.filter((word) => {
                    return (datasetWordsProgress.value as DatasetWordsProgress)[word.expected] !== progress.value;
                });
            }
        };

        return { reset };
    },
});
</script>
