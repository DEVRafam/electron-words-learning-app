<template>
    <header>
        <ArchiveWordsQuantity></ArchiveWordsQuantity>
        <div class="right-side">
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

export default defineComponent({
    components: { SelectProgressFilter, ArchiveWordsQuantity, OnlySelectedButton },
});
</script>
