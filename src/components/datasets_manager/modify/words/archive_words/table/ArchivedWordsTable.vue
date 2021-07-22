<template>
    <ArchivedWordsHeader></ArchivedWordsHeader>
    <TableHead></TableHead>
    <div class="table-wrap">
        <TableContent></TableContent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import TableContent from "@/components/datasets_manager/modify/words/archive_words/table/TableContent.vue";
import TableHead from "@/components/datasets_manager/modify/words/archive_words/table/TableHead.vue";
import ArchivedWordsHeader from "@/components/datasets_manager/modify/words/archive_words/header/ArchivedWordsHeader.vue";

export default defineComponent({
    components: { TableHead, TableContent, ArchivedWordsHeader },
    async setup() {
        const { loadDatasetArchivedWords } = useWordsManager;
        await loadDatasetArchivedWords();
    },
});
</script>
