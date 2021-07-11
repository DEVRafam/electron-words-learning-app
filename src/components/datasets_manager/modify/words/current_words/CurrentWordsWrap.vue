<template>
    <section id="current-words">
        <Suspense>
            <template #default>
                <Content></Content>
            </template>
            <!--  -->
            <template #fallback>
                <h1>Loading...</h1>
            </template>
        </Suspense>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Content from "@/components/datasets_manager/modify/words/current_words/Content.vue";

export default defineComponent({
    components: { Content },
});
</script>
