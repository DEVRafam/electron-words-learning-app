<template>
    <button @click="onlySelected = !onlySelected" :disabled="disableButton">Show selected</button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { useWordsManager, datasetWordsProgress } = useModifier;
        const { wordsToDelete, tableFilters } = useWordsManager;
        const { onlySelected, progress } = tableFilters.current;
        //
        const disableButton = computed<boolean>(() => {
            if (progress.value === "all") return !wordsToDelete.value.length;
            else if (progress.value === "common") {
                return !wordsToDelete.value.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return !(datasetWordsProgress.value as any)[word.expected];
                });
            } else
                return !wordsToDelete.value.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected] === progress.value;
                });
        });
        return { onlySelected, disableButton };
    },
});
</script>
