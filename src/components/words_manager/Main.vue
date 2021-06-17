<template>
    <section id="words-manager">
        <WordsManagerHeader></WordsManagerHeader>
        <DisplaysGameplayData></DisplaysGameplayData>
        <router-link to="/" class="return"><span>Back</span></router-link>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/words_manager/useWordsManager";

import DisplaysGameplayData from "@/components/words_manager/DisplaysGameplayData.vue";
import WordsManagerHeader from "@/components/words_manager/WordsManagerHeader.vue";

export default defineComponent({
    components: { DisplaysGameplayData, WordsManagerHeader },
    async setup() {
        const { loadGameplayFilesForPreview } = useWordsManager;
        await loadGameplayFilesForPreview();
    },
});
</script>
