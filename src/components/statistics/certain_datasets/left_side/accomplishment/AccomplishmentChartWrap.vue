<template>
    <section id="accomplishment" class="field">
        <header>
            <h3 class="field-header">Accomplishment</h3>

            <div class="buttons-wrap">
                <button @click="refresh" class="refresh-chart" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </header>

        <Chart :key="chartRefreshKey"></Chart>

        <footer>
            <h4>
                Dataset's composure level has been estimated as <br /><strong :class="composureLevel">{{ composureLevel }}</strong>
            </h4>
        </footer>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import Chart from "./AccomplishmentChart.vue";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    components: { Chart },
    setup() {
        const { wordsProgress } = useCertain;
        const { common, weak, strong, mastered } = wordsProgress.value;

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
        return { chartRefreshKey, refresh, composureLevel };
    },
});
</script>
