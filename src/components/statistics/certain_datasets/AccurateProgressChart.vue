<template>
    <section id="accuracy-chart-wrapper">
        <canvas id="accuracy-chart-ctx" height="100" width="100"></canvas>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "chart.js";

export default defineComponent({
    setup() {
        setTimeout(() => {
            new Chart(document.querySelector("canvas#accuracy-chart-ctx") as HTMLCanvasElement, {
                type: "line",
                data: {
                    labels: ["1", "2", "3", "4", "5", "6", "7"],
                    datasets: [
                        {
                            label: "Answers accurate",
                            data: [65, 59, 80, 81, 56, 55, 40],
                            fill: false,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0,
                        },
                    ],
                },
                options: {
                    legend: {
                        onClick: (e) => e.stopPropagation(),
                    },
                },
                // options: options,
            });
        }, 1);
    },
});
</script>
