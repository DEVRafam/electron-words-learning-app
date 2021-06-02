<template>
    <BgCricles></BgCricles>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="JSON.stringify($route.params)"></component>
            </transition>
        </router-view>
    </main>
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
