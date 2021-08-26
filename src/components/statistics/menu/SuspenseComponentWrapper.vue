<template>
    <Suspense>
        <template #default>
            <Menu></Menu>
        </template>
        <!--  -->
        <template #fallback>
            <LoadingScreen></LoadingScreen>
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./Menu.vue";
export default defineComponent({
    components: { Menu },
});
</script>
