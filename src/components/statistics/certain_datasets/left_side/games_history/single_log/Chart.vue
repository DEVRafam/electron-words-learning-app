<template>
    <canvas :id="`chart-ctx-${index}`" height="100%" width="50%"></canvas>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Chart from "chart.js";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export default defineComponent({
    props: {
        index: {
            type: Number as PropType<number>,
            required: true,
        },
        logFile: {
            type: Object as PropType<ProgressLogFile>,
            required: true,
        },
    },
    setup(props) {
        const data: number[] = [];
        // eslint-disable-next-line vue/no-setup-props-destructure
        const { valid, invalid, rescued } = props.logFile.answers;
        const vl = valid.length;
        const il = invalid.length;
        const rl = rescued.length;
        data[0] = Math.max(props.logFile.total_amount_of_words - vl - il - rl, 0);
        data.push(vl, rl, il);
        //
        setTimeout(() => {
            new Chart(document.querySelector(`canvas#chart-ctx-${props.index}`) as HTMLCanvasElement, {
                type: "bar",
                data: {
                    labels: ["Remaining", "Valid", "Rescued", "Invalid"],
                    datasets: [
                        {
                            data: data,
                            fill: false,
                            borderColor: "#fff",
                            backgroundColor: ["#303952", "#20bf6b", "#fa8231", "#eb3b5a"],
                            hoverBorderColor: "#fff",
                            lineTension: 0.1,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontFamily: "Montserrat",
                                    stepSize: 10,
                                    fontStyle: "bold",
                                    callback: (val) => `${val}%`,
                                    // display: false,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    fontFamily: "Montserrat",
                                    // display: false,
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                },
            });
        }, 1);
    },
});
</script>
