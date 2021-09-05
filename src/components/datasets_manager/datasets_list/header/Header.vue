<template>
    <header id="datasets-list-header">
        <header class="pinned-buttons">
            <RedirectToMenu></RedirectToMenu>
        </header>
        <!--  -->
        <BackgroundShapes></BackgroundShapes>
        <!--  -->
        <header class="top">
            <h1>Datasets <strong>Manager</strong></h1>
        </header>

        <div class="content">
            <Stats></Stats>
            <Management></Management>
        </div>
        <!--  -->
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BackgroundShapes from "@/components/datasets_manager/__communal/header/BackgroundShapes.vue";
import RedirectToMenu from "@/components/datasets_manager/__communal/header/RedirectToMenu.vue";
import Stats from "@/components/datasets_manager/datasets_list/header/Stats.vue";
import Management from "@/components/datasets_manager/datasets_list/header/Management.vue";

export default defineComponent({
    components: { BackgroundShapes, RedirectToMenu, Stats, Management },
});
</script>
