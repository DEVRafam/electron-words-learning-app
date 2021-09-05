<template>
    <div class="table-wrap" :class="{ empty: words.length === 0 }">
        <table id="current-words-table">
            <!--  -->
            <template v-if="words.length">
                <template v-for="(word, index) in words" :key="word.expected + index">
                    <SingleRow :word="word" :index="index"></SingleRow>
                </template>
            </template>
            <!--  -->
            <NoResultsCommunique v-else target="current"></NoResultsCommunique>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import NoResultsCommunique from "@/components/datasets_manager/certain_datasets_manager/modify/words/__utils/NoResultsCommunique.vue";
import SingleRow from "./single_row/SingleRow.vue";

export default defineComponent({
    components: { NoResultsCommunique, SingleRow },
    setup() {
        const { words } = useWordsManager.tableFilters.current;
        return { words };
    },
});
</script>
