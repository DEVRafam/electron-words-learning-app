<template>
    <section id="landing-panel" class="swap-item">
        <div class="icon" :style="iconBackgroundImage"></div>
        <TitleAndDescriptionForm></TitleAndDescriptionForm>
        <FancyLetters></FancyLetters>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FancyLetters from "@/components/datasets_manager/modify/general/landing-panel/fancy-letters/FancyLettersWrap.vue";
import TitleAndDescriptionForm from "@/components/datasets_manager/modify/general/landing-panel/TitleAndDescriptionForm.vue";

import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    components: { FancyLetters, TitleAndDescriptionForm },
    setup() {
        const { displaySelectIconPanel, iconBackgroundImage } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel, iconBackgroundImage };
    },
});
</script>
