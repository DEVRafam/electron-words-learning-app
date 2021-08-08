<template>
    <section class="landing-header">
        <slot></slot>
        <header class="top">
            <h1>Datasets <strong>Manager</strong></h1>
            <router-link to="/" tabindex="-1">
                <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
                <span>Menu</span>
            </router-link>
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

export default defineComponent({
    components: { Stats, Management },
});
</script>
