<template>
    <div class="management">
        <select v-model="filter" tabindex="-1">
            <option value="newest">Newest</option>
            <option value="latestModified">Latest updated</option>
            <option value="largest">Largest</option>
        </select>
        <select v-model="filterOrder" tabindex="-1">
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </select>
        <button tabindex="-1" @click="prepareNewDataset">Create new dataset</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { filter, filterOrder } = useDatasetsLoader;
        const { prepareNewDataset } = useModifier;

        return { filter, filterOrder, prepareNewDataset };
    },
});
</script>
