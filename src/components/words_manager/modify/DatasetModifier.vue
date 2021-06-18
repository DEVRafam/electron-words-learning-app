<template>
    <section id="dataset-modifier">
        <button @click="previewModifySection = false">Go back</button>
        {{ datasetToModify }}
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/words_manager/useModifier";

//
export default defineComponent({
    components: {},
    setup() {
        const { datasetToModify, previewModifySection } = useModifiersManager;
        return { datasetToModify, previewModifySection };
    },
});
</script>
