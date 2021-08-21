<template>
    <section id="landing-panel" class="swap-item">
        <Icon :tabindex="tabindex"></Icon>
        <TitleAndDescriptionForm :tabindex="tabindex"></TitleAndDescriptionForm>
        <PronunciationLanguage :tabindex="tabindex"></PronunciationLanguage>
        <FancyLetters :tabindex="tabindex"></FancyLetters>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import Icon from "@/components/datasets_manager/modify/general/landing-panel/icon/Icon.vue";
import FancyLetters from "@/components/datasets_manager/modify/general/landing-panel/fancy-letters/FancyLettersWrap.vue";
import TitleAndDescriptionForm from "@/components/datasets_manager/modify/general/landing-panel/TitleAndDescriptionForm.vue";
import PronunciationLanguage from "@/components/datasets_manager/modify/general/landing-panel/PronunciationLanguage.vue";

export default defineComponent({
    components: { FancyLetters, TitleAndDescriptionForm, Icon, PronunciationLanguage },
    setup() {
        const { useGeneralInformations, isDeletingModalOpen } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;

        const tabindex = computed<1 | -1>(() => {
            return !isDeletingModalOpen.value && !displaySelectIconPanel.value ? 1 : -1;
        });

        return { tabindex };
    },
});
</script>
