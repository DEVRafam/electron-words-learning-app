<template>
    <Suspense>
        <template #default>
            <CertainDataset></CertainDataset>
        </template>
        <!--  -->
        <template #fallback>
            <LoadingScreen></LoadingScreen>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CertainDataset from "./CertainDataset.vue";
export default defineComponent({
    components: { CertainDataset },
});
</script>
