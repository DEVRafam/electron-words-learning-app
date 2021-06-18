<template>
    <section id="dataset-modifier">
        {{ datasetToModify }}
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

//
export default defineComponent({
    components: {},
    setup() {
        const { datasetToModify, previewModifySection } = useModifiersManager;
        return { datasetToModify, previewModifySection };
    },
});
</script>
