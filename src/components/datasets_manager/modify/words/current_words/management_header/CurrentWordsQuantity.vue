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
        const { wordsToDelete, tableFilters } = useWordsManager;
        const { progress, words } = tableFilters.current;
        //
        const title = computed<string>(() => {
            let space = "";
            if (progress.value !== "all") space = `<span class="${progress.value}"> ${progress.value}</span>`;
            return `<span>Delete${space} words </span>`;
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
