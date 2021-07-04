<template>
    <section id="landing-panel" class="swap-item">
        <div class="icon" :style="gameplaysIconPathResolver(iconName)"></div>
        <TitleAndDescriptionForm></TitleAndDescriptionForm>
        <FancyLetters></FancyLetters>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FancyLetters from "@/components/datasets_manager/modify/general/landing-panel/fancy-letters/FancyLettersWrap.vue";
import TitleAndDescriptionForm from "@/components/datasets_manager/modify/general/landing-panel/TitleAndDescriptionForm.vue";
//
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_manager/useLoader";

export default defineComponent({
    components: { FancyLetters, TitleAndDescriptionForm },
    setup() {
        const { iconName, displaySelectIconPanel } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        return { iconName, gameplaysIconPathResolver, displaySelectIconPanel };
    },
});
</script>
