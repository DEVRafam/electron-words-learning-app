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
// Tools
import { defineComponent, computed } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
// Components
import ArchiveWordsQuantity from "./ArchiveWordsQuantity.vue";
import SearchingBar from "@/components/datasets/manager/single/modify/words/__utils/management/SearchingBar.vue";
import OnlySelectedButton from "@/components/datasets/manager/single/modify/words/__utils/management/OnlySelectedButton.vue";
import SelectProgressFilter from "@/components/datasets/manager/single/modify/words/__utils/management/SelectProgressFilter.vue";

export default defineComponent({
    components: { SelectProgressFilter, ArchiveWordsQuantity, OnlySelectedButton, SearchingBar },
    setup() {
        const { useGeneralInformations, isAnyModalOpened, displayExitModal } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;
        const tabindex = computed<1 | -1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "archived" ? 1 : -1;
        });
        return { tabindex };
    },
});
</script>
