import { RouteRecordRaw } from "vue-router";

import Statistics from "@/views/statistics/StatisticsMenu.vue";
import CertainDatasetStatistics from "@/views/statistics/CertainDatasetStatistics.vue";

export default [
    {
        path: "/statistics",
        name: "Statistics",
        component: Statistics,
    },
    {
        path: "/statistics/:datasetsName",
        name: "CertainDatasetStatistics",
        component: CertainDatasetStatistics,
    },
] as RouteRecordRaw[];
