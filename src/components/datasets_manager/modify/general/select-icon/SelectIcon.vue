<template>
    <section id="select-icon" class="swap-item">
        <label for="icon">Icon</label>
        <DisplayIconsList></DisplayIconsList>
        <button id="import-own-icon-button"><span>Select own icon</span></button>
        <!--  -->
        <!--  -->
        <!-- Teleported component -->
        <RightSidePopup></RightSidePopup>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_manager/useLoader";

import DisplayIconsList from "./DisplayIconList.vue";
import RightSidePopup from "./RightSidePopup.vue";

export default defineComponent({
    components: { DisplayIconsList, RightSidePopup },
    async setup() {
        const { loadAllIcons, iconsList, betterIconName, iconName } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        await loadAllIcons();

        return { betterIconName, iconsList, iconName, gameplaysIconPathResolver };
    },
});
</script>
