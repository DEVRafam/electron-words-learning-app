<template>
    <button @click="onlySelected = !onlySelected" :disabled="disableButton">Show selected</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { useWordsManager, datasetWordsProgress } = useModifier;
        const { wordsToRestore, tableFilters } = useWordsManager;
        const { onlySelected, progress } = tableFilters.archived;
        //
        const disableButton = computed<boolean>(() => {
            if (progress.value === "all") return !wordsToRestore.value.length;
            else if (progress.value === "common") {
                return !wordsToRestore.value.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return !(datasetWordsProgress.value as any)[word.expected];
                });
            } else
                return !wordsToRestore.value.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected] === progress.value;
                });
        });
        return { onlySelected, disableButton };
    },
});
</script>
