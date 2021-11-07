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
            <Chart :data="data" :percentages="chartDataType === 'accuration'" :key="chartRefreshKey"></Chart>
        </ChartWrapper>
        <LoadingScreen v-else></LoadingScreen>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { openComparsionPanel, datasetToCompare, currentDatasetInDetails } from "@/composable/statistics/certain/submodules/useComparisons";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";
import { chartDataType, chartData, chartAverage, chartLabel } from "./useAverageChart";
import { ChartDataSets } from "chart.js";

import Chart from "./AveragesChart.vue";

export default defineComponent({
    components: { Chart },
    setup() {
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
        watch(datasetToCompare, () => {
            chartRefreshKey.value += 1;
        });

        const data = computed<ChartDataSets[]>(() => {
            if (datasetToCompare.value && currentDatasetInDetails.value) {
                return [
                    {
                        label: currentDatasetInDetails.value.fileName,
                        data: chartData(gamesHistory.value),
                        borderColor: "#c44569",
                        backgroundColor: "#c44569",
                    },
                    {
                        label: `AVERAGE ${currentDatasetInDetails.value.fileName}`,
                        data: chartAverage(gamesHistory.value),
                        borderColor: "#f8a5c2",
                        backgroundColor: "#f8a5c2",
                    },
                    {
                        label: datasetToCompare.value.fileName,
                        data: chartData(datasetToCompare.value.gamesHistory),
                        borderColor: "#778beb",
                        backgroundColor: "#778beb",
                    },
                    {
                        label: `AVERAGE ${datasetToCompare.value.fileName} `,
                        data: chartAverage(datasetToCompare.value.gamesHistory),
                        borderColor: "#63cdda",
                        backgroundColor: "#63cdda",
                    },
                ];
            } else {
                return [
                    {
                        label: chartLabel.value,
                        data: chartData(gamesHistory.value),
                        borderColor: "#c44569",
                        backgroundColor: "#c44569",
                    },
                    {
                        label: "Average",
                        data: chartAverage(gamesHistory.value),
                        borderColor: "#f8a5c2",
                        backgroundColor: "#f8a5c2",
                    },
                ];
            }
        });

        return { chartDataType, data, displayModal, chartRefreshKey };
    },
});
</script>
