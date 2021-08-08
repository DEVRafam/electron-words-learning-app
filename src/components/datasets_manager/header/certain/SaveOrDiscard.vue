<template>
    <div class="buttons-wrap">
        <button class="save" :disabled="blockSaveButton" @click="saveChanges" tabindex="-1">Save</button>
        <button class="discard" @click="previewModifySection = false" tabindex="-1">Discard</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { previewModifySection, blockSaveButton, saveChanges } = useModifier;
        //
        return { previewModifySection, blockSaveButton, saveChanges };
    },
});
</script>
