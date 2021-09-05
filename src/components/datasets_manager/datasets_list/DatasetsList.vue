<template>
    <section id="datasets-list" class="bigger">
        <WordsManagerHeader></WordsManagerHeader>

        <section id="datasets-wrapper" :class="scrollableClass" :key="`${filter}-${filterOrder}`">
            <!--  -->
            <template v-for="(dataset, index) in filteredDatasets" :key="dataset.fileName">
                <SingleDataset :dataset="dataset" :index="index"></SingleDataset>
            </template>
            <!--  -->
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";

import WordsManagerHeader from "./header/Header.vue";
import SingleDataset from "./single_dataset/SingleDataset.vue";

export default defineComponent({
    components: { SingleDataset, WordsManagerHeader },
    async setup() {
        const { loadGameplayFilesForPreview } = useLoader;
        const { filteredDatasets, filter, filterOrder } = useDatasetsLoader;
        // load necessary data
        await loadGameplayFilesForPreview();

        const scrollableClass = computed<{ scrollable: boolean }>(() => {
            return { scrollable: filteredDatasets.value.length > 4 };
        });
        return { filteredDatasets, scrollableClass, filter, filterOrder };
    },
});
</script>
