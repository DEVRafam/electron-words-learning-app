<template>
    <section id="select-dataset-header">
        <h1>Select dataset to compare</h1>
        <div class="managemenet">
            <select v-model="datasetsOrderFilter">
                <option value="latestModified">Latest modified</option>
                <option value="newest">Newest</option>
                <option value="mostPlayed">Most played</option>
                <option value="highestScores">Highest scores</option>
            </select>
            <Swapper :currentIndex="Number(displayAllDatasets)" orientation="vertical">
                <button @click="() => (displayAllDatasets = !displayAllDatasets)">Display all</button>
                <button @click="() => (displayAllDatasets = !displayAllDatasets)">Only comparable</button>
            </Swapper>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { displayAllDatasets, datasetsOrderFilter } from "@/composable/statistics/certain/submodules/useComparisons";
export default defineComponent({
    setup() {
        //
        return { displayAllDatasets, datasetsOrderFilter };
    },
});
</script>
