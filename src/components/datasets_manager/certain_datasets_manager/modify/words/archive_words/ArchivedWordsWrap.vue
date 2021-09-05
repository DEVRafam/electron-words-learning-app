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
import { defineComponent } from "vue";
import ArchivedWordsTable from "./table/ArchivedWordsTable.vue";

export default defineComponent({
    components: { ArchivedWordsTable },
});
</script>
