<template>
    <section id="words-manager">
        <WordsManagerHeader></WordsManagerHeader>

        <div id="main-content-wrap" :class="{ active: previewModifySection }">
            <div id="main-content-swap">
                <DisplaysGameplayData class="swap-item"></DisplaysGameplayData>
                <DatasetModifier class="swap-item"></DatasetModifier>
            </div>
        </div>

        <router-link to="/" class="return"><span>Back</span></router-link>
    </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useWordsManager from "@/composable/words_manager/useWordsManager";
import useModifier from "@/composable/words_manager/useModifier";

import DisplaysGameplayData from "@/components/words_manager/DisplaysGameplayData.vue";
import WordsManagerHeader from "@/components/words_manager/header/WordsManagerHeader.vue";
import DatasetModifier from "@/components/words_manager/modify/DatasetModifier.vue";

export default defineComponent({
    components: { DisplaysGameplayData, WordsManagerHeader, DatasetModifier },
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
