<template>
    <Suspense>
        <template #default>
            <Content v-bind="$attrs"></Content>
        </template>
        <!--  -->
        <template #fallback>
            <h1>Loading...</h1>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Content from "@/components/datasets_manager/modify/words/current_words/Content.vue";

export default defineComponent({
    components: { Content },
    inheritAttrs: false,
});
</script>
