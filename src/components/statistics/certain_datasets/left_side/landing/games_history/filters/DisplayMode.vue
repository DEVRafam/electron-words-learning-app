<template>
    <div class="group">
        <label>Display mode</label>
        <!--  -->
        <button @click="toggleDisplayMode" :tabindex="tabindex" :disabled="chartType === 'pie'">
            <font-awesome-icon :icon="displayModeIcon"></font-awesome-icon>
        </button>
        <!--  -->
        <button @click="toggleChartType" :tabindex="tabindex">
            <font-awesome-icon :icon="chartTypeIcon"></font-awesome-icon>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { DisplayMode, ChartType } from "@/components/statistics/certain_datasets/left_side/landing/games_history/filters/types";

export default defineComponent({
    props: {
        displayMode: {
            type: String as PropType<DisplayMode>,
            required: true,
        },
        chartType: {
            type: String as PropType<ChartType>,
            required: true,
        },
        tabindex: {
            type: Number as PropType<-1 | 1>,
            default: -1,
        },
    },
    emits: ["update:displayMode", "update:chartType"],
    setup(props, { emit }) {
        const toggleDisplayMode = () => emit("update:displayMode", props.displayMode === "more_details" ? "smaller_content" : "more_details");
        const toggleChartType = () => emit("update:chartType", props.chartType === "pie" ? "bar" : "pie");

        const displayModeIcon = computed<"compress" | "expand">(() => {
            return props.displayMode === "more_details" ? "compress" : "expand";
        });
        const chartTypeIcon = computed<"chart-pie" | "chart-bar">(() => {
            return props.chartType === "pie" ? "chart-bar" : "chart-pie";
        });

        return { toggleDisplayMode, toggleChartType, displayModeIcon, chartTypeIcon };
    },
});
</script>
