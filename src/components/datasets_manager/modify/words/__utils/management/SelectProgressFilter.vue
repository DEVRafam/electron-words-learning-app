<template>
    <template v-if="selectTagConditon">
        <select v-model="progress" v-bind="$attrs">
            <option value="all">All</option>
            <option value="common">Common</option>
            <option value="strong" v-if="strongCondition">Strong</option>
            <option value="weak" v-if="weakCondition">Weak</option>
            <option value="mastered" v-if="masteredCondition">Mastered</option>
        </select>
        <button class="clear" v-bind="$attrs" @click="progress = 'all'" :disabled="progress === 'all'">X</button>
    </template>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import { ArchivedWord } from "@/types/Word";
import CurrentWord from "@/classes/CurrentWord";

export default defineComponent({
    inheritAttrs: false,
    props: {
        target: {
            type: String as PropType<"current" | "archived">,
            required: true,
        },
    },
    setup(props) {
        const { datasetCurrentWords, tableFilters, datasetArchivedWords, datasetWordsProgress } = useWordsManager;
        const { progress } = tableFilters[props.target];
        type PossibleWordType = ArchivedWord | CurrentWord;
        const wordsList = (props.target === "archived" ? datasetArchivedWords.value : datasetCurrentWords.value) as PossibleWordType[];

        const filterConditionHelper = (key: "weak" | "strong" | "mastered"): boolean => {
            if (datasetWordsProgress.value === null) return false;

            const wordsToCheckRange = JSON.parse(JSON.stringify(datasetWordsProgress.value));
            Object.keys(wordsToCheckRange).forEach((expected: string) => {
                if (!wordsList?.find((target: ArchivedWord | CurrentWord) => target.expected === expected)) {
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
            if (wordsList instanceof Array && datasetWordsProgress.value !== null) {
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                if (wordsList.find((target: PossibleWordType) => !(datasetWordsProgress.value as any)[target.expected])) {
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
