<template>
    <select v-model="progressFilter" v-if="selectTagConditon">
        <option value="all">All</option>
        <option value="strong" v-if="strongCondition">Strong</option>
        <option value="weak" v-if="weakCondition">Weak</option>
        <option value="mastered" v-if="masteredCondition">Mastered</option>
    </select>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { datasetWordsProgress } = useModifier;
        const { progressFilter } = useModifier.useWordsManager;

        const filterConditionHelper = (key: "weak" | "strong" | "mastered"): boolean => {
            if (datasetWordsProgress.value === null) return false;
            return !!Object.values(datasetWordsProgress.value).find((target) => target === key);
        };

        const strongCondition = computed<boolean>(() => filterConditionHelper("strong"));
        const weakCondition = computed<boolean>(() => filterConditionHelper("weak"));
        const masteredCondition = computed<boolean>(() => filterConditionHelper("mastered"));

        const selectTagConditon = computed<boolean>(() => {
            return strongCondition.value || weakCondition.value || masteredCondition.value;
        });

        return { progressFilter, strongCondition, weakCondition, masteredCondition, selectTagConditon };
    },
});
</script>
