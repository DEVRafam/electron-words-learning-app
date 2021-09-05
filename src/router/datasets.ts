import { RouteRecordRaw } from "vue-router";

import DatasetsList from "@/views/datasets/DatasetsList.vue";
import CertainDatasetManager from "@/views/datasets/CertainDatasetsManager.vue";

export default [
    {
        path: "/datasets-manager",
        name: "DatasetsList",
        component: DatasetsList,
    },
    {
        path: "/datasets-manager/:datasetsName",
        name: "CertainDatasetManager",
        component: CertainDatasetManager,
    },
] as RouteRecordRaw[];
