<template>
    <header id="current-words-management">
        <CurrentWordsQuantity></CurrentWordsQuantity>
        <div class="right-side">
            <SearchingBar target="current" :tabindex="tabindex"></SearchingBar>
            <SelectProgressFilter target="current" :tabindex="tabindex"></SelectProgressFilter>
            <OnlySelectedButton target="current" :tabindex="tabindex"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";

import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/management/SelectProgressFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/management/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/management/SearchingBar.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton, SearchingBar },
    setup() {
        const { displaySelectIconPanel } = useGeneralInformations;
        const tabindex = computed<1 | -1>(() => {
            return !displaySelectIconPanel.value && useWordsManager.currentWordsSection.value === "current" ? 1 : -1;
        });
        return { tabindex };
    },
});
</script>
