<template>
    <header>
        <ArchiveWordsQuantity></ArchiveWordsQuantity>
        <div class="right-side">
            <SearchingBar target="archived"></SearchingBar>
            <SelectProgressFilter target="archived"></SelectProgressFilter>
            <OnlySelectedButton target="archived"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ArchiveWordsQuantity from "./ArchiveWordsQuantity.vue";
import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/SelectProgressFilter.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/OnlySelectedButton.vue";
import SearchingBar from "@/components/datasets_manager/modify/words/__utils/SearchingBar.vue";

export default defineComponent({
    components: { SelectProgressFilter, ArchiveWordsQuantity, OnlySelectedButton, SearchingBar },
});
</script>
