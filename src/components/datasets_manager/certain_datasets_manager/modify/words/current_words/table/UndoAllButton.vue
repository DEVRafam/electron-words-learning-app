<template>
    <div class="btn-wrap">
        <button @click="reset" tabindex="-1">Undo all</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import { DatasetWordsProgress } from "@/types/compositions/datasets_manager/_useWordsManager";

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
