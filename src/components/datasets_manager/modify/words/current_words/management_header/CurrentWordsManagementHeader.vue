<template>
    <header id="current-words-management">
        <CurrentWordsQuantity></CurrentWordsQuantity>
        <div class="right-side">
            <SearchingBar target="current"></SearchingBar>
            <SelectProgressFilter target="current"></SelectProgressFilter>
            <OnlySelectedButton target="current"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/management/SelectProgressFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/management/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/management/SearchingBar.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton, SearchingBar },
});
</script>
