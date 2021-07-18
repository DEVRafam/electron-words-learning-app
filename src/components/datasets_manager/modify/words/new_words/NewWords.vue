<template v-key="refreshKey">
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop">
        <!--  -->
        <DropFileHere v-if="dragging"></DropFileHere>
        <!--  -->
        <header>
            <h3>
                <span>New words </span>
                <strong>{{ newWords.length }}</strong>
            </h3>
            <div class="buttons-wrap">
                <UndoImport></UndoImport>
                <ImportFile></ImportFile>
            </div>
        </header>

        <AddWordForm></AddWordForm>
        <NewWordsTable></NewWordsTable>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsTable from "@/components/datasets_manager/modify/words/new_words/NewWordsTable.vue";
import ImportFile from "@/components/datasets_manager/modify/words/new_words/importing/ImportFile.vue";
import DropFileHere from "@/components/datasets_manager/modify/words/new_words/DropFileHere.vue";
import UndoImport from "@/components/datasets_manager/modify/words/new_words/importing/ImportingUndo.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsTable, ImportFile, DropFileHere, UndoImport },
    setup() {
        const { importOnDragAndDrop } = useModifier.useImporting;
        const { newWords } = useModifier.useWordsManager;
        // all this stuff to handle only the "dragging" css class, triggered while droping file
        const dragging = ref<boolean>(false);
        const refreshKey = ref<number>(1);
        window.addEventListener("focus", () => {
            refreshKey.value = refreshKey.value + 1;
            dragging.value = false;
        });
        window.addEventListener("blur", () => {
            refreshKey.value = refreshKey.value + 1;
            dragging.value = true;
        });
        //
        return { newWords, importOnDragAndDrop, dragging, refreshKey };
    },
});
</script>
