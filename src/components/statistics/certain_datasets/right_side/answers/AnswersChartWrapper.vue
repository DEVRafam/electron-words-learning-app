<template>
    <section id="answers" class="field">
        <header>
            <h3 class="field-header">Answers</h3>

            <div class="buttons-wrap" id="answers-chart-refresh">
                <!-- TELEPORT PLACEHOLDER -->
            </div>
        </header>

        <ChartWrapper controlButtonSelector="div#answers-chart-refresh">
            <Chart :data="chartData"></Chart>
        </ChartWrapper>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

import Chart from "./AnswersChart.vue";

export default defineComponent({
    components: { Chart },
    setup() {
        const { gamesHistory } = useCertain;
        const __answersAmountHelper = (prop: "invalid" | "valid" | "rescued"): ComputedRef<number> =>
            computed<number>(() => {
                let result = 0;
                gamesHistory.value.forEach((target) => (result += target.answers[prop].length));
                return result;
            });
        const validAnswersAmount = __answersAmountHelper("valid");
        const invalidAnswersAmount = __answersAmountHelper("invalid");
        const rescuedAnswersAmount = __answersAmountHelper("rescued");
        //
        const chartData = [validAnswersAmount.value, rescuedAnswersAmount.value, invalidAnswersAmount.value];
        return { chartData };
    },
});
</script>
