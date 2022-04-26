<template>
    <input type="file" style="display: none" ref="fileINP" accept="image/png, image/jpeg" id="select-custom-icon" tabindex="-1" @change="selectCustomIcon" />

    <button id="import-own-icon-button" @click="handleButtonClick" v-bind="$attrs"><span>Select custom icon</span></button>
</template>

<script lang="ts">
// Tools
import { defineComponent, ref } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    inheritAttrs: false,
    setup() {
        const { selectCustomIcon } = useModifier.useGeneralInformations;
        const fileINP = ref<HTMLInputElement | null>(null);
        const handleButtonClick = () => fileINP.value?.click();
        //
        return { fileINP, handleButtonClick, selectCustomIcon };
    },
});
</script>
