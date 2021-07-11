<template>
    <header>
        <h3>
            <span>Delete current words </span>
            <strong>({{ wordsToDelete.length }} of {{ datasetCurrentWords.length }})</strong>
        </h3>
        <button :disabled="wordsToDelete.length === 0" @click="onlySelected = !onlySelected">
            {{ onlySelected ? "Show all" : "Show selected" }}
        </button>
    </header>
    <div class="table-wrap">
        <table>
            <thead>
                <th>ID</th>
                <th>Expected</th>
                <th>Displayed</th>
                <th>Action</th>
            </thead>
            <!-- DISPLAY ONLY WORDS PREPARED FOR DELETE -->
            <template v-if="onlySelected">
                <tr v-for="(item, index) in wordsToDelete" :key="index" class="predeleted">
                    <td class="center">{{ index + 1 }}</td>
                    <td class="clickable" @click="prepareWordForDeleting(item)">{{ item.expected }}</td>
                    <td>{{ item.displayed }}</td>
                    <td class="center">
                        <button @click="prepareWordForDeleting(item)">{{ buttonMsg(item) }}</button>
                    </td>
                </tr>
            </template>
            <!-- DEFAULT BEHAVIOUR- DISPLAY ALL WORDS -->
            <template v-else>
                <tr v-for="(item, index) in datasetCurrentWords" :key="index" :class="{ predeleted: isWordInDeletingList(item) }">
                    <td class="center">{{ index + 1 }}</td>
                    <td class="clickable" @click="prepareWordForDeleting(item)">{{ item.expected }}</td>
                    <td>{{ item.displayed }}</td>
                    <td class="center">
                        <button @click="prepareWordForDeleting(item)">{{ buttonMsg(item) }}</button>
                    </td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import Word from "@/types/Word";

export default defineComponent({
    async setup() {
        const { datasetCurrentWords, loadDatasetCurrentWords } = useModifier;
        const { isWordInDeletingList, prepareWordForDeleting, wordsToDelete } = useModifier.useWordsManager;
        // Component exclusive features
        const buttonMsg = (word: Word): "Delete" | "Undo" => {
            return isWordInDeletingList(word) ? "Undo" : "Delete";
        };
        const onlySelected = ref<boolean>(false);
        watch(
            wordsToDelete,
            (val) => {
                if (val.length === 0) onlySelected.value = false;
            },
            { deep: true }
        );
        //
        await loadDatasetCurrentWords();
        //
        return { onlySelected, datasetCurrentWords, isWordInDeletingList, prepareWordForDeleting, buttonMsg, wordsToDelete };
    },
});
</script>
