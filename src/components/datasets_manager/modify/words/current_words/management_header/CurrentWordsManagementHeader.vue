<template>
    <header id="current-words-management">
        <CurrentWordsQuantity></CurrentWordsQuantity>
        <div class="right-side">
            <SelectProgressFilter target="current"></SelectProgressFilter>
            <OnlySelectedButton target="current"></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SelectProgressFilter from "@/components/datasets_manager/modify/words/__utils/SelectProgressFilter.vue";
import CurrentWordsQuantity from "./CurrentWordsQuantity.vue";
import OnlySelectedButton from "@/components/datasets_manager/modify/words/__utils/OnlySelectedButton.vue";

export default defineComponent({
    components: { SelectProgressFilter, CurrentWordsQuantity, OnlySelectedButton },
});
</script>
