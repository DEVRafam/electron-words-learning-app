<template>
    <section id="statistics-certain-dataset" class="bigger">
        <section id="stats-main-content">
            <!--  -->
            <section id="left-side">
                <Summary></Summary>
                <Accomplishment></Accomplishment>
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
import { defineComponent } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

// Right side
import AccurationChart from "@/components/statistics/certain_datasets/right_side/averages_chart/AveragesChartWrap.vue";
import DailyActivity from "@/components/statistics/certain_datasets/right_side/daily_activity/DailyActivityChartWrap.vue";
import Answers from "@/components/statistics/certain_datasets/right_side/answers/AnswersChartWrapper.vue";
// Left side
import Accomplishment from "@/components/statistics/certain_datasets/left_side/accomplishment/AccomplishmentChartWrap.vue";
import Summary from "@/components/statistics/certain_datasets/left_side/Summary.vue";

export default defineComponent({
    components: { AccurationChart, DailyActivity, Accomplishment, Answers, Summary },
    async setup() {
        const { loadData, dataset } = useCertain;
        await loadData();

        return { dataset };
    },
});
</script>
