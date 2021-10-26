<template>
    <section id="statistics-certain-dataset" class="bigger">
        <section id="stats-main-content">
            <!--  -->
            <section id="left-side">
                <Summary></Summary>

                <section id="progress-and-games-history" class="field">
                    <ProgressAndGamesHistoryHeader v-model:displayGamesHistory="displayGamesHistory"></ProgressAndGamesHistoryHeader>
                    <!--  -->
                    <Swapper :currentIndex="displayGamesHistory ? 1 : 0" orientation="vertical">
                        <Progress></Progress>
                        <GamesHistory :currentIndex="displayGamesHistory"></GamesHistory>
                    </Swapper>
                </section>
            </section>
            <!--  -->
            <section id="right-side">
                <div class="level">
                    <AccurationChart></AccurationChart>
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
import { defineComponent, ref } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

// Right side
import AccurationChart from "@/components/statistics/certain_datasets/right_side/averages_chart/AveragesChartWrap.vue";
import DailyActivity from "@/components/statistics/certain_datasets/right_side/daily_activity/DailyActivityChartWrap.vue";
import Answers from "@/components/statistics/certain_datasets/right_side/answers/AnswersChartWrapper.vue";
// Left side
import Progress from "@/components/statistics/certain_datasets/left_side/progress/ProgressChartWrap.vue";
import Summary from "@/components/statistics/certain_datasets/left_side/Summary.vue";
import ProgressAndGamesHistoryHeader from "@/components/statistics/certain_datasets/left_side/ProgressAndGamesHistoryHeader.vue";
import GamesHistory from "@/components/statistics/certain_datasets/left_side/games_history/GamesHistory.vue";
export default defineComponent({
    components: { AccurationChart, DailyActivity, Progress, Answers, Summary, ProgressAndGamesHistoryHeader, GamesHistory },
    async setup() {
        const { loadData, dataset } = useCertain;
        const displayGamesHistory = ref<boolean>(false);
        await loadData();

        return { dataset, displayGamesHistory };
    },
});
</script>
