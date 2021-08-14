<template>
    <section class="landing-header">
        <slot></slot>
        <header class="top">
            <h1>Datasets <strong>Manager</strong></h1>
            <!--  -->
            <RedirectToMenu></RedirectToMenu>
        </header>

        <div class="content">
            <Stats></Stats>
            <Management></Management>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Stats from "./Stats.vue";
import Management from "./Management.vue";
import RedirectToMenu from "./RedirectToMenu.vue";

export default defineComponent({
    components: { Stats, Management, RedirectToMenu },
});
</script>
