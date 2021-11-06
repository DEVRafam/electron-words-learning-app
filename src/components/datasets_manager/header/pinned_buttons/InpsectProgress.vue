<template>
    <button class="nav-btn" @click="inspectProgress" tabindex="-1" v-if="displayInspectProgressButton" ref="navButton">
        <font-awesome-icon icon="chart-bar"></font-awesome-icon>
        <span>Inspect progress</span>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import router from "@/router/index";

import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifier from "@/composable/datasets_manager/useModifier";
import useKeydown from "@/composable/useKeydown";

export default defineComponent({
    setup() {
        const navButton = ref<HTMLElement>();
        const { gameplaysWithBlockedStatistics } = useLoader;
        const { nothingHasBeenChanged, displayExitModal, isDatasetJustCreated } = useModifier;
        const displayInspectProgressButton = computed<boolean>(() => {
            return !isDatasetJustCreated.value && !gameplaysWithBlockedStatistics.value.includes(router.currentRoute.value.params.datasetsName as string);
        });
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
        useKeydown([
            {
                key: "p",
                fn: inspectProgress,
                ctrl: true,
            },
        ]);

        return { inspectProgress, displayInspectProgressButton, isDatasetJustCreated, navButton };
    },
});
</script>
