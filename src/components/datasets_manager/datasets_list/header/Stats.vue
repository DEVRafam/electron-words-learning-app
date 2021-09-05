<template>
    <ul class="statistics">
        <li>
            <span>Datasets in total: </span>
            <strong>{{ dataToPreview.length }}</strong>
        </li>
        <li>
            <span>Total quantity of words: </span>
            <strong>{{ totalAmountOfWords }}</strong>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

export default defineComponent({
    setup() {
        const { dataToPreview } = useLoader;
        const totalAmountOfWords = computed<number>(() => {
            let result = 0;
            dataToPreview.value.forEach((target) => {
                result += target.wordsAmount;
            });
            return result;
        });

        return { dataToPreview, totalAmountOfWords };
    },
});
</script>
