<template>
    <div class="single-log">
        <div class="left">
            <div class="img" :style="gameplaysIconPathResolver(logFile.icon_name)">
                <span class="index">{{ index + 1 }}</span>
                <router-link to="/">Show details</router-link>
            </div>
            <span class="date">{{ logFile.session.date }}</span>
        </div>
        <div class="content">
            <div class="chart-wrapper">
                <Chart :index="index" :logFile="logFile"></Chart>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { gameplaysIconPathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

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
    },
    components: { Chart },
    setup() {
        return { gameplaysIconPathResolver };
    },
});
</script>
