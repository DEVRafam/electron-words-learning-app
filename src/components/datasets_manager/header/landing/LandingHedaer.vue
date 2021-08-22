<template>
    <section class="landing-header">
        <slot name="background-shapes"></slot>
        <header class="top">
            <h1>Datasets <strong>Manager</strong></h1>
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
