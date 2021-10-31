<template>
    <footer class="navigation">
        <div>
            <button @click="currentWordsSection = 'current'" :disabled="currentWordsSection === 'current'" :tabindex="tabindex">Current words</button>
            <button @click="currentWordsSection = 'new'" :disabled="currentWordsSection === 'new'" :tabindex="tabindex">New words</button>
        </div>
        <template v-if="datasetArchivedWords instanceof Array && datasetArchivedWords.length > 0">
            <button @click="currentWordsSection = 'archived'" :disabled="currentWordsSection === 'archived'" :tabindex="tabindex">Archived words</button>
        </template>
    </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { useWordsManager, useGeneralInformations, isAnyModalOpened, displayExitModal } = useModifier;
        const { currentWordsSection, datasetArchivedWords } = useWordsManager;
        const { displaySelectIconPanel } = useGeneralInformations;

        const tabindex = computed<1 | -1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && !displaySelectIconPanel.value ? 1 : -1;
        });

        return { tabindex, datasetArchivedWords, currentWordsSection };
    },
});
</script>
