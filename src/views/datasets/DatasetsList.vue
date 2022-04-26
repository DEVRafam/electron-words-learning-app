<template>
    <div :key="refreshKey">
        <Suspense>
            <template #default>
                <Main :callback="callback" label="Modifier">
                    <router-link to="" tabindex="-1" @click="createNewDataset">
                        <span>Create new dataset</span>
                    </router-link>
                    <router-link to="/">
                        <span>Display all dataset</span>
                    </router-link>
                </Main>
            </template>
            <!--  -->
            <template #fallback>
                <LoadingScreen></LoadingScreen>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "@/components/__global/datasets_selector/DatasetsSelector.vue";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import { DatasetFileForPreview } from "@/types/Dataset";
import router from "@/router/index";
//
export default defineComponent({
    components: { Main },
    setup() {
        const { refreshKey } = useDatasetsLoader;
        const callback = (dataset: DatasetFileForPreview) => {
            router.push({ path: `/datasets-manager/${dataset.fileName}` });
        };

        const createNewDataset = () => {
            router.push({
                name: "CertainDatasetManager",
                query: {
                    createNewDataset: "true",
                },
                params: {
                    datasetsName: "__",
                },
            });
        };

        return { refreshKey, callback, createNewDataset };
    },
});
</script>
