<template>
    <h3>
        <span v-html="title" class="title"></span>
        <strong>{{ wordsQuantity }}/{{ words.length }}</strong>
    </h3>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { useWordsManager } = useModifier;
        const { wordsToRestore, tableFilters } = useWordsManager;
        const { progress, words } = tableFilters.archived;
        //
        const title = computed<string>(() => {
            let space = "";
            if (progress.value !== "all") space = `<span class="${progress.value}"> ${progress.value}</span>`;
            return `<span>Restore${space} words </span>`;
        });
        //
        const wordsQuantity = computed<number>(() => {
            let quantity = 0;
            words.value.forEach((word) => {
                if (wordsToRestore.value.includes(word)) quantity += 1;
            });
            return quantity;
        });
        return { title, wordsQuantity, words };
    },
});
</script>
