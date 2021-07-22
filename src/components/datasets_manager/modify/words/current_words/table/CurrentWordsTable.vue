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
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import TableHead from "./TableHead.vue";
import TableContent from "./TableContent.vue";
import CurrentWordsManagementHeader from "@/components/datasets_manager/modify/words/current_words/management_header/CurrentWordsManagementHeader.vue";

export default defineComponent({
    components: { TableHead, TableContent, CurrentWordsManagementHeader },
    async setup() {
        const { loadDatasetCurrentWords, loadCrucialWords } = useWordsManager;

        await loadDatasetCurrentWords();
        await loadCrucialWords();
    },
});
</script>
