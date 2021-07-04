<template>
    <button tabindex="-1" @click="displaySelectIconPanel = !displaySelectIconPanel" id="navigation-between-sections">
        <span :class="{ active: displaySelectIconPanel }">Go back</span>
        <span :class="{ active: !displaySelectIconPanel }">Change icon</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { displaySelectIconPanel } = useModifier.useGeneralInformations;
        return { displaySelectIconPanel };
    },
});
</script>
