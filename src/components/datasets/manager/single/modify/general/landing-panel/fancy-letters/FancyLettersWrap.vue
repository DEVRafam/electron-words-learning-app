<template>
    <section id="fancy-letters" class="form-box">
        <header>
            <label for="new-fancy-letter">Fancy letters</label>
            <ChangesCommunique target="fancyLetters" @undo="undo"></ChangesCommunique>
        </header>
        <Preview></Preview>
        <NewLetterForm :tabindex="tabindex"></NewLetterForm>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import Preview from "./Preview.vue";
import NewLetterForm from "./NewLetterForm.vue";
import ChangesCommunique from "@/components/datasets/manager/single/modify/general/landing-panel/ChangesCommunique.vue";

export default defineComponent({
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    components: { ChangesCommunique, Preview, NewLetterForm },
    setup() {
        const { datasetToModify } = useModifier;
        const { fancyLetters } = useModifier.useGeneralInformations;

        const undo = () => {
            fancyLetters.value = datasetToModify.value?.fancyLetters.clone() as string[];
        };

        return { undo };
    },
});
</script>
