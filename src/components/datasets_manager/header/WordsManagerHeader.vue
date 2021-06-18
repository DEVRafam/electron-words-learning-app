<template>
    <header id="datasets-manager-header">
        <div id="header-content-swap" :class="{ active: previewModifySection }">
            <!--  -->
            <GeneralInfo class="swap-item"></GeneralInfo>
            <CertainDatasetInfo class="swap-item"></CertainDatasetInfo>
            <!--  -->
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import GeneralInfo from "@/components/datasets_manager/header/GeneralInfo.vue";
import CertainDatasetInfo from "@/components/datasets_manager/header/CertainDatasetInfo.vue";

export default defineComponent({
    components: { GeneralInfo, CertainDatasetInfo },
    setup() {
        const { previewModifySection } = useModifier;
        return { previewModifySection };
    },
});
</script>
