<template>
    <header>
        <ArchiveWordsQuantity></ArchiveWordsQuantity>
        <div class="right-side">
            <SelectProgressFilter></SelectProgressFilter>
            <OnlySelectedButton></OnlySelectedButton>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SelectProgressFilter from "./SelectProgress.vue";
import ArchiveWordsQuantity from "./ArchiveWordsQuantity.vue";
import OnlySelectedButton from "./OnlySelectedButton.vue";

export default defineComponent({
    components: { SelectProgressFilter, ArchiveWordsQuantity, OnlySelectedButton },
});
</script>
