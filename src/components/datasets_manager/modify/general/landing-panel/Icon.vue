<template>
    <div class="form-box icon">
        <label @click="displaySelectIconPanel = true">Icon</label>
        <ChangesCommunique target="icon" @undo="undo"></ChangesCommunique>
        <div class="icon" :style="iconBackgroundImage"></div>
        <button class="change-icon" @click="displaySelectIconPanel = true" :tabindex="tabindex">Change</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import ChangesCommunique from "@/components/datasets_manager/modify/general/landing-panel/ChangesCommunique.vue";

export default defineComponent({
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    components: { ChangesCommunique },
    setup() {
        const { displaySelectIconPanel, iconBackgroundImage, iconName, customIcon, customIconURL } = useModifier.useGeneralInformations;
        const { datasetToModify } = useModifier;

        const hasChanged = computed<boolean>(() => {
            return !!customIcon.value || iconName.value !== datasetToModify.value?.icon;
        });

        const undo = () => {
            customIcon.value = null;
            customIconURL.value = null;
            iconName.value = datasetToModify.value?.icon as string;
        };

        return { displaySelectIconPanel, iconBackgroundImage, hasChanged, undo };
    },
});
</script>
