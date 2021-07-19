<template>
    <CurrentWordsManagementHeader></CurrentWordsManagementHeader>
    <TableHead></TableHead>
    <div class="table-wrap">
        <table id="current-words-table">
            <TableContent></TableContent>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import TableHead from "./TableHead.vue";
import TableContent from "./TableContent.vue";
import CurrentWordsManagementHeader from "@/components/datasets_manager/modify/words/current_words/management_header/CurrentWordsManagementHeader.vue";

export default defineComponent({
    components: { TableHead, TableContent, CurrentWordsManagementHeader },
    async setup() {
        const { loadDatasetCurrentWords, loadCrucialWords } = useModifier;

        await loadDatasetCurrentWords();
        await loadCrucialWords();
    },
});
</script>
