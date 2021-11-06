<template>
    <section id="games-history">
        <div class="filters">
            <OrderFilter v-model:orderFilter="orderFilter" :tabindex="tabindex"></OrderFilter>
            <DisplayMode v-model:displayMode="displayMode" v-model:chartType="chartType" :tabindex="tabindex"></DisplayMode>
        </div>
        <div class="games-logs-wrapper" :key="`${displayMode}-${orderFilter}-${chartType}`" ref="wrapper">
            <template v-for="(item, index) in orderedGamesHistory" :key="index">
                <SingleLog
                    v-bind="{
                        index,
                        logFile: item,
                        displayMode,
                        chartType,
                    }"
                ></SingleLog>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType, computed } from "vue";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";
// types
import { OrderFilter as T_OrderFilter, DisplayMode as T_DisplayMode, ChartType as T_ChartType } from "@/components/statistics/certain_datasets/left_side/landing/games_history/filters/types";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

import SingleLog from "@/components/statistics/certain_datasets/left_side/landing/games_history/single_log/SingleLog.vue";
import OrderFilter from "@/components/statistics/certain_datasets/left_side/landing/games_history/filters/OrderFilter.vue";
import DisplayMode from "@/components/statistics/certain_datasets/left_side/landing/games_history/filters/DisplayMode.vue";

export default defineComponent({
    components: { SingleLog, OrderFilter, DisplayMode },
    props: {
        currentIndex: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const wrapper = ref<HTMLElement | null>(null);
        const _gamesHistoryClone: ProgressLogFile[] = gamesHistory.value.clone();
        watch(props, () => {
            if (wrapper.value) wrapper.value.scrollTop = 0;
        });

        const orderFilter = ref<T_OrderFilter>("newest");
        const displayMode = ref<T_DisplayMode>(window.innerWidth > 1600 ? "more_details" : "smaller_content");
        const chartType = ref<T_ChartType>("bar");

        const orderedGamesHistory = computed<ProgressLogFile[]>(() => {
            const { value: filter } = orderFilter;
            const getDate = (target: ProgressLogFile): number => Date.parse(target.session.date);
            const getScore = (target: ProgressLogFile): number => target["accuracy[%]"];

            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            if (filter === "newest") return _gamesHistoryClone.sort((a, b) => getDate(b) - getDate(a));
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            else if (filter === "oldest") return _gamesHistoryClone.sort((a, b) => getDate(a) - getDate(b));
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            else if (filter === "highest_score") return _gamesHistoryClone.sort((a, b) => getScore(b) - getScore(a));
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            else if (filter === "lowest_score") return _gamesHistoryClone.sort((a, b) => getScore(a) - getScore(b));
            return _gamesHistoryClone;
        });

        const tabindex = computed<-1 | 1>(() => {
            return props.currentIndex ? 1 : -1;
        });

        return { orderedGamesHistory, wrapper, orderFilter, displayMode, chartType, tabindex };
    },
});
</script>
