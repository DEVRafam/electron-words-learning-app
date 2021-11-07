<template>
    <h2>
        <span class="label">{{ label }}</span>
        <span> {{ dataset.title }}</span>
    </h2>
    <div class="level">
        <span class="date">
            <span class="label">Latest modification: </span>
            <strong>{{ dataset.lastModified }}</strong> </span
        ><span class="date">
            <span class="label">Created at: </span>
            <strong>{{ dataset.createdAt }}</strong>
        </span>
    </div>
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
        label: {
            type: String as PropType<string>,
            required: false,
        },
    },
});
</script>
