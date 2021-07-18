<template>
    <section id="words-manager">
        <div id="select-icon-popup-placeholder"></div>
        <!--  -->
        <div id="words-wrap">
            <div id="words-swap" :class="currentWordsSection">
                <!-- 🚀 -->
                <!-- :key down below is pivotal, cuz we have to reload component, each time dataset changes -->
                <!-- cannot make that via vue-watcher in use Modifier, because then the loading screen of Suspense component -->
                <!-- would not appear -->
                <CurrentWords class="swap-item" :key="datasetCurrentWords"> </CurrentWords>
                <NewWords class="swap-item"></NewWords>
                <!-- same scenerio as above with <CurrentWords></CurrentWords> -->
                <ArchivedWords class="swap-item" :key="datasetArchivedWords"></ArchivedWords>
                <!-- 🚀 -->
            </div>
        </div>
        <!--  -->
        <BottomNavigation></BottomNavigation>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import CurrentWords from "@/components/datasets_manager/modify/words/current_words/CurrentWordsWrap.vue";
import NewWords from "@/components/datasets_manager/modify/words/new_words/NewWords.vue";
import ArchivedWords from "@/components/datasets_manager/modify/words/archive_words/ArchivedWordsWrap.vue";
import BottomNavigation from "@/components/datasets_manager/modify/words/BottomNavigation.vue";

export default defineComponent({
    components: { CurrentWords, NewWords, ArchivedWords, BottomNavigation },
    setup() {
        const { datasetCurrentWords, datasetArchivedWords } = useModifier;
        const { currentWordsSection } = useModifier.useWordsManager;

        return { datasetCurrentWords, datasetArchivedWords, currentWordsSection };
    },
});
</script>
