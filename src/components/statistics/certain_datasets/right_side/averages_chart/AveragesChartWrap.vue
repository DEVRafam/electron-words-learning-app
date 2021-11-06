<template>
    <section id="averages-chart-wrap" class="field">
        <slot name="default"></slot>
        <header>
            <h3 class="field-header">
                <select v-model="chartDataType">
                    <option value="accuration">Answers accuration [%]</option>
                    <option value="draws">Amount of draws</option>
                    <option value="duration">Gameplay's duration [s]</option>
                </select>
            </h3>

            <div class="buttons-wrap" id="averages-chart-refresh">
                <!-- TELEPORT PLACEHOLDER -->
            </div>
        </header>

        <ChartWrapper controlButtonSelector="div#averages-chart-refresh" :key="chartDataType" v-if="displayModal">
            <Chart :data="chartData" :average="chartAverage" :label="chartLabel" :percentages="chartDataType === 'accuration'" :key="chartRefreshKey"></Chart>
        </ChartWrapper>
        <LoadingScreen v-else></LoadingScreen>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";
import { openComparsionPanel } from "@/composable/statistics/certain/submodules/useComparisons";

import Chart from "./AveragesChart.vue";

export default defineComponent({
    components: { Chart },
    setup() {
        const { gamesHistory, averagesForChart } = useCertain;
        const displayModal = ref<boolean>(true);
        const chartRefreshKey = ref<number>(0);
        watch(openComparsionPanel, () => {
            displayModal.value = false;
            setTimeout(() => {
                displayModal.value = true;
                setTimeout(() => {
                    chartRefreshKey.value += 1;
                }, 20);
            }, 300);
        });
        const chartDataType = ref<"accuration" | "draws" | "duration">("accuration");
        //
        const chartData = computed<number[]>(() => {
            if (chartDataType.value === "accuration") {
                return gamesHistory.value.map((target) => target["accuracy[%]"] * 100) as number[];
            }
            //
            else if (chartDataType.value === "draws") {
                return gamesHistory.value.map((target) => target.number_of_draws * 1) as number[];
            }
            //
            else if (chartDataType.value === "duration") {
                return gamesHistory.value.map((target) => target.session["duration[s]"] * 1) as number[];
            } else return [1, 2];
        });
        const chartAverage = computed<number[]>(() => {
            if (chartDataType.value === "accuration") {
                return averagesForChart((target) => target["accuracy[%]"] * 100).value;
            }
            //
            else if (chartDataType.value === "draws") {
                return averagesForChart((target) => target.number_of_draws * 1).value;
            }
            //
            else if (chartDataType.value === "duration") {
                return averagesForChart((target) => target.session["duration[s]"] * 1).value;
            }
            //
            else return [1, 2];
        });
        const chartLabel = computed<string>(() => {
            if (chartDataType.value === "accuration") return "Answers accuration [%]";
            else if (chartDataType.value === "draws") return "Amount of draws";
            else return "Gameplays duration [s]";
        });
        return { chartDataType, chartData, chartAverage, chartLabel, displayModal, chartRefreshKey };
    },
});
</script>
