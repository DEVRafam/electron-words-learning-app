<template>
    <template v-for="dataset in datasets" :key="dataset.filename">
        <SingleDataset class="single-dataset" :dataset="dataset"></SingleDataset>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadDatasets, datasets, hasDataBeenLoaded } from "@/composable/statistics/certain/submodules/useComparisons";
import router from "@/router/index";
import SingleDataset from "./single_dataset/SingleDataset.vue";

export default defineComponent({
    components: { SingleDataset },
    async setup() {
        await loadDatasets(router.currentRoute.value.params.datasetsName as string);
        //
        return { datasets, hasDataBeenLoaded };
    },
});
</script>
