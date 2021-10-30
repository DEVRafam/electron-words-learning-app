<template>
    <thead>
        <th>ID</th>
        <th>Expected</th>
        <th>Displayed</th>
        <th>Progress</th>
        <template v-if="loadExtendedContent">
            <th>Type</th>
            <th>Points</th>
            <th class="actions">
                <div class="swap" :class="{ active: activeUndoAllButton }">
                    <span>Actions</span>
                    <UndoAllButton></UndoAllButton>
                </div>
            </th>
        </template>
    </thead>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import UndoAllButton from "./UndoAllButton.vue";

export default defineComponent({
    components: { UndoAllButton },
    setup() {
        const { loadExtendedContent } = useModifier;
        const { wordsToDelete, tableFilters, datasetWordsProgress } = useModifier.useWordsManager;
        const { progress } = tableFilters.current;
        const reset = () => {
            if (progress.value === "all") return (wordsToDelete.value = []);
            else if (progress.value === "common") {
                wordsToDelete.value = wordsToDelete.value.filter((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected];
                });
            } else {
                wordsToDelete.value = wordsToDelete.value.filter((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected] !== progress.value;
                });
            }
        };
        const activeUndoAllButton = computed<boolean>(() => {
            if (progress.value === "all") return wordsToDelete.value.length >= 3;
            let times = 0;
            if (progress.value === "common") {
                wordsToDelete.value.forEach((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!(datasetWordsProgress.value as any)[word.expected]) times += 1;
                });
            } else {
                wordsToDelete.value.forEach((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((datasetWordsProgress.value as any)[word.expected] === progress.value) times += 1;
                });
            }

            return times >= 3;
        });
        return { reset, activeUndoAllButton, loadExtendedContent };
    },
});
</script>
