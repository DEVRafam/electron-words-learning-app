<template>
    <header>
        <h3>
            <span>New words </span>
            <strong>{{ newWords.length }}</strong>
        </h3>
        <div class="buttons-wrap">
            <SelectOrigin></SelectOrigin>
            <UndoImport></UndoImport>
            <ImportFile></ImportFile>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import ImportFile from "@/components/datasets_manager/modify/words/new_words/header/importing/ImportFile.vue";
import UndoImport from "@/components/datasets_manager/modify/words/new_words/header/importing/ImportingUndo.vue";
import SelectOrigin from "./OriginsFilter.vue";

export default defineComponent({
    components: { ImportFile, UndoImport, SelectOrigin },
    setup() {
        const { newWords } = useWordsManager;
        return { newWords };
    },
});
</script>
