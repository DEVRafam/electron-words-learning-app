<template>
    <thead>
        <th>ID</th>
        <th>Expected</th>
        <th>Displayed</th>
        <th>Origin</th>
        <th>Action</th>
    </thead>
    <div id="new-words-list" class="table-wrap">
        <table id="new-words">
            <tr v-for="(item, index) in words" :key="index">
                <td class="center">{{ index + 1 }}</td>
                <td>{{ item.expected }}</td>
                <td>{{ item.displayed }}</td>
                <td class="center origin" :class="{ inscribed: item.origin === 'Inscribed' }">{{ item.origin }}</td>
                <td class="center">
                    <button @click="() => removeWord(index)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
//
export default defineComponent({
    setup() {
        const { newWords, tableFilters } = useWordsManager;
        const { words } = tableFilters.news;
        const removeWord = (index: number) => {
            newWords.value.splice(index, 1);
        };
        return { newWords, removeWord, words };
    },
});
</script>
