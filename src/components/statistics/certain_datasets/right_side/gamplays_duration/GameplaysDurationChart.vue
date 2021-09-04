<template>
    <div class="chart-wrapper">
        <canvas id="duration-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "chart.js";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { gamesHistory, averagesForChart } = useCertain;
        setTimeout(() => {
            new Chart(document.querySelector("canvas#duration-chart-ctx") as HTMLCanvasElement, {
                type: "line",
                data: {
                    labels: gamesHistory.value.map((target, index) => index + 1) as number[],
                    datasets: [
                        {
                            label: "Duration [s]",
                            data: gamesHistory.value.map((target) => target.session["duration[s]"]) as number[],
                            fill: false,
                            borderColor: "#c44569",
                            backgroundColor: "#c44569",
                            lineTension: 0.1,
                            borderWidth: 4,
                        },
                        {
                            label: "Average",
                            data: averagesForChart((target) => target.session["duration[s]"]).value,
                            fill: false,
                            borderColor: "#f8a5c2",
                            backgroundColor: "#f8a5c2",
                            lineTension: 0.1,
                            borderWidth: 4,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontSize: 16,
                                    fontFamily: "Montserrat",
                                },
                            },
                        ],
                    },
                    legend: {
                        position: "bottom",
                        labels: {
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            fontStyle: "bold",
                        },
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem) {
                                if (tooltipItem[0].datasetIndex === 0) {
                                    return `${gamesHistory.value[tooltipItem[0].index as number].session.date}`;
                                } else return "";
                            },
                        },
                    },
                },
            });
        }, 1);
    },
});
</script>
