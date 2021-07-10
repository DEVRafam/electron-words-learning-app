<template>
    <section id="landing-panel" class="swap-item">
        <Icon></Icon>
        <TitleAndDescriptionForm></TitleAndDescriptionForm>
        <FancyLetters></FancyLetters>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import Icon from "@/components/datasets_manager/modify/general/landing-panel/Icon.vue";
import FancyLetters from "@/components/datasets_manager/modify/general/landing-panel/fancy-letters/FancyLettersWrap.vue";
import TitleAndDescriptionForm from "@/components/datasets_manager/modify/general/landing-panel/TitleAndDescriptionForm.vue";

export default defineComponent({
    components: { FancyLetters, TitleAndDescriptionForm, Icon },
    setup() {
        const { displaySelectIconPanel, iconBackgroundImage } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel, iconBackgroundImage };
    },
});
</script>
