<template>
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop" @dragenter="dragging = true">
        <DropFileHere v-if="dragging" @dragleave="dragging = false"></DropFileHere>
        <!--  -->
        <NewWordsHeader :tabindex="tabindex" @open-modal="() => (displayModal = true)"></NewWordsHeader>
        <NewWordsTable :tabindex="tabindex" @open-modal="() => (displayModal = true)"></NewWordsTable>
        <!--  -->
        <AddNewWordModal v-if="displayModal" @close-modal="() => (displayModal = false)"></AddNewWordModal>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import NewWordsHeader from "@/components/datasets_manager/modify/words/new_words/header/NewWordsHeader.vue";
import NewWordsTable from "@/components/datasets_manager/modify/words/new_words/table/NewWordsTable.vue";
import DropFileHere from "@/components/datasets_manager/modify/words/new_words/DropFileHere.vue";
import AddNewWordModal from "@/components/datasets_manager/modify/words/new_words/add_new_word_modal/AddNewWordModal.vue";

export default defineComponent({
    components: { NewWordsTable, DropFileHere, NewWordsHeader, AddNewWordModal },
    setup() {
        const { isDatasetJustCreated, useWordsManager, useImporting, isAnyModalOpened, displayExitModal } = useModifier;
        const { importOnDragAndDrop, dragging } = useImporting;
        const { currentWordsSection } = useWordsManager;

        const displayModal = ref<boolean>(false);

        const tabindex = computed<-1 | 1>(() => {
            return !displayExitModal.value && !isAnyModalOpened.value && (currentWordsSection.value === "new" || isDatasetJustCreated.value) ? 1 : -1;
        });

        // all this stuff to handle only the "dragging" css class, triggered while droping file
        document.ondragend = () => (dragging.value = false);

        return { importOnDragAndDrop, dragging, tabindex, displayModal };
    },
});
</script>
