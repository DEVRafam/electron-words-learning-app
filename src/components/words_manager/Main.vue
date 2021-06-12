<template>
    <section id="words-manager">
        <h1>Words Manager</h1>
        <router-link to="/">Back</router-link>
        <DisplaysGameplayData></DisplaysGameplayData>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/words_manager/useWordsManager";

import DisplaysGameplayData from "@/components/words_manager/DisplaysGameplayData.vue";
//
export default defineComponent({
    components: { DisplaysGameplayData },
    async setup() {
        const { loadGameplayFilesForPreview } = useWordsManager;
        await loadGameplayFilesForPreview();
    },
});
</script>
