<template>
    <section id="archived-words">
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
import Content from "./Content.vue";
export default defineComponent({
    components: { Content },
});
</script>
