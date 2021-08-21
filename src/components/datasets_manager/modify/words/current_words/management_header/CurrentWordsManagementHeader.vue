<template>
    <header id="current-words-management">
        <CurrentWordsQuantity></CurrentWordsQuantity>
        <div class="right-side">
            <SearchingBar target="current" :tabindex="tabindex"></SearchingBar>
            <SelectProgressFilter target="current" :tabindex="tabindex"></SelectProgressFilter>
            <OnlySelectedButton target="current" :tabindex="tabindex" :key="wordsToDelete.length"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/management/SelectProgressFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/management/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/management/SearchingBar.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton, SearchingBar },
    setup() {
        const { useGeneralInformations, useWordsManager, isDeletingModalOpen } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;
        const { wordsToDelete } = useWordsManager;
        const tabindex = computed<1 | -1>(() => {
            return !isDeletingModalOpen.value && !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "current" ? 1 : -1;
        });
        return { tabindex, wordsToDelete };
    },
});
</script>
