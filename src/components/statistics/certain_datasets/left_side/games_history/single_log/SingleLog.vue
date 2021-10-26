<template>
    <div class="single-log">
        <div class="left">
            <div class="img">
                <span class="image" :style="gameplaysIconPathResolver(logFile.icon_name)"></span>
                <span class="index">{{ index + 1 }}</span>
                <span class="accuracy" :class="accuracyClass">{{ `${Number(logFile["accuracy[%]"]).toFixed(2) * 100}%` }}</span>
                <router-link to="/" tabindex="-1">Show details</router-link>
            </div>
            <span class="date">{{ logFile.session.date.slice(0, 25) }}</span>
        </div>
        <div class="content">
            <Chart :index="index" :logFile="logFile" :displayMode="displayMode" :chartType="chartType"></Chart>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { gameplaysIconPathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
import { DisplayMode, ChartType } from "@/components/statistics/certain_datasets/left_side/games_history/filters/types";

import Chart from "./Chart.vue";

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
        displayMode: {
            type: String as PropType<DisplayMode>,
            required: true,
        },
        chartType: {
            type: String as PropType<ChartType>,
            required: true,
        },
    },
    components: { Chart },
    setup(props) {
        const accuracyClass = computed<"mastered" | "strong" | "weak" | "common">(() => {
            const { ["accuracy[%]"]: val } = props.logFile;
            if (val < 0.4) return "weak";
            else if (val < 0.75) return "common";
            else if (val < 0.9) return "strong";
            return "mastered";
        });
        return { gameplaysIconPathResolver, accuracyClass };
    },
});
</script>
