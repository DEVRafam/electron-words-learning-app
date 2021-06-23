<template>
    <button @click="handleImportingUndo" v-if="displayUndoButton">Undo latest import</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { displayUndoButton, handleImportingUndo } = useModifier;
        return { displayUndoButton, handleImportingUndo };
    },
});
</script>
