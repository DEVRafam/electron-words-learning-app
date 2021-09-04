<template>
    <div class="chart-wrapper">
        <canvas id="averages-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Chart from "chart.js";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    props: {
        data: {
            type: Array as PropType<number[]>,
            required: true,
        },
        average: {
            type: Array as PropType<number[]>,
            required: true,
        },
        label: {
            type: String as PropType<string>,
            required: true,
        },
        percentages: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { gamesHistory } = useCertain;

        const percentages = () => {
            if (props.percentages) {
                return {
                    min: 0,
                    max: 100,
                };
            }
        };

        setTimeout(() => {
            new Chart(document.querySelector("canvas#averages-chart-ctx") as HTMLCanvasElement, {
                type: "line",
                data: {
                    labels: gamesHistory.value.map((_, index) => index + 1) as number[],
                    datasets: [
                        {
                            label: props.label,
                            data: props.data,
                            fill: false,
                            borderColor: "#c44569",
                            backgroundColor: "#c44569",
                            lineTension: 0.1,
                            borderWidth: 4,
                        },
                        {
                            label: "Average",
                            data: props.average,
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
                                    ...percentages(),
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
                                return `${gamesHistory.value[tooltipItem[0].index as number].session.date}`;
                            },
                            footer: function (tooltipItem) {
                                const gameplay = gamesHistory.value[tooltipItem[0].index as number];
                                return [
                                    "Answers:", //
                                    `o) Valid: ${gameplay.answers.valid.length}`,
                                    `o) Invalid: ${gameplay.answers.invalid.length}`,
                                    `o) Rescued: ${gameplay.answers.rescued.length}`,
                                ];
                            },
                        },
                    },
                },
            });
        }, 1);
    },
});
</script>
