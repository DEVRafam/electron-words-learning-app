<template>
    <div>
        <Suspense :key="JSON.stringify(gameplayDataFile)">
            <template #default>
                <div>
                    <template v-if="Object.keys(gameplayDataFile).length">
                        <MainGameplayWindow></MainGameplayWindow>
                        <AnswersResultSummary></AnswersResultSummary>
                    </template>
                    <SelectGameplayDataset v-else :callback="(val) => (gameplayDataFile = val)" label="Gameplay"></SelectGameplayDataset>
                </div>
            </template>
            <!--  -->
            <template #fallback>
                <LoadingScreen></LoadingScreen>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useGameplay from "@/composable/gameplay/useMain";
import { DatasetFileForPreview } from "@/types/Dataset";

import AnswersResultSummary from "@/components/gameplay/AnswersResultBackground.vue";
import MainGameplayWindow from "@/components/gameplay/main_window/MainGameplayWindow.vue";
import SelectGameplayDataset from "@/components/__global/datasets_selector/DatasetsSelector.vue";

export default defineComponent({
    components: { AnswersResultSummary, MainGameplayWindow, SelectGameplayDataset },
    setup() {
        const { gameplayDataFile } = useGameplay;
        onBeforeUnmount(() => (gameplayDataFile.value = {} as DatasetFileForPreview));
        return { gameplayDataFile };
    },
});
</script>
