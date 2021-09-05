import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Menu from "@/views/Menu.vue";
import Gameplay from "@/views/Gameplay.vue";
import SingleGameplaySummary from "@/views/SingleGameplaySummary.vue";
//
import statisticsRoutes from "./statistics";
import datasetsRoutes from "./datasets";
const routes: Array<RouteRecordRaw> = [
    ...statisticsRoutes,
    ...datasetsRoutes,
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
