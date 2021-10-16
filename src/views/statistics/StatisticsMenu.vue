<template>
    <div :key="refreshKey">
        <Suspense>
            <template #default>
                <Main :callback="callback" label="Statistics" :enableBlocking="true"></Main>
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
            router.push({ path: `/statistics/${dataset.fileName}` });
        };
        return { refreshKey, callback };
    },
});
</script>
