<template>
    <section id="general-informations-manager">
        <div class="icon" :style="gameplaysIconPathResolver(iconName)">
            <button tabindex="-1">Change</button>
        </div>
        <TitleAndDescriptionForm></TitleAndDescriptionForm>
        <FancyLetters></FancyLetters>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FancyLetters from "@/components/datasets_manager/modify/general/fancy-letters/FancyLettersWrap.vue";
import TitleAndDescriptionForm from "@/components/datasets_manager/modify/general/TitleAndDescriptionForm.vue";
//
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_manager/useLoader";

export default defineComponent({
    components: { FancyLetters, TitleAndDescriptionForm },
    setup() {
        const { iconName } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        return { iconName, gameplaysIconPathResolver };
    },
});
</script>
