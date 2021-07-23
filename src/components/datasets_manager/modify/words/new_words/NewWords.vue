<template v-key="refreshKey">
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop">
        <!--  -->
        <DropFileHere v-if="dragging"></DropFileHere>
        <!--  -->
        <NewWordsHeader></NewWordsHeader>
        <!--  -->
        <AddWordForm></AddWordForm>
        <NewWordsTable></NewWordsTable>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useImporting from "@/composable/datasets_manager/submodules/useImporting";

import NewWordsHeader from "@/components/datasets_manager/modify/words/new_words/header/NewWordsHeader.vue";
import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsTable from "@/components/datasets_manager/modify/words/new_words/NewWordsTable.vue";
import DropFileHere from "@/components/datasets_manager/modify/words/new_words/DropFileHere.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsTable, DropFileHere, NewWordsHeader },
    setup() {
        const { importOnDragAndDrop } = useImporting;
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
        return { importOnDragAndDrop, dragging, refreshKey };
    },
});
</script>
