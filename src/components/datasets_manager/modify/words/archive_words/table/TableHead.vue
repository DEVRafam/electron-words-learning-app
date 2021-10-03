<template>
    <thead>
        <th>ID</th>
        <th>Expected</th>
        <th>Displayed</th>
        <th>Progress</th>
        <th>Deleted at</th>
        <th class="actions">
            <div class="swap" :class="{ active: activeUndoAllButton }">
                <span>Action</span>
                <div class="btn-wrap">
                    <button @click="reset" tabindex="-1">Undo all</button>
                </div>
            </div>
        </th>
    </thead>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { wordsToRestore, tableFilters, datasetWordsProgress } = useWordsManager;
        const { progress } = tableFilters.archived;
        const reset = () => {
            if (progress.value === "all") return (wordsToRestore.value = []);
            else if (progress.value === "common") {
                wordsToRestore.value = wordsToRestore.value.filter((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected];
                });
            } else {
                wordsToRestore.value = wordsToRestore.value.filter((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected] !== progress.value;
                });
            }
        };
        const activeUndoAllButton = computed<boolean>(() => {
            if (progress.value === "all") return wordsToRestore.value.length >= 3;
            let times = 0;
            if (progress.value === "common") {
                wordsToRestore.value.forEach((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!(datasetWordsProgress.value as any)[word.expected]) times += 1;
                });
            } else {
                wordsToRestore.value.forEach((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((datasetWordsProgress.value as any)[word.expected] === progress.value) times += 1;
                });
            }

            return times >= 3;
        });
        return { reset, activeUndoAllButton };
    },
});
</script>
