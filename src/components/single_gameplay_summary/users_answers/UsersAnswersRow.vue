<template>
    <div class="row">
        <section class="column">
            <UsersAnswersStats></UsersAnswersStats>
            <CrucialWordsStats></CrucialWordsStats>
        </section>
        <!--  -->
        <section class="column field big-padding" id="chart-emphasize" :class="emphasizeOnCSSClassWrapper">
            <UsersAnswersChartWrapper></UsersAnswersChartWrapper>
            <EmhasizeWords></EmhasizeWords>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSummary from "@/composable/single_gameplay_summary/useSummary";
//
import UsersAnswersChartWrapper from "@/components/single_gameplay_summary/users_answers/chart/ChartWrapper.vue";
import CrucialWordsStats from "@/components/single_gameplay_summary/users_answers/statistics/CrucialWordsStats.vue";
import UsersAnswersStats from "@/components/single_gameplay_summary/users_answers/statistics/UsersAnswersStats.vue";
import EmhasizeWords from "@/components/single_gameplay_summary/users_answers/emphasized_words/EmphasizedWords.vue";
//
export default defineComponent({
    components: { UsersAnswersChartWrapper, UsersAnswersStats, CrucialWordsStats, EmhasizeWords },
    setup() {
        const { emphasizeOnCSSClassWrapper } = useSummary;

        return { emphasizeOnCSSClassWrapper };
    },
});
</script>
