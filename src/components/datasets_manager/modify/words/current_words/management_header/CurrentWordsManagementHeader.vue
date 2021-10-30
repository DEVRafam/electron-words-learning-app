<template>
    <header id="current-words-management">
        <CurrentWordsQuantity></CurrentWordsQuantity>
        <div class="right-side">
            <template v-if="extendCurrentWordsSection && loadExtendedContent">
                <WordsTypeFilter :tabindex="tabindex"></WordsTypeFilter>
                <OnlySelectedButton target="current" :tabindex="tabindex" :key="wordsToDelete.length" style="margin-right: 10px"></OnlySelectedButton>
            </template>

            <SearchingBar target="current" :tabindex="tabindex"></SearchingBar>
            <SelectProgressFilter target="current" :tabindex="tabindex"></SelectProgressFilter>
            <ExtendButton></ExtendButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/management/SelectProgressFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import ExtendButton from "./ExtendButton.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/management/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/management/SearchingBar.vue";
import WordsTypeFilter from "./WordsTypeFilter.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton, SearchingBar, ExtendButton, WordsTypeFilter },
    setup() {
        const { useGeneralInformations, useWordsManager, isDeletingModalOpen, displayExitModal, loadExtendedContent, extendCurrentWordsSection } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;
        const { wordsToDelete } = useWordsManager;
        const tabindex = computed<1 | -1>(() => {
            return !displayExitModal.value && !isDeletingModalOpen.value && !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "current" ? 1 : -1;
        });
        return { tabindex, wordsToDelete, loadExtendedContent, extendCurrentWordsSection };
    },
});
</script>
