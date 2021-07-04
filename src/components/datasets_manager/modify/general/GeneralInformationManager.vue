<template>
    <section id="general-informations-manager">
        <NavigationButton></NavigationButton>

        <div class="general-information-swap" :class="{ active: displaySelectIconPanel }">
            <LandingPanel></LandingPanel>
            <SelectIcon></SelectIcon>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import NavigationButton from "./NavigationButton.vue";
import LandingPanel from "@/components/datasets_manager/modify/general/landing-panel/LandingPanel.vue";
import SelectIcon from "@/components/datasets_manager/modify/general/select-icon/SelectIcon.vue";

export default defineComponent({
    components: { LandingPanel, NavigationButton, SelectIcon },
    setup() {
        const { displaySelectIconPanel } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel };
    },
});
</script>
