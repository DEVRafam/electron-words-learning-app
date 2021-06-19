<template v-key="refreshKey">
    <section id="new-words" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop">
        <!--  -->
        <span id="dragging-communique" v-if="dragging" @dragover.prevent @drop.stop.prevent="importOnDragAndDrop">
            <font-awesome-icon icon="file-upload"></font-awesome-icon>
            <h1>Drop file here</h1>
        </span>
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
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsList from "@/components/datasets_manager/modify/words/new_words/NewWordsList.vue";
import ImportFile from "@/components/datasets_manager/modify/words/new_words/ImportFile.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsList, ImportFile },
    setup() {
        const { newWords, importOnDragAndDrop } = useModifiersManager;
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
