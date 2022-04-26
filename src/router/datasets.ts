import { RouteRecordRaw } from "vue-router";
// Components
import DatasetsList from "@/views/datasets/DatasetsList.vue";
import CertainDatasetManager from "@/views/datasets/CertainDatasetsManager.vue";
import AllDatasetsManager from "@/views/datasets/AllDatasetsManager.vue";

export default [
    {
        path: "/available-datasets",
        name: "DatasetsAvailableForPlay",
        component: DatasetsList,
    },
    {
        path: "/datasets-manager",
        name: "DatasetsList",
        component: AllDatasetsManager,
    },
    {
        path: "/datasets-manager/:datasetsName",
        name: "CertainDatasetManager",
        component: CertainDatasetManager,
    },
] as RouteRecordRaw[];
