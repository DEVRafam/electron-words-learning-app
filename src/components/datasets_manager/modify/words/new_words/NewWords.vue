<template v-key="refreshKey">
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop" @dragenter="dragging = true">
        <!--  -->
        <DropFileHere v-if="dragging" @dragleave="dragging = false"></DropFileHere>
        <!--  -->
        <NewWordsHeader :tabindex="tabindex"></NewWordsHeader>
        <!--  -->
        <AddWordForm :tabindex="tabindex"></AddWordForm>
        <NewWordsTable :tabindex="tabindex"></NewWordsTable>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import NewWordsHeader from "@/components/datasets_manager/modify/words/new_words/header/NewWordsHeader.vue";
import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsTable from "@/components/datasets_manager/modify/words/new_words/table/NewWordsTable.vue";
import DropFileHere from "@/components/datasets_manager/modify/words/new_words/DropFileHere.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsTable, DropFileHere, NewWordsHeader },
    setup() {
        const { isDatasetJustCreated, useWordsManager, useImporting } = useModifier;
        const { importOnDragAndDrop, dragging } = useImporting;
        const { currentWordsSection } = useWordsManager;

        const tabindex = computed<-1 | 1>(() => {
            return currentWordsSection.value === "new" || isDatasetJustCreated.value ? 1 : -1;
        });

        // all this stuff to handle only the "dragging" css class, triggered while droping file
        const refreshKey = ref<number>(1);
        document.ondragend = () => (dragging.value = false);

        return { importOnDragAndDrop, dragging, refreshKey, tabindex };
    },
});
</script>
