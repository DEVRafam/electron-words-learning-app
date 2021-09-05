<template>
    <section id="certain-datasets-manager" class="bigger">
        <teleport to="section#modals-wrapper">
            <ImportingResultCommunique :class="importingResult" v-if="importingResult"></ImportingResultCommunique>
        </teleport>

        <WordsManagerHeader></WordsManagerHeader>

        <Modifier></Modifier>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import WordsManagerHeader from "@/components/datasets_manager/certain_datasets_manager/header/Header.vue";
import Modifier from "@/components/datasets_manager/certain_datasets_manager/modify/Modifier.vue";
import ImportingResultCommunique from "@/components/datasets_manager/certain_datasets_manager/modify/words/new_words/header/importing/ImportingResultCommunique.vue";

export default defineComponent({
    components: { WordsManagerHeader, Modifier, ImportingResultCommunique },
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
