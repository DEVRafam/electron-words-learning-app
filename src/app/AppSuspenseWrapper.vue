<template>
    <div>
        <Suspense>
            <template #default>
                <App></App>
            </template>
            <!--  -->
            <template #fallback>
                <LoadingScreen></LoadingScreen>
            </template>
        </Suspense>
        <BackgroundTHREEShapes></BackgroundTHREEShapes>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import App from "./App.vue";
import BackgroundTHREEShapes from "./BackgroundTHREEShapes.vue";

export default defineComponent({
    components: { App, BackgroundTHREEShapes },
});
</script>
