<template>
    <div class="form-box pronunciation">
        <header>
            <label for="pronunciation">Pronunciation</label>
            <ChangesCommunique target="pronunciationLanguage" @undo="language = datasetToModify.pronunciationLanguage"></ChangesCommunique>
        </header>
        <select v-model="language" id="pronunciation" :tabindex="tabindex">
            <option :value="false">-Disabled-</option>
            <option value="english">English</option>
            <option value="germany">Germany</option>
        </select>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import ChangesCommunique from "@/components/datasets/manager/single/modify/general/landing-panel/ChangesCommunique.vue";

export default defineComponent({
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    components: { ChangesCommunique },
    setup() {
        const { useGeneralInformations, datasetToModify } = useModifier;
        const { language } = useGeneralInformations;
        return { language, datasetToModify };
    },
});
</script>
