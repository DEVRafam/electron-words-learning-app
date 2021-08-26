<template>
    <section id="statistics-menu">
        <template v-for="fileName in datasetsFilesName" :key="fileName">
            <router-link :to="`/statistics/${fileName}`">{{ fileName }}</router-link>
            <br />
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMenu from "@/composable/statistics/menu/useMenu";

export default defineComponent({
    async setup() {
        const { datasetsFilesName, loadAllDatasetsNames } = useMenu;
        loadAllDatasetsNames();

        return { datasetsFilesName };
    },
});
</script>
