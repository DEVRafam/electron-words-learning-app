<template>
    <button @click="onlySelected = !onlySelected" :disabled="disableButton">Show selected</button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    props: {
        target: {
            type: String as PropType<"current" | "archived">,
            required: true,
        },
    },
    setup(props) {
        const { wordsToDelete, wordsToRestore, tableFilters, datasetWordsProgress } = useWordsManager;
        const { onlySelected, progress } = tableFilters[props.target];
        const wordsList = props.target === "archived" ? wordsToRestore.value : wordsToDelete.value;
        //
        const disableButton = computed<boolean>(() => {
            if (progress.value === "all") {
                return wordsList.length === 0;
            } else if (progress.value === "common") {
                return !wordsList.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return !(datasetWordsProgress.value as any)[word.expected];
                });
            } else
                return !wordsList.find((word) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return (datasetWordsProgress.value as any)[word.expected] === progress.value;
                });
        });
        //
        watch(
            wordsList,
            (val) => {
                if (val.length === 0) onlySelected.value = false;
            },
            { deep: true }
        );
        //
        return { onlySelected, disableButton, wordsList };
    },
});
</script>
