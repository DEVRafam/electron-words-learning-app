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
        <RightSidePopup v-if="teleportDestinationExists" :teleportDestination="teleportDestination"></RightSidePopup>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import DisplayIconsList from "./DisplayIconList.vue";
import RightSidePopup from "./RightSidePopup.vue";
import SelectCustomIcon from "./SelectCustomIcon.vue";

export default defineComponent({
    components: { DisplayIconsList, RightSidePopup, SelectCustomIcon },
    async setup() {
        const teleportDestination = "div#select-icon-popup-placeholder";
        const teleportDestinationExists = ref<boolean>(false);

        const { useGeneralInformations, isAnyModalOpened, displayExitModal } = useModifier;
        const { loadAllIcons, displaySelectIconPanel } = useGeneralInformations;
        const tabindex = computed<-1 | 1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && displaySelectIconPanel.value ? 1 : -1;
        });

        await loadAllIcons();

        const checkIfTeleportDestinationExists = (): boolean => !!document.querySelector(teleportDestination);
        if (checkIfTeleportDestinationExists()) teleportDestinationExists.value = true;
        else {
            setTimeout(() => {
                if (checkIfTeleportDestinationExists()) teleportDestinationExists.value = true;
            });
        }

        return { displaySelectIconPanel, tabindex, teleportDestinationExists, teleportDestination };
    },
});
</script>
