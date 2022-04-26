<template>
    <section id="certain-datasets-manager" class="bigger">
        <teleport to="section#modals-wrapper">
            <ImportingResultCommunique :class="importingResult" v-if="importingResult"></ImportingResultCommunique>
        </teleport>
        <teleport to="section#modals-wrapper">
            <ExitModal></ExitModal>
        </teleport>

        <WordsManagerHeader></WordsManagerHeader>

        <Modifier></Modifier>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import ExitModal from "./ExitModal.vue";
import Modifier from "./modify/Modifier.vue";
import WordsManagerHeader from "./header/Header.vue";
import ImportingResultCommunique from "./modify/words/new_words/header/importing/ImportingResultCommunique.vue";

export default defineComponent({
    components: { WordsManagerHeader, Modifier, ImportingResultCommunique, ExitModal },
    async setup() {
        const { loadDatasetsInfo } = useModifier;
        const { importingResult } = useModifier.useImporting;
        // reset
        // load necessary data
        await loadDatasetsInfo();
        return { importingResult };
    },
});
</script>
