<template>
    <section id="statistics-certain-dataset">
        <h1>{{ dataset.title }}</h1>
        <AccuracyChart></AccuracyChart>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";
import AccuracyChart from "./AccurateProgressChart.vue";

export default defineComponent({
    components: { AccuracyChart },
    async setup() {
        const { loadData, dataset, gamesHistory } = useCertain;
        await loadData();
        console.log(JSON.parse(JSON.stringify(gamesHistory.value)));
        return { dataset, gamesHistory };
    },
});
</script>
