<template>
    <section id="general-informations-manager">
        <BackgroundShapes></BackgroundShapes>
        <div class="general-information-swap" :class="{ active: displaySelectIconPanel }">
            <LandingPanel></LandingPanel>
            <SelectIcon></SelectIcon>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import LandingPanel from "@/components/datasets_manager/certain_datasets_manager/modify/general/landing-panel/LandingPanel.vue";
import SelectIcon from "@/components/datasets_manager/certain_datasets_manager/modify/general/select-icon/SelectIcon.vue";
import BackgroundShapes from "./BackgroundShapes.vue";

export default defineComponent({
    components: { LandingPanel, SelectIcon, BackgroundShapes },
    setup() {
        const { displaySelectIconPanel } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel };
    },
});
</script>
