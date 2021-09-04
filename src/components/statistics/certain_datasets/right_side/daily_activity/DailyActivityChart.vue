<template>
    <div class="chart-wrapper">
        <canvas id="daily-activity-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Chart from "chart.js";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    props: {
        displayWeekdayNamesLabels: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { dailyActivity } = useCertain;
        setTimeout(() => {
            new Chart(document.querySelector("canvas#daily-activity-chart-ctx") as HTMLCanvasElement, {
                type: "bar",
                data: {
                    labels: props.displayWeekdayNamesLabels ? dailyActivity.value.days : dailyActivity.value.dates,
                    datasets: [
                        {
                            data: dailyActivity.value.numbers,
                            fill: false,
                            borderColor: ["#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#c44569"],
                            backgroundColor: ["#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#f8a5c2", "#c44569"],
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
                                    stepSize: 1,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Number of games",
                                    fontSize: 16,
                                    fontFamily: "Montserrat",
                                    fontStyle: "bold",
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    fontSize: 16,
                                    fontFamily: "Montserrat",
                                    fontStyle: "bold",
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem) {
                                return dailyActivity.value.days[tooltipItem[0].index as number];
                            },
                        },
                    },
                },
            });
        }, 1);
    },
});
</script>
