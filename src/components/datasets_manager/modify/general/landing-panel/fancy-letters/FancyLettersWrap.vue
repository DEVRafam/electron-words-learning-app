<template>
    <section id="fancy-letters" class="form-box">
        <header>
            <label>Fancy letters</label>
            <span class="changes-communique" :class="{ active: hasChanged }">Changed</span>
        </header>
        <Preview></Preview>
        <NewLetterForm></NewLetterForm>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import NewLetterForm from "./NewLetterForm.vue";
import Preview from "./Preview.vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    components: { Preview, NewLetterForm },
    setup() {
        const { datasetToModify } = useModifier;
        const { fancyLetters } = useModifier.useGeneralInformations;

        const hasChanged = computed<boolean>(() => {
            return JSON.stringify(fancyLetters.value) != JSON.stringify(datasetToModify.value?.fancyLetters);
        });

        return { hasChanged };
    },
});
</script>
