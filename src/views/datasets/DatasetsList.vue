<template>
    <div :key="refreshKey">
        <Suspense>
            <template #default>
                <Main :callback="callback" label="Modifier"></Main>
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
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import router from "@/router/index";
//
export default defineComponent({
    components: { Main },
    setup() {
        const { refreshKey } = useDatasetsLoader;
        const callback = (dataset: GameplayDataFileForPreview) => {
            router.push({ path: `/datasets-manager/${dataset.fileName}` });
        };
        return { refreshKey, callback };
    },
});
</script>
