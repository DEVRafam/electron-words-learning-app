<template>
    <section id="dataset-modifier" v-if="isDatasetSelected">
        <WordsManager></WordsManager>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import WordsManager from "@/components/datasets_manager/modify/words/WordsManager.vue";

export default defineComponent({
    components: { WordsManager },
    setup() {
        const { datasetToModify, isDatasetSelected } = useModifiersManager;
        return { datasetToModify, isDatasetSelected };
    },
});
</script>
