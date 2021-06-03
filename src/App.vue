<template>
    <BgCricles></BgCricles>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <main :key="$route.fullPath">
                <component :is="Component"></component>
            </main>
        </transition>
    </router-view>
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

<style lang="sass" scoped="true">
.fade-enter-active,
.fade-leave-active
    transition: opacity 0.15s ease


.fade-enter-from,
.fade-leave-active
    opacity: 0
</style>
