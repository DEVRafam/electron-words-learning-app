<template>
    <footer class="navigation">
        <div>
            <button @click="currentWordsSection = 'current'" :disabled="currentWordsSection === 'current'">Current words</button>
            <button @click="currentWordsSection = 'new'" :disabled="currentWordsSection === 'new'">New words</button>
        </div>
        <template v-if="datasetArchivedWords instanceof Array && datasetArchivedWords.length > 0">
            <button @click="currentWordsSection = 'archive'" :disabled="currentWordsSection === 'archive'">Archived words</button>
        </template>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { currentWordsSection, datasetArchivedWords } = useWordsManager;

        return { datasetArchivedWords, currentWordsSection };
    },
});
</script>
