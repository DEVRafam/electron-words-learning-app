<template>
    <CurrentWordsManagementHeader></CurrentWordsManagementHeader>
    <TableHead></TableHead>
    <TableContent></TableContent>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
// Components
import TableHead from "./TableHead.vue";
import TableContent from "./TableContent.vue";
import CurrentWordsManagementHeader from "../management_header/CurrentWordsManagementHeader.vue";

export default defineComponent({
    components: { TableHead, TableContent, CurrentWordsManagementHeader },
    async setup() {
        const { loadDatasetCurrentWords, loadCrucialWords } = useWordsManager;

        await loadDatasetCurrentWords();
        await loadCrucialWords();
    },
});
</script>
