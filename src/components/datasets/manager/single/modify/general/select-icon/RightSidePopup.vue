<template>
    <teleport :to="teleportDestination">
        <div id="select-icon-popup" :class="CSSClass" :style="iconBackgroundImage"></div>
    </teleport>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed, PropType } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    props: {
        teleportDestination: {
            type: String as PropType<string>,
            required: true,
        },
    },
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
