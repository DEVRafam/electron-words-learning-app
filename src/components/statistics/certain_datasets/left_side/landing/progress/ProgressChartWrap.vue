<template>
    <section id="progress" class="field">
        <ChartWrapper controlButtonSelector="#accomplishment-and-games-history-buttons" v-if="displayModal">
            <Chart :key="chartRefreshKey"></Chart>
        </ChartWrapper>
        <div class="chart-wrapper" v-else>
            <LoadingScreen></LoadingScreen>
        </div>
        <footer>
            <h4>
                Dataset's progress level has been estimated as <br /><strong :class="composureLevel">{{ composureLevel }}</strong>
            </h4>
        </footer>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import Chart from "./ProgressChart.vue";

import useCertain from "@/composable/statistics/certain/useCertain";
import { openComparsionPanel } from "@/composable/statistics/certain/submodules/useComparisons";

export default defineComponent({
    components: { Chart },
    setup() {
        const { wordsProgress } = useCertain;
        const { common, weak, strong, mastered } = wordsProgress.value;

        const displayModal = ref<boolean>(true);
        watch(openComparsionPanel, () => {
            displayModal.value = false;
            setTimeout(() => (displayModal.value = true), 300);
        });

        const chartRefreshKey = ref<number>(0);
        const refresh = () => {
            chartRefreshKey.value += 1;
        };
        onMounted(() => window.addEventListener("resize", refresh));

        const composureLevel = computed<"common" | "mastered" | "weak" | "strong">(() => {
            const t = [common, strong, mastered, weak].map((target) => target.length);
            const sum = t.reduce((a, b) => a + b);
            //
            const masteredRatio = Math.round((mastered.length * 100) / sum);
            const strongRatio = Math.round((strong.length * 100) / sum);
            const weakRatio = Math.round((weak.length * 100) / sum);
            //
            if (masteredRatio >= 50) return "mastered";
            else if (strongRatio + masteredRatio >= 50) return "strong";
            else if (weakRatio >= 50) return "weak";

            return "common";
        });
        return { chartRefreshKey, refresh, composureLevel, displayModal };
    },
});
</script>
