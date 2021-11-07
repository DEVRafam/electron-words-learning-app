<template>
    <section id="select-dataset">
        <Header class="field"></Header>
        <section class="datasets field">
            <div class="content" :class="{ scrollable: datasetsToDisplay.length >= 2 }">
                <Suspense v-if="openComparsionPanel">
                    <template #default>
                        <Datasets :datasetsToDisplay="datasetsToDisplay" v-if="displayDatasets"></Datasets>
                    </template>
                    <!--  -->
                    <template #fallback>
                        <LoadingScreen></LoadingScreen>
                    </template>
                </Suspense>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { openComparsionPanel, datasets, datasetsOrderFilter, displayAllDatasets } from "@/composable/statistics/certain/submodules/useComparisons";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

import Header from "./Header.vue";
import Datasets from "./Datasets.vue";

export default defineComponent({
    components: { Header, Datasets },
    setup() {
        const displayDatasets = ref<boolean>(true);
        const toggleDisplayDatasets = () => {
            displayDatasets.value = false;
            setTimeout(() => (displayDatasets.value = true), 10);
        };
        watch(datasetsOrderFilter, toggleDisplayDatasets);
        watch(displayAllDatasets, toggleDisplayDatasets);

        const datasetsToDisplay = computed<ComparisonsDataset[]>(() => {
            let result = datasets.value;
            if (datasetsOrderFilter.value === "latestModified") result = result.sort((a, b) => b._rawTimes.lastModified - a._rawTimes.lastModified);
            else if (datasetsOrderFilter.value === "newest") result = result.sort((a, b) => b._rawTimes.createdAt - a._rawTimes.createdAt);
            else if (datasetsOrderFilter.value === "mostPlayed") result = result.sort((a, b) => b.gamesHistory.length - a.gamesHistory.length);
            else if (datasetsOrderFilter.value === "highestScores") result = result.sort((a, b) => b.averageScore - a.averageScore);

            if (!displayAllDatasets.value) result = result.filter((target) => target.gamesHistory.length >= 1);
            return result;
        });

        return { openComparsionPanel, datasetsToDisplay, datasetsOrderFilter, displayDatasets };
    },
});
</script>
