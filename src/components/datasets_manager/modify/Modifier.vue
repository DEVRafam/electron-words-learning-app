<template>
    <section id="dataset-modifier" v-if="isDatasetSelected">
        <WordsManager></WordsManager>
        <GeneralInformationManager></GeneralInformationManager>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import WordsManager from "@/components/datasets_manager/modify/words/WordsManager.vue";
import GeneralInformationManager from "@/components//datasets_manager/modify/general/GeneralInformationManager.vue";

export default defineComponent({
    components: { WordsManager, GeneralInformationManager },
    setup() {
        const { datasetToModify, isDatasetSelected } = useModifiersManager;
        return { datasetToModify, isDatasetSelected };
    },
});
</script>
