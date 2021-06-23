<template>
    <section id="datasets-manager">
        <ImportingResultCommunique :class="importingResult" v-if="importingResult"></ImportingResultCommunique>

        <WordsManagerHeader></WordsManagerHeader>

        <div id="main-content-wrap" :class="{ active: previewModifySection }">
            <div id="main-content-swap">
                <DisplaysGameplayData class="swap-item"></DisplaysGameplayData>
                <Modifier class="swap-item"></Modifier>
            </div>
        </div>

        <Footer></Footer>
    </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useLoader from "@/composable/datasets_manager/useLoader";
import useModifier from "@/composable/datasets_manager/useModifier";

import DisplaysGameplayData from "@/components/datasets_manager/DisplaysGameplayData.vue";
import WordsManagerHeader from "@/components/datasets_manager/header/WordsManagerHeader.vue";
import Modifier from "@/components/datasets_manager/modify/Modifier.vue";
import Footer from "@/components/datasets_manager/Footer.vue";
import ImportingResultCommunique from "@/components/datasets_manager/modify/words/new_words/importing/ImportingResultCommunique.vue";

export default defineComponent({
    components: { DisplaysGameplayData, WordsManagerHeader, Modifier, Footer, ImportingResultCommunique },
    async setup() {
        const { loadGameplayFilesForPreview } = useLoader;
        const { previewModifySection, selectDataset, importingResult } = useModifier;
        // reset
        onBeforeUnmount(() => selectDataset(null));
        // load necessary data
        await loadGameplayFilesForPreview();
        return { previewModifySection, importingResult };
    },
});
</script>
