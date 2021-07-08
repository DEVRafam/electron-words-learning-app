<template>
    <teleport to="div#select-icon-popup-placeholder">
        <div id="select-icon-popup" :class="CSSClass" :style="iconBackgroundImage"></div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { displaySelectIconPanel, iconBackgroundImage } = useModifier.useGeneralInformations;

        const CSSClass = computed<"hide" | "intro" | "outro">(() => {
            if (displaySelectIconPanel.value === null) return "hide";
            return displaySelectIconPanel.value ? "intro" : "outro";
        });

        return { CSSClass, iconBackgroundImage };
    },
});
</script>
