<template>
    <input type="file" style="display: none" ref="fileINP" accept="image/png, image/jpeg" @change="selectCustomIcon" />

    <button id="import-own-icon-button" @click="handleButtonClick"><span>Custom icon</span></button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { selectCustomIcon } = useModifier.useGeneralInformations;
        const fileINP = ref<HTMLInputElement | null>(null);
        const handleButtonClick = () => fileINP.value?.click();
        //
        return { fileINP, handleButtonClick, selectCustomIcon };
    },
});
</script>
