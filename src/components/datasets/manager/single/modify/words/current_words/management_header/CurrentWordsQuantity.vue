<template>
    <h3>
        <span v-html="title" class="title"></span>
        <strong>{{ wordsQuantity }}/{{ words.length }}</strong>
    </h3>
</template>

<script lang="ts">
// Tools
import { defineComponent, computed } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    setup() {
        const { useWordsManager } = useModifier;
        const { wordsToDelete, tableFilters } = useWordsManager;
        const { progress, words } = tableFilters.current;
        //
        const title = computed<string>(() => {
            let space = progress.value;
            if (progress.value === "all") space += " words";
            return `<span><span class="${progress.value}"> ${space}</span></span> `;
        });
        //
        const wordsQuantity = computed<number>(() => {
            let quantity = 0;
            words.value.forEach((word) => {
                if (wordsToDelete.value.includes(word)) quantity += 1;
            });
            return quantity;
        });
        return { title, wordsQuantity, words };
    },
});
</script>
