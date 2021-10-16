<template>
    <header id="main-gameplay-header">
        <h2 class="draw-number">
            <template v-if="remainingRedemptionAttemptsNumber > 0">
                You have still <span>{{ remainingRedemptionAttemptsNumber }} {{ attemptsOrAttempt }}</span>
            </template>
            <template v-else>
                <template v-if="amountOfRemainingWords === 1">
                    There is <span>{{ amountOfRemainingWords }}</span> word remaining
                </template>
                <!--  -->
                <template v-else>
                    There are <span>{{ amountOfRemainingWords }}</span> words remaining
                </template>
            </template>
        </h2>

        <h3 class="progress">
            <span class="valid">{{ progressLog.answers.valid.length }}</span>
            <span class="rescued">{{ progressLog.answers.rescued.length }}</span>
            <span class="invalid">{{ progressLog.answers.invalid.length }}</span>
        </h3>
    </header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import useGameplay from "@/composable/gameplay/useMain";
import useLogger from "@/composable/gameplay/useLogger";
//
export default defineComponent({
    setup() {
        const { amountOfRemainingWords, progressLog } = useLogger;
        const { remainingRedemptionAttemptsNumber } = useGameplay;
        const attemptsOrAttempt = computed<"attempts" | "attempt">(() => {
            if (remainingRedemptionAttemptsNumber.value > 1) return "attempts";
            else return "attempt";
        });

        return { amountOfRemainingWords, remainingRedemptionAttemptsNumber, attemptsOrAttempt, progressLog };
    },
});
</script>
