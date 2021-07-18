<template>
    <section id="current-words">
        <CurrentWordsManagementHeader></CurrentWordsManagementHeader>
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

import CurrentWordsTable from "@/components/datasets_manager/modify/words/current_words/table/CurrentWordsTable.vue";
import CurrentWordsManagementHeader from "@/components/datasets_manager/modify/words/current_words/management_header/CurrentWordsManagementHeader.vue";

export default defineComponent({
    components: { CurrentWordsTable, CurrentWordsManagementHeader },
});
</script>
