<template>
    <div class="stats">
        <span class="stat">
            <span class="label">Average score: </span>
            <strong>{{ dataset.averageScore }}%</strong>
        </span>
        <span class="stat">
            <span class="label">Progress: </span>
            <strong class="progress" :class="dataset.progress.level">{{ dataset.progress.level }}</strong>
        </span>
        <span class="stat">
            <span class="label">Amount of words: </span>
            <strong>{{ dataset.wordsAmount }}</strong>
        </span>
        <span class="stat">
            <span class="label">Games in total: </span>
            <strong>{{ dataset.gamesHistory.length }}</strong>
        </span>
        <div class="colors" v-if="colors">
            <div class="color" :style="`background-color: ${colors[0]}`"></div>
            <div class="color" :style="`background-color: ${colors[1]}`"></div>
        </div>
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
        colors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
});
</script>
