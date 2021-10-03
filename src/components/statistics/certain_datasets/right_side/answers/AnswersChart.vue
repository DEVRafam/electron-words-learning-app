<template>
    <div class="chart-wrapper">
        <canvas id="answers-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Chart from "chart.js";

export default defineComponent({
    props: {
        data: {
            type: Array as PropType<number[]>,
            required: true,
        },
    },
    setup(props) {
        setTimeout(() => {
            new Chart(document.querySelector("canvas#answers-chart-ctx") as HTMLCanvasElement, {
                type: "pie",
                data: {
                    labels: ["Valid", "Rescued", "Invalid"],
                    datasets: [
                        {
                            label: "essa",
                            data: props.data,
                            fill: false,
                            borderColor: "#fff",
                            backgroundColor: ["#20bf6b", "#fa8231", "#eb3b5a"],
                            hoverBorderColor: "#fff",
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
                                    display: false,
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                    // tooltips: {
                    //     callbacks: {
                    //         title: function (tooltipItem) {
                    //             return `${gamesHistory.value[tooltipItem[0].index as number].session.date}`;
                    //         },
                    //         footer: function (tooltipItem) {
                    //             const gameplay = gamesHistory.value[tooltipItem[0].index as number];
                    //             return [
                    //                 "Answers:", //
                    //                 `o) Valid: ${gameplay.answers.valid.length}`,
                    //                 `o) Invalid: ${gameplay.answers.invalid.length}`,
                    //                 `o) Rescued: ${gameplay.answers.rescued.length}`,
                    //             ];
                    //         },
                    //     },
                    // },
                },
            });
        }, 1);
    },
});
</script>
