<template>
    <h2 id="draw-number">
        <template v-if="remainingRedemptionAttemptsNumber > 0">
            You have still <span>{{ remainingRedemptionAttemptsNumber }} {{ attemptsOrAttempt }}</span>
        </template>
        <template v-else>
            Draw's number: <span>{{ numberOfDraw }}</span>
        </template>
    </h2>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import useGameplay from "@/composable/gameplay";
import useLogger from "@/composable/logger";
//
export default defineComponent({
    setup() {
        const { numberOfDraw } = useLogger;
        const { remainingRedemptionAttemptsNumber } = useGameplay;
        const attemptsOrAttempt = computed<"attempts" | "attempt">(() => {
            if (remainingRedemptionAttemptsNumber.value > 1) return "attempts";
            else return "attempt";
        });

        return { numberOfDraw, remainingRedemptionAttemptsNumber, attemptsOrAttempt };
    },
});
</script>
