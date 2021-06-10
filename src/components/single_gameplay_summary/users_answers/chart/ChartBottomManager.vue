<template>
    <section class="buttons-wrap">
        <select v-model="chartDataType">
            <option value="answers">Users answers</option>
            <option value="crucials">Crucial words</option>
        </select>
        <!--  -->
        <div class="buttons">
            <button @click="setBar" :class="cssClasses.isBar">
                <span><font-awesome-icon icon="chart-bar" /></span>
            </button>
            <button @click="setPie" :class="cssClasses.isPie">
                <span><font-awesome-icon icon="chart-pie" /></span>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useChart from "@/composable/single_gameplay_summary/useChart";
//
export default defineComponent({
    setup() {
        const { managerHelper, chartDataType } = useChart;
        const helpers = managerHelper();
        //
        return {
            chartDataType,
            // HELPERS
            cssClasses: {
                isBar: helpers.cssClasses.isBar,
                isPie: helpers.cssClasses.isPie,
            },
            setPie: helpers.setPie,
            setBar: helpers.setBar,
        };
    },
});
</script>
