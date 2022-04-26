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
// Tools
import { defineComponent } from "vue";
// Composable
import { isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";
// Components
import RedirectToMenu from "./RedirectToMenu.vue";
import SaveButton from "./SaveButton.vue";
import ImportDataset from "./ImportDataset.vue";
import InspectProgress from "./InspectProgress.vue";

export default defineComponent({
    components: { RedirectToMenu, SaveButton, ImportDataset, InspectProgress },
    setup() {
        return { isDatasetJustCreated };
    },
});
</script>
