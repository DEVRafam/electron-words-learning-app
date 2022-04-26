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
// Tools
import { defineComponent } from "vue";
// Composable
import useDatasetsLoader from "@/composable/datasets_loaders/useDatasetsLoader";
// Components
import Main from "@/components/datasets_manager/Main.vue";
//
export default defineComponent({
    components: { Main },
    setup() {
        const { refreshKey } = useDatasetsLoader;
        return { refreshKey };
    },
});
</script>
