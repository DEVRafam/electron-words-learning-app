<template>
    <section id="landing">
        <Summary></Summary>

        <section id="progress-and-games-history" class="field">
            <ProgressAndGamesHistoryHeader v-model:displayGamesHistory="displayGamesHistory"></ProgressAndGamesHistoryHeader>
            <!--  -->
            <Swapper :currentIndex="displayGamesHistory ? 1 : 0" orientation="vertical">
                <Progress></Progress>
                <GamesHistory :currentIndex="displayGamesHistory"></GamesHistory>
            </Swapper>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

import Progress from "@/components/statistics/certain_datasets/left_side/landing/progress/ProgressChartWrap.vue";
import Summary from "@/components/statistics/certain_datasets/left_side/landing/Summary.vue";
import ProgressAndGamesHistoryHeader from "@/components/statistics/certain_datasets/left_side/landing/ProgressAndGamesHistoryHeader.vue";
import GamesHistory from "@/components/statistics/certain_datasets/left_side/landing/games_history/GamesHistory.vue";

export default defineComponent({
    components: { Progress, Summary, ProgressAndGamesHistoryHeader, GamesHistory },
    setup() {
        const { dataset } = useCertain;
        const displayGamesHistory = ref<boolean>(false);
        //
        return { dataset, displayGamesHistory };
    },
});
</script>
