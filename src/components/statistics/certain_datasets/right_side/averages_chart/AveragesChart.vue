<template>
    <div class="chart-wrapper">
        <canvas id="averages-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Chart, { ChartDataSets } from "chart.js";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    props: {
        data: {
            type: Array as PropType<ChartDataSets[]>,
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
                    datasets: props.data.map((target) => {
                        return {
                            ...target,
                            fill: false,
                            lineTension: 0.1,
                            borderWidth: 4,
                        };
                    }),
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
