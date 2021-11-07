<template>
    <section id="comparison">
        <template v-if="latestComparedItem">
            <SingleDataset
                class="field"
                v-bind="{
                    dataset: currentDatasetInDetails,
                    hideButtons: true,
                    hideCompare: true,
                    label: 'original',
                    colors: ['#c44569', '#f8a5c2'],
                }"
            ></SingleDataset>
            <SingleDataset
                class="field"
                v-bind="{
                    dataset: latestComparedItem,
                    hideCompare: true,
                    label: 'compared',
                    colors: ['#778beb', '#63cdda'],
                }"
            ></SingleDataset>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { datasetToCompare, currentDatasetInDetails } from "@/composable/statistics/certain/submodules/useComparisons";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

import SingleDataset from "@/components/statistics/certain_datasets/left_side/select_dataset/single_dataset/SingleDataset.vue";

export default defineComponent({
    components: { SingleDataset },
    setup() {
        const latestComparedItem = ref<ComparisonsDataset | null>(null);
        watch(datasetToCompare, (val) => {
            if (val) latestComparedItem.value = val;
        });

        return { currentDatasetInDetails, latestComparedItem };
    },
});
</script>
