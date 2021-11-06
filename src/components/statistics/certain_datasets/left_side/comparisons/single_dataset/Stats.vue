<template>
    <div class="stats">
        <span class="stat">
            <span class="label">Amount of words: </span>
            <strong>{{ dataset.wordsAmount }}</strong>
        </span>
        <span class="stat">
            <span class="label">Games in total: </span>
            <strong>{{ dataset.gamesHistory.length }}</strong>
        </span>
        <span class="stat">
            <span class="label">Progress: </span>
            <strong>{{ dataset.progress.level }}</strong>
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
    },
});
</script>
