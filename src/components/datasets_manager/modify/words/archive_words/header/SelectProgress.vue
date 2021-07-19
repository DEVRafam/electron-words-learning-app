<template>
    <select v-model="progress" v-if="selectTagConditon">
        <option value="all">All</option>
        <option value="common">Common</option>
        <option value="strong" v-if="strongCondition">Strong</option>
        <option value="weak" v-if="weakCondition">Weak</option>
        <option value="mastered" v-if="masteredCondition">Mastered</option>
    </select>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import { ArchivedWord } from "@/types/Word";

export default defineComponent({
    setup() {
        const { datasetWordsProgress, datasetArchivedWords } = useModifier;
        const { progress } = useModifier.useWordsManager.tableFilters.archived;

        const filterConditionHelper = (key: "weak" | "strong" | "mastered"): boolean => {
            if (datasetWordsProgress.value === null || datasetArchivedWords.value === null) return false;

            const wordsToCheckRange = JSON.parse(JSON.stringify(datasetWordsProgress.value));
            Object.keys(wordsToCheckRange).forEach((expected: string) => {
                if (!datasetArchivedWords.value?.find((target: ArchivedWord) => target.expected === expected)) {
                    delete wordsToCheckRange[expected];
                }
            });

            return !!Object.values(wordsToCheckRange).find((target) => target === key);
        };

        const strongCondition = computed<boolean>(() => filterConditionHelper("strong"));
        const weakCondition = computed<boolean>(() => filterConditionHelper("weak"));
        const masteredCondition = computed<boolean>(() => filterConditionHelper("mastered"));

        const selectTagConditon = computed<boolean>(() => {
            //
            // Prevent select tag displaying while every single word is at this same progress status
            let elementWithoutProgress = true;
            if (datasetArchivedWords.value instanceof Array && datasetWordsProgress.value !== null) {
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                if (datasetArchivedWords.value.find((target: ArchivedWord) => !(datasetWordsProgress.value as any)[target.expected])) {
                    elementWithoutProgress = false;
                }
            }
            if (elementWithoutProgress) {
                const onlyStrong = strongCondition.value && !weakCondition.value && !masteredCondition.value;
                const onlyWeak = !strongCondition.value && weakCondition.value && !masteredCondition.value;
                const onlyMastered = !strongCondition.value && !weakCondition.value && masteredCondition.value;
                if (onlyWeak || onlyMastered || onlyStrong) return false;
            }
            //
            //
            return strongCondition.value || weakCondition.value || masteredCondition.value;
        });
        return { progress, strongCondition, weakCondition, masteredCondition, selectTagConditon };
    },
});
</script>
