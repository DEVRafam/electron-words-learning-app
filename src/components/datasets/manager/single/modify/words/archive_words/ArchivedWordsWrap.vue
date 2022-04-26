<template>
    <section id="archived-words">
        <Suspense>
            <template #default>
                <ArchivedWordsTable></ArchivedWordsTable>
            </template>
            <!--  -->
            <template #fallback>
                <h1>Loading...</h1>
            </template>
        </Suspense>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Components
import ArchivedWordsTable from "./table/ArchivedWordsTable.vue";

export default defineComponent({
    components: { ArchivedWordsTable },
});
</script>
