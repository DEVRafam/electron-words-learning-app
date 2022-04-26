<template>
    <section id="general-informations-manager">
        <div class="general-information-swap" :class="{ active: displaySelectIconPanel }">
            <LandingPanel></LandingPanel>
            <SelectIcon></SelectIcon>
        </div>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Types
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import SelectIcon from "@/components/datasets/manager/single/modify/general/select-icon/SelectIcon.vue";
import LandingPanel from "@/components/datasets/manager/single/modify/general/landing-panel/LandingPanel.vue";

export default defineComponent({
    components: { LandingPanel, SelectIcon },
    setup() {
        const { displaySelectIconPanel } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel };
    },
});
</script>
