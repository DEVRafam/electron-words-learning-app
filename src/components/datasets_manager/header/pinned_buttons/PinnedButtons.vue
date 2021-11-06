<template>
    <!--  -->
    <section class="pinned-buttons">
        <SaveButton></SaveButton>
        <ImportDataset v-if="isDatasetJustCreated"></ImportDataset>
        <InspectProgress></InspectProgress>
        <RedirectToMenu></RedirectToMenu>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";

import RedirectToMenu from "./RedirectToMenu.vue";
import SaveButton from "./SaveButton.vue";
import ImportDataset from "./ImportDataset.vue";
import InspectProgress from "./InpsectProgress.vue";

export default defineComponent({
    components: { RedirectToMenu, SaveButton, ImportDataset, InspectProgress },
    setup() {
        return { isDatasetJustCreated };
    },
});
</script>
