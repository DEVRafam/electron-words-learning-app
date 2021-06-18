<template>
    <section id="dataset-modifier" v-if="isDatasetSelected">
        <WordsManagerHeader></WordsManagerHeader>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import WordsManagerHeader from "@/components/datasets_manager/modify/words/WordsManager.vue";

export default defineComponent({
    components: { WordsManagerHeader },
    setup() {
        const { datasetToModify, isDatasetSelected } = useModifiersManager;
        return { datasetToModify, isDatasetSelected };
    },
});
</script>
