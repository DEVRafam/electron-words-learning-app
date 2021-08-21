<template>
    <header>
        <ArchiveWordsQuantity></ArchiveWordsQuantity>
        <div class="right-side">
            <SearchingBar target="archived" :tabindex="tabindex"></SearchingBar>
            <SelectProgressFilter target="archived" :tabindex="tabindex"></SelectProgressFilter>
            <OnlySelectedButton target="archived" :tabindex="tabindex"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import useModifier from "@/composable/datasets_manager/useModifier";

import ArchiveWordsQuantity from "./ArchiveWordsQuantity.vue";
import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/management/SelectProgressFilter.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/management/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/management/SearchingBar.vue";

export default defineComponent({
    components: { SelectProgressFilter, ArchiveWordsQuantity, OnlySelectedButton, SearchingBar },
    setup() {
        const { useGeneralInformations, isDeletingModalOpen } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;
        const tabindex = computed<1 | -1>(() => {
            return !isDeletingModalOpen.value && !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "archived" ? 1 : -1;
        });
        return { tabindex };
    },
});
</script>
