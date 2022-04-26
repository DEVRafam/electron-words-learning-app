<template>
    <section id="dataset-modifier" :class="{ extended: extendCurrentWordsSection }">
        <WordsManager></WordsManager>
        <GeneralInformationManager></GeneralInformationManager>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import WordsManager from "./words/WordsManager.vue";
import GeneralInformationManager from "./general/GeneralInformationManager.vue";

export default defineComponent({
    components: { WordsManager, GeneralInformationManager },
    setup() {
        const { extendCurrentWordsSection } = useModifier;
        return { extendCurrentWordsSection };
    },
});
</script>
