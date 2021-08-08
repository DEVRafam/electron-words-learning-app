<template>
    <section id="words-manager">
        <!-- v-teleport placeholder -->
        <div id="select-icon-popup-placeholder"></div>
        <BackgroundShapes></BackgroundShapes>
        <!--  -->
        <div id="words-wrap">
            <div id="words-swap" :class="[currentWordsSection, { 'just-created': isDatasetJustCreated }]">
                <template v-if="!isDatasetJustCreated">
                    <!-- 🚀 -->
                    <!-- :key down below is pivotal, cuz we have to reload component, each time dataset changes -->
                    <!-- cannot make that via vue-watcher in use Modifier, because then the loading screen of Suspense component -->
                    <!-- would not appear -->
                    <CurrentWords class="swap-item" :key="datasetCurrentWords"> </CurrentWords>
                    <NewWords class="swap-item"></NewWords>
                    <!-- same scenerio as above with <CurrentWords></CurrentWords> -->
                    <ArchivedWords class="swap-item" :key="datasetArchivedWords"></ArchivedWords>
                    <!-- 🚀 -->
                </template>

                <template v-else>
                    <NewWords class="swap-item"></NewWords>
                </template>
            </div>
        </div>
        <!--  -->
        <BottomNavigation v-if="!isDatasetJustCreated"></BottomNavigation>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import CurrentWords from "@/components/datasets_manager/modify/words/current_words/CurrentWordsWrap.vue";
import NewWords from "@/components/datasets_manager/modify/words/new_words/NewWords.vue";
import ArchivedWords from "@/components/datasets_manager/modify/words/archive_words/ArchivedWordsWrap.vue";
import BottomNavigation from "@/components/datasets_manager/modify/words/BottomNavigation.vue";

import BackgroundShapes from "./BackgroundShapes.vue";

export default defineComponent({
    components: { CurrentWords, NewWords, ArchivedWords, BottomNavigation, BackgroundShapes },
    setup() {
        const { isDatasetJustCreated } = useModifier;
        const { currentWordsSection, datasetCurrentWords, datasetArchivedWords } = useModifier.useWordsManager;

        return { datasetCurrentWords, datasetArchivedWords, currentWordsSection, isDatasetJustCreated };
    },
});
</script>
