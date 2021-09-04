<template>
    <header id="stats-main-header">
        <h1>{{ dataset.title }}</h1>
        <!--  -->
        <span class="bg-shapes">
            <span class="bg-shape left-small"></span>
            <span class="bg-shape left-big"></span>
            <span class="bg-shape right-small"></span>
            <span class="bg-shape right-big"></span>
        </span>
        <!--  -->
        <section id="pinned-buttons">
            <router-link to="/"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon>Menu</router-link>
        </section>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { dataset } = useCertain;
        return { dataset };
    },
});
</script>
