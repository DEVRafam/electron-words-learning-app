<template>
    <div class="form-box icon">
        <span class="changes-communique" :class="{ active: hasChanged }">Changed</span>
        <div class="icon" :style="iconBackgroundImage"></div>
        <button @click="displaySelectIconPanel = true">Change</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { displaySelectIconPanel, iconBackgroundImage, iconName, customIcon } = useModifier.useGeneralInformations;
        const { datasetToModify } = useModifier;

        const hasChanged = computed<boolean>(() => {
            return !!customIcon.value || iconName.value !== datasetToModify.value?.icon;
        });

        return { displaySelectIconPanel, iconBackgroundImage, hasChanged };
    },
});
</script>
