<template>
    <section id="daily-activity-chart-wrap" class="field">
        <header>
            <h3 class="field-header">Daily activity</h3>

            <div class="buttons-wrap">
                <button @click="displayWeekdayNamesLabels = !displayWeekdayNamesLabels" tabindex="-1"><font-awesome-icon icon="calendar-alt"></font-awesome-icon></button>
                <button @click="refresh" class="refresh-chart" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </header>

        <Chart :key="chartRefreshKey" :displayWeekdayNamesLabels="displayWeekdayNamesLabels"></Chart>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";

import Chart from "./DailyActivityChart.vue";

export default defineComponent({
    components: { Chart },
    setup() {
        const displayWeekdayNamesLabels = ref<boolean>(false);
        const chartRefreshKey = ref<number>(0);
        const refresh = () => {
            chartRefreshKey.value += 1;
        };
        onMounted(() => window.addEventListener("resize", refresh));

        watch(displayWeekdayNamesLabels, refresh);

        return { chartRefreshKey, refresh, displayWeekdayNamesLabels };
    },
});
</script>
