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
            <ExtendButton :tabindex="tabindex"></ExtendButton>
        </div>
    </header>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import ExtendButton from "./ExtendButton.vue";
import WordsTypeFilter from "./WordsTypeFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import SearchingBar from "@/components/datasets/manager/single/modify/words/__utils/management/SearchingBar.vue";
import OnlySelectedButton from "@/components/datasets/manager/single/modify/words/__utils/management/OnlySelectedButton.vue";
import SelectProgressFilter from "@/components/datasets/manager/single/modify/words/__utils/management/SelectProgressFilter.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton, SearchingBar, ExtendButton, WordsTypeFilter },
    setup() {
        const { useGeneralInformations, useWordsManager, isAnyModalOpened, displayExitModal, loadExtendedContent, extendCurrentWordsSection } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;
        const { wordsToDelete } = useWordsManager;
        const tabindex = computed<1 | -1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "current" ? 1 : -1;
        });
        return { tabindex, wordsToDelete, loadExtendedContent, extendCurrentWordsSection };
    },
});
</script>
