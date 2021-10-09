<template>
    <!--  -->
    <section class="pinned-buttons">
        <SaveButton></SaveButton>
        <!--  -->
        <ImportDataset v-if="isDatasetJustCreated"></ImportDataset>
        <!--  -->
        <button class="nav-btn" @click="inspectProgress" tabindex="-1" v-if="displayInspectProgressButton">
            <font-awesome-icon icon="chart-bar"></font-awesome-icon>
            <span>Inspect progress</span>
        </button>
        <!--  -->
        <RedirectToMenu></RedirectToMenu>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import router from "@/router/index";
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

import RedirectToMenu from "./RedirectToMenu.vue";
import SaveButton from "./SaveButton.vue";
import ImportDataset from "./ImportDataset.vue";

export default defineComponent({
    components: { RedirectToMenu, SaveButton, ImportDataset },
    setup() {
        const { gameplaysWithBlockedStatistics } = useLoader;
        const { nothingHasBeenChanged, displayExitModal, isDatasetJustCreated } = useModifier;
        const inspectProgress = () => {
            if (nothingHasBeenChanged.value)
                router.push({
                    name: "CertainDatasetStatistics",
                    params: {
                        datasetsName: router.currentRoute.value.params.datasetsName,
                    },
                });
            else displayExitModal.value = "stats";
        };
        const displayInspectProgressButton = computed<boolean>(() => {
            return !isDatasetJustCreated.value && !gameplaysWithBlockedStatistics.value.includes(router.currentRoute.value.params.datasetsName as string);
        });
        //
        return { inspectProgress, displayInspectProgressButton, isDatasetJustCreated };
    },
});
</script>
