<template>
    <Suspense>
        <template #default>
            <ProgressBar v-bind="$attrs"></ProgressBar>
        </template>
        <!--  -->
        <template #fallback>
            <div class="progress-bar __loading">
                <span class="bar"></span>
            </div>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressBar from "./ProgressBar.vue";
export default defineComponent({
    components: { ProgressBar },
    inheritAttrs: false,
});
</script>
