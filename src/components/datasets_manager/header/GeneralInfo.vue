<template>
    <section>
        <h1>Datasets <strong>Manager</strong></h1>
        <div class="content">
            <ul>
                <li>
                    <span>Datasets in total: </span>
                    <strong>{{ dataToPreview.length }}</strong>
                </li>
                <li>
                    <span>Total amount of words: </span>
                    <strong>{{ totalAmountOfWords }}</strong>
                </li>
            </ul>
            <button>Create new dataset</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useLoader from "@/composable/datasets_manager/useLoader";

export default defineComponent({
    setup() {
        const { dataToPreview, gameplaysIconPathResolver } = useLoader;
        const totalAmountOfWords = computed<number>(() => {
            let result = 0;
            dataToPreview.value.forEach((target) => {
                result += target.wordsAmount;
            });
            return result;
        });

        return { dataToPreview, gameplaysIconPathResolver, totalAmountOfWords };
    },
});
</script>
