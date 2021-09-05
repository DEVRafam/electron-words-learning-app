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
            <button tabindex="-1" @click="modifyRoute"><font-awesome-icon icon="cog"></font-awesome-icon>Modify</button>
            <button tabindex="-1" @click="menuRoute"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon>Menu</button>
        </section>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router/index";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { dataset } = useCertain;
        const menuRoute = () => router.push({ path: "/" });
        const modifyRoute = () =>
            router.push({
                name: "CertainDatasetManager",
                params: {
                    datasetsName: router.currentRoute.value.params.datasetsName,
                },
            });
        return { dataset, menuRoute, modifyRoute };
    },
});
</script>
