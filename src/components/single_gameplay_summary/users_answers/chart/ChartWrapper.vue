<template>
    <section id="answers-chart" class="">
        <canvas :id="`${CTXElementID}`" :key="refreshHelper" height="100" width="100"></canvas>
        <ChartManager></ChartManager>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useChart from "@/composable/single_gameplay_summary/useChart";
import ChartManager from "@/components/single_gameplay_summary/users_answers/chart/ChartBottomManager.vue";
//
export default defineComponent({
    components: { ChartManager },
    setup() {
        const { printChart, chartVisualType, refreshHelper, CTXElementID } = useChart;
        setTimeout(printChart, 0);
        //
        return { chartVisualType, refreshHelper, CTXElementID };
    },
});
</script>
