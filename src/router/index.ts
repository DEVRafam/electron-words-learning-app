import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Menu from "@/views/Menu.vue";
import Gameplay from "@/views/Gameplay.vue";
import DatasetsManager from "@/views/DatasetsManager.vue";
import SingleGameplaySummary from "@/views/SingleGameplaySummary.vue";
//
import statisticsRoutes from "./statistics";
const routes: Array<RouteRecordRaw> = [
    ...statisticsRoutes,
    {
        path: "/",
        name: "Menu",
        component: Menu,
    },
    {
        path: "/:catchAll(.*)",
        name: "Menu",
        component: Menu,
    },
    {
        path: "/gameplay",
        name: "Gameplay",
        component: Gameplay,
    },
    {
        path: "/datasets-manager",
        name: "DatasetsManager",
        component: DatasetsManager,
    },

    {
        path: "/single-gameplay-summary/:gameplayDataFileName/:logFileName",
        name: "SingleGameplaySummary",
        component: SingleGameplaySummary,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
