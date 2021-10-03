<template>
    <button class="save" :disabled="blockSaveButton" @click="saveChanges" tabindex="-1">Save changes</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { blockSaveButton, saveChanges } = useModifier;
        //
        return { blockSaveButton, saveChanges };
    },
});
</script>
