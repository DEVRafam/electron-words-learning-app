<template>
    <TableHead></TableHead>
    <!--  -->
    <div id="new-words-list" class="table-wrap">
        <template v-if="words.length">
            <table id="new-words">
                <SingleRow v-for="(word, index) in words" :key="word.expected" :word="word" :index="index"></SingleRow>
            </table>
        </template>
        <!--  -->
        <template v-else>
            <NoWordsCommunique></NoWordsCommunique>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import TableHead from "./TableHead.vue";
import SingleRow from "./single_row/SingleRow.vue";
import NoWordsCommunique from "./NoWordsCommunique.vue";

export default defineComponent({
    components: { TableHead, SingleRow, NoWordsCommunique },
    setup() {
        const { words } = useWordsManager.tableFilters.news;
        return { words };
    },
});
</script>
