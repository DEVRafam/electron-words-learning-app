<template>
    <BgCricles></BgCricles>
    <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";

import BgCricles from "@/components/BackgroundCircles.vue";

export default defineComponent({
    name: "Home",
    components: {
        BgCricles,
    },
});
</script>
