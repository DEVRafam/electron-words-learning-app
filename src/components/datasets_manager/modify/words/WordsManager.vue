<template>
    <section id="words-manager">
        <div id="select-icon-popup-placeholder"></div>

        <div id="words-wrap">
            <div id="words-swap" :class="currentWordsSection">
                <CurrentWords class="swap-item" :key="datasetWords"></CurrentWords>
                <NewWords class="swap-item" :key="datasetWords"></NewWords>
                <ArchivedWords class="swap-item" :key="datasetWords"></ArchivedWords>
            </div>
        </div>
        <!--  -->
        <div class="buttons-wrap">
            <div>
                <button @click="currentWordsSection = 'current'" :disabled="currentWordsSection === 'current'">Current words</button>
                <button @click="currentWordsSection = 'new'" :disabled="currentWordsSection === 'new'">New words</button>
            </div>
            <button @click="currentWordsSection = 'archive'" :disabled="currentWordsSection === 'archive'">Archived words</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import CurrentWords from "@/components/datasets_manager/modify/words/current_words/CurrentWordsWrap.vue";
import NewWords from "@/components/datasets_manager/modify/words/new_words/NewWords.vue";
import ArchivedWords from "@/components/datasets_manager/modify/words/archive_words/ArchivedWordsWrap.vue";

export default defineComponent({
    components: { CurrentWords, NewWords, ArchivedWords },
    setup() {
        const { datasetWords, previewModifySection } = useModifiersManager;
        // Reset during discarding changes
        const currentWordsSection = ref<"current" | "new" | "archive">("current");
        watch(previewModifySection, () => (currentWordsSection.value = "current"));

        return { datasetWords, currentWordsSection };
    },
});
</script>
