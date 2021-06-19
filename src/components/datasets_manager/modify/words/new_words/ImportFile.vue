<template>
    <input type="file" style="display: none" ref="fileINP" @change="importOnInputChange" accept="text/plain,application/json" />
    <button @click="$refs.fileINP.click()">Import file</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { importOnInputChange } = useModifier;
        return { importOnInputChange };
    },
});
</script>
