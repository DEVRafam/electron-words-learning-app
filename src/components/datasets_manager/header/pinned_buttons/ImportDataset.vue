<template>
    <input type="file" accept="application/json" style="display: none" ref="inp-btn" @change="handleImporting" />
    <button class="nav-btn" @click="() => $refs['inp-btn'].click()" tabindex="-1">
        <font-awesome-icon icon="file-import"></font-awesome-icon>
        <span>Import</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useImporting from "@/composable/datasets_manager/submodules/useImporting";
import InputFile from "@/types/FileInputEvent";

export default defineComponent({
    setup() {
        const { importDataset, importingResult } = useImporting;
        const handleImporting = async (e: InputFile) => {
            if (await importDataset(e)) {
                importingResult.value = "positive";
            } else {
                importingResult.value = "negative";
            }
        };
        return { handleImporting };
    },
});
</script>
