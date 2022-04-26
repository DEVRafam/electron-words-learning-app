<template>
    <div class="form-box icon">
        <label @click="displaySelectIconPanel = true">Icon</label>
        <ChangesCommunique target="icon" @undo="undo"></ChangesCommunique>
        <!--  -->
        <div class="icon" :style="iconBackgroundImage">
            <ThereIsNoIcon v-if="thereIsNoIcon" @open-icons-selection-panel="() => (displaySelectIconPanel = true)"></ThereIsNoIcon>
        </div>
        <!--  -->
        <button class="change-icon" @click="displaySelectIconPanel = true" :tabindex="tabindex" v-if="!thereIsNoIcon">Change</button>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed, PropType } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import ThereIsNoIcon from "./NoIconSelected.vue";
import ChangesCommunique from "@/components/datasets/manager/single/modify/general/landing-panel/ChangesCommunique.vue";

export default defineComponent({
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    components: { ChangesCommunique, ThereIsNoIcon },
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

        const thereIsNoIcon = computed<boolean>(() => {
            return datasetToModify.value?.icon === "__NONE__" && iconName.value === "__NONE__" && !customIcon.value;
        });

        return { displaySelectIconPanel, iconBackgroundImage, hasChanged, undo, thereIsNoIcon };
    },
});
</script>
