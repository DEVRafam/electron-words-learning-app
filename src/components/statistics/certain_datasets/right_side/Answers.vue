<template>
    <section id="answers" class="field">
        <h3 class="field-header">Answers</h3>
        <div class="content">
            <span class="score valid">
                <strong>{{ validAnswersAmount }}</strong>
                <span>Valid</span>
            </span>
            <!--  -->
            <span class="score rescued">
                <strong>{{ invalidAnswersAmount }}</strong>
                <span>Rescued</span>
            </span>
            <!--  -->
            <span class="score invalid">
                <strong>{{ rescuedAnswersAmount }}</strong>
                <span>Invalid</span>
            </span>
        </div>
        <span class="bg-shapes">
            <span class="bg-shape"></span>
            <span class="bg-shape"></span>
            <span class="bg-shape"></span>
            <span class="bg-shape"></span>
            <span class="bg-shape"></span>
            <span class="bg-shape"></span>
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
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
        return { validAnswersAmount, invalidAnswersAmount, rescuedAnswersAmount };
    },
});
</script>
