<template>
    <span id="there-are-no-new-words" :class="{ 'move-down': !isDatasetJustCreated }">
        <span class="bg-shape"></span><span class="bg-shape"></span>
        <font-awesome-icon icon="globe-europe" class="globe"></font-awesome-icon>
        <h4>There are no new words <span class="color">yet</span></h4>
        <h2>Add some</h2>
        <footer>
            <button @click="triggerImport">Import</button>
            <button @click="triggerInscribe">Inscribe</button>
        </footer>
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
export default defineComponent({
    setup() {
        const { isDatasetJustCreated } = useModifier;
        const triggerImport = () => {
            document.getElementById("import-new-words-input")?.click();
        };
        const triggerInscribe = () => {
            document.getElementById("new-word-expectation")?.focus();
        };
        //
        return { triggerImport, triggerInscribe, isDatasetJustCreated };
    },
});
</script>
