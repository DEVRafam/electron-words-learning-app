<template>
    <div class="chart-wrapper">
        <canvas id="accomplishment-chart-ctx" height="100%"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "chart.js";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { wordsProgress } = useCertain;
        const { common, weak, strong, mastered } = wordsProgress.value;
        const t = [common, strong, mastered, weak].map((target) => target.length);
        const sum = t.reduce((a, b) => a + b);
        const data = t.map((target) => Math.round((target * 100) / sum));

        setTimeout(() => {
            new Chart(document.querySelector("canvas#accomplishment-chart-ctx") as HTMLCanvasElement, {
                type: "bar",
                data: {
                    labels: ["Common", "Strong", "Mastered", "Weak"],
                    datasets: [
                        {
                            data,
                            fill: false,
                            backgroundColor: ["#f8a5c2", "#26de81", "#0fb9b1", "#eb3b5a"],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontFamily: "Montserrat",
                                    fontSize: 16,
                                    fontStyle: "bold",
                                    callback: (val) => `${val}%`,
                                    min: 0,
                                    max: 100,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    fontFamily: "Montserrat",
                                    fontSize: 16,
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
                                const current = Math.round(data[tooltipItem[0].index as number]);
                                const sum = data.reduce((a, b) => a + b);
                                return `${Math.round((current * 100) / sum)}%`;
                            },
                        },
                    },
                },
            });
        }, 1);
    },
});
</script>
