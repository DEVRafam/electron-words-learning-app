<template>
    <section id="datasets-manager">
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
import useWordsManager from "@/composable/datasets_manager/useWordsManager";
import useModifier from "@/composable/datasets_manager/useModifier";

import DisplaysGameplayData from "@/components/datasets_manager/DisplaysGameplayData.vue";
import WordsManagerHeader from "@/components/datasets_manager/header/WordsManagerHeader.vue";
import Modifier from "@/components/datasets_manager/modify/Modifier.vue";
import Footer from "@/components/datasets_manager/Footer.vue";

export default defineComponent({
    components: { DisplaysGameplayData, WordsManagerHeader, Modifier, Footer },
    async setup() {
        const { loadGameplayFilesForPreview } = useWordsManager;
        const { previewModifySection, selectDataset } = useModifier;
        // reset
        onBeforeUnmount(() => selectDataset(null));
        // load necessary data
        await loadGameplayFilesForPreview();
        return { previewModifySection };
    },
});
</script>
