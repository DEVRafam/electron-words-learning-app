<template>
    <div class="icons-wrap">
        <div class="icon" v-for="(icon, index) in iconsList" :key="index" :style="gameplaysIconPathResolver(icon)" :class="{ selected: iconName === icon }" @click="iconName = icon"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useLoader from "@/composable/datasets_manager/useLoader";
//
export default defineComponent({
    components: {},
    setup() {
        const { iconsList, iconName } = useModifier.useGeneralInformations;
        const { gameplaysIconPathResolver } = useLoader;

        return { iconsList, iconName, gameplaysIconPathResolver };
    },
});
</script>
