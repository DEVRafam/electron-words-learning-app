<template>
    <canvas :id="`${id}-char`" :key="refresh" height="100" width="100"></canvas>
    <!--  -->
    <div class="buttons-wrap">
        <button @click="currentType = 'bar'" :class="currentType === 'bar' ? 'active' : 'unactive'">
            <span><font-awesome-icon icon="chart-bar" /></span>
        </button>
        <button @click="currentType = 'pie'" :class="currentType === 'pie' ? 'active' : 'unactive'">
            <span><font-awesome-icon icon="chart-pie" /></span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart } from "chart.js";
import { Answers } from "@/types/logger/Progress";
//
export default defineComponent({
    props: {
        type: {
            type: String as PropType<"pie" | "bar">,
            required: true,
        },
        data: {
            type: Object as PropType<Answers>,
            required: true,
        },
        id: {
            type: String as PropType<string>,
            required: true,
        },
    },
    data() {
        return {
            currentType: this.type,
            refresh: 0,
        };
    },
    watch: {
        currentType() {
            setTimeout(this.printChar, 0);
            this.refresh++;
        },
    },
    mounted() {
        this.printChar();
    },
    methods: {
        printChar() {
            const colors = ["#ff3838", "#05c46b", "#ff9f1a"];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ctx = (document.getElementById(`${this.id}-char`) as unknown as any).getContext("2d");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Chart.defaults.global.defaultFontColor = "#000000";
            Chart.defaults.global.defaultFontSize = 15;
            new Chart(ctx, {
                type: this.currentType,
                data: {
                    labels: Object.keys(this.data).map((title) => title.replace(/\b\w/g, (l) => l.toUpperCase())),
                    datasets: [
                        {
                            data: Object.values(this.data).map((list) => list.length),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    legend: {
                        display: this.currentType === "pie",
                    },
                    cutoutPercentage: 50,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });
        },
    },
});
</script>
