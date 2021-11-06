<template>
    <header>
        <h2>{{ dataset.title }}</h2>
        <span class="date">
            <span class="label">Latest modification: </span>
            <strong>{{ dataset.lastModified }}</strong> </span
        ><span class="date">
            <span class="label">Created at: </span>
            <strong>{{ dataset.createdAt }}</strong>
        </span>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

export default defineComponent({
    props: {
        dataset: {
            type: Object as PropType<ComparisonsDataset>,
            required: true,
        },
    },
});
</script>
