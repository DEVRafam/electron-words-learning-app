<template>
    <header id="datasets-manager-header">
        <button id="window-scale-button" @click="biggerWindow = !biggerWindow" tabindex="-1">
            <font-awesome-icon icon="compress-alt" :class="{ active: biggerWindow }"></font-awesome-icon>
            <font-awesome-icon icon="expand-arrows-alt" :class="{ active: !biggerWindow }"></font-awesome-icon>
        </button>
        <!--  -->
        <div id="header-content-swap" :class="{ active: previewModifySection }">
            <!--  -->
            <LandingHedaer class="swap-item">
                <template #background-shapes>
                    <BackgroundShapes></BackgroundShapes>
                </template>
            </LandingHedaer>
            <!--  -->
            <CertainDatasetInfo class="swap-item">
                <template #background-shapes>
                    <BackgroundShapes></BackgroundShapes>
                </template>
            </CertainDatasetInfo>
            <!--  -->
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import LandingHedaer from "@/components/datasets_manager/header/landing/LandingHedaer.vue";
import CertainDatasetInfo from "@/components/datasets_manager/header/certain/CertainDatasetInfo.vue";
import BackgroundShapes from "./BackgroundShapes.vue";

export default defineComponent({
    components: { LandingHedaer, CertainDatasetInfo, BackgroundShapes },
    setup() {
        const { previewModifySection, biggerWindow } = useModifier;
        return { previewModifySection, biggerWindow };
    },
});
</script>
