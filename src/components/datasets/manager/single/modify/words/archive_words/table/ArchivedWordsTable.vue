<template>
    <ArchivedWordsHeader></ArchivedWordsHeader>
    <TableHead></TableHead>
    <TableContent></TableContent>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
// Components
import TableHead from "@/components/datasets/manager/single/modify/words/archive_words/table/TableHead.vue";
import TableContent from "@/components/datasets/manager/single/modify/words/archive_words/table/TableContent.vue";
import ArchivedWordsHeader from "@/components/datasets/manager/single/modify/words/archive_words/header/ArchivedWordsHeader.vue";

export default defineComponent({
    components: { TableHead, TableContent, ArchivedWordsHeader },
    async setup() {
        const { loadDatasetArchivedWords } = useWordsManager;
        await loadDatasetArchivedWords();
    },
});
</script>
