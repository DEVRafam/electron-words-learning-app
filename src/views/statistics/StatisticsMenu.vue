<template>
    <div>
        <h1>Statistics</h1>
        <SuspenseComponentWrapper></SuspenseComponentWrapper>
        <router-link to="/">Back</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SuspenseComponentWrapper from "@/components/statistics/menu/SuspenseComponentWrapper.vue";

export default defineComponent({
    components: { SuspenseComponentWrapper },
});
</script>
