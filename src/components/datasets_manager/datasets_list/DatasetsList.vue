<template>
    <section id="gameplays-datasets-preview" :class="scrollableClass" :key="`${filter}-${filterOrder}`">
        <!--  -->
        <template v-for="(dataset, index) in filteredDatasets" :key="dataset.fileName">
            <SingleDataset :dataset="dataset" :index="index"></SingleDataset>
        </template>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";

import SingleDataset from "./single_dataset/SingleDataset.vue";

export default defineComponent({
    components: { SingleDataset },
    setup() {
        const { filteredDatasets, filter, filterOrder } = useDatasetsLoader;

        const scrollableClass = computed<{ scrollable: boolean }>(() => {
            return { scrollable: filteredDatasets.value.length > 4 };
        });
        return { filteredDatasets, scrollableClass, filter, filterOrder };
    },
});
</script>
