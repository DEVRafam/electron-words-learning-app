<template>
    <template v-for="dataset in datasetsToDisplay" :key="dataset.filename">
        <SingleDataset class="single-dataset" :dataset="dataset"></SingleDataset>
    </template>
</template>
``
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { loadDatasets } from "@/composable/statistics/certain/submodules/useComparisons";
import router from "@/router/index";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

import SingleDataset from "./single_dataset/SingleDataset.vue";

export default defineComponent({
    props: {
        datasetsToDisplay: {
            type: Array as PropType<ComparisonsDataset[]>,
            required: true,
        },
    },
    components: { SingleDataset },
    async setup() {
        await loadDatasets(router.currentRoute.value.params.datasetsName as string);
    },
});
</script>
