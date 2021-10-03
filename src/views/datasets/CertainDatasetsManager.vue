<template>
    <div :key="refreshKey">
        <Suspense>
            <template #default>
                <Main></Main>
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
import Main from "@/components/datasets_manager/Main.vue";
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";
//
export default defineComponent({
    components: { Main },
    setup() {
        const { refreshKey } = useDatasetsLoader;
        return { refreshKey };
    },
});
</script>
