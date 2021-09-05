<template>
    <button class="nav-btn" @click="inspectProgress" tabindex="-1">
        <font-awesome-icon icon="chart-bar"></font-awesome-icon>
        <span>Inspect progress</span>
    </button>

    <button class="nav-btn" @click="datasetlist" tabindex="-1">
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        <span>Datasets list</span>
    </button>

    <RedirectToMenu></RedirectToMenu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router/index";
import RedirectToMenu from "@/components/datasets_manager/__communal/header/RedirectToMenu.vue";
export default defineComponent({
    components: { RedirectToMenu },
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
