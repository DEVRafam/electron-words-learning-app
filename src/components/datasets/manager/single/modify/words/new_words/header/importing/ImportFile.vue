<template>
    <input type="file" style="display: none" ref="fileINP" @change="importOnInputChange" accept="text/plain,application/json" id="import-new-words-input" />
    <button @click="$refs.fileINP.click()" v-bind="$attrs">Import file</button>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    inheritAttrs: false,
    setup() {
        const { importOnInputChange } = useModifier.useImporting;
        return { importOnInputChange };
    },
});
</script>
