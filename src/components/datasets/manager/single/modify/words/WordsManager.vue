<template>
    <section id="words-manager">
        <!-- v-teleport placeholder -->
        <div id="select-icon-popup-placeholder"></div>
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
        <BottomNavigation v-if="!isDatasetJustCreated && !loadExtendedContent" :class="{ hide: extendCurrentWordsSection || loadExtendedContent }"></BottomNavigation>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import NewWords from "./new_words/NewWords.vue";
import BottomNavigation from "./BottomNavigation.vue";
import CurrentWords from "./current_words/CurrentWordsWrap.vue";
import ArchivedWords from "./archive_words/ArchivedWordsWrap.vue";

export default defineComponent({
    components: { CurrentWords, NewWords, ArchivedWords, BottomNavigation },
    setup() {
        const { isDatasetJustCreated, loadExtendedContent, extendCurrentWordsSection } = useModifier;
        const { currentWordsSection, datasetCurrentWords, datasetArchivedWords } = useModifier.useWordsManager;

        return { datasetCurrentWords, datasetArchivedWords, currentWordsSection, isDatasetJustCreated, loadExtendedContent, extendCurrentWordsSection };
    },
});
</script>
