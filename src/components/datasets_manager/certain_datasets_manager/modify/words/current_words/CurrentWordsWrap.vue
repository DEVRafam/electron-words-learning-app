<template>
    <section id="current-words">
        <Suspense>
            <template #default>
                <CurrentWordsTable></CurrentWordsTable>
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

import CurrentWordsTable from "@/components/datasets_manager/certain_datasets_manager/modify/words/current_words/table/CurrentWordsTable.vue";

export default defineComponent({
    components: { CurrentWordsTable },
});
</script>
