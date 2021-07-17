<template>
    <section id="select-gameplay-dataset">
        <!--  -->
        <h2 class="label">
            <span>Select </span>
            <span class="color">dataset</span>
            <span> from below:</span>
        </h2>

        <section class="datasets" :class="{ scrollable: dataToPreview.length > 3 }">
            <div class="single-gameplay-dataset" v-for="(gameplay, index) in dataToPreview" :key="index" @click="selectDataset(gameplay)">
                <h3>{{ gameplay.title }}</h3>
                <p>{{ gameplay.description }}</p>
                <div class="icon" :style="gameplaysIconPathResolver(gameplay)"></div>
                <strong class="amount-of-words"
                    >Amount of words: <span class="color">{{ gameplay.wordsAmount }}</span></strong
                >
            </div>
        </section>

        <router-link to="/"><span>Return</span></router-link>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useGameplay from "@/composable/gameplay/main";
import { GameplayDataFileForPreview } from "@/types/Gameplay";

//
export default defineComponent({
    async setup() {
        const { dataToPreview, loadGameplayFilesForPreview, gameplaysIconPathResolver } = useLoader;
        const { gameplayDataFile } = useGameplay;
        const selectDataset = (gameplay: GameplayDataFileForPreview) => {
            gameplayDataFile.value = gameplay;
        };
        await loadGameplayFilesForPreview();

        return { dataToPreview, selectDataset, gameplaysIconPathResolver };
    },
});
</script>
