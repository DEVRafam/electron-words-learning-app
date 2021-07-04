<template>
    <teleport to="div#select-icon-popup-placeholder">
        <div id="select-icon-popup" :class="CSSClass" :style="gameplaysIconPathResolver(iconName)"></div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_manager/useLoader";
//
export default defineComponent({
    setup() {
        const { displaySelectIconPanel, iconName } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        const CSSClass = computed<"hide" | "intro" | "outro">(() => {
            if (displaySelectIconPanel.value === null) return "hide";
            console.log(displaySelectIconPanel.value);
            return displaySelectIconPanel.value ? "intro" : "outro";
        });

        return { CSSClass, iconName, gameplaysIconPathResolver };
    },
});
</script>
