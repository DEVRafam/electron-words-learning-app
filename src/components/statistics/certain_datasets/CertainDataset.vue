<template>
    <section id="statistics-certain-dataset" class="bigger">
        <section id="stats-main-content">
            <!--  -->
            <section id="left-side">
                <Swapper :currentIndex="swapperIndex">
                    <Landing></Landing>
                    <SelectDataset></SelectDataset>
                    <Comparisons></Comparisons>
                </Swapper>
            </section>
            <!--  -->
            <section id="right-side" :class="{ comparsion: openComparsionPanel }">
                <div class="level">
                    <AccurationChart>
                        <PinnedButtons></PinnedButtons>
                    </AccurationChart>
                </div>
                <div class="level">
                    <DailyActivity></DailyActivity>
                    <Answers></Answers>
                </div>
            </section>
            <!--  -->
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import router from "@/router/index";
import useCertain from "@/composable/statistics/certain/useCertain";
import { openComparsionPanel, _reset, datasetToCompare } from "@/composable/statistics/certain/submodules/useComparisons";
// Left side
import Landing from "@/components/statistics/certain_datasets/left_side/landing/Landing.vue";
import SelectDataset from "@/components/statistics/certain_datasets/left_side/select_dataset/SelectDataset.vue";
import Comparisons from "@/components/statistics/certain_datasets/left_side/comparison/Comparison.vue";
// Right side
import AccurationChart from "@/components/statistics/certain_datasets/right_side/averages_chart/AveragesChartWrap.vue";
import DailyActivity from "@/components/statistics/certain_datasets/right_side/daily_activity/DailyActivityChartWrap.vue";
import Answers from "@/components/statistics/certain_datasets/right_side/answers/AnswersChartWrapper.vue";
import PinnedButtons from "./PinnedButtons.vue";

export default defineComponent({
    components: { Landing, AccurationChart, DailyActivity, Answers, SelectDataset, PinnedButtons, Comparisons },
    async setup() {
        const { loadData, dataset } = useCertain;
        const displayGamesHistory = ref<boolean>(false);
        watch(router.currentRoute, _reset, { deep: true });
        const swapperIndex = computed<number>(() => {
            if (openComparsionPanel.value === false) return 0;
            else return datasetToCompare.value ? 2 : 1;
        });
        await loadData();

        return { dataset, displayGamesHistory, openComparsionPanel, swapperIndex };
    },
});
</script>
