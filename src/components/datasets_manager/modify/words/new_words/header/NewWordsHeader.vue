<template>
    <header>
        <h3>
            <span>New words </span>
            <strong>{{ newWords.length }}</strong>
        </h3>
        <div class="buttons-wrap">
            <button :tabindex="tabindex" @click="$emit('open-modal')">Add</button>
            <SelectOrigin :tabindex="tabindex"></SelectOrigin>
            <UndoImport :tabindex="tabindex"></UndoImport>
            <ImportFile :tabindex="tabindex"></ImportFile>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

import ImportFile from "@/components/datasets_manager/modify/words/new_words/header/importing/ImportFile.vue";
import UndoImport from "@/components/datasets_manager/modify/words/new_words/header/importing/ImportingUndo.vue";
import SelectOrigin from "./OriginsFilter.vue";

export default defineComponent({
    components: { ImportFile, UndoImport, SelectOrigin },
    props: {
        tabindex: {
            type: Number as PropType<1 | -1>,
            required: true,
        },
    },
    emits: ["open-modal"],
    setup() {
        const { newWords } = useWordsManager;
        return { newWords };
    },
});
</script>
