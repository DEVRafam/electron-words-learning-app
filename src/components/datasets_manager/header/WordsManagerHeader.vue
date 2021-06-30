<template>
    <header id="datasets-manager-header">
        <div id="header-content-swap" :class="{ active: previewModifySection }">
            <!--  -->
            <LandingHedaer class="swap-item"></LandingHedaer>
            <CertainDatasetInfo class="swap-item"></CertainDatasetInfo>
            <!--  -->
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import LandingHedaer from "@/components/datasets_manager/header/LandingHedaer.vue";
import CertainDatasetInfo from "@/components/datasets_manager/header/CertainDatasetInfo.vue";

export default defineComponent({
    components: { LandingHedaer, CertainDatasetInfo },
    setup() {
        const { previewModifySection } = useModifier;
        return { previewModifySection };
    },
});
</script>
