<template>
    <section id="select-icon" class="swap-item">
        <DisplayIconsList></DisplayIconsList>
        <footer>
            <button class="back" @click="displaySelectIconPanel = false">Go back</button>
            <SelectCustomIcon></SelectCustomIcon>
        </footer>
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
import SelectCustomIcon from "./SelectCustomIcon.vue";

export default defineComponent({
    components: { DisplayIconsList, RightSidePopup, SelectCustomIcon },
    async setup() {
        const { loadAllIcons, iconsList, betterIconName, iconName, displaySelectIconPanel } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        await loadAllIcons();

        return { betterIconName, iconsList, iconName, gameplaysIconPathResolver, displaySelectIconPanel };
    },
});
</script>
