<template>
    <div>
        <AnswersResultSummary></AnswersResultSummary>
        <Suspense :key="JSON.stringify(gameplayDataFile)">
            <template #default>
                <div>
                    <MainGameplayWindow v-if="Object.keys(gameplayDataFile).length"></MainGameplayWindow>
                    <SelectGameplayDataset v-else></SelectGameplayDataset>
                </div>
            </template>
            <!--  -->
            <template #fallback>
                <h1>Loading...</h1>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useGameplay from "@/composable/gameplay/main";
import { GameplayDataFileForPreview } from "@/types/Gameplay";

import AnswersResultSummary from "@/components/gameplay/AnswersResultBackground.vue";
import MainGameplayWindow from "@/components/gameplay/main_window/MainGameplayWindow.vue";
import SelectGameplayDataset from "@/components/gameplay/select_gameplay_dataset/SelectGameplayDataset.vue";

export default defineComponent({
    components: { AnswersResultSummary, MainGameplayWindow, SelectGameplayDataset },
    setup() {
        const { gameplayDataFile } = useGameplay;
        onBeforeUnmount(() => (gameplayDataFile.value = {} as GameplayDataFileForPreview));
        return { gameplayDataFile };
    },
});
</script>
