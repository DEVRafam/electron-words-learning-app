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
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { datasetArchivedWords } = useModifier;
        const { currentWordsSection } = useModifier.useWordsManager;

        return { datasetArchivedWords, currentWordsSection };
    },
});
</script>
