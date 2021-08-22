<template>
    <button class="save" :disabled="datasetIsNotSelected || blockSaveButton" @click="saveChanges" tabindex="-1">Save changes</button>
    <button class="discard" :disabled="datasetIsNotSelected" @click="previewModifySection = false" tabindex="-1">Discard changes</button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { previewModifySection, blockSaveButton, saveChanges } = useModifier;
        const datasetIsNotSelected = computed<boolean>(() => !previewModifySection.value);
        //
        return { previewModifySection, blockSaveButton, saveChanges, datasetIsNotSelected };
    },
});
</script>
