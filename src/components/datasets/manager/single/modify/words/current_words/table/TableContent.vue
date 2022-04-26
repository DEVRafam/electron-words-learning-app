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
// Tools
import { defineComponent } from "vue";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
// Components
import SingleRow from "./single_row/SingleRow.vue";
import NoResultsCommunique from "@/components/datasets/manager/single/modify/words/__utils/NoResultsCommunique.vue";

export default defineComponent({
    components: { NoResultsCommunique, SingleRow },
    setup() {
        const { words } = useWordsManager.tableFilters.current;
        return { words };
    },
});
</script>
