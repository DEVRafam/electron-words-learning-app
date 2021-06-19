<template>
    <section id="words-manager">
        <div id="words-wrap">
            <div id="words-swap" :class="{ active: moveWordsTables }">
                <CurrentWords class="swap-item" :key="datasetWords"></CurrentWords>
                <NewWords class="swap-item" :key="datasetWords"></NewWords>
            </div>
        </div>
        <!--  -->
        <div class="buttons-wrap">
            <button @click="moveWordsTables = false" :disabled="!moveWordsTables">Current words</button>
            <button @click="moveWordsTables = true" :disabled="moveWordsTables">New words</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";

import CurrentWords from "@/components/datasets_manager/modify/words/current_words/CurrentWordsWrap.vue";
import NewWords from "@/components/datasets_manager/modify/words/new_words/NewWords.vue";

export default defineComponent({
    components: { CurrentWords, NewWords },
    setup() {
        const { datasetWords, previewModifySection } = useModifiersManager;
        // Reset during discarding changes
        const moveWordsTables = ref<boolean>(false);
        watch(previewModifySection, () => (moveWordsTables.value = false));

        return { datasetWords, moveWordsTables };
    },
});
</script>
