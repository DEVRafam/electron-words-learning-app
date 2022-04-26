<template>
    <button @click="handleImportingUndo" v-if="displayUndoButton">Undo latest import</button>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { displayUndoButton, handleImportingUndo } = useModifier.useImporting;
        return { displayUndoButton, handleImportingUndo };
    },
});
</script>
