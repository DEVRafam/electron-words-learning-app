<template>
    <section id="select-icon" class="swap-item">
        <DisplayIconsList></DisplayIconsList>
        <footer>
            <button class="back" @click="displaySelectIconPanel = false" :tabindex="tabindex">Go back</button>
            <SelectCustomIcon :tabindex="tabindex"></SelectCustomIcon>
        </footer>
        <!--  -->
        <!--  -->
        <!-- Teleported component -->
        <RightSidePopup></RightSidePopup>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

import DisplayIconsList from "./DisplayIconList.vue";
import RightSidePopup from "./RightSidePopup.vue";
import SelectCustomIcon from "./SelectCustomIcon.vue";

export default defineComponent({
    components: { DisplayIconsList, RightSidePopup, SelectCustomIcon },
    async setup() {
        const { loadAllIcons, iconsList, betterIconName, iconName, displaySelectIconPanel } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;
        const tabindex = computed<-1 | 1>(() => {
            return displaySelectIconPanel.value ? 1 : -1;
        });

        await loadAllIcons();

        return { betterIconName, iconsList, iconName, gameplaysIconPathResolver, displaySelectIconPanel, tabindex };
    },
});
</script>
