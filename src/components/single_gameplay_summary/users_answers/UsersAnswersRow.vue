<template>
    <div class="row">
        <div class="column">
            <UsersAnswersStats></UsersAnswersStats>
            <CrucialWordsStats></CrucialWordsStats>
        </div>
        <!--  -->
        <div class="column">
            <UsersAnswersChartWrapper></UsersAnswersChartWrapper>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//
import UsersAnswersChartWrapper from "@/components/single_gameplay_summary/users_answers/chart/ChartWrapper.vue";
import CrucialWordsStats from "@/components/single_gameplay_summary/users_answers/statistics/CrucialWordsStats.vue";
import UsersAnswersStats from "@/components/single_gameplay_summary/users_answers/statistics/UsersAnswersStats.vue";
//
export default defineComponent({
    components: { UsersAnswersChartWrapper, UsersAnswersStats, CrucialWordsStats },
});
</script>
