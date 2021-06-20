<template v-key="refreshKey">
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop">
        <!--  -->
        <DropFileHere v-if="dragging"></DropFileHere>
        <!--  -->
        <header>
            <h3>
                <span>New current words </span>
                <strong>{{ newWords.length }}</strong>
            </h3>
            <ImportFile></ImportFile>
        </header>

        <AddWordForm></AddWordForm>
        <NewWordsList></NewWordsList>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsList from "@/components/datasets_manager/modify/words/new_words/NewWordsList.vue";
import ImportFile from "@/components/datasets_manager/modify/words/new_words/ImportFile.vue";
import DropFileHere from "@/components/datasets_manager/modify/words/new_words/DropFileHere.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsList, ImportFile, DropFileHere },
    setup() {
        const { newWords, importOnDragAndDrop } = useModifier;
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
