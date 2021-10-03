<template>
    <!--  -->
    <section class="pinned-buttons">
        <SaveButton></SaveButton>
        <!--  -->
        <button class="nav-btn" @click="inspectProgress" tabindex="-1">
            <font-awesome-icon icon="chart-bar"></font-awesome-icon>
            <span>Inspect progress</span>
        </button>
        <!--  -->
        <RedirectToMenu></RedirectToMenu>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router/index";

import RedirectToMenu from "./RedirectToMenu.vue";
import SaveButton from "./SaveButton.vue";

export default defineComponent({
    components: { RedirectToMenu, SaveButton },
    setup() {
        const datasetlist = () => router.push({ name: "DatasetsList" });
        const inspectProgress = () =>
            router.push({
                name: "CertainDatasetStatistics",
                params: {
                    datasetsName: router.currentRoute.value.params.datasetsName,
                },
            });
        //
        return { datasetlist, inspectProgress };
    },
});
</script>
