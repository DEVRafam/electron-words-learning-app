<template>
    <section id="landing-panel" class="swap-item">
        <Icon :tabindex="tabindex"></Icon>
        <TitleAndDescriptionForm :tabindex="tabindex"></TitleAndDescriptionForm>
        <PronunciationLanguage :tabindex="tabindex"></PronunciationLanguage>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import Icon from "@/components/datasets/manager/single/modify/general/landing-panel/icon/Icon.vue";
import TitleAndDescriptionForm from "@/components/datasets/manager/single/modify/general/landing-panel/TitleAndDescriptionForm.vue";
import PronunciationLanguage from "@/components/datasets/manager/single/modify/general/landing-panel/PronunciationLanguage.vue";

export default defineComponent({
    components: { TitleAndDescriptionForm, Icon, PronunciationLanguage },
    setup() {
        const { useGeneralInformations, isAnyModalOpened, displayExitModal } = useModifier;
        const { displaySelectIconPanel } = useGeneralInformations;

        const tabindex = computed<1 | -1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && !displaySelectIconPanel.value ? 1 : -1;
        });

        return { tabindex };
    },
});
</script>
