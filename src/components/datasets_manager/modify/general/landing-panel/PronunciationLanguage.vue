<template>
    <div class="form-box pronunciation">
        <header>
            <label for="pronunciation">Pronunciation</label>
            <ChangesCommunique target="pronunciationLanguage" @undo="pronunciationLanguage = datasetToModify.pronunciationLanguage"></ChangesCommunique>
        </header>
        <select v-model="language" id="pronunciation" :tabindex="tabindex">
            <option :value="false">-Disabled-</option>
            <option value="english">English</option>
            <option value="germany">Germany</option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";
import ChangesCommunique from "@/components/datasets_manager/modify/general/landing-panel/ChangesCommunique.vue";

export default defineComponent({
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    components: { ChangesCommunique },
    setup() {
        const { language } = useGeneralInformations;
        return { language };
    },
});
</script>
