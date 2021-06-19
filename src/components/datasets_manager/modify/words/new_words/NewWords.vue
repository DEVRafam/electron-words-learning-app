<template>
    <section id="new-words">
        <h3>
            <span>New current words </span>
            <strong>{{ newWords.length }}</strong>
        </h3>

        <AddWordForm></AddWordForm>
        <NewWordsList></NewWordsList>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import AddWordForm from "@/components/datasets_manager/modify/words/new_words/AddWordForm.vue";
import NewWordsList from "@/components/datasets_manager/modify/words/new_words/NewWordsList.vue";

export default defineComponent({
    components: { AddWordForm, NewWordsList },
    setup() {
        const { newWords } = useModifiersManager;
        return { newWords };
    },
});
</script>
