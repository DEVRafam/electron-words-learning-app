<template>
    <section id="datasets-manager" :class="{ bigger: biggerWindow }">
        <teleport to="section#modals-wrapper">
            <ImportingResultCommunique :class="importingResult" v-if="importingResult"></ImportingResultCommunique>
        </teleport>

        <WordsManagerHeader></WordsManagerHeader>

        <div id="main-content-wrap" :class="{ active: previewModifySection }">
            <div id="main-content-swap">
                <DatasetsList class="swap-item"></DatasetsList>
                <Modifier class="swap-item"></Modifier>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifier from "@/composable/datasets_manager/useModifier";

import DatasetsList from "@/components/datasets_manager/datasets_list/DatasetsList.vue";
import WordsManagerHeader from "@/components/datasets_manager/header/WordsManagerHeader.vue";
import Modifier from "@/components/datasets_manager/modify/Modifier.vue";
import ImportingResultCommunique from "@/components/datasets_manager/modify/words/new_words/header/importing/ImportingResultCommunique.vue";

export default defineComponent({
    components: { DatasetsList, WordsManagerHeader, Modifier, ImportingResultCommunique },
    async setup() {
        const { loadGameplayFilesForPreview } = useLoader;
        const { previewModifySection, selectDataset, biggerWindow } = useModifier;
        const { importingResult } = useModifier.useImporting;
        // reset
        onBeforeUnmount(() => selectDataset(null));
        // load necessary data
        await loadGameplayFilesForPreview();
        return { previewModifySection, importingResult, biggerWindow };
    },
});
</script>
