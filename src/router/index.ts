import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Menu from "@/views/Menu.vue";
import Gameplay from "@/views/Gameplay.vue";
import WordsManager from "@/views/WordsManager.vue";
import Statistics from "@/views/Statistics.vue";
import SingleGameplaySummary from "@/views/SingleGameplaySummary.vue";

const routes: Array<RouteRecordRaw> = [
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
        path: "/words-manager",
        name: "WordsManager",
        component: WordsManager,
    },
    {
        path: "/statistics",
        name: "Statistics",
        component: Statistics,
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
